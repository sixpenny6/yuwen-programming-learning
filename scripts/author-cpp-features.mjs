/** Author beginner C++ examples in the existing 153-page slots.
 * Run with --check to verify generated data is current without writing files.
 * This script reads only public static course data; it never opens app bundles.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import ts from 'typescript';

const root=path.resolve(import.meta.dirname,'..'),directory=path.join(root,'src','adapted-data','cpp');
const check=process.argv.includes('--check');
const hash=value=>createHash('sha256').update(value).digest('hex');
const raw=String.raw;
const system=new Set(('std string cout boolalpha vector size empty push_back ofstream ifstream getline class public int bool void return if for true false char double').split(' '));
const symbol=new Set(['::','->','<<','>>','&&','||','==','!=','<=','>=','+=','++','--','{','}','(',')','[',']',';',',','.','<','>','=','+','-','*','/','%','!','&',':','?']);
function tokens(code){
 const result=[];let cursor=0,pending='';
 const matcher=/\s+|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_][A-Za-z_0-9]*|\d+(?:\.\d+)?|::|->|<<|>>|&&|\|\||==|!=|<=|>=|\+=|\+\+|--|[^\s]/g;
 for(const match of code.matchAll(matcher)){
  assert.equal(match.index,cursor);cursor+=match[0].length;
  const text=match[0];if(/^\s+$/.test(text)){pending+=text;continue;}
  const type=text.startsWith('//')?'注释':system.has(text)?'系统定义':symbol.has(text)?'操作符号':'文本内容';
  result.push({text:pending+text,type,colorClass:type==='系统定义'?'text-purple-600':type==='操作符号'?'text-red-500':type==='注释'?'text-slate-400':'text-green-700'});pending='';
 }
 assert.equal(cursor,code.length);if(pending&&result.length)result.at(-1).text+=pending;
 assert(result.length,'A teaching line must contain at least one token');return result;
}
function lines(code){return code.trim().split('\n').filter(line=>line.trim()).map(line=>{const spaces=line.match(/^ */)[0].length;assert.equal(spaces%4,0);return {tokens:tokens(line.slice(spaces)),indent:spaces/4};});}
function program(headers,definition,body){
 return headers.map(header=>'#include <'+header+'>').join('\n')+'\n\n'+(definition?definition.trim()+'\n\n':'')+'int main() {\n'+body.trim().split('\n').map(line=>'    '+line).join('\n')+'\n    return 0;\n}\n';
}
const counts={wordSlides:21,wordPurposeSlides:21,wordQuizzes:11,wordExamples:21,sentenceSlides:12,sentencePurposeSlides:12,sentenceQuizzes:14,sentenceExamples:12,essaySlides:13,essayPurposeSlides:13,essayQuizzes:11,essayExamples:13};
const datasets=new Map();
function dataset(name){
 if(datasets.has(name))return datasets.get(name);
 const file=path.join(directory,name+'.ts'),source=fs.readFileSync(file,'utf8');
 const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
 const matches=[];function visit(node){if(ts.isVariableDeclaration(node)&&node.name.getText(sf)===name)matches.push(node);ts.forEachChild(node,visit);}visit(sf);
 assert.equal(matches.length,1,'Expected one array export '+name);const declaration=matches[0];assert(ts.isArrayLiteralExpression(declaration.initializer));
 const before=JSON.parse(declaration.initializer.getText(sf));assert.equal(before.length,counts[name]);
 const data=structuredClone(before),entry={name,file,source,sf,declaration,before,data};datasets.set(name,entry);return entry;
}
function item(name,id){const rows=dataset(name).data.filter(row=>row.id===id);assert.equal(rows.length,1);return rows[0];}
function word(id,lesson){
 const slide=item('wordSlides',id),purpose=item('wordPurposeSlides',id),example=item('wordExamples',id);
 assert.equal(slide.stepsText.length,lesson.steps.length);
 Object.assign(slide,{title:lesson.title,stepsText:lesson.steps,tokens:tokens(lesson.expression),label:lesson.label,resultText:lesson.result});
 for(const key of ['mockVars','ghostText'])delete purpose[key];
 Object.assign(purpose,{subtitle:lesson.expression,code:[{tokens:tokens(lesson.expression)}],purpose:lesson.purpose,expectedBehavior:lesson.expected,purposeIcon:lesson.icon,mockVars:lesson.variables||{}});
 Object.assign(example,{code:program(lesson.headers,'',lesson.body),expectedOutput:lesson.output});delete example.stdin;
}
function essay(id,lesson){
 const slide=item('essaySlides',id),purpose=item('essayPurposeSlides',id),example=item('essayExamples',id);
 assert.equal(slide.stepsText.length,lesson.steps.length);assert.equal(slide.blocks.length,lesson.blocks.length);
 const blocks=lesson.blocks.map(block=>({title:block.title,lines:lines(block.code)}));
 Object.assign(slide,{stepsText:lesson.steps,blocks});
 for(const key of ['mockVars','ghostText'])delete purpose[key];
 Object.assign(purpose,{subtitle:lesson.subtitle,code:blocks.flatMap(block=>block.lines),purpose:lesson.purpose,purposeIcon:lesson.icon,expectedBehavior:lesson.expected});
 Object.assign(example,{code:program(lesson.headers,lesson.inMain?'':lesson.blocks[0].code,lesson.inMain?lesson.blocks.map(block=>block.code).join('\n'):lesson.blocks[1].code),expectedOutput:lesson.output});delete example.stdin;
}

word(6,{
 title:'组词：文字造词',expression:raw`std::string(3, '!')`,label:'叠字词组',result:'!!!',headers:['iostream','string'],
 body:raw`std::cout << std::string(3, '!') << '\n';`,output:'!!!\n',icon:'🔁',
 steps:[
  '编程中的“叠字”：std::string(3, \'!\') 生成三个相同的单字节字符。',
  '✂️ 1. 分词：区分字符串类型、重复次数3和字符 \'!\'。',
  '🔍 2. 识别：这是标准字符串已有的“个数、字符”构造格式，需要引入 <string>。',
  '🏷️ 3. 词性：紫色是标准库名字，红色搭起格式，绿色填入次数与字符。',
  '🧠 4. 内化：得到新的字符串“!!!”；这里重复一个 char，不能把“你好”当成单个字符。',
 ],purpose:'使用标准字符串的构造格式，把一个字符重复指定次数',expected:'3 表示重复三次，\'!\' 是一个 char，生成并输出 !!!',
});
word(11,{
 title:'组词：函数调用',expression:'text.empty()',label:'判断动作词组',result:'true / false',headers:['iostream','string'],variables:{text:''},
 body:raw`std::string text;
std::cout << std::boolalpha << text.empty() << '\n';`,output:'true\n',icon:'🔎',
 steps:[
  '文字也有自己的“动作”：用 empty() 检查字符串是否为空。',
  '✂️ 1. 分词：text 是对象，点号表示“它的”，empty 是标准成员函数。',
  '🔍 2. 识别：empty() 不接收参数，返回 bool，不修改原来的文字。',
  '🏷️ 3. 词性：绿色是我们命名的 text，紫色是字符串已经提供的 empty。',
  '🧠 4. 内化：没有任何字符时返回 true；只要有内容就返回 false。',
 ],purpose:'调用 std::string 已有的成员函数，判断文字是否为空',expected:'这里 text 是空字符串，empty() 得到 true；它不会删除已有文字',
});
{
 const slide=item('sentenceSlides',7),purpose=item('sentencePurposeSlides',7),example=item('sentenceExamples',7);
 const definition=raw`void add_bonus(int& score) {
    score += 5;
}`;
 slide.stepsText=[
  '这是一个函数定义句：把“给原成绩加5分”写成可复用的动作。',
  '✂️ 1. 断句：void 表示不返回结果，add_bonus 是函数名，圆括号里写接收的成绩。',
  '🔍 2. 定位：int 后的 & 表示引用，函数里的 score 就是调用时传入的那个成绩。',
  '🏷️ 3. 词性：score += 5 表示把成绩加5，再存回原来的成绩变量。',
  '🧠 4. 内化：原成绩是75，调用 add_bonus(score) 后变成80；这里通过引用直接修改原值。',
 ];
 slide.lines=lines(definition).map((line,index)=>({...line,label:index===0?'函数定义':index===1?'增加原成绩':'函数结束'}));
 for(const key of ['mockVars','ghostText'])delete purpose[key];
 Object.assign(purpose,{code:lines(definition),subtitle:'引用参数加分',purpose:'通过 int& 引用参数，给调用时传入的原成绩加5分',expectedBehavior:'原成绩75，加5后变成80',mockVars:{score:75}});
 Object.assign(example,{code:program(['iostream'],definition,raw`int score = 75;
add_bonus(score);
std::cout << score << '\n';`),expectedOutput:'80\n'});
}
{
 const slide=item('sentenceSlides',12),purpose=item('sentencePurposeSlides',12),example=item('sentenceExamples',12);
 const code=raw`int age = 0;
if (std::cin >> age) {
    std::cout << "年龄: " << age << '\n';
} else {
    std::cout << "请输入整数\n";
}`;
 Object.assign(slide,{title:'造句：输入检查',stepsText:[
  '这是一个输入检查句：读到整数就使用它，没有读到就给出提示。',
  '✂️ 1. 断句：先准备 age，再用 if 和 else 分别处理成功与失败。',
  '🔍 2. 定位：std::cin >> age 尝试把一个整数读进 age，if 检查是否读取成功。',
  '🏷️ 3. 词性：cin 负责接收输入，if 决定走哪一条分支，age 保存读到的整数。',
  '🧠 4. 内化：输入18会显示年龄；输入 abc 没有读到整数，就显示“请输入整数”，不把失败当成成功。',
 ],lines:lines(code).map((line,index)=>({...line,label:['准备年龄','检查输入','读取成功','否则','读取失败','句子结束'][index]}))});
 for(const key of ['mockVars','ghostText'])delete purpose[key];
 Object.assign(purpose,{code:lines(code),subtitle:'检查能否读到整数',purpose:'输入读取成功后显示年龄，读取失败时提示需要整数',expectedBehavior:'输入18显示 年龄: 18；输入abc显示 请输入整数'});
 Object.assign(example,{code:program(['iostream'],'',code),stdin:'18\n',expectedOutput:'年龄: 18\n'});
}

essay(3,{
 subtitle:'把姓名拼进问候语',headers:['iostream','string'],icon:'👋',
 blocks:[{title:'接收姓名，返回问候语',code:raw`std::string greet(std::string name) {
    return "你好，" + name;
}`},{title:'调用问候函数',code:raw`std::cout << greet("小明") << '\n';`}],
 steps:[
  '第三个例子：把名字填进问候语。',
  '🧱 看整体：greet 接收一个名字，返回一句完整的问候。',
  '✂️ 看细节：std::string 表示文字，name 是传进来的名字。',
  '🔍 看逻辑：把“你好，”和 name 连接起来，再用 return 交给调用的地方。',
  '🏷️ 词性：函数名是动作名，参数是需要填入的内容，返回类型说明结果也是文字。',
  '🧠 理解：换一个姓名就能得到另一句问候，同一个函数可以反复使用。',
 ],purpose:'把传入的姓名与问候文字连接，返回一个字符串',expected:'传入“小明”，得到并输出 你好，小明',output:'你好，小明\n',
});
essay(4,{
 subtitle:'循环计算平均分',headers:['iostream','vector'],icon:'📊',inMain:true,
 blocks:[{title:'把成绩逐个加起来',code:raw`std::vector<int> scores{80, 90, 85};
double total = 0;
for (int score : scores) {
    total += score;
}`},{title:'总分除以成绩数量',code:raw`if (!scores.empty()) {
    std::cout << total / scores.size() << '\n';
}`}],
 steps:[
  '第四个例子：先求总分，再计算平均分。',
  '🧱 看整体：像把几句话的字数先合起来，求平均要先得到总数。',
  '✂️ 看细节：范围 for 逐个取出成绩，把它加进 total。',
  '🔍 看逻辑：size() 得到成绩数量，总分除以数量就是平均分。',
  '🏷️ 词性：total 用 double 保存，平均分不是整数时也能保留小数。',
  '🧠 理解：先确认清单不为空再做除法，避免除以0；80、90、85的平均分是85。',
 ],purpose:'用普通循环求总分，确认有成绩后除以数量',expected:'总分255，成绩数量3，输出平均分85',output:'85\n',
});
essay(7,{
 subtitle:'连接两段文字',headers:['iostream','string'],icon:'💬',inMain:true,
 blocks:[{title:'准备一句话的开头',code:raw`std::string message = "你好，";`},{title:'把姓名接在后面',code:raw`message += "小明";
std::cout << message << '\n';`}],
 steps:[
  '第七个例子：把两段文字连接成一句话。',
  '🧱 看整体：先写“你好，”，再把姓名接在后面，就像把词语连成一句话。',
  '✂️ 看细节：message 是 std::string，可以保存并连接文字。',
  '🔍 看逻辑：message += “小明”表示把“小明”接到原有内容的后面。',
  '🏷️ 词性：message 是我们起的名字，+= 是把新增内容接回原字符串的符号。',
  '🧠 理解：执行后 message 变成“你好，小明”；这里使用的是 std::string。',
 ],purpose:'使用 std::string 的 += 把新文字连接到原文字后面',expected:'“你好，”接上“小明”，输出 你好，小明',output:'你好，小明\n',
});
essay(12,{
 subtitle:'逐个字符做计数',headers:['iostream','string'],icon:'🔢',
 blocks:[{title:'遇到目标字符就加一',code:raw`int count_char(std::string text, char target) {
    int count = 0;
    for (char letter : text) {
        if (letter == target) { count += 1; }
    }
    return count;
}`},{title:'统计英文文本里的字母',code:raw`std::cout << count_char("hello", 'l') << '\n';`}],
 steps:[
  '第十二个例子：数一数英文文本里某个字母出现几次。',
  '🧱 看整体：像在一句话中圈出指定的字，每圈出一次就记一笔。',
  '✂️ 看细节：text 接收文字，target 接收要找的一个 char。',
  '🔍 看逻辑：for 逐个取出 letter，只有它等于目标字符时才增加 count。',
  '🏷️ 词性：count 保存次数，return 把最终次数交给调用的地方。',
  '🧠 理解：“hello”里有两个 l，所以返回2；本例按 char 处理英文，不用它来计算汉字个数。',
 ],purpose:'逐个检查英文字符，累计目标字符出现的次数',expected:'hello 中的字母 l 出现2次，输出2',output:'2\n',
});

essay(2,{
 subtitle:'水果清单',headers:['iostream','vector','string'],icon:'🍎',inMain:true,
 blocks:[{title:'建立清单并加入水果',code:raw`std::vector<std::string> fruits;
fruits.push_back("苹果");
fruits.push_back("香蕉");`},{title:'按编号取水果，查看数量',code:raw`std::cout << fruits[0] << ' ' << fruits[1] << '\n';
std::cout << fruits.size() << '\n';`}],
 steps:[
  '第二个例子：用 vector 建立水果清单。',
  '🧱 看整体：把水果名排成一张清单，就像把几个词依次写进词语本。',
  '✂️ 看细节：vector<std::string> 表示存放文字的清单，fruits 是我们给清单起的名字。',
  '🔍 看逻辑：每调用一次 push_back，就在清单末尾加入一个水果。',
  '🏷️ 词性：方括号按编号取内容，编号0是第一个，编号1是第二个；size() 查看数量。',
  '🧠 理解：先加入苹果和香蕉，再访问编号0和1，所以不会取到尚不存在的位置。',
 ],purpose:'建立可添加内容的水果清单，再按编号读取并查看数量',expected:'先输出 苹果 香蕉，再输出清单中的水果数量2',output:'苹果 香蕉\n2\n',
});
essay(5,{
 subtitle:'逐个比较找最高分',headers:['iostream','vector'],icon:'🏆',inMain:true,
 blocks:[{title:'准备三个成绩和当前最高分',code:raw`std::vector<int> scores{85, 92, 78};
int highest = scores[0];`},{title:'逐个比较，留下较大的成绩',code:raw`for (int score : scores) {
    if (score > highest) {
        highest = score;
    }
}
std::cout << highest << '\n';`}],
 steps:[
  '第五个例子：逐个比较，找出最高分。',
  '🧱 看整体：像逐个选出更好的词，每看到一个更高成绩，就更新当前最高分。',
  '✂️ 看细节：本例清单固定有三个成绩，可以先用第一个成绩作为最高分。',
  '🔍 看逻辑：范围 for 逐个取出 score；只有它更大时，才把它存入 highest。',
  '🏷️ 词性：for 负责重复，if 负责判断，highest 保存当前发现的最大值。',
  '🧠 理解：85先成为最高分，92替换85，78不能替换92；若换成空清单，不能直接取编号0。',
 ],purpose:'用普通循环逐个比较已知非空的成绩清单，保留最高分',expected:'三个成绩85、92、78中，最高分是92',output:'92\n',
});
essay(6,{
 subtitle:'把偶数放进新清单',headers:['iostream','vector'],icon:'🧺',inMain:true,
 blocks:[{title:'只把偶数加入结果清单',code:raw`std::vector<int> numbers{1, 2, 3, 4};
std::vector<int> evens;
for (int value : numbers) {
    if (value % 2 == 0) {
        evens.push_back(value);
    }
}`},{title:'显示筛选后的内容',code:raw`for (int value : evens) {
    std::cout << value << ' ';
}
std::cout << '\n';`}],
 steps:[
  '第六个例子：用 vector 收集所有偶数。',
  '🧱 看整体：像从一段文字中摘出符合要求的词，先准备空的结果清单。',
  '✂️ 看细节：范围 for 逐项读取，取余结果为0时才执行 push_back。',
  '🔍 看逻辑：push_back 把当前偶数加入 evens，原清单中的1和3被跳过。',
  '🏷️ 词性：numbers 是原清单，evens 是只收集偶数的新清单。',
  '🧠 理解：筛选后再用一个普通循环显示结果；本例只学习如何把符合条件的内容留下来。',
 ],purpose:'遍历原清单，把偶数放进新 vector，再逐个显示',expected:'1和3被跳过，2和4进入 evens，输出 2 4',output:'2 4 \n',
});
essay(9,{
 subtitle:'购物车里的数据和动作',headers:['iostream'],icon:'🛒',
 blocks:[{title:'定义购物车拥有的数据和动作',code:raw`class ShoppingCart {
public:
    int total = 0;
    void add(int price) { total += price; }
};`},{title:'创建对象，通过公开方法使用',code:raw`ShoppingCart cart;
cart.add(5);
cart.add(3);
std::cout << "总价: " << cart.total << '\n';`}],
 steps:[
  '第九个例子：把购物车写成真正的类与对象。',
  '🧱 看整体：class 像购物车的设计图，cart 是照着设计图建立的一个购物车。',
  '✂️ 看细节：public 后面写它的数据 total，以及它能做的动作 add。',
  '🔍 看逻辑：total 开始为0，add 每接收一个价格，就把它加到这个对象的总价里。',
  '🏷️ 词性：cart.add(5) 是“让这辆车加入5元”，cart.total 是“这辆车的总价”。',
  '🧠 理解：类可以把相关的数据和动作放在一起；本例只学习对象怎样记住自己的总价。',
 ],purpose:'把总价数据和加价动作写进一个简单类，再建立并使用购物车对象',expected:'购物车从0元开始，加入5元和3元，输出 总价: 8',output:'总价: 8\n',
});
essay(10,{
 subtitle:'给每个成绩加5分',headers:['iostream','vector'],icon:'➕',inMain:true,
 blocks:[{title:'通过引用逐个修改原成绩',code:raw`std::vector<int> scores{70, 80, 90};
for (int& score : scores) {
    score += 5;
}`},{title:'显示已经修改的成绩',code:raw`for (int score : scores) {
    std::cout << score << ' ';
}
std::cout << '\n';`}],
 steps:[
  '第十个例子：给清单里的每个成绩都加5分。',
  '🧱 看整体：像给每句话都添上同一个词，循环对每一项做相同的修改。',
  '✂️ 看细节：第一个循环使用 int&，score 就代表清单里当前那一项原成绩。',
  '🔍 看逻辑：score += 5 直接写回清单，70、80、90分别变成75、85、95。',
  '🏷️ 词性：& 让修改落到原成绩上；第二个循环只用 int 取出数值显示。',
  '🧠 理解：想修改原清单用引用，单纯读取时用普通变量；本例沿用造句阶段已经学过的引用。',
 ],purpose:'在范围循环中用 int& 给原清单逐项加分，再用普通循环显示',expected:'70、80、90全部加5分，输出 75 85 95',output:'75 85 95 \n',
});
essay(11,{
 subtitle:'创建时填入学生姓名',headers:['iostream','string'],icon:'👤',
 blocks:[{title:'构造函数接收初始姓名',code:raw`class Student {
public:
    std::string name;
    Student(std::string text) { name = text; }
};`},{title:'创建学生并显示姓名',code:raw`Student student("小明");
std::cout << student.name << '\n';`}],
 steps:[
  '第十一个例子：创建学生时，就填入学生的姓名。',
  '🧱 看整体：像填写一张新资料卡，建立 Student 对象时同时交给它一个名字。',
  '✂️ 看细节：Student(std::string text) 是构造函数，它和类同名，没有返回类型。',
  '🔍 看逻辑：创建对象时传入“小明”，构造函数把 text 放进这个对象的 name。',
  '🏷️ 词性：Student 是类型名，student 是对象名，name 是对象保存的姓名。',
  '🧠 理解：构造函数负责创建对象时的准备工作；这里只学习如何给新对象填入初始内容。',
 ],purpose:'用简单构造函数，在创建学生对象时设置姓名',expected:'创建对象时传入“小明”，随后输出这个对象保存的姓名 小明',output:'小明\n',
});
essay(13,{
 subtitle:'文件流与自动关闭',headers:['iostream','fstream','string'],icon:'📝',inMain:true,
 blocks:[{title:'写入记事本，离开作用域自动关闭',code:raw`{
    std::ofstream out("note.txt");
    if (!out) { return 1; }
    out << "今天学 C++\n";
    if (!out) { return 1; }
}`},{title:'重新打开文件，读取整行',code:raw`std::ifstream in("note.txt");
if (!in) { return 1; }
std::string note;
if (!std::getline(in, note)) { return 1; }
std::cout << note << '\n';`}],
 steps:[
  '第十三个例子：用标准文件流写一页记事本，再把它读出来。',
  '🧱 看整体：ofstream 负责写，ifstream 负责读；两个流对象各做一件事。',
  '✂️ 看细节：第一对花括号围住写文件这件事，像一小段文字的起止边界。',
  '🔍 看逻辑：离开第一块后，输出流自动完成关闭，再打开输入流读取刚写好的文件。',
  '🏷️ 词性：getline 读取整行，note 接收文字；流的 ! 判断用于检查打开或读写是否失败。',
  '🧠 理解：写完并离开这对花括号，文件会自动关闭；再打开它读取内容，不需要手动调用关闭函数。',
 ],purpose:'在当前运行目录自写自读 note.txt，使用作用域让文件流自动关闭',expected:'先写入“今天学 C++”，关闭输出流后重新读取并显示同一句话；失败时返回1',output:'今天学 C++\n',
});

// Keep visual kind, number of choices and correct answer index in each slot.
{
 const quiz=item('wordQuizzes',8);assert.equal(quiz.correctIndex,1);
 Object.assign(quiz,{tag:'字符串成员函数',question:'text.empty() 的作用是什么？',codeVisual:{type:'code',content:'text.empty()',tokens:tokens('text.empty()')},
  options:['把字符串改成大写','判断字符串是否没有任何字符','删除字符串中的全部字符'],
  explanations:['不对哦～empty() 不做大小写转换，而是判断有无字符。','正确！empty() 只检查 std::string 是否为空，返回 bool；它不会修改文字。','不对哦～empty() 只检查有无字符，不会删除文字。']});
 const typeQuiz=item('wordQuizzes',10);assert.equal(typeQuiz.correctIndex,1);
 Object.assign(typeQuiz,{description:'先看变量声明中的类型名字。',tag:'基础类型',question:'在 int age = 18; 中，age 保存的是什么类型的数据？',
  codeVisual:{type:'code',content:'int age = 18;',tokens:tokens('int age = 18;')},
  options:['文字类型 std::string','整数类型 int','真假类型 bool'],
  explanations:['不对哦～这里声明使用 int；std::string 用来保存文字。','正确！int 是整数类型，age 在这里保存整数18。','不对哦～bool 保存 true 或 false，这里使用的是整数类型 int。']});
 const inputQuiz=item('sentenceQuizzes',4);assert.equal(inputQuiz.correctIndex,2);
 Object.assign(inputQuiz,{description:'尝试读取年龄时输入 abc，检查程序怎样处理读取失败。',tag:'输入检查',question:'输入 abc 时，这段代码会做什么？',
  codeVisual:{type:'code',lines:lines(raw`int age = 0;
if (std::cin >> age) {
    std::cout << "年龄: " << age << '\n';
} else {
    std::cout << "请输入整数\n";
}`)},options:['输出 年龄: 0','把 abc 作为整数存进 age','进入 else，提示 请输入整数'],
  explanations:['不对哦～没有成功读到整数，程序不会执行显示年龄的分支。','不对哦～abc 不能按这个整数输入操作读进 age，读取会失败。','正确！if 检查输入是否成功；abc 不能读成整数，所以进入 else 给出提示。']});
 const sentenceQuiz=item('sentenceQuizzes',8);assert.equal(sentenceQuiz.correctIndex,1);
 sentenceQuiz.description='原成绩是75，调用引用参数函数给它加5分。';
 sentenceQuiz.question='int score = 75; 调用 add_bonus(score) 后，原来的 score 是多少？';
 sentenceQuiz.codeVisual.lines=lines(raw`void add_bonus(int& score) {
    score += 5;
}`);
 sentenceQuiz.options=['75','80','5'];
 sentenceQuiz.explanations=['不对哦～int& 表示引用，函数会修改传入的原成绩。','正确！函数通过引用给原成绩加5分，75加5得到80。','不对哦～5是增加的分数，还需要加上原来的75分。'];
 const objectQuiz=item('essayQuizzes',3);assert.equal(objectQuiz.correctIndex,0);
 objectQuiz.description='结合购物车示例：ShoppingCart 像购物车的设计图，cart 是照着图建立的购物车。';
 objectQuiz.question='ShoppingCart 类与 cart 对象的关系是什么？';
 objectQuiz.options=['ShoppingCart 是设计类型，cart 是根据该类型建立的对象','类和对象是完全相同的概念','cart 是设计类型，ShoppingCart 是它的一个对象'];
 objectQuiz.explanations=['正确！ShoppingCart 规定购物车有总价数据和加价动作，cart 是按这个定义建立的一辆购物车。','不对哦～类像设计图，对象是照着图建立的具体东西。','不对哦～关系说反了；ShoppingCart 是类，cart 才是对象。'];
 const parameterQuiz=item('essayQuizzes',4);
 parameterQuiz.codeVisual.content='std::string greet(std::string name) { /* 使用名字 */ }';
 const headerQuiz=item('essayQuizzes',5);assert.equal(headerQuiz.correctIndex,2);
 Object.assign(headerQuiz,{description:'水果清单示例使用 std::vector，完整程序在开头包含相应头文件。',tag:'头文件',question:'#include <vector> 的作用是什么？',
  codeVisual:{type:'code',content:'#include <vector>'},
  options:['创建一个叫 vector 的水果变量','删除清单里的所有水果','包含 vector 的声明，方便使用这个清单类型'],
  explanations:['不对哦～#include 是引入头文件，不是创建变量。','不对哦～引入头文件不会删除任何清单内容。','正确！包含 <vector> 后，程序就能使用 std::vector 这个标准清单类型。']});
 const inheritance=item('essayQuizzes',7);assert.equal(inheritance.correctIndex,1);
 Object.assign(inheritance,{description:'Student 的构造函数接收 text，并把它存进新对象的 name。',tag:'构造函数',
  question:'执行 Student student("小明") 创建对象时，构造函数会做什么？',
  options:['必须手动再调用一次 Student，才会保存姓名','自动把传入的“小明”存进新对象的 name','把程序中所有学生的姓名都改为“小明”'],
  explanations:['不对哦～创建对象时就会调用对应的构造函数，不需要再手动调用一次。','正确！构造函数在创建对象时完成准备，把收到的姓名放进这个对象。','不对哦～这里只是在建立 student，并给这个对象填入姓名，不会修改其他学生。']});
 const fileQuiz=item('essayQuizzes',9);assert.equal(fileQuiz.correctIndex,1);
 fileQuiz.description='记事本示例先写入，离开花括号自动关闭，再重新打开文件读取。';
 fileQuiz.codeVisual.content='std::ifstream in("note.txt");';
 fileQuiz.explanations=['不对哦～ifstream 是输入文件流，用来读取，不会删除文件。','正确！ifstream 默认以读取方式打开 note.txt；对象离开作用域时自动关闭文件。','不对哦～写文件使用 ofstream；这里的 ifstream 用于读取。'];
 const algorithm=item('essayQuizzes',10);assert.equal(algorithm.correctIndex,1);
 Object.assign(algorithm,{description:'scores 中的三个成绩为70、80、90，循环使用 int& 修改每一项。',tag:'引用修改原值',
  question:'这个循环结束后，scores 中的三个成绩是什么？',
  codeVisual:{type:'code',content:'std::vector<int> scores{70, 80, 90};\nfor (int& score : scores) { score += 5; }'},
  options:['70、80、90','75、85、95','5、5、5'],
  explanations:['不对哦～循环使用引用，修改会存回原清单。','正确！每个原成绩都增加5分，得到75、85、95。','不对哦～+= 5 是在原成绩上加5，不是把成绩直接设成5。']});
 const encapsulation=item('essayQuizzes',11);assert.equal(encapsulation.correctIndex,1);
 Object.assign(encapsulation,{description:'ShoppingCart 的 total 初始为0，add 会把传入的价格加进 total。',tag:'对象的数据和动作',
  question:'执行这些语句后，会输出多少总价？',
  codeVisual:{type:'code',content:'ShoppingCart cart;\ncart.add(5);\nstd::cout << cart.total;'},
  options:['0','5','price'],
  explanations:['不对哦～虽然总价开始是0，但 add(5) 已经给它增加了5。','正确！add(5) 修改这辆购物车的总价，0加5得到5。','不对哦～price 是方法接收价格时使用的参数名，输出的是对象保存的数值。']});
}

const changes=[];
for(const entry of datasets.values()){
 const {name,source,sf,declaration,before,data,file}=entry;
 assert.equal(data.length,before.length);assert.deepEqual(data.map(row=>row.id),before.map(row=>row.id));
 for(let index=0;index<data.length;++index){const a=before[index],b=data[index];
  if(a.stepsText)assert.equal(b.stepsText.length,a.stepsText.length,name+' step count');
  if(a.blocks)assert.equal(b.blocks.length,a.blocks.length,name+' block count');
  if(a.options){assert.equal(b.options.length,a.options.length);assert.equal(b.correctIndex,a.correctIndex);assert.equal(b.explanations?.length,b.options.length);}
  if(a.codeVisual?.type)assert.equal(b.codeVisual.type,a.codeVisual.type,name+' visual kind');
 }
 const eol=source.includes('\r\n')?'\r\n':'\n';
 const replacement=JSON.stringify(data,null,2).replaceAll('\n',eol);
 const output=source.slice(0,declaration.initializer.getStart(sf))+replacement+source.slice(declaration.initializer.end);
 if(output!==source){changes.push({file:path.relative(root,file).replaceAll('\\','/'),ids:data.filter((row,index)=>JSON.stringify(row)!==JSON.stringify(before[index])).map(row=>row.id),sha256:hash(output)});if(!check)fs.writeFileSync(file,output);}
}
if(check&&changes.length){console.error(JSON.stringify({ok:false,reason:'Generated C++ feature data is stale',changes}));process.exitCode=1;}
else console.log(JSON.stringify({ok:true,check,revision:'beginner',supersedes:'advanced example attempt',slots:{word:[6,11],sentence:[7,12],essay:[2,3,4,5,6,7,9,10,11,12,13]},changes}));
