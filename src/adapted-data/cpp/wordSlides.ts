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
      "这是代码世界里最基础的\"动词短语\"：std::cout << \"\"",
      "✂️ 1. 分词：区分标准输出流、连接符与文字内容",
      "🔍 2. 识别：cout 是输出流，<< 把后面的内容送去输出",
      "🏷️ 3. 词性：紫色表示标准库名字，红色表示连接格式",
      "🧠 4. 内化：流输出使用 <<；它不是普通函数调用的括号格式"
    ],
    "tokens": [
      {
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "cout ",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "<< ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
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
      "✂️ 1. 分词：将标准输出流、<< 与文字内容独立开来",
      "🔍 2. 识别：std::cout 是输出流对象，后面连接要说的话",
      "🏷️ 3. 词性：绿色代表\"实词\"，是我们想表达的内容",
      "🧠 4. 内化：这是一个完整的输出词组；换行需另行输出"
    ],
    "tokens": [
      {
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "cout ",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "<< ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"你好\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
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
      "🧠 4. 解析：词组的结果是 bool 类型的 true 或 false"
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
      "编程中的“叠字”：std::string(3, '!') 生成三个相同的单字节字符。",
      "✂️ 1. 分词：区分字符串类型、重复次数3和字符 '!'。",
      "🔍 2. 识别：这是标准字符串已有的“个数、字符”构造格式，需要引入 <string>。",
      "🏷️ 3. 词性：紫色是标准库名字，红色搭起格式，绿色填入次数与字符。",
      "🧠 4. 内化：得到新的字符串“!!!”；这里重复一个 char，不能把“你好”当成单个字符。"
    ],
    "tokens": [
      {
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "string",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "3",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ",",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": " '!'",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "叠字词组",
    "resultText": "!!!",
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
      "🧠 4. 解析：取出 fruits 容器中的第一个水果；下标必须有效"
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
    "title": "组词：范围切片",
    "subtitle": "(9/21)",
    "stepsText": [
      "高级\"定语\"：用起点和长度限定字符串的一段",
      "✂️ 1. 分词：主体、substr、起始位置与长度",
      "🔍 2. 识别：substr(1, 2) 的2表示长度，不是结束下标",
      "🏷️ 3. 词性：两个数字分别指定起点与长度",
      "🧠 4. 解析：从下标1取两个 ASCII 字符，即下标1、2；ABCD 得到 BC"
    ],
    "tokens": [
      {
        "text": "data",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ".",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "substr",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "1",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "2",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "范围切片",
    "scaleClass": "scale-150"
  },
  {
    "id": 10,
    "title": "组词：属性访问",
    "subtitle": "(10/21)",
    "stepsText": [
      "编程中的\"的\"字用法：用点号连接属性",
      "✂️ 1. 分词：主体与属性之间用点号分隔",
      "🔍 2. 识别：点号表示\"的\"，访问对象的数据成员",
      "🏷️ 3. 词性：绿色为实体，红色为连接符",
      "🧠 4. 解析：获取 student 对象的 name 成员"
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
      "文字也有自己的“动作”：用 empty() 检查字符串是否为空。",
      "✂️ 1. 分词：text 是对象，点号表示“它的”，empty 是标准成员函数。",
      "🔍 2. 识别：empty() 不接收参数，返回 bool，不修改原来的文字。",
      "🏷️ 3. 词性：绿色是我们命名的 text，紫色是字符串已经提供的 empty。",
      "🧠 4. 内化：没有任何字符时返回 true；只要有内容就返回 false。"
    ],
    "tokens": [
      {
        "text": "text",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ".",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "empty",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "判断动作词组",
    "scaleClass": "scale-150",
    "resultText": "true / false"
  },
  {
    "id": 12,
    "title": "组词：带参方法",
    "subtitle": "(12/21)",
    "stepsText": [
      "方法调用时传入参数：指定动作的对象",
      "✂️ 1. 分词：主体、方法名、括号内的参数",
      "🔍 2. 识别：push_back 是添加动作，4是添加的内容",
      "🏷️ 3. 词性：方法名表示动作，绿色为参数",
      "🧠 4. 解析：向 nums 向量末尾添加4；vector 会管理扩容"
    ],
    "tokens": [
      {
        "text": "nums",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ".",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "push_back",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
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
    "label": "参数方法",
    "scaleClass": "scale-150"
  },
  {
    "id": 13,
    "title": "组词：类型转换",
    "subtitle": "(13/21)",
    "stepsText": [
      "编程中的\"词性转换\"：把数字变成文字",
      "✂️ 1. 分词：命名空间、转换函数与被转换内容",
      "🔍 2. 识别：std::to_string 把数字转成 string 字符串",
      "🏷️ 3. 词性：紫色标准库函数，绿色待转换内容",
      "🧠 4. 解析：将数字123转换为文本 \"123\""
    ],
    "tokens": [
      {
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "to_string",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "123",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ")",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "类型转换",
    "resultText": "→ \"123\"",
    "scaleClass": "scale-150"
  },
  {
    "id": 14,
    "title": "组词：形近字辨析",
    "subtitle": "(14/21)",
    "stepsText": [
      "编程中的\"形近字\"：同样是 + 号，操作数类别不同",
      "✂️ 1. 分词：数字相加与 string 字符串连接",
      "🔍 2. 识别：1+1 得2；std::string(\"1\") + \"1\" 得 \"11\"",
      "🏷️ 3. 词性：引号决定了内容的\"词性\"",
      "🧠 4. 解析：连接需要至少一边是 string；两个裸字符串字面量不能直接用 +"
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
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "string",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "(",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"1\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ") ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "+ ",
        "type": "操作符号",
        "colorClass": "text-red-500"
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
    "title": "组词：流式填空",
    "subtitle": "(15/21)",
    "stepsText": [
      "C++ 的\"填空造句\"：用输出流连接文字和姓名",
      "✂️ 1. 分词：输出流、固定问候语与变量",
      "🔍 2. 识别：<< 按顺序把各项内容交给 cout",
      "🏷️ 3. 词性：绿色是文字内容，红色是流连接符",
      "🧠 4. 解析：name=\"小明\" 时，输出 \"你好，小明\""
    ],
    "tokens": [
      {
        "text": "std",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "::",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "cout ",
        "type": "系统定义",
        "colorClass": "text-purple-600"
      },
      {
        "text": "<< ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"你好，\" ",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": "<< ",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "name",
        "type": "文本内容",
        "colorClass": "text-green-700"
      }
    ],
    "label": "填空词组",
    "scaleClass": "scale-150"
  },
  {
    "id": 16,
    "title": "组词：容器初始化",
    "subtitle": "(16/21)",
    "stepsText": [
      "编程中的\"并列短语\"：用花括号罗列多个元素",
      "✂️ 1. 分词：花括号、元素、逗号分隔符",
      "🔍 2. 识别：逗号用于分隔并列的元素",
      "🏷️ 3. 词性：绿色为内容元素，红色为结构符号",
      "🧠 4. 解析：为 vector<string> 初始化三个水果名，容器管理存储"
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
    "title": "组词：键值初始化",
    "subtitle": "(17/21)",
    "stepsText": [
      "编程中的\"名词解释\"：用 map 把键与值配成词条",
      "✂️ 1. 分词：外层容器花括号与内层键值对",
      "🔍 2. 识别：内层 {\"name\", \"小明\"} 是一组键和值，键唯一",
      "🏷️ 3. 词性：键和值都是绿色内容",
      "🧠 4. 解析：为 map<string,string> 初始化一条姓名记录"
    ],
    "tokens": [
      {
        "text": "{",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "{",
        "type": "操作符号",
        "colorClass": "text-red-500"
      },
      {
        "text": "\"name\"",
        "type": "文本内容",
        "colorClass": "text-green-700"
      },
      {
        "text": ", ",
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
      },
      {
        "text": "}",
        "type": "操作符号",
        "colorClass": "text-red-500"
      }
    ],
    "label": "键值词组",
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
      "🔍 2. 识别：! 将 true 变 false，将 false 变 true",
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
