export interface EssayBlockData {
  title?: string;
  lines: Array<{
    tokens: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
    indent?: number;
  }>;
}

export interface EssaySlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  blocks: EssayBlockData[];
}

export const essaySlides: EssaySlideData[] = [
  {
    "id": 1,
    "title": "写作",
    "subtitle": "(1/13)",
    "stepsText": [
      "第一个例子：总价计算",
      "🧱 看整体：定义函数并调用",
      "✂️ 看细节：参数和返回值",
      "🔍 看逻辑：price * num",
      "🏷️ 词性：int类型、return关键字",
      "🧠 理解：函数封装计算逻辑"
    ],
    "blocks": [
      {
        "title": "函数定义",
        "lines": [
          {
            "tokens": [
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " total",
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
                "text": " price",
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
                "text": " num",
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
                "text": "return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " price",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " *",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " num",
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
        ]
      },
      {
        "title": "使用示例",
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
                "text": " total",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "50",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 3",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "写作",
    "subtitle": "(2/13)",
    "stepsText": [
      "第二个例子：用 vector 建立水果清单。",
      "🧱 看整体：把水果名排成一张清单，就像把几个词依次写进词语本。",
      "✂️ 看细节：vector<std::string> 表示存放文字的清单，fruits 是我们给清单起的名字。",
      "🔍 看逻辑：每调用一次 push_back，就在清单末尾加入一个水果。",
      "🏷️ 词性：方括号按编号取内容，编号0是第一个，编号1是第二个；size() 查看数量。",
      "🧠 理解：先加入苹果和香蕉，再访问编号0和1，所以不会取到尚不存在的位置。"
    ],
    "blocks": [
      {
        "title": "建立清单并加入水果",
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
                "text": " fruits",
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
                "text": "fruits",
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
                "text": "\"苹果\"",
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
            "indent": 0
          },
          {
            "tokens": [
              {
                "text": "fruits",
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
                "text": "\"香蕉\"",
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
            "indent": 0
          }
        ]
      },
      {
        "title": "按编号取水果，查看数量",
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
                "text": " fruits",
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
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ' '",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " fruits",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": " fruits",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "size",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "写作",
    "subtitle": "(3/13)",
    "stepsText": [
      "第三个例子：把名字填进问候语。",
      "🧱 看整体：greet 接收一个名字，返回一句完整的问候。",
      "✂️ 看细节：std::string 表示文字，name 是传进来的名字。",
      "🔍 看逻辑：把“你好，”和 name 连接起来，再用 return 交给调用的地方。",
      "🏷️ 词性：函数名是动作名，参数是需要填入的内容，返回类型说明结果也是文字。",
      "🧠 理解：换一个姓名就能得到另一句问候，同一个函数可以反复使用。"
    ],
    "blocks": [
      {
        "title": "接收姓名，返回问候语",
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
                "text": "string",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " greet",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
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
                "text": " name",
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
                "text": "return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " \"你好，\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " name",
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
        ]
      },
      {
        "title": "调用问候函数",
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
                "text": " greet",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"小明\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "写作",
    "subtitle": "(4/13)",
    "stepsText": [
      "第四个例子：先求总分，再计算平均分。",
      "🧱 看整体：像把几句话的字数先合起来，求平均要先得到总数。",
      "✂️ 看细节：范围 for 逐个取出成绩，把它加进 total。",
      "🔍 看逻辑：size() 得到成绩数量，总分除以数量就是平均分。",
      "🏷️ 词性：total 用 double 保存，平均分不是整数时也能保留小数。",
      "🧠 理解：先确认清单不为空再做除法，避免除以0；80、90、85的平均分是85。"
    ],
    "blocks": [
      {
        "title": "把成绩逐个加起来",
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
                "text": " scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "{",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "80",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 90",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 85",
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
            ],
            "indent": 0
          },
          {
            "tokens": [
              {
                "text": "double",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " total",
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
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
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
                "text": "total",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " score",
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
        ]
      },
      {
        "title": "总分除以成绩数量",
        "lines": [
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
                "text": "!",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "scores",
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
                "text": " total",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " /",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "size",
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
              }
            ],
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "写作",
    "subtitle": "(5/13)",
    "stepsText": [
      "第五个例子：逐个比较，找出最高分。",
      "🧱 看整体：像逐个选出更好的词，每看到一个更高成绩，就更新当前最高分。",
      "✂️ 看细节：本例清单固定有三个成绩，可以先用第一个成绩作为最高分。",
      "🔍 看逻辑：范围 for 逐个取出 score；只有它更大时，才把它存入 highest。",
      "🏷️ 词性：for 负责重复，if 负责判断，highest 保存当前发现的最大值。",
      "🧠 理解：85先成为最高分，92替换85，78不能替换92；若换成空清单，不能直接取编号0。"
    ],
    "blocks": [
      {
        "title": "准备三个成绩和当前最高分",
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
                "text": " scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
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
                "text": " 92",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 78",
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
                "text": " highest",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
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
            ],
            "indent": 0
          }
        ]
      },
      {
        "title": "逐个比较，留下较大的成绩",
        "lines": [
          {
            "tokens": [
              {
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
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
                "text": "score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " >",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " highest",
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
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "highest",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "}",
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
                "text": " highest",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "写作",
    "subtitle": "(6/13)",
    "stepsText": [
      "第六个例子：用 vector 收集所有偶数。",
      "🧱 看整体：像从一段文字中摘出符合要求的词，先准备空的结果清单。",
      "✂️ 看细节：范围 for 逐项读取，取余结果为0时才执行 push_back。",
      "🔍 看逻辑：push_back 把当前偶数加入 evens，原清单中的1和3被跳过。",
      "🏷️ 词性：numbers 是原清单，evens 是只收集偶数的新清单。",
      "🧠 理解：筛选后再用一个普通循环显示结果；本例只学习如何把符合条件的内容留下来。"
    ],
    "blocks": [
      {
        "title": "只把偶数加入结果清单",
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
                "text": " numbers",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "{",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 2",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 3",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 4",
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
                "text": " evens",
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
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " value",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " numbers",
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
                "text": "value",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " %",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 2",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 0",
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
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "evens",
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
                "text": "value",
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
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "}",
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
        ]
      },
      {
        "title": "显示筛选后的内容",
        "lines": [
          {
            "tokens": [
              {
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " value",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " evens",
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
                "text": " value",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ' '",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "title": "写作",
    "subtitle": "(7/13)",
    "stepsText": [
      "第七个例子：把两段文字连接成一句话。",
      "🧱 看整体：先写“你好，”，再把姓名接在后面，就像把词语连成一句话。",
      "✂️ 看细节：message 是 std::string，可以保存并连接文字。",
      "🔍 看逻辑：message += “小明”表示把“小明”接到原有内容的后面。",
      "🏷️ 词性：message 是我们起的名字，+= 是把新增内容接回原字符串的符号。",
      "🧠 理解：执行后 message 变成“你好，小明”；这里使用的是 std::string。"
    ],
    "blocks": [
      {
        "title": "准备一句话的开头",
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
                "text": "string",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " message",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"你好，\"",
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
          }
        ]
      },
      {
        "title": "把姓名接在后面",
        "lines": [
          {
            "tokens": [
              {
                "text": "message",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"小明\"",
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
                "text": " message",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "title": "写作",
    "subtitle": "(8/13)",
    "stepsText": [
      "第八个例子：文字冒险游戏",
      "🧱 看整体：用代码写一个互动小说",
      "✂️ 看细节：cin获取指令，if判断剧情",
      "🔍 看逻辑：while让游戏持续进行",
      "🏷️ 词性：while循环 + if分支 + cin输入",
      "🧠 理解：综合运用所学知识写互动程序"
    ],
    "blocks": [
      {
        "title": "游戏主循环",
        "lines": [
          {
            "tokens": [
              {
                "text": "bool",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " playing",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " true",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "while",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "playing",
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
                "text": " \"你面前有两扇门\\n\"",
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
                "text": " choice",
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
                "text": " \"左/右?\"",
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
                "text": "!",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "(",
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
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " >>",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "break",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "}",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 1
          }
        ]
      },
      {
        "title": "剧情分支",
        "lines": [
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
                "text": "choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"左\"",
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
            "indent": 1
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
                "text": " \"遇到恶龙！游戏结束\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "playing",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " false",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
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
                "text": " if",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"右\"",
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
            "indent": 1
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
                "text": " \"发现宝箱！获得金币\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "}",
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
        ]
      }
    ]
  },
  {
    "id": 9,
    "title": "写作",
    "subtitle": "(9/13)",
    "stepsText": [
      "第九个例子：把购物车写成真正的类与对象。",
      "🧱 看整体：class 像购物车的设计图，cart 是照着设计图建立的一个购物车。",
      "✂️ 看细节：public 后面写它的数据 total，以及它能做的动作 add。",
      "🔍 看逻辑：total 开始为0，add 每接收一个价格，就把它加到这个对象的总价里。",
      "🏷️ 词性：cart.add(5) 是“让这辆车加入5元”，cart.total 是“这辆车的总价”。",
      "🧠 理解：类可以把相关的数据和动作放在一起；本例只学习对象怎样记住自己的总价。"
    ],
    "blocks": [
      {
        "title": "定义购物车拥有的数据和动作",
        "lines": [
          {
            "tokens": [
              {
                "text": "class",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " ShoppingCart",
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
                "text": "public",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": ":",
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
                "text": " total",
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
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "void",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " add",
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
                "text": " price",
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
              },
              {
                "text": " total",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " price",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
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
          }
        ]
      },
      {
        "title": "创建对象，通过公开方法使用",
        "lines": [
          {
            "tokens": [
              {
                "text": "ShoppingCart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " cart",
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
                "text": "cart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": "5",
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
            "indent": 0
          },
          {
            "tokens": [
              {
                "text": "cart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": "3",
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
                "text": " \"总价: \"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " cart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "total",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "title": "写作",
    "subtitle": "(10/13)",
    "stepsText": [
      "第十个例子：给清单里的每个成绩都加5分。",
      "🧱 看整体：像给每句话都添上同一个词，循环对每一项做相同的修改。",
      "✂️ 看细节：第一个循环使用 int&，score 就代表清单里当前那一项原成绩。",
      "🔍 看逻辑：score += 5 直接写回清单，70、80、90分别变成75、85、95。",
      "🏷️ 词性：& 让修改落到原成绩上；第二个循环只用 int 取出数值显示。",
      "🧠 理解：想修改原清单用引用，单纯读取时用普通变量；本例沿用造句阶段已经学过的引用。"
    ],
    "blocks": [
      {
        "title": "通过引用逐个修改原成绩",
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
                "text": " scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "{",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "70",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 80",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 90",
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
            ],
            "indent": 0
          },
          {
            "tokens": [
              {
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
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
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
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
        ]
      },
      {
        "title": "显示已经修改的成绩",
        "lines": [
          {
            "tokens": [
              {
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " scores",
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
                "text": " score",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ' '",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "title": "写作",
    "subtitle": "(11/13)",
    "stepsText": [
      "第十一个例子：创建学生时，就填入学生的姓名。",
      "🧱 看整体：像填写一张新资料卡，建立 Student 对象时同时交给它一个名字。",
      "✂️ 看细节：Student(std::string text) 是构造函数，它和类同名，没有返回类型。",
      "🔍 看逻辑：创建对象时传入“小明”，构造函数把 text 放进这个对象的 name。",
      "🏷️ 词性：Student 是类型名，student 是对象名，name 是对象保存的姓名。",
      "🧠 理解：构造函数负责创建对象时的准备工作；这里只学习如何给新对象填入初始内容。"
    ],
    "blocks": [
      {
        "title": "构造函数接收初始姓名",
        "lines": [
          {
            "tokens": [
              {
                "text": "class",
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
                "text": "public",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": ":",
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
                "text": "string",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " name",
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
                "text": "Student",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
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
                "text": " text",
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
              },
              {
                "text": " name",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " text",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
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
          }
        ]
      },
      {
        "title": "创建学生并显示姓名",
        "lines": [
          {
            "tokens": [
              {
                "text": "Student",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " student",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"小明\"",
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
                "text": " student",
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "title": "写作",
    "subtitle": "(12/13)",
    "stepsText": [
      "第十二个例子：数一数英文文本里某个字母出现几次。",
      "🧱 看整体：像在一句话中圈出指定的字，每圈出一次就记一笔。",
      "✂️ 看细节：text 接收文字，target 接收要找的一个 char。",
      "🔍 看逻辑：for 逐个取出 letter，只有它等于目标字符时才增加 count。",
      "🏷️ 词性：count 保存次数，return 把最终次数交给调用的地方。",
      "🧠 理解：“hello”里有两个 l，所以返回2；本例按 char 处理英文，不用它来计算汉字个数。"
    ],
    "blocks": [
      {
        "title": "遇到目标字符就加一",
        "lines": [
          {
            "tokens": [
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " count_char",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
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
                "text": " text",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " target",
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
                "text": " count",
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
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "for",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " (",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " letter",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " text",
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
            "indent": 1
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
                "text": "letter",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " target",
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
              },
              {
                "text": " count",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "}",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " count",
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
        ]
      },
      {
        "title": "统计英文文本里的字母",
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
                "text": " count_char",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"hello\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 'l'",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
            "indent": 0
          }
        ]
      }
    ]
  },
  {
    "id": 13,
    "title": "写作",
    "subtitle": "(13/13)",
    "stepsText": [
      "第十三个例子：用标准文件流写一页记事本，再把它读出来。",
      "🧱 看整体：ofstream 负责写，ifstream 负责读；两个流对象各做一件事。",
      "✂️ 看细节：第一对花括号围住写文件这件事，像一小段文字的起止边界。",
      "🔍 看逻辑：离开第一块后，输出流自动完成关闭，再打开输入流读取刚写好的文件。",
      "🏷️ 词性：getline 读取整行，note 接收文字；流的 ! 判断用于检查打开或读写是否失败。",
      "🧠 理解：写完并离开这对花括号，文件会自动关闭；再打开它读取内容，不需要手动调用关闭函数。"
    ],
    "blocks": [
      {
        "title": "写入记事本，离开作用域自动关闭",
        "lines": [
          {
            "tokens": [
              {
                "text": "{",
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
                "text": "ofstream",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " out",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"note.txt\"",
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
                "text": "!",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "out",
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
              },
              {
                "text": " return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " 1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 1
          },
          {
            "tokens": [
              {
                "text": "out",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <<",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"今天学 C++\\n\"",
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
                "text": "!",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "out",
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
              },
              {
                "text": " return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " 1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
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
        ]
      },
      {
        "title": "重新打开文件，读取整行",
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
                "text": "ifstream",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " in",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"note.txt\"",
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
                "text": "!",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "in",
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
              },
              {
                "text": " return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " 1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
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
                "text": "string",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " note",
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
                "text": "!",
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
                "text": "getline",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "in",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " note",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
              },
              {
                "text": " return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " 1",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " }",
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
                "text": " note",
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
            "indent": 0
          }
        ]
      }
    ]
  }
];
