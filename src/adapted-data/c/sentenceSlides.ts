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
    "id": 1,
    "title": "造句：逻辑判断",
    "subtitle": "(1/12)",
    "stepsText": [
      "这是一个完整的条件句：若满足条件，则执行动作。",
      "✂️ 1. 断句：识别条件判断语句的结构边界。",
      "🔍 2. 定位：找出关键词 'if' 与条件表达式。",
      "🏷️ 3. 词性：紫色触发系统逻辑，红色构建语法骨架。",
      "🧠 4. 内化：理解\"因果关系\"在代码中的表达。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "if",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "score",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "60",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "label": "条件词"
      },
      {
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
            "text": "\"合格\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1,
        "label": "动作词"
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 2,
    "title": "造句：二选一",
    "subtitle": "(2/12)",
    "stepsText": [
      "这是一个分支句：非此即彼的选择逻辑。",
      "✂️ 1. 结构分析：切分出\"真\"与\"假\"两个执行分支。",
      "🔍 2. 定位：标记关键节点，理清跳转逻辑。",
      "🏷️ 3. 词性：'if' 和 'else' 是控制流程的指挥官。",
      "🧠 4. 内化：掌握完整的二元分支结构。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "if",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "score",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "90",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "grade",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "'A'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "else",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "grade",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "'F'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 3,
    "title": "造句：循环往复",
    "subtitle": "(3/12)",
    "stepsText": [
      "这是一个循环句：批量处理集合中的数据。",
      "✂️ 1. 结构分析：for 括号内依次是起点、继续条件和更新。",
      "🔍 2. 关键词识别：i 是位置，scores[i] 是本轮取出的成绩。",
      "🏷️ 3. 词性：for 定义遍历规则，花括号圈出重复的动作。",
      "🧠 4. 内化：理解流水线式的批量处理逻辑。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "for",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "i",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "0",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "i",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "3",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "++",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "i",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "total",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "total",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "+",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "scores",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "[",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "i",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "]",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 4,
    "title": "造句：坚持到底",
    "subtitle": "(4/12)",
    "stepsText": [
      "这是一个\"坚持句\"：只要条件满足，就一直做下去。",
      "✂️ 1. 结构分析：识别 while 关键字和退出条件。",
      "🔍 2. 关键点：花括号内的块重复执行，缩进帮助读者辨认层次。",
      "🏷️ 3. 词性：紫色代表循环规则，绿色控制循环次数。",
      "🧠 4. 内化：理解\"当...时\"的持续性逻辑。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "while",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "power",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "0",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
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
            "text": "\"Running\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "power",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "power",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "-",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "1",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 5,
    "title": "造句：定义清单",
    "subtitle": "(5/12)",
    "stepsText": [
      "这是一个清单定义句：把同类型数据组织进数组。",
      "✂️ 1. 结构识别：int scores[] 声明数组，花括号写初值。",
      "🔍 2. 元素分离：逗号分隔列表中的每一项。",
      "🏷️ 3. 词性：红色符号构成清单边界，绿色是具体成绩。",
      "🧠 4. 内化：本数组长度由三个初值确定，不能自动增加容量。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "scores",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "[",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "]",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "85",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "92",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "78",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 6,
    "title": "造句：访问元素",
    "subtitle": "(6/12)",
    "stepsText": [
      "这是一个索引句：从数组中提取特定位置的元素。",
      "✂️ 1. 结构分析：方括号内是索引位置。",
      "🔍 2. 索引理解：C 从 0 开始计数，下标必须在有效范围内。",
      "🏷️ 3. 词性：方括号是访问操作符。",
      "🧠 4. 内化：scores[0] 表示第一个元素。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "first",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "scores",
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
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 7,
    "title": "造句：指针参数函数",
    "subtitle": "(7/12)",
    "stepsText": [
      "这是一个函数定义句：用指针参数交换调用者的两个整数。",
      "✂️ 1. 结构分析：int *a和int *b声明接收整数地址的指针参数。",
      "🔍 2. 识别：临时变量temp先保存旧值，*a和*b访问原来的整数。",
      "🏷️ 3. 词性：void表示不返回值，*在声明中表示指针，在表达式中用于解引用。",
      "🧠 4. 内化：调用swap(&left, &right)；C仍然按值传递，传入的是两个有效地址的副本。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "void",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " swap",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " *",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "a",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " *",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "b",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " temp",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " *",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "a",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "*",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "a",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " *",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "b",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "*",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "b",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " temp",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 8,
    "title": "造句：函数返回",
    "subtitle": "(8/12)",
    "stepsText": [
      "这是一个带返回值的函数句。",
      "✂️ 1. 结构分析：return 返回计算结果。",
      "🔍 2. 识别：函数可以接收参数并返回值。",
      "🏷️ 3. 词性：return 是紫色系统关键字。",
      "🧠 4. 内化：return 将结果传递给调用者。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "add",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "a",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "b",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "return",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "a",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "+",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "b",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 9,
    "title": "造句：多条件判断",
    "subtitle": "(9/12)",
    "stepsText": [
      "这是一个多分支判断句：else if 继续检查后面的条件。",
      "✂️ 1. 结构分析：if 与 else if 按顺序组织多个分支。",
      "🔍 2. 识别：else if 是两个关键字，不能写成 elif。",
      "🏷️ 3. 词性：按顺序检查每个条件。",
      "🧠 4. 内化：实现多路分支逻辑。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "if",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "score",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "90",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "grade",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "'A'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "else",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "if",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "score",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "60",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      },
      {
        "tokens": [
          {
            "text": "grade",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "'C'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 10,
    "title": "造句：列表添加",
    "subtitle": "(10/12)",
    "stepsText": [
      "这是一个清单操作句：给预留容量的数组追加元素。",
      "✂️ 1. 结构分析：调用自定义 append，传入数组、有效数量地址与容量。",
      "🔍 2. 识别：append 不是 C 标准库函数，内部先检查容量再写入。",
      "🏷️ 3. 词性：绿色函数名代表自定义动作，红色括号组织参数。",
      "🧠 4. 内化：容量足够才追加并更新 length；C 数组不能自动扩容。"
    ],
    "lines": [
      {
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
            "text": "numbers",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "&",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "length",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "4",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "42",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 11,
    "title": "造句：结构体初始化",
    "subtitle": "(11/12)",
    "stepsText": [
      "这是一个资料声明句：用结构体把姓名和年龄组成一张固定格式的资料卡。",
      "✂️ 1. 结构分析：struct Student声明字段，student保存一份具体资料。",
      "🔍 2. 识别：.age和.name按字段名指定初值，不必按字段声明的顺序填写。",
      "🏷️ 3. 词性：struct和类型规定资料格式，点号与字段名标明填写位置。",
      "🧠 4. 内化：student.name访问姓名，student.age访问整数年龄；字段在结构体类型中事先确定。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "struct",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " Student",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
        "tokens": [
          {
            "text": "const",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " char",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " *",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "name",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
        "tokens": [
          {
            "text": "struct",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " Student",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " student",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
        "tokens": [
          {
            "text": ".",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " 20",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": ".",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "name",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " \"Alice\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      }
    ],
    "scaleClass": "scale-130"
  },
  {
    "id": 12,
    "title": "造句：输入结果检查",
    "subtitle": "(12/12)",
    "stepsText": [
      "这是一个输入检查句：读到整数才显示年龄，读不到就给出提示。",
      "✂️ 1. 结构分析：scanf尝试读取一个整数，if根据它的返回值选择分支。",
      "🔍 2. 识别：这里只有一个%d，返回1表示成功读到一个整数。",
      "🏷️ 3. 词性：scanf负责输入，&age给出存放位置，==1检查是否成功。",
      "🧠 4. 内化：成功时显示读到的年龄；输入不是整数或已经结束时，提示请输入整数。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " =",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " 0",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
        "tokens": [
          {
            "text": "if",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " (",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "scanf",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"%d\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " &",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " ==",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " 1",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
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
            "text": "\"年龄: %d\\n\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " else",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      },
      {
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
            "text": "\"请输入整数\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0
      }
    ],
    "scaleClass": "scale-130"
  }
];
