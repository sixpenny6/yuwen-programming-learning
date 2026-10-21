/** 与原写作讲解13个槽位按同主题对齐。 */
import type {CodePurposeData} from "../../original/components/CodePurposeSlide";

export const essayPurposeSlides: CodePurposeData[] = [
  {
    "id": 1,
    "title": "演示",
    "subtitle": "总价计算函数",
    "code": [
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
    ],
    "mockVars": {
      "price": 50,
      "num": 3
    },
    "purpose": "计算总价：单价乘以数量",
    "purposeIcon": "🧮",
    "expectedBehavior": "total(50, 3) 返回 150"
  },
  {
    "id": 2,
    "title": "演示",
    "subtitle": "水果清单",
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
    ],
    "purpose": "建立可添加内容的水果清单，再按编号读取并查看数量",
    "purposeIcon": "🍎",
    "expectedBehavior": "先输出 苹果 香蕉，再输出清单中的水果数量2"
  },
  {
    "id": 3,
    "title": "演示",
    "subtitle": "把姓名拼进问候语",
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
    ],
    "purpose": "把传入的姓名与问候文字连接，返回一个字符串",
    "purposeIcon": "👋",
    "expectedBehavior": "传入“小明”，得到并输出 你好，小明"
  },
  {
    "id": 4,
    "title": "演示",
    "subtitle": "循环计算平均分",
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
    ],
    "purpose": "用普通循环求总分，确认有成绩后除以数量",
    "purposeIcon": "📊",
    "expectedBehavior": "总分255，成绩数量3，输出平均分85"
  },
  {
    "id": 5,
    "title": "演示",
    "subtitle": "逐个比较找最高分",
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
    ],
    "purpose": "用普通循环逐个比较已知非空的成绩清单，保留最高分",
    "purposeIcon": "🏆",
    "expectedBehavior": "三个成绩85、92、78中，最高分是92"
  },
  {
    "id": 6,
    "title": "演示",
    "subtitle": "把偶数放进新清单",
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
    ],
    "purpose": "遍历原清单，把偶数放进新 vector，再逐个显示",
    "purposeIcon": "🧺",
    "expectedBehavior": "1和3被跳过，2和4进入 evens，输出 2 4"
  },
  {
    "id": 7,
    "title": "演示",
    "subtitle": "连接两段文字",
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
      },
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
    ],
    "purpose": "使用 std::string 的 += 把新文字连接到原文字后面",
    "purposeIcon": "💬",
    "expectedBehavior": "“你好，”接上“小明”，输出 你好，小明"
  },
  {
    "id": 8,
    "title": "演示",
    "subtitle": "文字冒险游戏",
    "code": [
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
    ],
    "mockVars": {
      "choice": "\"右\""
    },
    "purpose": "根据输入选择剧情，让文字冒险持续进行",
    "purposeIcon": "🚪",
    "expectedBehavior": "输入“右”发现宝箱；输入“左”遇到恶龙并结束游戏"
  },
  {
    "id": 9,
    "title": "演示",
    "subtitle": "购物车里的数据和动作",
    "code": [
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
      },
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
    ],
    "purpose": "把总价数据和加价动作写进一个简单类，再建立并使用购物车对象",
    "purposeIcon": "🛒",
    "expectedBehavior": "购物车从0元开始，加入5元和3元，输出 总价: 8"
  },
  {
    "id": 10,
    "title": "演示",
    "subtitle": "给每个成绩加5分",
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
    ],
    "purpose": "在范围循环中用 int& 给原清单逐项加分，再用普通循环显示",
    "purposeIcon": "➕",
    "expectedBehavior": "70、80、90全部加5分，输出 75 85 95"
  },
  {
    "id": 11,
    "title": "演示",
    "subtitle": "创建时填入学生姓名",
    "code": [
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
      },
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
    ],
    "purpose": "用简单构造函数，在创建学生对象时设置姓名",
    "purposeIcon": "👤",
    "expectedBehavior": "创建对象时传入“小明”，随后输出这个对象保存的姓名 小明"
  },
  {
    "id": 12,
    "title": "演示",
    "subtitle": "逐个字符做计数",
    "code": [
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
    ],
    "purpose": "逐个检查英文字符，累计目标字符出现的次数",
    "purposeIcon": "🔢",
    "expectedBehavior": "hello 中的字母 l 出现2次，输出2"
  },
  {
    "id": 13,
    "title": "演示",
    "subtitle": "文件流与自动关闭",
    "code": [
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
    ],
    "purpose": "在当前运行目录自写自读 note.txt，使用作用域让文件流自动关闭",
    "purposeIcon": "📝",
    "expectedBehavior": "先写入“今天学 C++”，关闭输出流后重新读取并显示同一句话；失败时返回1"
  }
];
