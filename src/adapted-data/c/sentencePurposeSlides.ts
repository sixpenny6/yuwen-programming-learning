/** 原版造句用途数据接口，保留全部字段与原显示组件兼容。 */
export interface PurposeToken { text: string; type: '系统定义' | '操作符号' | '文本内容' | '注释'; colorClass: string; }
export interface PurposeLine { tokens: PurposeToken[]; indent?: number; }
export interface CodePurposeData { id: number; title: string; subtitle: string; code: PurposeLine[]; mockVars?: Record<string, any>; ghostText?: Record<string,string>; purpose: string; purposeIcon?: string; expectedBehavior?: string; }

export const sentencePurposeSlides: CodePurposeData[] = [
  {
    "id": 1,
    "title": "演示",
    "subtitle": "if 条件判断",
    "code": [
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
        "indent": 1
      }
    ],
    "mockVars": {
      "score": 75
    },
    "purpose": "如果分数超过60，就在屏幕上显示「合格」",
    "purposeIcon": "🔀",
    "expectedBehavior": "score=75 时，屏幕显示「合格」"
  },
  {
    "id": 2,
    "title": "演示",
    "subtitle": "if-else 二选一",
    "code": [
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
    "mockVars": {
      "score": 95
    },
    "purpose": "二选一：分数超90给A，否则给F",
    "purposeIcon": "🔀",
    "expectedBehavior": "score=95 时，grade 被赋值为「A」"
  },
  {
    "id": 3,
    "title": "演示",
    "subtitle": "for 循环遍历",
    "code": [
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
    "mockVars": {
      "scores": "{85, 92, 78}",
      "total": 0
    },
    "purpose": "遍历每个成绩，累加到总分里",
    "purposeIcon": "🔄",
    "expectedBehavior": "把 85+92+78 加起来，total 变成 255"
  },
  {
    "id": 4,
    "title": "演示",
    "subtitle": "while 循环",
    "code": [
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
    "mockVars": {
      "power": 3
    },
    "purpose": "只要还有能量，就一直运行并消耗1点能量",
    "purposeIcon": "🔄",
    "expectedBehavior": "power=3 时，显示3次「Running」后停止"
  },
  {
    "id": 5,
    "title": "演示",
    "subtitle": "数组清单定义",
    "code": [
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
    "purpose": "创建一个成绩单，里面装着三门课的分数",
    "purposeIcon": "📋",
    "expectedBehavior": "scores 成为有三个整数元素的数组：85、92、78"
  },
  {
    "id": 6,
    "title": "演示",
    "subtitle": "数组元素访问",
    "code": [
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
    "mockVars": {
      "scores": "{85, 92, 78}"
    },
    "purpose": "取出数组中第一个元素（编号从0开始）",
    "purposeIcon": "📋",
    "expectedBehavior": "first 得到 85（第一个成绩）"
  },
  {
    "id": 7,
    "title": "演示",
    "subtitle": "指针参数交换",
    "code": [
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
    "purpose": "接收两个整数变量的有效地址，通过解引用交换原变量的值",
    "purposeIcon": "🔄",
    "expectedBehavior": "left为3、right为8时，调用swap(&left, &right)后输出8 3"
  },
  {
    "id": 8,
    "title": "演示",
    "subtitle": "函数返回",
    "code": [
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
    "purpose": "定义一个「加法」功能：输入两数，返回它们的和",
    "purposeIcon": "📦",
    "expectedBehavior": "调用 add(3, 5) 得到 8"
  },
  {
    "id": 9,
    "title": "演示",
    "subtitle": "else if 多条件",
    "code": [
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
    "mockVars": {
      "score": 75
    },
    "purpose": "分档评级：90分以上A，60分以上C",
    "purposeIcon": "🔀",
    "expectedBehavior": "score=75 时，grade 被赋值为「C」"
  },
  {
    "id": 10,
    "title": "演示",
    "subtitle": "数组清单添加",
    "code": [
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
    "mockVars": {
      "numbers": "{1, 2, 3, 预留空位}",
      "length": 3
    },
    "purpose": "确认容量足够后，向数组清单末尾写入 42，并更新有效数量",
    "purposeIcon": "📋",
    "expectedBehavior": "清单的有效元素变成 1、2、3、42"
  },
  {
    "id": 11,
    "title": "演示",
    "subtitle": "结构体指定初始化",
    "code": [
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
    "purpose": "定义学生资料格式，再按字段名填写姓名和年龄",
    "purposeIcon": "🗂️",
    "expectedBehavior": "虽然先填写.age再填写.name，student.name仍为Alice，student.age为20"
  },
  {
    "id": 12,
    "title": "演示",
    "subtitle": "检查scanf是否成功",
    "code": [
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
    "mockVars": {
      "age": 18
    },
    "purpose": "读取一个整数；scanf返回1时显示结果，否则提示输入整数",
    "purposeIcon": "🛡️",
    "expectedBehavior": "输入18后显示年龄: 18；输入hello则显示请输入整数"
  }
];
