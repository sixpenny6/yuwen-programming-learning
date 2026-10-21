/**
 * 组词阶段 - 配置数据
 */

export interface TokenData {
  text: string;
  type: string;
  colorClass: string;
}

export interface WordSlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  tokens: TokenData[];
  label?: string;
  resultText?: string;
  scaleClass?: string;
}

export const wordSlides: WordSlideData[] = [
  {
    id: 1,
    title: "组词：动作格式",
    subtitle: "(1/21)",
    stepsText: [
      "这是代码世界里最基础的\"动词短语\"：print( )",
      "✂️ 1. 分词：区分指令动作与语法符号的边界",
      "🔍 2. 识别：定位核心动词与必需的\"小尾巴\"",
      "🏷️ 3. 词性：紫色代表系统动作，红色代表语法格式",
      "🧠 4. 内化：动词后紧跟括号，这是标准调用格式"
    ],
    tokens: [
      { text: "print", type: "系统定义", colorClass: "text-purple-600" },
      { text: "(", type: "操作符号", colorClass: "text-red-500" },
      { text: ")", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "动作词组",
    scaleClass: "scale-150"
  },
  {
    id: 2,
    title: "组词：执行动作",
    subtitle: "(2/21)",
    stepsText: [
      "现在，我们在动作词组里填入内容：你好",
      "✂️ 1. 分词：将指令、括号与内容独立开来",
      "🔍 2. 识别：辨认系统指令与自定义内容",
      "🏷️ 3. 词性：绿色代表\"实词\"，是我们想表达的内容",
      "🧠 4. 内化：这是一个完整的主谓宾指令结构"
    ],
    tokens: [
      { text: "print", type: "系统定义", colorClass: "text-purple-600" },
      { text: "(", type: "操作符号", colorClass: "text-red-500" },
      { text: '"你好"', type: "文本内容", colorClass: "text-green-700" },
      { text: ")", type: "操作符号", colorClass: "text-red-500" }
    ],
    scaleClass: "scale-150"
  },
  {
    id: 3,
    title: "组词：简单计算",
    subtitle: "(3/21)",
    stepsText: [
      "这是一个简单的数学短语：年龄加一岁",
      "✂️ 1. 分词：将数学表达式拆分为数据与符号",
      "🔍 2. 识别：定位变量（名词）与运算符（连词）",
      "🏷️ 3. 词性：绿色为数据实体，红色为运算逻辑",
      "🧠 4. 内化：理解变量与常量的运算关系"
    ],
    tokens: [
      { text: "age", type: "文本内容", colorClass: "text-green-700" },
      { text: "+", type: "操作符号", colorClass: "text-red-500" },
      { text: "1", type: "文本内容", colorClass: "text-green-700" }
    ],
    scaleClass: "scale-150"
  },
  {
    id: 4,
    title: "组词：变量组合",
    subtitle: "(4/21)",
    stepsText: [
      "这是一个纯变量组成的数学词组",
      "✂️ 1. 分词：独立出每一个参与运算的词汇",
      "🔍 2. 识别：两个都是\"代词\"（变量），中间是\"连词\"（加号）",
      "🏷️ 3. 词性：绿色代表可变数值，红色代表固定规则",
      "🧠 4. 解析：num1 + num2 本身就代表一个\"求和\"的结果"
    ],
    tokens: [
      { text: "num1", type: "文本内容", colorClass: "text-green-700" },
      { text: "+", type: "操作符号", colorClass: "text-red-500" },
      { text: "num2", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "纯变量短语",
    scaleClass: "scale-150"
  },
  {
    id: 5,
    title: "组词：逻辑判断",
    subtitle: "(5/21)",
    stepsText: [
      "这是一个判断词组：比较两者的大小关系",
      "✂️ 1. 分词：区分出参与比较的双方和比较符号",
      "🔍 2. 识别：注意 >= 是一个整体，表示大于或等于",
      "🏷️ 3. 词性：绿色为数值内容，红色为逻辑连接符",
      "🧠 4. 解析：这个词组的结果是\"真\"或\"假\""
    ],
    tokens: [
      { text: "score", type: "文本内容", colorClass: "text-green-700" },
      { text: ">=", type: "操作符号", colorClass: "text-red-500" },
      { text: "60", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "比较短语",
    scaleClass: "scale-150"
  },
  {
    id: 6,
    title: "组词：文字造词",
    subtitle: "(6/21)",
    stepsText: [
      "编程特有的\"造词法\"：让文字像数字一样运算",
      "✂️ 1. 分词：左边是文字变量，右边是数字常量",
      "🔍 2. 识别：注意 * 号在这里不是乘法，而是\"重复\"",
      "🏷️ 3. 词性：绿色为内容，红色为操作指令",
      "🧠 4. 解析：'问候语' * 3 = '问候语问候语问候语'"
    ],
    tokens: [
      { text: "greeting", type: "文本内容", colorClass: "text-green-700" },
      { text: "*", type: "操作符号", colorClass: "text-red-500" },
      { text: "3", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "排比修辞",
    resultText: '→ "你好你好你好"',
    scaleClass: "scale-150"
  },
  {
    id: 7,
    title: "组词：等于判断",
    subtitle: "(7/21)",
    stepsText: [
      "这是一个精确匹配的判断词组",
      "✂️ 1. 分词：识别双等号 == 与单等号 = 的区别",
      "🔍 2. 识别：== 用于比较，= 用于赋值",
      "🏷️ 3. 词性：双等号是逻辑判断符号",
      "🧠 4. 解析：判断 score 是否完全等于 100"
    ],
    tokens: [
      { text: "score", type: "文本内容", colorClass: "text-green-700" },
      { text: "==", type: "操作符号", colorClass: "text-red-500" },
      { text: "100", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "精确匹配",
    scaleClass: "scale-150"
  },
  {
    id: 8,
    title: "组词：名词修饰",
    subtitle: "(8/21)",
    stepsText: [
      "这是编程中的\"定语\"结构：用方括号限定范围",
      "✂️ 1. 分词：识别主体名词与修饰符号",
      "🔍 2. 识别：方括号 [0] 是\"索引\"，表示第一个",
      "🏷️ 3. 词性：绿色为主体，红色为定位符号",
      "🧠 4. 解析：取出 fruits 列表中的第一个水果"
    ],
    tokens: [
      { text: "fruits", type: "文本内容", colorClass: "text-green-700" },
      { text: "[", type: "操作符号", colorClass: "text-red-500" },
      { text: "0", type: "文本内容", colorClass: "text-green-700" },
      { text: "]", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "索引定语",
    scaleClass: "scale-150"
  },
  {
    id: 9,
    title: "组词：范围切片",
    subtitle: "(9/21)",
    stepsText: [
      "高级\"定语\"：用冒号表示一个范围",
      "✂️ 1. 分词：识别起始位置、结束位置和分隔符",
      "🔍 2. 识别：冒号 : 表示\"从...到...\"",
      "🏷️ 3. 词性：两个数字界定了范围边界",
      "🧠 4. 解析：取第1到第3个元素（不含第3个）"
    ],
    tokens: [
      { text: "data", type: "文本内容", colorClass: "text-green-700" },
      { text: "[", type: "操作符号", colorClass: "text-red-500" },
      { text: "1", type: "文本内容", colorClass: "text-green-700" },
      { text: ":", type: "操作符号", colorClass: "text-red-500" },
      { text: "3", type: "文本内容", colorClass: "text-green-700" },
      { text: "]", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "范围切片",
    scaleClass: "scale-150"
  },
  {
    id: 10,
    title: "组词：属性访问",
    subtitle: "(10/21)",
    stepsText: [
      "编程中的\"的\"字用法：用点号连接属性",
      "✂️ 1. 分词：主体与属性之间用点号分隔",
      "🔍 2. 识别：点号表示\"的\"，访问对象的属性",
      "🏷️ 3. 词性：绿色为实体，红色为连接符",
      "🧠 4. 解析：获取 student 对象的 name 属性"
    ],
    tokens: [
      { text: "student", type: "文本内容", colorClass: "text-green-700" },
      { text: ".", type: "操作符号", colorClass: "text-red-500" },
      { text: "name", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "属性词组",
    scaleClass: "scale-150"
  },
  {
    id: 11,
    title: "组词：方法调用",
    subtitle: "(11/21)",
    stepsText: [
      "对象的\"动作\"：点号后跟动词和括号",
      "✂️ 1. 分词：主体、点号、动词、括号各自独立",
      "🔍 2. 识别：upper() 是让文字变大写的动作",
      "🏷️ 3. 词性：紫色表示这是一个内置方法",
      "🧠 4. 解析：让 text 变成全大写形式"
    ],
    tokens: [
      { text: "text", type: "文本内容", colorClass: "text-green-700" },
      { text: ".", type: "操作符号", colorClass: "text-red-500" },
      { text: "upper", type: "系统定义", colorClass: "text-purple-600" },
      { text: "(", type: "操作符号", colorClass: "text-red-500" },
      { text: ")", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "方法词组",
    scaleClass: "scale-150"
  },
  {
    id: 12,
    title: "组词：带参方法",
    subtitle: "(12/21)",
    stepsText: [
      "方法调用时传入参数：指定动作的对象",
      "✂️ 1. 分词：主体、方法名、括号内的参数",
      "🔍 2. 识别：append 是\"添加\"动作，4 是添加的内容",
      "🏷️ 3. 词性：紫色方法，绿色参数",
      "🧠 4. 解析：向 nums 列表末尾添加数字 4"
    ],
    tokens: [
      { text: "nums", type: "文本内容", colorClass: "text-green-700" },
      { text: ".", type: "操作符号", colorClass: "text-red-500" },
      { text: "append", type: "系统定义", colorClass: "text-purple-600" },
      { text: "(", type: "操作符号", colorClass: "text-red-500" },
      { text: "4", type: "文本内容", colorClass: "text-green-700" },
      { text: ")", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "参数方法",
    scaleClass: "scale-150"
  },
  {
    id: 13,
    title: "组词：类型转换",
    subtitle: "(13/21)",
    stepsText: [
      "编程中的\"词性转换\"：把数字变成文字",
      "✂️ 1. 分词：转换函数与被转换的内容",
      "🔍 2. 识别：str() 是将内容转为字符串的指令",
      "🏷️ 3. 词性：紫色系统函数，绿色待转换内容",
      "🧠 4. 解析：将数字 123 转换为文本 \"123\""
    ],
    tokens: [
      { text: "str", type: "系统定义", colorClass: "text-purple-600" },
      { text: "(", type: "操作符号", colorClass: "text-red-500" },
      { text: "123", type: "文本内容", colorClass: "text-green-700" },
      { text: ")", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "类型转换",
    resultText: '→ "123"',
    scaleClass: "scale-150"
  },
  {
    id: 14,
    title: "组词：形近字辨析",
    subtitle: "(14/21)",
    stepsText: [
      "编程中的\"形近字\"：同样是 + 号，效果却不同！",
      "✂️ 1. 分词：数字相加 vs 文字拼接",
      "🔍 2. 识别：1+1 是数学运算，\"1\"+\"1\" 是字符串拼接",
      "🏷️ 3. 词性：引号决定了内容的\"词性\"",
      "🧠 4. 解析：没有引号是数字，有引号是文字"
    ],
    tokens: [
      { text: "1", type: "文本内容", colorClass: "text-green-700" },
      { text: "+", type: "操作符号", colorClass: "text-red-500" },
      { text: "1", type: "文本内容", colorClass: "text-green-700" },
      { text: " → 2    ", type: "文本内容", colorClass: "text-slate-400" },
      { text: '"1"', type: "文本内容", colorClass: "text-green-700" },
      { text: "+", type: "操作符号", colorClass: "text-red-500" },
      { text: '"1"', type: "文本内容", colorClass: "text-green-700" },
      { text: ' → "11"', type: "文本内容", colorClass: "text-slate-400" }
    ],
    label: "形近字辨析",
    scaleClass: "scale-125"
  },
  {
    id: 15,
    title: "组词：f-string格式",
    subtitle: "(15/21)",
    stepsText: [
      "Python 的\"填空造句\"：f-string 模板",
      "✂️ 1. 分词：f 前缀、引号、花括号占位符",
      "🔍 2. 识别：{name} 会被变量的值替换",
      "🏷️ 3. 词性：整体是绿色内容，内嵌变量",
      "🧠 4. 解析：如果 name=\"小明\"，结果是 \"你好，小明\""
    ],
    tokens: [
      { text: 'f"你好，{name}"', type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "格式化字符串",
    scaleClass: "scale-150"
  },
  {
    id: 16,
    title: "组词：列表字面量",
    subtitle: "(16/21)",
    stepsText: [
      "编程中的\"并列短语\"：用方括号罗列多个元素",
      "✂️ 1. 分词：方括号、元素、逗号分隔符",
      "🔍 2. 识别：逗号用于分隔并列的元素",
      "🏷️ 3. 词性：绿色为内容元素，红色为结构符号",
      "🧠 4. 解析：创建一个包含三个水果名的列表"
    ],
    tokens: [
      { text: "[", type: "操作符号", colorClass: "text-red-500" },
      { text: '"苹果"', type: "文本内容", colorClass: "text-green-700" },
      { text: ",", type: "操作符号", colorClass: "text-red-500" },
      { text: '"香蕉"', type: "文本内容", colorClass: "text-green-700" },
      { text: ",", type: "操作符号", colorClass: "text-red-500" },
      { text: '"橘子"', type: "文本内容", colorClass: "text-green-700" },
      { text: "]", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "并列词组",
    scaleClass: "scale-150"
  },
  {
    id: 17,
    title: "组词：字典字面量",
    subtitle: "(17/21)",
    stepsText: [
      "编程中的\"名词解释\"：用花括号定义键值对",
      "✂️ 1. 分词：花括号、键、冒号、值",
      "🔍 2. 识别：冒号表示\"是\"的关系，逗号分隔多组",
      "🏷️ 3. 词性：键和值都是绿色内容",
      "🧠 4. 解析：创建一个描述人物的字典"
    ],
    tokens: [
      { text: "{", type: "操作符号", colorClass: "text-red-500" },
      { text: '"name"', type: "文本内容", colorClass: "text-green-700" },
      { text: ":", type: "操作符号", colorClass: "text-red-500" },
      { text: '"小明"', type: "文本内容", colorClass: "text-green-700" },
      { text: "}", type: "操作符号", colorClass: "text-red-500" }
    ],
    label: "字典词组",
    scaleClass: "scale-150"
  },
  {
    id: 18,
    title: "组词：逻辑与",
    subtitle: "(18/21)",
    stepsText: [
      "编程中的\"并且\"：用 and 连接多个条件",
      "✂️ 1. 分词：两个判断条件与连接词",
      "🔍 2. 识别：and 要求两边都为真才返回真",
      "🏷️ 3. 词性：紫色关键字，绿色条件表达式",
      "🧠 4. 解析：年龄大于18 并且 小于60"
    ],
    tokens: [
      { text: "age", type: "文本内容", colorClass: "text-green-700" },
      { text: ">", type: "操作符号", colorClass: "text-red-500" },
      { text: "18", type: "文本内容", colorClass: "text-green-700" },
      { text: " and ", type: "系统定义", colorClass: "text-purple-600" },
      { text: "age", type: "文本内容", colorClass: "text-green-700" },
      { text: "<", type: "操作符号", colorClass: "text-red-500" },
      { text: "60", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "复合条件",
    scaleClass: "scale-150"
  },
  {
    id: 19,
    title: "组词：逻辑或",
    subtitle: "(19/21)",
    stepsText: [
      "编程中的\"或者\"：用 or 连接可选条件",
      "✂️ 1. 分词：两个条件与 or 连接词",
      "🔍 2. 识别：or 只要有一边为真就返回真",
      "🏷️ 3. 词性：紫色关键字表示逻辑操作",
      "🧠 4. 解析：是 VIP 或者 积分超过1000"
    ],
    tokens: [
      { text: "is_vip", type: "文本内容", colorClass: "text-green-700" },
      { text: " or ", type: "系统定义", colorClass: "text-purple-600" },
      { text: "points", type: "文本内容", colorClass: "text-green-700" },
      { text: ">", type: "操作符号", colorClass: "text-red-500" },
      { text: "1000", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "选择条件",
    scaleClass: "scale-150"
  },
  {
    id: 20,
    title: "组词：逻辑非",
    subtitle: "(20/21)",
    stepsText: [
      "编程中的\"不是\"：用 not 取反",
      "✂️ 1. 分词：否定词与被否定的条件",
      "🔍 2. 识别：not 将真变假，假变真",
      "🏷️ 3. 词性：紫色关键字修饰后面的条件",
      "🧠 4. 解析：如果 不是 已完成状态"
    ],
    tokens: [
      { text: "not ", type: "系统定义", colorClass: "text-purple-600" },
      { text: "is_done", type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "否定条件",
    scaleClass: "scale-150"
  },
  {
    id: 21,
    title: "组词：三元表达式",
    subtitle: "(21/21)",
    stepsText: [
      "编程中的\"选择句\"：根据条件选择不同值",
      "✂️ 1. 分词：真值、条件判断、假值",
      "🔍 2. 识别：if 和 else 将表达式分为三部分",
      "🏷️ 3. 词性：紫色关键字，绿色为可能的结果",
      "🧠 4. 解析：如果及格显示\"通过\"，否则显示\"重修\""
    ],
    tokens: [
      { text: '"通过"', type: "文本内容", colorClass: "text-green-700" },
      { text: " if ", type: "系统定义", colorClass: "text-purple-600" },
      { text: "score", type: "文本内容", colorClass: "text-green-700" },
      { text: ">=", type: "操作符号", colorClass: "text-red-500" },
      { text: "60", type: "文本内容", colorClass: "text-green-700" },
      { text: " else ", type: "系统定义", colorClass: "text-purple-600" },
      { text: '"重修"', type: "文本内容", colorClass: "text-green-700" }
    ],
    label: "条件表达式",
    scaleClass: "scale-125"
  }
];
