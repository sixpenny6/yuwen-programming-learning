export interface SentenceQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual?: {
    type: 'code' | 'emoji';
    content?: string;
    lines?: Array<{
      tokens: Array<{
        text: string;
        type: string;
        colorClass: string;
      }>;
      indent?: number;
    }>;
  };
  options: string[];
  explanations?: string[];
}

export const sentenceQuizzes: SentenceQuizData[] = [
  {
    "id": 1,
    "title": "🧠 造句测验",
    "subtitle": "(1/14)",
    "description": "掌握控制电脑逻辑的句型",
    "tag": "句式选择",
    "question": "如果你想让电脑\"一直做某件事，直到做完为止\"，应该用哪个句式？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "emoji",
      "content": "🔁"
    },
    "options": [
      "if（条件判断）",
      "void greet()（函数）",
      "for / while（循环）",
      "class（定义类）"
    ],
    "explanations": [
      "不对哦～if 只选择本次是否执行，重复执行需要循环。",
      "不对哦～函数定义封装动作，本身不会重复调用。",
      "正确！for 和 while 都能按条件重复执行代码。",
      "不对哦～class 定义类型，不会自动重复执行代码。"
    ]
  },
  {
    "id": 2,
    "title": "🧠 造句测验",
    "subtitle": "(2/14)",
    "description": "理解代码的格式规则",
    "tag": "语法规则",
    "question": "为什么 if 花括号内的代码通常向右缩进（空几格）？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "content": "if (ok) {\n    std::cout << \"Yes\\n\";\n}",
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
              "text": "ok",
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
              "text": "\"Yes\\n\"",
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
      ]
    },
    "options": [
      "帮助读者看出从属层次；语法归属由花括号确定",
      "缩进本身就能替代花括号定义多语句块",
      "因为键盘坏了多按空格"
    ],
    "explanations": [
      "正确！C++ 用花括号组织多语句块，缩进使从属层次更易读。",
      "不对哦～C++ 的空白缩进不能替代花括号；缩进主要表达排版层次。",
      "不对哦～缩进是有意保持一致的代码排版，帮助读者理解层次。"
    ]
  },
  {
    "id": 3,
    "title": "🧠 造句测验",
    "subtitle": "(3/14)",
    "description": "理解 vector 清单的定义和使用",
    "tag": "数据结构",
    "question": "哪个语句正确建立三个字符串的 vector 清单？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
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
              "text": "fruits",
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
              "text": "\"橘子\"",
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
      ]
    },
    "options": [
      "std::vector<std::string> fruits = (\"苹果\", \"香蕉\", \"橘子\");",
      "std::vector<std::string> fruits = {\"苹果\", \"香蕉\", \"橘子\"};",
      "std::vector<int> fruits = {\"苹果\", \"香蕉\", \"橘子\"};"
    ],
    "explanations": [
      "不对哦～这里需要花括号初始化多个元素，圆括号里的逗号表达式不能替代清单。",
      "正确！vector<string> 声明字符串序列，花括号列出三个初始元素。",
      "不对哦～整数元素类型不能接收这些字符串。"
    ]
  },
  {
    "id": 4,
    "title": "🧠 造句测验",
    "subtitle": "(4/14)",
    "description": "尝试读取年龄时输入 abc，检查程序怎样处理读取失败。",
    "tag": "输入检查",
    "question": "输入 abc 时，这段代码会做什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
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
      ]
    },
    "options": [
      "输出 年龄: 0",
      "把 abc 作为整数存进 age",
      "进入 else，提示 请输入整数"
    ],
    "explanations": [
      "不对哦～没有成功读到整数，程序不会执行显示年龄的分支。",
      "不对哦～abc 不能按这个整数输入操作读进 age，读取会失败。",
      "正确！if 检查输入是否成功；abc 不能读成整数，所以进入 else 给出提示。"
    ]
  },
  {
    "id": 5,
    "title": "🧠 造句测验",
    "subtitle": "(5/14)",
    "description": "理解条件判断的执行流程",
    "tag": "条件判断",
    "question": "当 score = 85 时，会输出什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
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
              "text": "\"优秀\\n\"",
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
              "text": "\"及格\\n\"",
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
      ]
    },
    "options": [
      "优秀",
      "及格",
      "什么都不输出"
    ],
    "explanations": [
      "不对哦～85 < 90，所以第一个条件不满足，不会输出\"优秀\"。",
      "正确！85 >= 60 满足 else if 的条件，所以输出\"及格\"。",
      "不对哦～虽然第一个条件不满足，但 85 >= 60 满足 else if 条件，会输出\"及格\"。"
    ]
  },
  {
    "id": 6,
    "title": "🧠 造句测验",
    "subtitle": "(6/14)",
    "description": "理解函数定义的基本结构",
    "tag": "函数定义",
    "question": "下面哪个是正确的函数定义？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "lines": [
        {
          "tokens": [
            {
              "text": "void",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "say_hello",
              "type": "文本内容",
              "colorClass": "text-green-700"
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
              "text": "\"你好！\\n\"",
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
      ]
    },
    "options": [
      "void say_hello() {\n    std::cout << \"你好！\\n\";\n}",
      "function say_hello() {\n    std::cout << \"你好！\\n\";\n}",
      "void say_hello() :\n    std::cout << \"你好！\\n\";\n}"
    ],
    "explanations": [
      "正确！C++ 函数定义要有返回类型、函数名、参数括号和花括号函数体。",
      "不对哦～C++ 不用 function 作为函数定义关键字，这里应写返回类型 void。",
      "不对哦～函数体要由花括号包围，不能把左花括号换成冒号。"
    ]
  },
  {
    "id": 7,
    "title": "🧠 造句测验",
    "subtitle": "(7/14)",
    "description": "理解 while 循环的终止条件",
    "tag": "循环控制",
    "question": "这个循环什么时候会停止？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "lines": [
        {
          "tokens": [
            {
              "text": "int",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "count",
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
            }
          ]
        },
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
              "text": "count",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<",
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
              "text": "{",
              "type": "操作符号",
              "colorClass": "text-red-500"
            }
          ]
        },
        {
          "tokens": [
            {
              "text": "count",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "count",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "+",
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
      ]
    },
    "options": [
      "永远不会停止",
      "必须等到 count 变成 6 才停止",
      "当 count >= 5，继续条件为假时停止"
    ],
    "explanations": [
      "不对哦～count 每轮加一，最终使继续条件为假。",
      "不对哦～count 达到 5 时条件就为假，不需要变成 6。",
      "正确！循环仅在 count < 5 时继续；本例最终 count 为 5，之后不再进入循环体。"
    ]
  },
  {
    "id": 8,
    "title": "🧠 造句测验",
    "subtitle": "(8/14)",
    "description": "原成绩是75，调用引用参数函数给它加5分。",
    "tag": "参数传递",
    "question": "int score = 75; 调用 add_bonus(score) 后，原来的 score 是多少？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
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
    "options": [
      "75",
      "80",
      "5"
    ],
    "explanations": [
      "不对哦～int& 表示引用，函数会修改传入的原成绩。",
      "正确！函数通过引用给原成绩加5分，75加5得到80。",
      "不对哦～5是增加的分数，还需要加上原来的75分。"
    ]
  },
  {
    "id": 9,
    "title": "🧠 造句测验",
    "subtitle": "(9/14)",
    "description": "掌握 vector 的末尾追加",
    "tag": "列表操作",
    "question": "执行后，numbers 清单的有效元素是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
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
              "text": "numbers",
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
              "text": "2",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ",",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "3",
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
        },
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
              "text": "4",
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
      ]
    },
    "options": [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "[4]"
    ],
    "explanations": [
      "不对哦～push_back(4) 在原序列末尾追加，不会停留在三项。",
      "正确！push_back(4) 追加一个元素，原有的 1、2、3 保留。",
      "不对哦～追加不是替换，原有元素不会清空。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 造句测验",
    "subtitle": "(10/14)",
    "description": "理解字符串格式化",
    "tag": "流式格式输出",
    "question": "这段格式化输出的结果是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
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
              "text": "name",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "\"小红\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ";",
              "type": "操作符号",
              "colorClass": "text-red-500"
            }
          ]
        },
        {
          "tokens": [
            {
              "text": "int",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "age",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "18",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ";",
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
              "text": "\"姓名：\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "name",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "\"，年龄：\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "age",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "'\\n'",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ";",
              "type": "操作符号",
              "colorClass": "text-red-500"
            }
          ]
        }
      ]
    },
    "options": [
      "姓名：name，年龄：age",
      "姓名：小红，年龄：18",
      "会报错"
    ],
    "explanations": [
      "不对哦～cout 读取 name 和 age 的值，而不是输出变量名。",
      "正确！<< 按顺序连接文字、名字和整数年龄。",
      "不对哦～这是 C++17 支持的标准输出流写法。"
    ]
  },
  {
    "id": 11,
    "title": "🧠 造句测验",
    "subtitle": "(11/14)",
    "description": "掌握多条件判断",
    "tag": "else if 判断",
    "question": "当 score = 45 时，会输出什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
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
              "text": "\"优秀\\n\"",
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
              "text": "\"良好\\n\"",
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
              "text": "\"不及格\\n\"",
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
      ]
    },
    "options": [
      "优秀",
      "良好",
      "不及格"
    ],
    "explanations": [
      "不对哦～45 < 90，第一个条件不满足。",
      "不对哦～45 < 60，else if 条件也不满足。",
      "正确！45 不满足任何 if 或 else if 条件，所以执行 else 分支，输出 \"不及格\"。"
    ]
  },
  {
    "id": 12,
    "title": "🧠 造句测验",
    "subtitle": "(12/14)",
    "description": "找出代码中的语法错误",
    "tag": "改病句",
    "question": "这段代码有什么问题？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "lines": [
        {
          "tokens": [
            {
              "text": "if",
              "type": "系统定义",
              "colorClass": "text-purple-600"
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
              "text": "\"及格\\n\"",
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
      ]
    },
    "options": [
      "cout 拼写错误",
      "if 条件缺少圆括号 ( )",
      "缩进不正确"
    ],
    "explanations": [
      "不对哦～std::cout 拼写正确，问题在 if 条件的语法。",
      "正确！条件必须放在圆括号中，应写成 if (score > 60) { ... }。",
      "不对哦～缩进用于排版，这里的语法问题是 if 条件缺少括号。"
    ]
  },
  {
    "id": 13,
    "title": "🧠 造句测验",
    "subtitle": "(13/14)",
    "description": "区分缩进排版与花括号的语法作用",
    "tag": "改病句",
    "question": "这段代码运行后会发生什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
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
              "text": "true",
              "type": "系统定义",
              "colorClass": "text-purple-600"
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
              "text": "\"Hello\\n\"",
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
          ]
        }
      ]
    },
    "options": [
      "输出 Hello；花括号确定从属关系",
      "报错：没有缩进就不能编译",
      "什么都不输出"
    ],
    "explanations": [
      "正确！C++ 用花括号包围该分支，虽然没有缩进，条件为真仍会输出 Hello。应补齐缩进提升可读性。",
      "不对哦～C++ 不把缩进本身当作块边界；这里的花括号已经确定结构。",
      "不对哦～条件为真，花括号内的输出会执行。"
    ]
  },
  {
    "id": 14,
    "title": "🧠 造句测验",
    "subtitle": "(14/14)",
    "description": "识别常见的拼写错误",
    "tag": "改病句",
    "question": "这段代码为什么会报错？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
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
              "text": "name",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "\"小明\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ";",
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
              "text": "couut",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "name",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "<<",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "'\\n'",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ";",
              "type": "操作符号",
              "colorClass": "text-red-500"
            }
          ]
        }
      ]
    },
    "options": [
      "name 变量未定义",
      "字符串格式错误",
      "cout 拼写成了 couut"
    ],
    "explanations": [
      "不对哦～name 已在上一行定义。",
      "不对哦～字符串引号配对正确。",
      "正确！标准输出流名是 cout，不是 couut，编译器无法找到 std::couut。"
    ]
  }
];
