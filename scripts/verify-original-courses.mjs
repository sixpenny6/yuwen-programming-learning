import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

// Validate the original 153-page contract. Never import the former src/courses.
const root = resolve(import.meta.dirname, '..');
const reportArg=process.argv.indexOf('--report');
const reportPath=resolve(root,reportArg<0?'test-results/original-courses.json':process.argv[reportArg+1]);
if(!reportPath.startsWith(join(root,'test-results')+'\\')&&!reportPath.startsWith(join(root,'test-results')+'/'))throw new Error('Report must stay inside test-results');
const datasetCounts = {
  literacyQuizzes: 11,
  wordSlides: 21, wordPurposeSlides: 21, wordQuizzes: 11,
  sentenceSlides: 12, sentencePurposeSlides: 12, sentenceQuizzes: 14,
  essaySlides: 13, essayPurposeSlides: 13, essayQuizzes: 11,
};
const normalize = text => text.replace(/\r\n/g, '\n');
const hash = text => createHash('sha256').update(text).digest('hex');
const inputs = new Map();
const report = {
  schemaVersion: 1, generatedAt: new Date().toISOString(), ok: false,
  structure: [], pageMapping: {}, dataSelectors: [], layoutWarnings: [],
  languageResiduals: [], explanatoryReferences: [], examples: [], associations: [], errors: [], sourceHashes: {},
};

function recordError(context, message) { report.errors.push({ context, message }); }
// Preserve literal contents and multi-character operators; whitespace outside tokens is presentation only.
function codeTokens(code){return code.match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[A-Za-z_][A-Za-z_0-9]*|\d+(?:\.\d+)?|>>=|<<=|->\*|\.\*|::|->|\+\+|--|&&|\|\||==|!=|<=|>=|\+=|-=|\*=|\/=|%=|<<|>>|[^\s]/g)?.filter(t=>!t.startsWith('//')&&!t.startsWith('/*'))||[];}
const canonical=code=>codeTokens(code).join('\0');
// Teaching tokens are visually separated in the UI. Preserve that lexical boundary:
// joining int + score as intscore would invent an identifier the student never sees.
const teachingLine=line=>line.tokens.map(t=>t.text).join(' ');
const sourceLines=lines=>lines.map(teachingLine).join('\n');
function checkAssociation(language,stage,slide,purpose,example){
 const parts=stage==='word'?[teachingLine(slide)]:stage==='sentence'?[sourceLines(slide.lines)]:slide.blocks.map(b=>sourceLines(b.lines));
 const shown=parts.map(canonical),purposeCode=canonical(sourceLines(purpose.code)),program='\0'+canonical(example.code)+'\0';
 const result={language,stage,id:example.id,purposeMatchesTeaching:shown.includes(purposeCode)||canonical(parts.join('\n'))===purposeCode,compiledProgramContainsTeachingBlocks:true,exception:null};
 for(const [index,part]of shown.entries())if(part&&!program.includes('\0'+part+'\0')){
  // Precisely bounded historical comparison diagrams are not standalone C/C++ statements.
  const diagrams={c:'1 + 1 → 2    "1" "1" → "11"',cpp:'1 + 1 → 2    std::string("1") + "1" → "11"'};
  const arithmetic=stage==='word'&&example.id===14&&canonical(parts[index])===canonical(diagrams[language])&&
    ['1 + 1',language==='c'?'"1" "1"':'std::string("1") + "1"'].every(fragment=>program.includes('\0'+canonical(fragment)+'\0'))&&normalize(example.expectedOutput)==='2 11\n';
  const boundedSize=language==='c'&&stage==='word'&&example.id===13&&canonical(parts[index])===canonical('snprintf(text, 8, "%d", 123)')&&
    ['char text[8] = "";','snprintf(text, sizeof text, "%d", 123)'].every(fragment=>program.includes('\0'+canonical(fragment)+'\0'))&&normalize(example.expectedOutput)==='123\n';
  if(arithmetic||boundedSize)result.exception=arithmetic?'Exact arithmetic/string comparison diagram, both displayed expressions compiled':'Exact legacy literal capacity 8 and sizeof text for char text[8]';
  else{result.compiledProgramContainsTeachingBlocks=false;recordError(`${language}/${stage}#${example.id}`,`Displayed block ${index} is absent from the compiled program`);}
 }
 if(!result.purposeMatchesTeaching)recordError(`${language}/${stage}#${example.id}`,'Purpose code differs from its same-ID teaching block(s)');
 report.associations.push(result);
}
async function loadDataset(relative, name) {
  const filename = join(root, relative);
  const source = readFileSync(filename, 'utf8');
  inputs.set(filename, hash(source));
  const javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  // These modules contain only static course data and type-only imports.
  if (/^\s*import\s/m.test(javascript)) throw new Error(`Unexpected runtime import in ${relative}`);
  const module = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`);
  if (!Array.isArray(module[name])) throw new Error(`Missing array export ${name}: ${relative}`);
  return module[name];
}

function checkLines(original, adapted, context) {
  if (!Array.isArray(adapted)) { recordError(context, 'Missing line array'); return; }
  if (original.length !== adapted.length) {
    report.layoutWarnings.push({ context, originalLines: original.length, adaptedLines: adapted.length });
  }
  for (const [index, line] of adapted.entries()) {
    if (!Array.isArray(line.tokens) || !line.tokens.length) recordError(`${context}[${index}]`, 'Missing tokens');
    if (line.indent !== undefined && (!Number.isInteger(line.indent) || line.indent < 0)) {
      recordError(`${context}[${index}]`, 'Invalid indentation');
    }
    for (const token of line.tokens || []) {
      if (typeof token.text !== 'string' || !['系统定义', '操作符号', '文本内容', '注释'].includes(token.type) || typeof token.colorClass !== 'string') {
        recordError(`${context}[${index}]`, 'Invalid teaching token');
      }
    }
  }
}

function checkStructure(original, adapted, language, name) {
  const context = `${language}/${name}`;
  const beforeErrors = report.errors.length;
  if (original.length !== datasetCounts[name]) recordError(context, `Unexpected baseline count ${original.length}`);
  if (adapted.length !== original.length) recordError(context, `Count ${adapted.length}, expected ${original.length}`);
  if (JSON.stringify(original.map(item => item.id)) !== JSON.stringify(adapted.map(item => item.id))) {
    recordError(context, 'IDs or ID order do not match original');
  }
  for (const [index, before] of original.entries()) {
    const after = adapted[index];
    if (!after) continue;
    const itemContext = `${context}#${before.id}`;
    for (const key of ['title', 'subtitle']) if (typeof after[key] !== 'string') recordError(itemContext, `Missing ${key}`);
    if (before.stepsText && (!Array.isArray(after.stepsText) || after.stepsText.length !== before.stepsText.length)) {
      recordError(itemContext, 'Step count does not match original');
    }
    if (before.blocks) {
      if (!Array.isArray(after.blocks) || before.blocks.length !== after.blocks.length) {
        recordError(itemContext, 'Essay block count does not match original');
      } else before.blocks.forEach((block, blockIndex) => checkLines(block.lines, after.blocks[blockIndex].lines, `${itemContext}.blocks[${blockIndex}]`));
    }
    if (before.lines) checkLines(before.lines, after.lines, `${itemContext}.lines`);
    if (Array.isArray(before.code)) checkLines(before.code, after.code, `${itemContext}.code`);
    if (before.tokens && (!Array.isArray(after.tokens) || !after.tokens.length)) recordError(itemContext, 'Missing word tokens');
    if (before.label && !after.label) recordError(itemContext, 'Missing original phrase label');
    if (before.options) {
      if (!Array.isArray(after.options) || after.options.length !== before.options.length) recordError(itemContext, 'Quiz choice count does not match original');
      if (!Number.isInteger(after.correctIndex) || after.correctIndex < 0 || after.correctIndex >= after.options?.length) recordError(itemContext, 'Invalid quiz answer index');
      if (before.explanations && (!Array.isArray(after.explanations) || after.explanations.length !== after.options?.length)) recordError(itemContext, 'Missing choice feedback');
    }
    if (before.codeVisual?.type && before.codeVisual.type !== after.codeVisual?.type) recordError(itemContext, 'Quiz visual kind changed');
    if (before.codeVisual?.lines) checkLines(before.codeVisual.lines, after.codeVisual?.lines, `${itemContext}.codeVisual.lines`);
  }
  report.structure.push({ language, dataset: name, count: adapted.length, expectedCount: original.length, passed: report.errors.length === beforeErrors });
}

const residuePatterns = [
  ['Python name', /\bPython(?:\s*\d[\d.]*)?\b/gi],
  ['Python keyword', /\b(?:def|elif|except|None|True|False)\b/g],
  ['Python call', /\b(?:print|input|len|range|enumerate|isinstance)\s*\(/g],
  ['Python exception', /\b(?:IndentationError|NameError|ValueError|ZeroDivisionError|IndexError)\b/g],
  ['Python formatted string', /\bf-string\b|(?:^|[^\w])f["'][^\n]*\{/g],
  ['Python block syntax', /^\s*(?:if|elif|else|for|while|try|except|def)\b[^\n]*:\s*$/gm],
];
function scanVisible(value, context) {
  if (typeof value === 'string') {
    for (const [rule, pattern] of residuePatterns) {
      for (const match of value.matchAll(pattern)) {
        const excerpt = value.slice(Math.max(0, match.index - 45), Math.min(value.length, match.index + match[0].length + 60));
        const finding = { context, rule, match: match[0], excerpt };
        // A statement such as “不能写成 elif” explains the replacement;
        // it is not an untranslated executable Python token.
        if (!context.endsWith('.text') && /不能|不可|不应|没有|不是|不使用|不用|改为|替换/.test(excerpt)) report.explanatoryReferences.push(finding);
        else report.languageResiduals.push(finding);
      }
    }
  } else if (Array.isArray(value)) value.forEach((entry, index) => scanVisible(entry, `${context}[${index}]`));
  else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) if (!['colorClass', 'scaleClass', 'purposeIcon'].includes(key)) scanVisible(entry, `${context}.${key}`);
  }
}

function getProperty(object, name) {
  return object.properties.find(node => ts.isPropertyAssignment(node) && node.name.getText() === name)?.initializer;
}
function unwrap(node) {
  while (node && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node))) node = node.expression;
  return node;
}
function componentInfo(component) {
  component = unwrap(component);
  if (!component || (!ts.isJsxSelfClosingElement(component) && !ts.isJsxElement(component))) throw new Error('Unsupported page component');
  const opening = ts.isJsxElement(component) ? component.openingElement : component;
  const attribute = opening.attributes.properties.find(node => ts.isJsxAttribute(node) && node.name.getText() === 'data');
  const data = attribute?.initializer && ts.isJsxExpression(attribute.initializer) ? unwrap(attribute.initializer.expression) : undefined;
  return {
    component: opening.tagName.getText(),
    dataset: data && ts.isElementAccessExpression(data) ? data.expression.getText() : null,
    dataIndex: data && ts.isElementAccessExpression(data) ? Number(data.argumentExpression.getText()) : null,
  };
}
function extractPages(relative, originals) {
  const filename = join(root, relative), source = readFileSync(filename, 'utf8');
  inputs.set(filename, hash(source));
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let array;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(file) === 'slides' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) array = node.initializer;
    ts.forEachChild(node, visit);
  }
  visit(file);
  if (!array) throw new Error(`No original slides array in ${relative}`);
  const pages = [];
  for (const entry of array.elements) {
    if (ts.isSpreadElement(entry)) {
      const call = entry.expression;
      if (!ts.isCallExpression(call) || !ts.isPropertyAccessExpression(call.expression) || call.expression.name.text !== 'map') throw new Error(`Unsupported page spread in ${relative}`);
      const dataset = call.expression.expression.getText(file), callback = call.arguments[0];
      if (!ts.isArrowFunction(callback)) throw new Error('Unsupported page mapping callback');
      const body = unwrap(callback.body);
      const info = componentInfo(getProperty(body, 'component'));
      if (!originals[dataset]) throw new Error(`Unknown mapped dataset ${dataset}`);
      originals[dataset].forEach((item, dataIndex) => pages.push({ component: info.component, dataset, dataIndex, id: item.id }));
    } else if (ts.isObjectLiteralExpression(entry)) {
      const info = componentInfo(getProperty(entry, 'component'));
      const id = info.dataset ? originals[info.dataset]?.[info.dataIndex]?.id : null;
      if (info.dataset && id === undefined) throw new Error(`Missing page data ${info.dataset}[${info.dataIndex}]`);
      pages.push({ ...info, id });
    } else throw new Error(`Unsupported slide entry in ${relative}`);
  }
  return pages.map((page, index) => ({ page: index + 1, ...page }));
}

async function main() {
  const originals = {}, adapted = { c: {}, cpp: {} };
  let originalPages;
  const originalAvailable = existsSync(join(root, 'original-source', 'App.tsx')) && Object.keys(datasetCounts).every(name => existsSync(join(root, 'original-source', 'data', `${name}.ts`)));
  if (originalAvailable && !process.argv.includes('--baseline-only')) {
    for (const name of Object.keys(datasetCounts)) originals[name] = await loadDataset(`original-source/data/${name}.ts`, name);
    originalPages = extractPages('original-source/App.tsx', originals);
    report.baseline = { kind: 'original-source', description: 'Direct comparison with the retained original project' };
  } else {
    const filename = join(root, 'scripts', 'original-baseline.json'), source = readFileSync(filename, 'utf8');
    inputs.set(filename, hash(source));
    const baseline = JSON.parse(source);
    if (baseline.schemaVersion !== 1 || !baseline.datasets || baseline.pages?.length !== 153) throw new Error('Invalid structural original baseline');
    Object.assign(originals, baseline.datasets);
    originalPages = baseline.pages;
    report.baseline = { kind: 'structural-snapshot', description: 'Comparison with the supplied structural-only snapshot; original lesson contents are not included', originalSourceHashes: baseline.sourceHashes };
  }
  for (const language of ['c', 'cpp']) {
    for (const name of Object.keys(datasetCounts)) {
      const data = await loadDataset(`src/adapted-data/${language}/${name}.ts`, name);
      adapted[language][name] = data;
      checkStructure(originals[name], data, language, name);
      scanVisible(data, `${language}/${name}`);
      const selectorPath = `src/original/data/${name}.ts`, selector = readFileSync(join(root, selectorPath), 'utf8');
      inputs.set(join(root, selectorPath), hash(selector));
      const correctImport = selector.includes(`../../adapted-data/${language}/${name}`);
      if (!correctImport) recordError(selectorPath, `Missing adapted ${language} data import`);
      report.dataSelectors.push({ language, dataset: name, passed: correctImport });
    }
  }
  const adaptedPages = extractPages('src/original/App.tsx', originals);
  const differences = originalPages.flatMap((page, index) => JSON.stringify(page) === JSON.stringify(adaptedPages[index]) ? [] : [{ page: index + 1, original: page, adapted: adaptedPages[index] }]);
  if (originalPages.length !== 153 || adaptedPages.length !== 153 || differences.length) recordError('153-page mapping', 'Page count, component sequence, or dataset/id bindings changed');
  report.pageMapping = { originalCount: originalPages.length, adaptedCount: adaptedPages.length, passed: !differences.length && originalPages.length === 153 && adaptedPages.length === 153, differences, pages: adaptedPages };

  const artifacts = mkdtempSync(join(tmpdir(), 'original-courses-'));
  report.artifacts = artifacts;
  for (const language of ['c', 'cpp']) {
    const compiler = join(root, 'vendor', 'compiler', 'bin', `x86_64-w64-mingw32-clang${language === 'cpp' ? '++' : ''}.exe`);
    for (const [name, expectedCount] of [['wordExamples', 21], ['sentenceExamples', 12], ['essayExamples', 13]]) {
      const examples = await loadDataset(`src/adapted-data/${language}/${name}.ts`, name);
      if (examples.length !== expectedCount || JSON.stringify(examples.map(entry => entry.id)) !== JSON.stringify(Array.from({ length: expectedCount }, (_, index) => index + 1))) recordError(`${language}/${name}`, 'Example IDs or count do not match original slots');
      let passed = 0;
      for (const example of examples) {
        const stage=name.replace('Examples',''),slide=adapted[language][stage+'Slides'].find(s=>s.id===example.id),purpose=adapted[language][stage+'PurposeSlides'].find(s=>s.id===example.id);
        if(!slide||!purpose)recordError(`${language}/${name}#${example.id}`,'Missing same-ID teaching/purpose case');else checkAssociation(language,stage,slide,purpose,example);
        const directory = join(artifacts, `${language}-${name}-${example.id}`);
        mkdirSync(directory);
        const source = join(directory, `main.${language === 'cpp' ? 'cpp' : 'c'}`), executable = join(directory, 'main.exe');
        const result = { language, dataset: name, id: example.id, passed: false, compiled: false, outputMatched: false };
        if (typeof example.code !== 'string' || typeof example.expectedOutput !== 'string' || !/\bmain\s*\(/.test(example.code)) {
          result.error = 'Missing complete program or expected output'; report.examples.push(result); continue;
        }
        writeFileSync(source, example.code, 'utf8');
        const compilation = spawnSync(compiler, [`-std=${language === 'cpp' ? 'c++17' : 'c17'}`, '-Wall', '-Wextra', '-Werror', '-pedantic-errors', '-static', source, '-o', executable], { cwd: directory, encoding: 'utf8', timeout: 30000, windowsHide: true });
        result.compiled = compilation.status === 0 && !compilation.error;
        if (!result.compiled) result.error = String(compilation.error || compilation.stderr || compilation.stdout || `compiler exit=${compilation.status}`);
        else {
          const execution = spawnSync(executable, [], { cwd: directory, input: example.stdin || '', encoding: 'utf8', timeout: 10000, windowsHide: true });
          result.outputMatched = normalize(execution.stdout) === normalize(example.expectedOutput);
          result.passed = execution.status === 0 && !execution.error && !execution.stderr && result.outputMatched;
          if (!result.passed) Object.assign(result, { expectedOutput: example.expectedOutput, actualOutput: execution.stdout, stderr: execution.stderr, exitCode: execution.status, error: execution.error ? String(execution.error) : undefined });
        }
        if (result.passed) ++passed;
        else console.error(`FAIL ${language}/${name}#${example.id}: ${(result.error || 'output/exit mismatch').slice(0, 200)}`);
        report.examples.push(result);
      }
      console.log(`${language}/${name}: ${passed}/${examples.length} compiled and output matched`);
    }
  }
  for (const [filename, digest] of inputs) {
    report.sourceHashes[filename.slice(root.length + 1).replaceAll('\\', '/')] = digest;
    if (hash(readFileSync(filename, 'utf8')) !== digest) recordError(filename.slice(root.length + 1), 'Input changed during verification; rerun against final files');
  }
  report.summary = {
    dataArrays: report.structure.length, structureFailures: report.structure.filter(entry => !entry.passed).length,
    pages: report.pageMapping.adaptedCount, routeMatched: report.pageMapping.passed,
    layoutWarnings: report.layoutWarnings.length, languageResiduals: report.languageResiduals.length,
    explanatoryReferences: report.explanatoryReferences.length,
    examples: report.examples.length, examplesPassed: report.examples.filter(entry => entry.passed).length,
    examplesFailed: report.examples.filter(entry => !entry.passed).length, errors: report.errors.length,
    associations:report.associations.length,associationFailures:report.associations.filter(a=>!a.purposeMatchesTeaching||!a.compiledProgramContainsTeachingBlocks).length,
  };
  report.ok = report.errors.length === 0 && report.languageResiduals.length === 0 && report.examples.length === 92 && report.examples.every(entry => entry.passed);
}

try { await main(); }
catch (error) { recordError('verification', String(error?.stack || error)); }
mkdirSync(resolve(reportPath,'..'), { recursive: true });
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ok: report.ok, ...report.summary, report: reportPath.slice(root.length+1).replaceAll('\\','/') }));
process.exitCode = report.ok ? 0 : 1;
