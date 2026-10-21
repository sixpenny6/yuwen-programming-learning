// 原版153页的一一对应语言适配；保留21组词/21演示/11测验与原步数。
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
    "id": 1,
    "title": "组词：动作格式",
    "subtitle": "(1/21)",
    "stepsText": [
      "这是代码世界里最基础的\"动词短语\"：printf(\"%s\", \"\")",
      "✂️ 1. 分词：区分指令动作与语法符号的边界",
      "🔍 2. 识别：printf 是输出动作，括号里放格式与内容",
      "🏷️ 3. 词性：紫色代表系统动作，红色代表语法格式",
      "🧠 4. 内化：函数名后跟括号；%s 表示把字符串作为内容输出"
    ],
    "tokens": [
      {
        "text": "printf",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"%s\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "动作词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 2,
    "title": "组词：执行动作",
    "subtitle": "(2/21)",
    "stepsText": [
      "现在，我们在动作词组里填入内容：你好",
      "✂️ 1. 分词：将函数名、括号与字符串内容独立开来",
      "🔍 2. 识别：辨认系统指令与自定义内容",
      "🏷️ 3. 词性：绿色代表\"实词\"，是我们想表达的内容",
      "🧠 4. 内化：printf 输出内容，\\n 表示换行"
    ],
    "tokens": [
      {
        "text": "printf",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"你好\\n\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "scaleClass": "scale-150"
  },
  {
    "id": 3,
    "title": "组词：简单计算",
    "subtitle": "(3/21)",
    "stepsText": [
      "这是一个简单的数学短语：年龄加一岁",
      "✂️ 1. 分词：将数学表达式拆分为数据与符号",
      "🔍 2. 识别：定位变量（名词）与运算符（连词）",
      "🏷️ 3. 词性：绿色为数据实体，红色为运算逻辑",
      "🧠 4. 内化：理解变量与常量的运算关系"
    ],
    "tokens": [
      {
        "text": "age ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "+ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "1",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "scaleClass": "scale-150"
  },
  {
    "id": 4,
    "title": "组词：变量组合",
    "subtitle": "(4/21)",
    "stepsText": [
      "这是一个纯变量组成的数学词组",
      "✂️ 1. 分词：独立出每一个参与运算的词汇",
      "🔍 2. 识别：两个都是\"代词\"（变量），中间是\"连词\"（加号）",
      "🏷️ 3. 词性：绿色代表可变数值，红色代表固定规则",
      "🧠 4. 解析：num1 + num2 本身就代表一个\"求和\"的结果"
    ],
    "tokens": [
      {
        "text": "num1 ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "+ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "num2",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "纯变量短语",
    "scaleClass": "scale-150"
  },
  {
    "id": 5,
    "title": "组词：逻辑判断",
    "subtitle": "(5/21)",
    "stepsText": [
      "这是一个判断词组：比较两者的大小关系",
      "✂️ 1. 分词：区分出参与比较的双方和比较符号",
      "🔍 2. 识别：注意 >= 是一个整体，表示大于或等于",
      "🏷️ 3. 词性：绿色为数值内容，红色为逻辑连接符",
      "🧠 4. 解析：词组结果表示\"真\"或\"假\"；C 比较产生整数1或0"
    ],
    "tokens": [
      {
        "text": "score ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ">= ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "60",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "比较短语",
    "scaleClass": "scale-150"
  },
  {
    "id": 6,
    "title": "组词：文字造词",
    "subtitle": "(6/21)",
    "stepsText": [
      "编程中的\"造词法\"：用重复动作形成排比",
      "✂️ 1. 分词：函数名、文字变量与重复次数",
      "🔍 2. 识别：repeat 是本课定义的函数，C 不能用文字 * 3",
      "🏷️ 3. 词性：绿色为内容，红色为操作指令",
      "🧠 4. 解析：函数重复输出三份问候语，形成\"你好你好你好\""
    ],
    "tokens": [
      {
        "text": "repeat",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "greeting",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "3",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "排比修辞",
    "resultText": "→ \"你好你好你好\"",
    "scaleClass": "scale-150"
  },
  {
    "id": 7,
    "title": "组词：等于判断",
    "subtitle": "(7/21)",
    "stepsText": [
      "这是一个精确匹配的判断词组",
      "✂️ 1. 分词：识别双等号 == 与单等号 = 的区别",
      "🔍 2. 识别：== 用于比较，= 用于赋值",
      "🏷️ 3. 词性：双等号是逻辑判断符号",
      "🧠 4. 解析：判断 score 是否完全等于 100"
    ],
    "tokens": [
      {
        "text": "score ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "== ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "100",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "精确匹配",
    "scaleClass": "scale-150"
  },
  {
    "id": 8,
    "title": "组词：名词修饰",
    "subtitle": "(8/21)",
    "stepsText": [
      "这是编程中的\"定语\"结构：用方括号限定范围",
      "✂️ 1. 分词：识别主体名词与修饰符号",
      "🔍 2. 识别：方括号 [0] 是\"索引\"，表示第一个",
      "🏷️ 3. 词性：绿色为主体，红色为定位符号",
      "🧠 4. 解析：取出 fruits 数组中的第一个水果；下标必须在数组范围内"
    ],
    "tokens": [
      {
        "text": "fruits",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "[",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "0",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "]",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "索引定语",
    "scaleClass": "scale-150"
  },
  {
    "id": 9,
    "title": "组词：地址访问",
    "subtitle": "(9/21)",
    "stepsText": [
      "这是一组“按地址找盒子”的词：先取位置，再读取位置里的值",
      "✂️ 1. 分词：&score取得score的地址，外层*沿这个地址访问score",
      "🔍 2. 识别：&取得地址，*解引用有效地址；这里不是乘法",
      "🏷️ 3. 词性：红色运算符组织访问，绿色score是我们定义的变量",
      "🧠 4. 内化：若score是85，*(&score)读到85；地址本身与85这个值不同"
    ],
    "tokens": [
      {
        "text": "*",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "&",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "score",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "取地址与解引用",
    "scaleClass": "scale-150"
  },
  {
    "id": 10,
    "title": "组词：属性访问",
    "subtitle": "(10/21)",
    "stepsText": [
      "编程中的\"的\"字用法：用点号连接属性",
      "✂️ 1. 分词：主体与属性之间用点号分隔",
      "🔍 2. 识别：点号表示\"的\"，访问结构体对象的成员",
      "🏷️ 3. 词性：绿色为实体，红色为连接符",
      "🧠 4. 解析：获取 student 结构体对象的 name 成员"
    ],
    "tokens": [
      {
        "text": "student",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ".",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "name",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "属性词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 11,
    "title": "组词：函数调用",
    "subtitle": "(11/21)",
    "stepsText": [
      "文字的“动作”：调用标准库函数，把字符数组的内容显示出来",
      "✂️ 1. 分词：puts是函数名，括号里的word是传入的文字",
      "🔍 2. 识别：puts读取word中的字符串，输出后自动换行",
      "🏷️ 3. 词性：紫色是标准库动作，绿色是变量，红色是调用格式",
      "🧠 4. 内化：word存着hello时，puts(word)显示hello并换行，不改变word"
    ],
    "tokens": [
      {
        "text": "puts",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "word",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "函数词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 12,
    "title": "组词：带参函数",
    "subtitle": "(12/21)",
    "stepsText": [
      "函数调用时传入参数：指定动作的对象与内容",
      "✂️ 1. 分词：数组、数量的地址与待添加的数字",
      "🔍 2. 识别：本课 append 先查容量；&count 让函数更新数量",
      "🏷️ 3. 词性：函数动作配合绿色参数与红色格式符号",
      "🧠 4. 解析：容量4、已有3项时，向末尾写入4；C 数组不会自动扩容"
    ],
    "tokens": [
      {
        "text": "append",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "nums",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "&",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "count",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "4",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "带参词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 13,
    "title": "组词：类型转换",
    "subtitle": "(13/21)",
    "stepsText": [
      "编程中的“词性转换”：先把整数变成小数，再做除法",
      "✂️ 1. 分词：识别括号里的double、数字5、除号与数字2",
      "🔍 2. 识别：5 / 2是整数除法，结果为2；先把5转成double，结果就是2.5",
      "🏷️ 3. 词性：紫色double表示小数类型，红色括号和除号组织运算",
      "🧠 4. 内化：(double)5转换当前表达式的值，让这次除法保留小数"
    ],
    "tokens": [
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "double",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "5",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": " /",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": " 2",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "类型转换",
    "resultText": "→ 2.5",
    "scaleClass": "scale-150"
  },
  {
    "id": 14,
    "title": "组词：形近字辨析",
    "subtitle": "(14/21)",
    "stepsText": [
      "编程中的\"形近字\"：引号决定内容类别，连接规则要分清",
      "✂️ 1. 分词：数字相加与相邻文字字面量分别识别",
      "🔍 2. 识别：1+1 是算术，\"1\" \"1\" 自动连接；C 字符串不能直接用 +",
      "🏷️ 3. 词性：引号决定了内容的\"词性\"",
      "🧠 4. 解析：没有引号是数字，有引号是字符串，两者使用不同连接规则"
    ],
    "tokens": [
      {
        "text": "1 ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "+ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "1 ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "→ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "2    ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "\"1\" ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "\"1\" ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "→ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"11\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "形近字辨析",
    "scaleClass": "scale-125"
  },
  {
    "id": 15,
    "title": "组词：格式化字符串",
    "subtitle": "(15/21)",
    "stepsText": [
      "C 的\"填空造句\"：printf 格式模板",
      "✂️ 1. 分词：函数、格式字符串与待填入的名字",
      "🔍 2. 识别：%s 与后面的字符串参数 name 对应",
      "🏷️ 3. 词性：绿色为文字和变量，红色为调用格式",
      "🧠 4. 解析：name=\"小明\" 时输出 \"你好，小明\"；格式必须与参数匹配"
    ],
    "tokens": [
      {
        "text": "printf",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"你好，%s\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "name",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "格式化字符串",
    "scaleClass": "scale-150"
  },
  {
    "id": 16,
    "title": "组词：数组初始化",
    "subtitle": "(16/21)",
    "stepsText": [
      "编程中的\"并列短语\"：用花括号罗列多个元素",
      "✂️ 1. 分词：花括号、元素、逗号分隔符",
      "🔍 2. 识别：逗号用于分隔并列的元素",
      "🏷️ 3. 词性：绿色为内容元素，红色为结构符号",
      "🧠 4. 解析：为已声明的同类数组初始化三个水果名"
    ],
    "tokens": [
      {
        "text": "{",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"苹果\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"香蕉\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"橘子\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "}",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "并列词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 17,
    "title": "组词：结构体初始化",
    "subtitle": "(17/21)",
    "stepsText": [
      "编程中的\"名词解释\"：给资料卡中的字段填值",
      "✂️ 1. 分词：花括号、字段名、等号与值",
      "🔍 2. 识别：.name 指定结构体成员，不是任意新增的字典键",
      "🏷️ 3. 词性：字段名和所填的值是绿色内容",
      "🧠 4. 解析：为已定义的 Student 结构体初始化姓名字段"
    ],
    "tokens": [
      {
        "text": "{",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": ".",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "name ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "= ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"小明\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "}",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "资料词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 18,
    "title": "组词：逻辑与",
    "subtitle": "(18/21)",
    "stepsText": [
      "编程中的\"并且\"：用 && 连接多个条件",
      "✂️ 1. 分词：两个判断条件与连接词",
      "🔍 2. 识别：&& 要求两边都真；左边假时不再计算右边",
      "🏷️ 3. 词性：红色 && 是逻辑连接符，绿色为内容",
      "🧠 4. 解析：年龄大于18 并且 小于60"
    ],
    "tokens": [
      {
        "text": "age ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "> ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "18 ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "&& ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "age ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "< ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "60",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "复合条件",
    "scaleClass": "scale-150"
  },
  {
    "id": 19,
    "title": "组词：逻辑或",
    "subtitle": "(19/21)",
    "stepsText": [
      "编程中的\"或者\"：用 || 连接可选条件",
      "✂️ 1. 分词：两个条件与 || 连接符",
      "🔍 2. 识别：|| 至少一边真就为真；左边真时跳过右边",
      "🏷️ 3. 词性：红色逻辑符号表示连接关系",
      "🧠 4. 解析：是 VIP 或者 积分超过1000"
    ],
    "tokens": [
      {
        "text": "is_vip ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "|| ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "points ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "> ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "1000",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "选择条件",
    "scaleClass": "scale-150"
  },
  {
    "id": 20,
    "title": "组词：逻辑非",
    "subtitle": "(20/21)",
    "stepsText": [
      "编程中的\"不是\"：用 ! 取反",
      "✂️ 1. 分词：否定词与被否定的条件",
      "🔍 2. 识别：! 将真变假、假变真；C 中0为假，非0为真",
      "🏷️ 3. 词性：红色 ! 修饰后面的条件",
      "🧠 4. 解析：如果 不是 已完成状态"
    ],
    "tokens": [
      {
        "text": "!",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "is_done",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "否定条件",
    "scaleClass": "scale-150"
  },
  {
    "id": 21,
    "title": "组词：三元表达式",
    "subtitle": "(21/21)",
    "stepsText": [
      "编程中的\"选择句\"：根据条件选择不同值",
      "✂️ 1. 分词：条件判断、问号后的真值、冒号后的假值",
      "🔍 2. 识别：? 和 : 将选择表达式分为三部分",
      "🏷️ 3. 词性：红色选择符号，绿色为可能的结果",
      "🧠 4. 解析：如果及格显示\"通过\"，否则显示\"重修\""
    ],
    "tokens": [
      {
        "text": "score ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ">= ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "60 ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "? ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"通过\" ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ": ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"重修\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "条件表达式",
    "scaleClass": "scale-125"
  }
];
