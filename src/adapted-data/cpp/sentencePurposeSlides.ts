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
    "subtitle": "vector 清单定义",
    "code": [
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
    "purpose": "创建一个成绩单，里面装着三门课的分数",
    "purposeIcon": "📋",
    "expectedBehavior": "scores 成为包含 85、92、78 的 vector"
  },
  {
    "id": 6,
    "title": "演示",
    "subtitle": "vector 元素访问",
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
    "purpose": "取出 vector 中第一个元素（编号从0开始）",
    "purposeIcon": "📋",
    "expectedBehavior": "first 得到 85（第一个成绩）"
  },
  {
    "id": 7,
    "title": "演示",
    "subtitle": "引用参数加分",
    "code": [
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
        "indent": 0
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
    "purpose": "通过 int& 引用参数，给调用时传入的原成绩加5分",
    "purposeIcon": "📦",
    "expectedBehavior": "原成绩75，加5后变成80",
    "mockVars": {
      "score": 75
    }
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
    "subtitle": "vector 清单添加",
    "code": [
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
    "mockVars": {
      "numbers": "{1, 2, 3}"
    },
    "purpose": "往 vector 末尾追加一个新元素 42",
    "purposeIcon": "📋",
    "expectedBehavior": "清单的有效元素变成 1、2、3、42"
  },
  {
    "id": 11,
    "title": "演示",
    "subtitle": "map 字典定义",
    "code": [
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
    "purpose": "创建一张「资料卡」：记录学生姓名和年龄",
    "purposeIcon": "🗂️",
    "expectedBehavior": "student.at(\"name\") 得到 \"Alice\"，年龄的值 \"20\" 是字符串"
  },
  {
    "id": 12,
    "title": "演示",
    "subtitle": "检查能否读到整数",
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
        "indent": 0
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
    "purpose": "输入读取成功后显示年龄，读取失败时提示需要整数",
    "purposeIcon": "🛡️",
    "expectedBehavior": "输入18显示 年龄: 18；输入abc显示 请输入整数"
  }
];
