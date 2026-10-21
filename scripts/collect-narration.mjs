/**
 * Inventory only the text that can reach the active UI's speakText function.
 * No app code is executed, no audio map is mined, and no network is used.
 * Run: node scripts/collect-narration.mjs [--python|--python-reference] [--dry-run] [--output test-results/...json]
 * --python reads original-source only and never overwrites the C/C++ inventory.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const referenceOnly = process.argv.includes('--python-reference');
const pythonOnly = process.argv.includes('--python') || referenceOnly;
const dryRun = process.argv.includes('--dry-run');
const args=process.argv.slice(2);let outputOverride;
for(let i=0;i<args.length;i++){
  if(args[i]==='--output'){assert(!outputOverride&&args[i+1], '--output requires one path');outputOverride=args[++i];}
  else assert(['--python','--python-reference','--dry-run'].includes(args[i]), 'Unknown collector argument');
}
const uiRoot = pythonOnly
  ? (!referenceOnly && fs.existsSync(path.join(root, 'original-source/App.tsx')) ? 'original-source' : 'python-voice-update/reference')
  : 'src/original';
assert(fs.existsSync(path.join(root, uiRoot, 'App.tsx')), 'Python source or its safe narration reference is required');
const relative = file => path.relative(root, file).replaceAll('\\', '/');
const hash = text => createHash('sha256').update(text, 'utf8').digest('hex').slice(0, 24);
const sourceCache = new Map();
function source(file) {
  const absolute = path.resolve(root, file);
  if (!sourceCache.has(absolute)) {
    const text = fs.readFileSync(absolute, 'utf8');
    sourceCache.set(absolute, ts.createSourceFile(absolute, text, ts.ScriptTarget.Latest, true,
      absolute.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS));
  }
  return sourceCache.get(absolute);
}
function visit(node, predicate, result = []) {
  if (predicate(node)) result.push(node);
  ts.forEachChild(node, child => { visit(child, predicate, result); });
  return result;
}
function only(nodes, description) {
  assert.equal(nodes.length, 1, `Expected one ${description}; found ${nodes.length}`);
  return nodes[0];
}
function variable(node, name) {
  return only(visit(node, n => ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.name.text === name),
    `variable ${name}`);
}
function unwrap(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) ||
      ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node))) node = node.expression;
  return node;
}
function keyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  throw new Error(`Unsupported property key: ${node.getText()}`);
}
function property(node, name) {
  node = unwrap(node);
  assert(ts.isObjectLiteralExpression(node), 'Expected a data object literal');
  return node.properties.find(p => ts.isPropertyAssignment(p) && keyName(p.name) === name)?.initializer;
}
/** Restricted AST evaluator: literals and simple expressions only, never calls/imports/eval. */
function value(node, env = Object.create(null)) {
  node = unwrap(node);
  assert(node, 'Missing static expression');
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) {
    if (Object.hasOwn(env, node.text)) return env[node.text];
    throw new Error(`Unbound identifier in static data: ${node.text}`);
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(n => value(n, env));
  if (ts.isObjectLiteralExpression(node)) {
    const result = Object.create(null);
    for (const entry of node.properties) {
      assert(ts.isPropertyAssignment(entry), 'Only literal data properties are allowed');
      result[keyName(entry.name)] = value(entry.initializer, env);
    }
    return result;
  }
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(
    span => String(value(span.expression, env)) + span.literal.text).join('');
  if (ts.isPropertyAccessExpression(node)) {
    const object = value(node.expression, env);
    if (node.questionDotToken && object == null) return undefined;
    return object[node.name.text];
  }
  if (ts.isElementAccessExpression(node)) {
    const object = value(node.expression, env);
    if (node.questionDotToken && object == null) return undefined;
    return object[value(node.argumentExpression, env)];
  }
  if (ts.isConditionalExpression(node)) return value(node.condition, env)
    ? value(node.whenTrue, env) : value(node.whenFalse, env);
  if (ts.isBinaryExpression(node)) {
    const left = value(node.left, env);
    if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + value(node.right, env);
    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) return left || value(node.right, env);
  }
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) return -value(node.operand, env);
  throw new Error(`Refusing non-static expression: ${node.getText().slice(0, 120)}`);
}
function location(node) {
  const file = node.getSourceFile();
  return {file: relative(file.fileName), line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1};
}
function fieldLocation(data, index, segments) {
  let node = data.node.elements[index];
  for (const part of segments) {
    node = typeof part === 'number' ? unwrap(node).elements[part] : property(node, part);
    if (!node) return location(data.node.elements[index]);
  }
  return location(node);
}
const dataNames = ['literacyQuizzes', 'wordSlides', 'wordPurposeSlides', 'wordQuizzes',
  'sentenceSlides', 'sentencePurposeSlides', 'sentenceQuizzes', 'essaySlides', 'essayPurposeSlides', 'essayQuizzes'];
const expectedLengths = {literacyQuizzes: 11, wordSlides: 21, wordPurposeSlides: 21, wordQuizzes: 11,
  sentenceSlides: 12, sentencePurposeSlides: 12, sentenceQuizzes: 14, essaySlides: 13,
  essayPurposeSlides: 13, essayQuizzes: 11};
function loadData(language, name) {
  const file = language === 'python' ? `${uiRoot}/data/${name}.ts` : `src/adapted-data/${language}/${name}.ts`;
  const sf = source(file);
  const node = unwrap(variable(sf, name).initializer);
  assert(ts.isArrayLiteralExpression(node), `${file} must stay a pure data array`);
  const items = value(node);
  assert.equal(items.length, expectedLengths[name], `${file}: original page slots changed`);
  // Validate that the original component's active wrapper really selects these data files.
  if (language !== 'python') {
    const wrapper = source(`${uiRoot}/data/${name}.ts`).text;
    assert(wrapper.includes(`../../adapted-data/${language}/${name}`), `Inactive data file: ${file}`);
  }
  return {file, node, items};
}

const app = source(`${uiRoot}/App.tsx`);
const codeUi = source(`${uiRoot}/components/CodeUi.tsx`);
const sentenceComponent = source(`${uiRoot}/components/GenericSentenceSlide.tsx`);
const slidesNode = unwrap(variable(app, 'slides').initializer);
assert(ts.isArrayLiteralExpression(slidesNode));
const overviewFunction = variable(app, 'OverviewSlide').initializer;
const overviewItemsNode = only(visit(overviewFunction, node => ts.isArrayLiteralExpression(node) &&
  node.elements.length === 4 && node.elements.every(item => ts.isObjectLiteralExpression(item) &&
    property(item, 'title') && property(item, 'langDef') && property(item, 'codeDef'))), 'Overview card data');
const overviewItems = value(overviewItemsNode);
function speakCalls(sf) {
  return visit(sf, node => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'speakText');
}
const overviewCall = only(speakCalls(overviewFunction), 'Overview speakText call');
const splitFunction = variable(codeUi, 'SplitToken').initializer;
const splitCall = only(speakCalls(splitFunction), 'SplitToken speakText call');
const successExpression = variable(codeUi, 'successMsg').initializer;
const errorExpression = variable(codeUi, 'errorMsg').initializer;
const reviewCalls = speakCalls(variable(codeUi, 'ReviewCard').initializer);
const successCall = only(reviewCalls.filter(call => call.arguments[0].getText() === 'successMsg'), 'correct feedback call');
const errorCall = only(reviewCalls.filter(call => call.arguments[0].getText() === 'errorMsg'), 'wrong feedback call');
const lineFunction = variable(sentenceComponent, 'handleLineSpeak').initializer;
const labelExpression = variable(lineFunction, 'labelPart').initializer;
const contentExpression = variable(lineFunction, 'contentPart').initializer;
const lineCall = only(speakCalls(lineFunction), 'line speakText call');
const stepCall = only(speakCalls(variable(sentenceComponent, 'handleStepTextSpeak').initializer), 'step speakText call');
// This one data pipeline is reproduced below; reject a changed pipeline instead of silently losing coverage.
const printer = ts.createPrinter({removeComments: true});
assert.equal(printer.printNode(ts.EmitHint.Expression, variable(lineFunction, 'tokensText').initializer,
  sentenceComponent).replace(/\s+/g, ''),
  "line.tokens.filter(t=>t.text.trim()).map(t=>t.text).join('')");

function jsxDetails(node) {
  node = unwrap(node);
  const opening = ts.isJsxElement(node) ? node.openingElement : node;
  assert(ts.isJsxSelfClosingElement(opening) || ts.isJsxOpeningElement(opening));
  const data = opening.attributes.properties.find(a => ts.isJsxAttribute(a) && a.name.getText() === 'data');
  return {component: opening.tagName.getText(), dataExpression: data?.initializer?.expression};
}
function pageCatalog(data) {
  const env = Object.fromEntries(Object.entries(data).map(([name, d]) => [name, d.items]));
  const pages = [];
  function add(object, scopedEnv, mappedData, mappedIndex) {
    const jsx = jsxDetails(property(object, 'component'));
    let dataName = mappedData;
    let recordIndex = mappedIndex;
    if (jsx.dataExpression && ts.isElementAccessExpression(jsx.dataExpression)) {
      dataName = jsx.dataExpression.expression.getText();
      recordIndex = value(jsx.dataExpression.argumentExpression, scopedEnv);
    }
    const record = dataName ? data[dataName].items[recordIndex] : undefined;
    pages.push({page: pages.length + 1, component: jsx.component,
      section: value(property(object, 'section'), scopedEnv),
      ...(dataName ? {dataName, dataFile: data[dataName].file, recordIndex, recordId: record.id} : {})});
  }
  for (const element of slidesNode.elements) {
    if (!ts.isSpreadElement(element)) { add(element, env); continue; }
    const call = element.expression;
    assert(ts.isCallExpression(call) && ts.isPropertyAccessExpression(call.expression) && call.expression.name.text === 'map');
    const dataName = call.expression.expression.getText();
    assert(data[dataName], `Unrecognized page spread: ${dataName}`);
    const callback = call.arguments[0];
    assert(ts.isArrowFunction(callback));
    data[dataName].items.forEach((record, index) => {
      const scopedEnv = {...env, [callback.parameters[0].name.getText()]: record,
        [callback.parameters[1].name.getText()]: index};
      add(unwrap(callback.body), scopedEnv, dataName, index);
    });
  }
  assert.equal(pages.length, 153, 'The active original course must have 153 pages');
  return pages;
}

// Audit all active source files. Fail if a new speakText entry point is added without a collector.
function tsFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? tsFiles(file) : /\.tsx?$/.test(entry.name) ? [file] : [];
  });
}
// Original Python App retains many unused legacy JSX components. Start from the
// actual slides array and follow local JSX component references, never all JSX.
const inlineComponents = new Map();
for (const statement of app.statements) {
  if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer &&
          (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) {
        inlineComponents.set(declaration.name.text, declaration.initializer);
      }
    }
  } else if (ts.isFunctionDeclaration(statement) && statement.name) {
    inlineComponents.set(statement.name.text, statement);
  }
}
const isOpening = node => ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node);
const activeInlineComponents = new Set();
function followInlineComponent(name) {
  if (!inlineComponents.has(name) || activeInlineComponents.has(name)) return;
  activeInlineComponents.add(name);
  for (const jsx of visit(inlineComponents.get(name), isOpening)) followInlineComponent(jsx.tagName.getText());
}
for (const jsx of visit(slidesNode, isOpening)) followInlineComponent(jsx.tagName.getText());
assert(activeInlineComponents.has('OverviewSlide'), 'Overview must remain in the actual page routes');
const reachableAppRoots = [...activeInlineComponents].map(name => inlineComponents.get(name));
const appCallNodes = [...new Set(reachableAppRoots.flatMap(speakCalls))];
const auditDataRoot = pythonOnly ? `${uiRoot}/data` : 'src/adapted-data';
const allCallNodes = [...appCallNodes,
  ...[...tsFiles(path.join(root, uiRoot, 'components')), ...tsFiles(path.join(root, auditDataRoot))]
    .flatMap(file => speakCalls(source(file)))];
const allCalls = allCallNodes.map(node => ({...location(node), argument: node.arguments[0].getText()}));
assert.equal(allCalls.length, 6, 'A narration call site was added/removed; update this collector');
const expectedCallFiles = new Set([`${uiRoot}/App.tsx`, `${uiRoot}/components/CodeUi.tsx`,
  `${uiRoot}/components/GenericSentenceSlide.tsx`]);
assert(allCalls.every(call => expectedCallFiles.has(call.file)), 'Unrecognized narration component');
const expectedTokenComponents = new Set(['GenericWordSlide', 'GenericSentenceSlide', 'GenericEssaySlide',
  'GenericLiteracyQuiz', 'GenericWordQuiz']);
const actualTokenComponents = tsFiles(path.join(root, uiRoot, 'components')).filter(file =>
  visit(source(file), node => (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
    node.tagName.getText() === 'SplitToken').length).map(file => path.basename(file, '.tsx'));
assert.deepEqual([...actualTokenComponents].sort(), [...expectedTokenComponents].sort(), 'SplitToken usage changed');
assert.equal(reachableAppRoots.flatMap(node => visit(node, jsx => isOpening(jsx) &&
  jsx.tagName.getText() === 'SplitToken')).length, 0, 'New reachable inline App token needs collection');

function collectLanguage(language) {
  const data = Object.fromEntries(dataNames.map(name => [name, loadData(language, name)]));
  const pages = pageCatalog(data);
  const textMap = new Map();
  let occurrences = 0;
  const categoryUses = Object.create(null);
  function add(text, category, origin, callSite) {
    assert.equal(typeof text, 'string');
    assert(text.length > 0, 'Empty speakText argument');
    occurrences++;
    categoryUses[category] = (categoryUses[category] || 0) + 1;
    const item = textMap.get(text) || {id: `narration-${hash(text)}`, text, categories: new Set(), sources: []};
    item.categories.add(category);
    item.sources.push({...origin, category, callSite: location(callSite)});
    textMap.set(text, item);
  }
  function origin(page, fieldPath, extra = {}) {
    return {page: page.page, section: page.section, component: page.component,
      ...(page.dataName ? {dataFile: page.dataFile, recordId: page.recordId, recordIndex: page.recordIndex,
        field: fieldPath.map(part => typeof part === 'number' ? `[${part}]` : `.${part}`).join('').replace(/^\./, ''),
        ...fieldLocation(data[page.dataName], page.recordIndex, fieldPath)} : {}), ...extra};
  }
  function token(text, type, page, fieldPath) {
    assert.equal(typeof type, 'string');
    add(value(splitCall.arguments[0], {text, type}), 'split-token',
      origin(page, fieldPath, {trigger: '点击代码 token', tokenText: text, tokenType: type}), splitCall);
  }
  for (const page of pages) {
    if (page.component === 'OverviewSlide') {
      overviewItems.forEach((item, index) => add(value(overviewCall.arguments[0], {item}), 'overview-card',
        {...origin(page, []), ...location(overviewItemsNode.elements[index]), field: `OverviewSlide.cards[${index}]`,
          trigger: '点击学习路径卡片', card: item.title}, overviewCall));
      continue;
    }
    if (!page.dataName) continue;
    const item = data[page.dataName].items[page.recordIndex];
    if (page.component === 'GenericWordSlide') {
      item.tokens.forEach((t, i) => token(t.text, t.type, page, ['tokens', i]));
    } else if (page.component === 'GenericSentenceSlide') {
      item.lines.forEach((line, lineIndex) => {
        line.tokens.forEach((t, tokenIndex) => token(t.text, t.type, page, ['lines', lineIndex, 'tokens', tokenIndex]));
        const tokensText = line.tokens.filter(t => t.text.trim()).map(t => t.text).join('');
        const labelPart = value(labelExpression, {line});
        const contentPart = value(contentExpression, {tokensText});
        add(value(lineCall.arguments[0], {labelPart, contentPart}), 'sentence-line',
          origin(page, ['lines', lineIndex], {trigger: '点击代码行空白处/行容器'}), lineCall);
      });
      // The component cycles modulo 5; never collect unreachable surplus steps.
      item.stepsText.slice(0, 5).forEach((text, step) => {
        if (text) add(value(stepCall.arguments[0], {currentStepText: text}), 'sentence-step',
          origin(page, ['stepsText', step], {trigger: '点击教学提示喇叭', step}), stepCall);
      });
    } else if (page.component === 'GenericEssaySlide') {
      item.blocks.forEach((block, blockIndex) => block.lines.forEach((line, lineIndex) =>
        line.tokens.forEach((t, tokenIndex) => token(t.text, t.type, page,
          ['blocks', blockIndex, 'lines', lineIndex, 'tokens', tokenIndex]))));
    } else if (page.component.endsWith('Quiz')) {
      assert(Number.isInteger(item.correctIndex) && item.correctIndex >= 0 && item.correctIndex < item.options.length);
      item.options.forEach((option, index) => {
        const correct = index === item.correctIndex;
        const declaration = correct ? successExpression : errorExpression;
        const text = value(declaration, {explanations: item.explanations, idx: index});
        const fallback = !item.explanations?.[index];
        const call = correct ? successCall : errorCall;
        add(text, correct ? 'quiz-correct-feedback' : 'quiz-wrong-feedback',
          origin(page, fallback ? ['options', index] : ['explanations', index],
            {trigger: '选择答案后自动朗读反馈', optionIndex: index, correct, fallbackUsed: fallback}), call);
      });
      // Sentence/essay quizzes render code as plain spans, not SplitToken.
      if ((page.component === 'GenericLiteracyQuiz' || page.component === 'GenericWordQuiz') &&
          item.codeVisual?.type === 'code' && item.codeVisual.tokens) {
        item.codeVisual.tokens.forEach((t, index) => token(t.text, t.type, page, ['codeVisual', 'tokens', index]));
      }
    }
  }
  const texts = [...textMap.values()].map(item => ({...item, categories: [...item.categories].sort()}));
  const categoryCounts = Object.fromEntries(Object.keys(categoryUses).map(category => [category, {
    occurrences: categoryUses[category], uniqueTexts: texts.filter(text => text.categories.includes(category)).length,
  }]));
  const voicedPages = new Set(texts.flatMap(item => item.sources.map(source => source.page)));
  return {language, pageCount: pages.length, uniqueStaticTextCount: texts.length, occurrenceCount: occurrences,
    pagesWithNarration: voicedPages.size, categoryCounts, pages, texts,
    notNarrated: [
      {component: 'GenericWordSlide', fields: ['stepsText', 'title', 'subtitle', 'resultText'],
        pageCount: data.wordSlides.items.length, displayedStepCount: data.wordSlides.items.reduce((n, d) => n + Math.min(5, d.stepsText.length), 0),
        reason: '下一步只更新 step；页面只提供 token 点击朗读。'},
      {component: 'GenericEssaySlide', fields: ['stepsText', 'title', 'subtitle', 'blocks[].title'],
        pageCount: data.essaySlides.items.length, displayedStepCount: data.essaySlides.items.reduce((n, d) => n + Math.min(6, d.stepsText.length), 0),
        reason: '下一步只更新 step；页面只提供 token 点击朗读，没有整行朗读。'},
      {component: 'CodePurposeSlide', pageCount: 46, reason: '用途演示的 token 是普通 span，步骤按钮不调用 speakText。'},
      {components: ['GenericLiteracyQuiz', 'GenericWordQuiz', 'GenericSentenceQuiz', 'GenericEssayQuiz'],
        fields: ['question', 'options', 'title', 'description'], reason: '点击选项朗读 explanations 或反馈后备文案，不朗读题干/选项本身。'},
      {components: ['GenericSentenceQuiz', 'GenericEssayQuiz'], fields: ['codeVisual'],
        reason: '测验代码只作普通文本展示；只有答案反馈会朗读。'},
      {components: ['CoverSlide', 'TransitionSlide', 'LiteracyConceptSlide', 'SystemKeywordTableSlide',
        'SymbolKeywordTableSlide', 'ContentKeywordTableSlide', 'CodeStructureTheory', 'SummarySlide', 'UnifiedIDE', 'Layout'],
        reason: '没有到 speakText 的调用路径；AI 助教、用户编辑代码、运行结果也不会朗读。'},
    ]};
}

const languages = Object.fromEntries((pythonOnly ? ['python'] : ['c', 'cpp']).map(language => [language, collectLanguage(language)]));
const combined = new Map();
for (const [language, result] of Object.entries(languages)) {
  for (const item of result.texts) {
    const entry = combined.get(item.text) || {id: item.id, text: item.text, languages: []};
    entry.languages.push(language);
    combined.set(item.text, entry);
  }
}
const inventory = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  method: 'restricted-typescript-ast-static-reachability',
  entryPoint: pythonOnly ? `${uiRoot}/App.tsx (Python 153-page route source)` : 'src/main.tsx -> src/original/App.tsx',
  sourceRoot: uiRoot,
  reachableInlineAppComponents: [...activeInlineComponents].sort(),
  excludedUnreachableInlineAppComponents: [...inlineComponents].filter(([name, node]) =>
    name !== 'App' && !activeInlineComponents.has(name) && visit(node, isOpening).length)
    .map(([name]) => name).sort(),
  exactAudioKeys: true,
  sourceFiles: [...sourceCache].map(([file]) => ({file: relative(file), sha256: createHash('sha256').update(fs.readFileSync(file)).digest('hex')})),
  uniqueStaticTextCountAcrossLanguages: combined.size,
  notes: [
    'text 是传入 speakText 的精确字符串，包含代码符号、换行、前后空格和表情；不会主动 trim 或改写。',
    '仅从被实际朗读入口引用的数据字段生成，没有用正则遍历 JSX 字面量，也没有使用旧 audio_map 作为文本来源。',
    '所有选项反馈都可在重新进入测验/答对前尝试时到达；答对后该次卡片不再接受选择。',
    '点击 token 会阻止事件冒泡；造句整行朗读需要点击行容器或空白处。',
    '这份清单用于现有朗读替换；不会给原本没有朗读的步骤、测验题干或 AI 对话新增朗读。',
  ],
  callSites: allCalls,
  dynamicCategories: [
    {id: 'split-token', formula: '${text}，是${type}', boundedByCurrentStaticData: true,
      currentStaticCoverage: '五个实际使用 SplitToken 的组件：组词/造句/写作讲解、识字/组词测验。',
      futureGap: '将来若新增运行时 token 来源或修改词性 type，需要重新生成清单。'},
    {id: 'sentence-line', formula: '(label ? `这一行是${label}，` : "这一行代码，") + (joinedTokens ? `内容是：${joinedTokens}` : "")',
      boundedByCurrentStaticData: true, currentStaticCoverage: '12 个造句讲解页面的全部 lines；过滤纯空白 token 后直接拼接，保留 token 内部空格。'},
    {id: 'sentence-step', formula: 'stepsText[step], step = 0..4', boundedByCurrentStaticData: true,
      currentStaticCoverage: '12 个造句讲解页面各 5 条教学提示；由喇叭按钮触发。'},
    {id: 'quiz-feedback', formula: 'explanations?.[selectedIndex] || correctOrWrongFallback',
      boundedByCurrentStaticData: true, currentStaticCoverage: '47 个测验每个选项的正确/错误反馈，按实际 || 分支选择后备文本。'},
    {id: 'overview-card', formula: '${item.title}。${item.langDef}。例如：${item.codeDef}',
      boundedByCurrentStaticData: true, currentStaticCoverage: '总览 4 张卡片。'},
  ],
  coverageGaps: [
    {scope: '当前静态课程', remaining: false, detail: '已覆盖当前 6 个 speakText 调用点；新增调用点/组件会令脚本断言失败。'},
    {scope: '运行时用户或 AI 内容', remaining: false, detail: '当前没有朗读入口，因此不存在需要在线 TTS 的任意动态文本类别。'},
    {scope: '发音与主观自然度', remaining: true, detail: '本脚本仅盘点真实文字，不生成声音，也不验证新音色、代码符号或中英混读的听感。'},
  ],
  languages,
  allStaticTexts: [...combined.values()],
};
const output = outputOverride ? path.resolve(root, outputOverride) : path.join(root, pythonOnly ? 'test-results/python-narration-inventory.json' : 'test-results/narration-inventory.json');
assert(output.startsWith(path.join(root,'test-results')+path.sep)&&output.endsWith('.json'), 'Inventory output must be a JSON inside test-results');
let matchesFrozenRawKeys;
if (dryRun && fs.existsSync(output)) {
  const frozen = JSON.parse(fs.readFileSync(output, 'utf8'));
  assert.deepEqual([...combined.keys()].sort(), frozen.allStaticTexts.map(item => item.text).sort(),
    'Current reachable source must reproduce exactly the frozen raw speech strings');
  assert.deepEqual(Object.keys(languages).sort(), Object.keys(frozen.languages).sort());
  for (const [language, current] of Object.entries(languages)) {
    assert.deepEqual(current.texts.map(item => item.text).sort(), frozen.languages[language].texts.map(item => item.text).sort());
    assert.deepEqual(current.categoryCounts, frozen.languages[language].categoryCounts);
  }
  matchesFrozenRawKeys = true;
}
if (!dryRun) {
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, JSON.stringify(inventory, null, 2) + '\n', 'utf8');
}
console.log(JSON.stringify({output: relative(output), dryRun, sourceRoot: uiRoot, matchesFrozenRawKeys, uniqueAcrossLanguages: combined.size,
  languages: Object.fromEntries(Object.entries(languages).map(([language, result]) => [language,
    {uniqueTexts: result.uniqueStaticTextCount, occurrences: result.occurrenceCount,
      voicedPages: result.pagesWithNarration, categoryCounts: result.categoryCounts}]))}, null, 2));
