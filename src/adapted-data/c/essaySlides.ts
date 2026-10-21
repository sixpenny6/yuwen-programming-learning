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
                "text": "\"%d\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
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
      }
    ]
  },
  {
    "id": 2,
    "title": "写作",
    "subtitle": "(2/13)",
    "stepsText": [
      "第二个例子：检查重复",
      "🧱 看整体：遍历数组查找重复元素",
      "✂️ 看细节：双层循环比较",
      "🔍 看逻辑：i≠j且相等则重复",
      "🏷️ 词性：for和if关键字",
      "🧠 理解：嵌套循环解决复杂问题"
    ],
    "blocks": [
      {
        "title": "函数定义",
        "lines": [
          {
            "tokens": [
              {
                "text": "bool",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " has_dup",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "const",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " lst",
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
                "text": " size",
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
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
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
                "text": " j",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " +",
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
                "text": " j",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "j",
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
            "indent": 2
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
                "text": "lst",
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
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " lst",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "j",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "]",
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
            "indent": 3
          },
          {
            "tokens": [
              {
                "text": "return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
            "indent": 4
          },
          {
            "tokens": [
              {
                "text": "}",
                "type": "操作符号",
                "colorClass": "text-red-500"
              }
            ],
            "indent": 3
          },
          {
            "tokens": [
              {
                "text": "}",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " lst",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " {",
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
                "text": " 2",
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
                "text": "has_dup",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "lst",
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
                "text": " ?",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"true\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"false\"",
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
      }
    ]
  },
  {
    "id": 3,
    "title": "写作",
    "subtitle": "(3/13)",
    "stepsText": [
      "第三个例子：打招呼",
      "🧱 看整体：格式化字符串输出",
      "✂️ 看细节：格式化写入字符串",
      "🔍 看逻辑：把“你好，”和name写入结果",
      "🏷️ 词性：snprintf格式化函数",
      "🧠 理解：字符串操作的基本方式"
    ],
    "blocks": [
      {
        "title": "函数定义",
        "lines": [
          {
            "tokens": [
              {
                "text": "void",
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
                "text": " result",
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size_t",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " size",
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
                "text": "snprintf",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "result",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"你好，%s\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": "char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " message",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "64",
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
          },
          {
            "tokens": [
              {
                "text": "greet",
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " message",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " sizeof",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " message",
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
                "text": "message",
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
      }
    ]
  },
  {
    "id": 4,
    "title": "写作",
    "subtitle": "(4/13)",
    "stepsText": [
      "第四个例子：计算固定数组的平均成绩",
      "🧱 看整体：在数组定义处计算元素数量，再把数组和数量一起传给函数",
      "✂️ 看细节：sizeof scores是整个数组的字节数，sizeof scores[0]是一个元素的字节数",
      "🔍 看逻辑：两者相除得到3个元素；循环求和后除以数量",
      "🏷️ 词性：sizeof取得字节大小，size_t保存数量，double保存小数结果",
      "🧠 理解：数组作为函数参数时不会自动携带长度，不能在该形参上用sizeof计算元素数"
    ],
    "blocks": [
      {
        "title": "接收数组与显式长度",
        "lines": [
          {
            "tokens": [
              {
                "text": "double",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " average",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "const",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size_t",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " count",
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
                "text": " 0.0",
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
                "text": "size_t",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
              },
              {
                "text": " ++",
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
                "text": " >",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 0",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ?",
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
                "text": " (",
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
                "text": "count",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 0.0",
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
        "title": "在数组定义处计算数量",
        "lines": [
          {
            "tokens": [
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": "size_t",
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
                "text": " sizeof",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " /",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " sizeof",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "\"%.1f\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " average",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "scores",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " count",
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
    "id": 5,
    "title": "写作",
    "subtitle": "(5/13)",
    "stepsText": [
      "第五个例子：查找最大值",
      "🧱 看整体：遍历比较找最大",
      "✂️ 看细节：初始化、遍历、条件更新",
      "🔍 看逻辑：如果nums[i]>max_val，更新最大值",
      "🏷️ 词性：for循环和if判断",
      "🧠 理解：保留当前最大值的算法思想"
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
                "text": " find_max",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "const",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " nums",
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
                "text": " size",
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
                "text": " max_val",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " nums",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
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
                "text": "nums",
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
                "text": " >",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " max_val",
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
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "max_val",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " nums",
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
              }
            ],
            "indent": 3
          },
          {
            "tokens": [
              {
                "text": "}",
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
                "text": " max_val",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " nums",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " {",
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
                "text": " 9",
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
                "text": "\"%d\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " find_max",
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
      }
    ]
  },
  {
    "id": 6,
    "title": "写作",
    "subtitle": "(6/13)",
    "stepsText": [
      "第六个例子：筛选偶数",
      "🧱 看整体：遍历筛选数组",
      "✂️ 看细节：结果数组、判断、记录个数",
      "🔍 看逻辑：nums[i]%2==0为偶数",
      "🏷️ 词性：%取模运算符",
      "🧠 理解：条件筛选是数据处理的基础"
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
                "text": " filter_even",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "const",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " nums",
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
                "text": " size",
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
                "text": " result",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " size",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
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
                "text": "nums",
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
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "result",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "count",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "++",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " nums",
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
              }
            ],
            "indent": 3
          },
          {
            "tokens": [
              {
                "text": "}",
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
        "title": "使用示例",
        "lines": [
          {
            "tokens": [
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " nums",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " {",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " result",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "4",
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
                "text": " filter_even",
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " result",
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
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
              },
              {
                "text": " ++",
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
                "text": "\"%d \"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " result",
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
          },
          {
            "tokens": [
              {
                "text": "putchar",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "'\\n'",
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
      }
    ]
  },
  {
    "id": 7,
    "title": "写作",
    "subtitle": "(7/13)",
    "stepsText": [
      "第七个例子：修改字符数组的第一个字母",
      "🧱 看整体：先用char word[]存放hello，再修改第一个位置",
      "✂️ 看细节：下标从0开始，所以word[0]就是第一个字符",
      "🔍 看逻辑：把word[0]设成单个字符'H'，再用puts显示整串文字",
      "🏷️ 词性：单引号'H'表示一个字符，双引号\"hello\"表示字符串",
      "🧠 理解：可写数组从hello变成Hello；末尾的NUL空字符\\0仍然保留，不是数字字符0"
    ],
    "blocks": [
      {
        "title": "准备可写的字符数组",
        "lines": [
          {
            "tokens": [
              {
                "text": "char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " word",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"hello\"",
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
        "title": "修改首字母并输出",
        "lines": [
          {
            "tokens": [
              {
                "text": "word",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 'H'",
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
      "✂️ 看细节：scanf获取指令，if判断剧情",
      "🔍 看逻辑：while让游戏持续进行",
      "🏷️ 词性：while循环 + if分支 + scanf输入",
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
                "text": "\"你面前有两扇门\"",
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
                "text": "char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "16",
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
            "indent": 1
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
                "text": "\"左/右?\"",
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
                "text": "\"%15s\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
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
                "text": " !=",
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
                "text": "strcmp",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
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
                "text": "\"遇到恶龙！游戏结束\"",
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
                "text": "strcmp",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "choice",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
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
                "text": "\"发现宝箱！获得金币\"",
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
      }
    ]
  },
  {
    "id": 9,
    "title": "写作",
    "subtitle": "(9/13)",
    "stepsText": [
      "第九个例子：简易购物车",
      "🧱 看整体：结构体数组存价格，索引数组作购物车",
      "✂️ 看细节：记录商品索引，for循环累加",
      "🔍 看逻辑：巩固\"组词\"和\"造句\"的组合",
      "🏷️ 词性：struct结构体 + 数组 + for循环",
      "🧠 理解：数据结构与逻辑的综合应用"
    ],
    "blocks": [
      {
        "title": "购物车数据",
        "lines": [
          {
            "tokens": [
              {
                "text": "struct",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " Product",
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
                "text": " price",
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
                "text": " Product",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " prices",
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
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " {",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 5",
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
                "text": " {",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "\"香蕉\"",
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
                "text": " cart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "2",
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
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "count",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "++",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
                "text": "cart",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "count",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "++",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " =",
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
              }
            ],
            "indent": 0
          }
        ]
      },
      {
        "title": "计算总价",
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
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
              },
              {
                "text": " ++",
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
                "text": " prices",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "cart",
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
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": ".",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "price",
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
                "text": "\"总价: %d\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " total",
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
      }
    ]
  },
  {
    "id": 10,
    "title": "写作",
    "subtitle": "(10/13)",
    "stepsText": [
      "第十个例子：读取固定三项成绩并求总分",
      "🧱 看整体：准备一个能放3个整数的数组，用已学的循环逐项输入",
      "✂️ 看细节：i依次为0、1、2，scanf把整数写入scores[i]",
      "🔍 看逻辑：每读到一项成绩，就把它加进total；读不到整数时给出提示",
      "🏷️ 词性：int scores[3]说明固定容量，方括号与下标选择具体位置",
      "🧠 理解：本例输入三个0到100的整数成绩；数组只有下标0、1、2三个位置"
    ],
    "blocks": [
      {
        "title": "准备固定三项成绩数组",
        "lines": [
          {
            "tokens": [
              {
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "3",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "]",
                "type": "操作符号",
                "colorClass": "text-red-500"
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
              },
              {
                "text": "0",
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
          }
        ]
      },
      {
        "title": "循环输入并累加",
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
                "text": " i",
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
              },
              {
                "text": " i",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 3",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
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
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " !=",
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
            "indent": 1
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
                "text": "\"请输入整数成绩\"",
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
                "text": "return",
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
                "text": "\"总分: %d\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " total",
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
      }
    ]
  },
  {
    "id": 11,
    "title": "写作",
    "subtitle": "(11/13)",
    "stepsText": [
      "第十一个例子：条件验证",
      "🧱 看整体：范围检查函数",
      "✂️ 看细节：&&连接多个条件",
      "🔍 看逻辑：age>=0且age<=120为有效",
      "🏷️ 词性：&&逻辑与运算符",
      "🧠 理解：用逻辑运算组合多个判断"
    ],
    "blocks": [
      {
        "title": "函数定义",
        "lines": [
          {
            "tokens": [
              {
                "text": "bool",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " is_valid_age",
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
                "text": "age",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " >=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 0",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " &&",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " age",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " <=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " 120",
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
                "text": "return",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "is_valid_age",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "25",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ?",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"true\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " :",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"false\"",
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
      }
    ]
  },
  {
    "id": 12,
    "title": "写作",
    "subtitle": "(12/13)",
    "stepsText": [
      "第十二个例子：字符计数",
      "🧱 看整体：遍历统计字符",
      "✂️ 看细节：初始化计数器、遍历、条件累加",
      "🔍 看逻辑：遇到目标字符则count+1",
      "🏷️ 词性：if判断与for遍历",
      "🧠 理解：计数是数据统计的基础"
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
                "text": "text",
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
                "text": "int",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " i",
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
              },
              {
                "text": " text",
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
                "text": " !=",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " '\\0'",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ";",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " ++",
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
                "text": "text",
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
              }
            ],
            "indent": 2
          },
          {
            "tokens": [
              {
                "text": "count",
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
              }
            ],
            "indent": 3
          },
          {
            "tokens": [
              {
                "text": "}",
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
        "title": "使用示例",
        "lines": [
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
                "text": "\"%d\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
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
      }
    ]
  },
  {
    "id": 13,
    "title": "写作",
    "subtitle": "(13/13)",
    "stepsText": [
      "第十三个例子：在同一次程序运行中写入记事本，再重新打开读回",
      "🧱 看整体：用w模式写入并关闭，再用r模式读取并关闭",
      "✂️ 看细节：先检查文件是否打开成功，再用文件流写入或读取",
      "🔍 看逻辑：fprintf写入文字，fgets把读到的一行放进text数组",
      "🏷️ 词性：FILE是文件流类型，fopen打开，fprintf写入，fgets读取，fclose关闭",
      "🧠 理解：每次使用后用fclose关闭；本例在同一次运行中完成写入和读回"
    ],
    "blocks": [
      {
        "title": "写入记事本并关闭",
        "lines": [
          {
            "tokens": [
              {
                "text": "char",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " text",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": "[",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "32",
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
          },
          {
            "tokens": [
              {
                "text": "FILE",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": " *",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " fopen",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"w\"",
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
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " NULL",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": " 1",
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
                "text": "fprintf",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"Hello, C!\\n\"",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " <",
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
            "indent": 0
          },
          {
            "tokens": [
              {
                "text": "fclose",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
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
                "text": "return",
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
                "text": "fclose",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " !=",
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
                "text": " 1",
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
        "title": "重新打开、读回并关闭",
        "lines": [
          {
            "tokens": [
              {
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " =",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " fopen",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " \"r\"",
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
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": " ==",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " NULL",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": " 1",
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
                "text": "fgets",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "text",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ",",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " sizeof",
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
                "text": " file",
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
                "text": " NULL",
                "type": "系统定义",
                "colorClass": "text-purple-600"
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
                "text": "fclose",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
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
                "text": "return",
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
                "text": ",",
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
                "text": "fclose",
                "type": "系统定义",
                "colorClass": "text-purple-600"
              },
              {
                "text": "(",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": "file",
                "type": "文本内容",
                "colorClass": "text-green-700"
              },
              {
                "text": ")",
                "type": "操作符号",
                "colorClass": "text-red-500"
              },
              {
                "text": " !=",
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
                "text": " 1",
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
  }
];
