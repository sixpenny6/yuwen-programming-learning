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
            "text": "cout",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"合格\\n\"",
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
      "✂️ 1. 结构分析：范围 for 的冒号表示“从这个序列逐个取值”。",
      "🔍 2. 关键词识别：标记循环变量 s 与目标集合 scores。",
      "🏷️ 3. 词性：for 定义遍历规则，冒号连接元素与序列。",
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
            "text": "s",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ":",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "scores",
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
            "text": "s",
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
            "text": "cout",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"Running\\n\"",
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
      "这是一个清单定义句：把同类型数据组织进 vector。",
      "✂️ 1. 结构识别：vector<int> 声明整数序列，花括号写初值。",
      "🔍 2. 元素分离：逗号分隔列表中的每一项。",
      "🏷️ 3. 词性：红色符号构成清单边界，绿色是具体成绩。",
      "🧠 4. 内化：vector 自动管理同类型元素的存储。"
    ],
    "lines": [
      {
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
            "text": "vector",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "int",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": ">",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "scores",
            "type": "文本内容",
            "colorClass": "text-green-700"
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
      "这是一个索引句：从 vector 中提取特定位置的元素。",
      "✂️ 1. 结构分析：方括号内是索引位置。",
      "🔍 2. 索引理解：C++ 从 0 开始计数，下标必须在有效范围内。",
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
    "title": "造句：函数定义",
    "subtitle": "(7/12)",
    "stepsText": [
      "这是一个函数定义句：把“给原成绩加5分”写成可复用的动作。",
      "✂️ 1. 断句：void 表示不返回结果，add_bonus 是函数名，圆括号里写接收的成绩。",
      "🔍 2. 定位：int 后的 & 表示引用，函数里的 score 就是调用时传入的那个成绩。",
      "🏷️ 3. 词性：score += 5 表示把成绩加5，再存回原来的成绩变量。",
      "🧠 4. 内化：原成绩是75，调用 add_bonus(score) 后变成80；这里通过引用直接修改原值。"
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
            "text": " add_bonus",
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
            "text": "&",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " score",
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
        "indent": 0,
        "label": "函数定义"
      },
      {
        "tokens": [
          {
            "text": "score",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " +=",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " 5",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1,
        "label": "增加原成绩"
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0,
        "label": "函数结束"
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
      "这是一个清单操作句：在 vector 末尾动态添加元素。",
      "✂️ 1. 结构分析：点号调用对象的成员函数。",
      "🔍 2. 识别：push_back() 是 vector 的追加操作。",
      "🏷️ 3. 词性：方法名是紫色标准库功能。",
      "🧠 4. 内化：vector 自动管理扩容，末尾追加后数量加一。"
    ],
    "lines": [
      {
        "tokens": [
          {
            "text": "numbers",
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
    "title": "造句：字典定义",
    "subtitle": "(11/12)",
    "stepsText": [
      "这是一个字典定义句：用 map 保存键值对关联数据。",
      "✂️ 1. 结构分析：map 的两个类型参数分别指定键和值的类型。",
      "🔍 2. 识别：内层花括号配对键和值，逗号分隔各词条。",
      "🏷️ 3. 词性：字典用于存储关联数据，本例的值统一为 string。",
      "🧠 4. 内化：student.at(\"name\") 取姓名；\"20\" 是年龄文本。"
    ],
    "lines": [
      {
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
            "text": "map",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<",
            "type": "操作符号",
            "colorClass": "text-red-500"
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
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
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
            "text": ">",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "student",
            "type": "文本内容",
            "colorClass": "text-green-700"
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
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"Alice\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"age\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"20\"",
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
    "id": 12,
    "title": "造句：输入检查",
    "subtitle": "(12/12)",
    "stepsText": [
      "这是一个输入检查句：读到整数就使用它，没有读到就给出提示。",
      "✂️ 1. 断句：先准备 age，再用 if 和 else 分别处理成功与失败。",
      "🔍 2. 定位：std::cin >> age 尝试把一个整数读进 age，if 检查是否读取成功。",
      "🏷️ 3. 词性：cin 负责接收输入，if 决定走哪一条分支，age 保存读到的整数。",
      "🧠 4. 内化：输入18会显示年龄；输入 abc 没有读到整数，就显示“请输入整数”，不把失败当成成功。"
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
        "indent": 0,
        "label": "准备年龄"
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
            "text": "cin",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " >>",
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
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0,
        "label": "检查输入"
      },
      {
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
            "text": "cout",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " <<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " \"年龄: \"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " <<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " age",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " <<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " '\\n'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1,
        "label": "读取成功"
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
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": " {",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0,
        "label": "否则"
      },
      {
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
            "text": "cout",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": " <<",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " \"请输入整数\\n\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ";",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 1,
        "label": "读取失败"
      },
      {
        "tokens": [
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ],
        "indent": 0,
        "label": "句子结束"
      }
    ],
    "scaleClass": "scale-130"
  }
];
