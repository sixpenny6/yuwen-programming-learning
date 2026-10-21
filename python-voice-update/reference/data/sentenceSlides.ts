/**
 * 造句阶段 - 配置数据
 */

export interface SentenceLineData {
  tokens: Array<{
    text: string;
    type: string;
    colorClass: string;
  }>;
  indent?: number; // 缩进层级，0=无缩进，1=一级缩进，2=二级缩进
  label?: string;
}

export interface SentenceSlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  lines: SentenceLineData[];
  scaleClass?: string;
}

export const sentenceSlides: SentenceSlideData[] = [
  {
    id: 1,
    title: "造句：逻辑判断",
    subtitle: "(1/12)",
    stepsText: [
      "这是一个完整的条件句：若满足条件，则执行动作。",
      "✂️ 1. 断句：识别条件判断语句的结构边界。",
      "🔍 2. 定位：找出关键词 'if' 与条件表达式。",
      "🏷️ 3. 词性：紫色触发系统逻辑，红色构建语法骨架。",
      "🧠 4. 内化：理解\"因果关系\"在代码中的表达。"
    ],
    lines: [
      {
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ],
        label: "条件词"
      },
      {
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"合格"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1,
        label: "动作词"
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 2,
    title: "造句：二选一",
    subtitle: "(2/12)",
    stepsText: [
      "这是一个分支句：非此即彼的选择逻辑。",
      "✂️ 1. 结构分析：切分出\"真\"与\"假\"两个执行分支。",
      "🔍 2. 定位：标记关键节点，理清跳转逻辑。",
      "🏷️ 3. 词性：'if' 和 'else' 是控制流程的指挥官。",
      "🧠 4. 内化：掌握完整的二元分支结构。"
    ],
    lines: [
      {
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "90", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"A"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      {
        tokens: [
          { text: "else", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"F"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 3,
    title: "造句：循环往复",
    subtitle: "(3/12)",
    stepsText: [
      "这是一个循环句：批量处理集合中的数据。",
      "✂️ 1. 结构分析：注意 'in' 介词，表示\"在...范围之内\"。",
      "🔍 2. 关键词识别：标记循环变量与目标集合。",
      "🏷️ 3. 词性：'for' 和 'in' 定义了遍历的规则。",
      "🧠 4. 内化：理解流水线式的批量处理逻辑。"
    ],
    lines: [
      {
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: "s", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "s", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 4,
    title: "造句：坚持到底",
    subtitle: "(4/12)",
    stepsText: [
      "这是一个\"坚持句\"：只要条件满足，就一直做下去。",
      "✂️ 1. 结构分析：识别 while 关键字和退出条件。",
      "🔍 2. 关键点：注意缩进块是重复执行的内容。",
      "🏷️ 3. 词性：紫色代表循环规则，绿色控制循环次数。",
      "🧠 4. 内化：理解\"当...时\"的持续性逻辑。"
    ],
    lines: [
      {
        tokens: [
          { text: "while", type: "系统定义", colorClass: "text-purple-600" },
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Running"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      {
        tokens: [
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: "-", type: "操作符号", colorClass: "text-red-500" },
          { text: "1", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 5,
    title: "造句：定义清单",
    subtitle: "(5/12)",
    stepsText: [
      "这是一个赋值句：将多个数据组织成列表。",
      "✂️ 1. 结构识别：方括号定义列表边界。",
      "🔍 2. 元素分离：逗号分隔列表中的每一项。",
      "🏷️ 3. 词性：红色方括号是容器，绿色是具体数据。",
      "🧠 4. 内化：列表是存储同类数据的集合。"
    ],
    lines: [
      {
        tokens: [
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "[", type: "操作符号", colorClass: "text-red-500" },
          { text: "85", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "92", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "78", type: "文本内容", colorClass: "text-green-700" },
          { text: "]", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 6,
    title: "造句：访问元素",
    subtitle: "(6/12)",
    stepsText: [
      "这是一个索引句：从列表中提取特定位置的元素。",
      "✂️ 1. 结构分析：方括号内是索引位置。",
      "🔍 2. 索引理解：Python 从 0 开始计数。",
      "🏷️ 3. 词性：方括号是访问操作符。",
      "🧠 4. 内化：scores[0] 表示第一个元素。"
    ],
    lines: [
      {
        tokens: [
          { text: "first", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: "[", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" },
          { text: "]", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 7,
    title: "造句：函数定义",
    subtitle: "(7/12)",
    stepsText: [
      "这是一个函数定义句：创建可复用的代码块。",
      "✂️ 1. 结构分析：def 关键字定义函数。",
      "🔍 2. 识别：函数名后跟括号，内含参数。",
      "🏷️ 3. 词性：紫色def是定义命令，冒号标记函数体开始。",
      "🧠 4. 内化：函数是封装代码逻辑的容器。"
    ],
    lines: [
      {
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: "greet", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Hello,"', type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 8,
    title: "造句：函数返回",
    subtitle: "(8/12)",
    stepsText: [
      "这是一个带返回值的函数句。",
      "✂️ 1. 结构分析：return 返回计算结果。",
      "🔍 2. 识别：函数可以接收参数并返回值。",
      "🏷️ 3. 词性：return 是紫色系统关键字。",
      "🧠 4. 内化：return 将结果传递给调用者。"
    ],
    lines: [
      {
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: "add", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "a", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "b", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: "a", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "b", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 9,
    title: "造句：多条件判断",
    subtitle: "(9/12)",
    stepsText: [
      "这是一个多分支判断句：elif 处理多个条件。",
      "✂️ 1. 结构分析：if-elif-else 三段式结构。",
      "🔍 2. 识别：elif 是 else if 的简写。",
      "🏷️ 3. 词性：按顺序检查每个条件。",
      "🧠 4. 内化：实现多路分支逻辑。"
    ],
    lines: [
      {
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">=", type: "操作符号", colorClass: "text-red-500" },
          { text: "90", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"A"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      {
        tokens: [
          { text: "elif", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">=", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"C"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 10,
    title: "造句：列表添加",
    subtitle: "(10/12)",
    stepsText: [
      "这是一个列表操作句：动态添加元素。",
      "✂️ 1. 结构分析：点号调用对象的方法。",
      "🔍 2. 识别：append() 是列表的追加方法。",
      "🏷️ 3. 词性：方法名是紫色系统功能。",
      "🧠 4. 内化：列表可以动态增加元素。"
    ],
    lines: [
      {
        tokens: [
          { text: "numbers", type: "文本内容", colorClass: "text-green-700" },
          { text: ".", type: "操作符号", colorClass: "text-red-500" },
          { text: "append", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "42", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 11,
    title: "造句：字典定义",
    subtitle: "(11/12)",
    stepsText: [
      "这是一个字典定义句：键值对数据结构。",
      "✂️ 1. 结构分析：花括号定义字典。",
      "🔍 2. 识别：冒号分隔键和值。",
      "🏷️ 3. 词性：字典用于存储关联数据。",
      "🧠 4. 内化：通过键快速访问对应的值。"
    ],
    lines: [
      {
        tokens: [
          { text: "student", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "{", type: "操作符号", colorClass: "text-red-500" },
          { text: '"name"', type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Alice"', type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: '"age"', type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" },
          { text: "20", type: "文本内容", colorClass: "text-green-700" },
          { text: "}", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    scaleClass: "scale-130"
  },
  {
    id: 12,
    title: "造句：异常处理",
    subtitle: "(12/12)",
    stepsText: [
      "这是一个异常处理句：捕获并处理错误。",
      "✂️ 1. 结构分析：try-except 保护代码。",
      "🔍 2. 识别：try 尝试执行，except 处理错误。",
      "🏷️ 3. 词性：紫色关键字控制异常流程。",
      "🧠 4. 内化：防止程序因错误而崩溃。"
    ],
    lines: [
      {
        tokens: [
          { text: "try", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "result", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "10", type: "文本内容", colorClass: "text-green-700" },
          { text: "/", type: "操作符号", colorClass: "text-red-500" },
          { text: "num", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      {
        tokens: [
          { text: "except", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      {
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Error"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      }
    ],
    scaleClass: "scale-130"
  }
];
