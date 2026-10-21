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
      "void greet(void)（函数）",
      "for / while（循环）",
      "struct（定义资料结构）"
    ],
    "explanations": [
      "不对哦～if 只选择本次是否执行，重复执行需要循环。",
      "不对哦～函数定义封装动作，本身不会重复调用。",
      "正确！for 和 while 都能按条件重复执行代码。",
      "不对哦～struct 定义资料类型，不会自动重复执行代码。"
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
      "content": "if (ok) {\n    puts(\"Yes\");\n}",
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
              "text": "\"Yes\"",
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
      ]
    },
    "options": [
      "帮助读者看出从属层次；语法归属由花括号确定",
      "缩进本身就能替代花括号定义多语句块",
      "因为键盘坏了多按空格"
    ],
    "explanations": [
      "正确！C 用花括号组织多语句块，缩进使从属层次更易读。",
      "不对哦～C 的空白缩进不能替代花括号；缩进主要表达排版层次。",
      "不对哦～缩进是有意保持一致的代码排版，帮助读者理解层次。"
    ]
  },
  {
    "id": 3,
    "title": "🧠 造句测验",
    "subtitle": "(3/14)",
    "description": "理解数组清单的定义和使用",
    "tag": "数据结构",
    "question": "哪个语句正确建立三个字符串的数组清单？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "lines": [
        {
          "tokens": [
            {
              "text": "const",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "char",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "*",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
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
      "const char *fruits[] = (\"苹果\", \"香蕉\", \"橘子\");",
      "const char *fruits[] = {\"苹果\", \"香蕉\", \"橘子\"};",
      "int fruits[] = {\"苹果\", \"香蕉\", \"橘子\"};"
    ],
    "explanations": [
      "不对哦～这里需要花括号初始化多个元素，圆括号里的逗号表达式不能替代清单。",
      "正确！每个元素是指向字符串的 const char *，数组用花括号初始化。",
      "不对哦～整数元素类型不能接收这些字符串。"
    ]
  },
  {
    "id": 4,
    "title": "🧠 造句测验",
    "subtitle": "(4/14)",
    "description": "理解变量赋值的顺序",
    "tag": "变量赋值",
    "question": "执行完这段代码后，x 的值是多少？",
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
              "text": "x",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "5",
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
              "text": "x",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "x",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "+",
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
            }
          ]
        }
      ]
    },
    "options": [
      "5",
      "3",
      "8"
    ],
    "explanations": [
      "不对哦～第二行 x = x + 3 会把 x 更新为 5 + 3 = 8。",
      "不对哦～x 的最终值是 x + 3 = 5 + 3 = 8，不是 3。",
      "正确！第一行 x = 5，第二行 x = 5 + 3 = 8。赋值语句会更新变量的值。"
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
              "text": "\"优秀\"",
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
              "text": "\"及格\"",
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
              "text": "void",
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
              "text": "\"你好！\"",
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
      ]
    },
    "options": [
      "void say_hello(void) {\n    puts(\"你好！\");\n}",
      "function say_hello(void) {\n    puts(\"你好！\");\n}",
      "void say_hello(void) :\n    puts(\"你好！\");\n}"
    ],
    "explanations": [
      "正确！C 函数定义要有返回类型、函数名、参数括号和花括号函数体。",
      "不对哦～C 不用 function 作为函数定义关键字，这里应写返回类型 void。",
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
    "description": "理解C的地址值传递与通过指针修改原变量。",
    "tag": "指针参数",
    "question": "已知left为3、right为8，调用swap(&left, &right)后，两个原变量的值是什么？",
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
      ]
    },
    "options": [
      "left为3，right为8",
      "left为8，right为3",
      "只有形参改变，原变量一定不变"
    ],
    "explanations": [
      "不对哦～这里传入了两个原变量的地址，*a和*b会访问并修改原变量。",
      "正确！地址值传给指针参数后，*a和*b交换两个原变量的值，结果是8和3。",
      "不对哦～C的确按值传递地址副本，但通过这个有效地址解引用仍能修改原变量。"
    ]
  },
  {
    "id": 9,
    "title": "🧠 造句测验",
    "subtitle": "(9/14)",
    "description": "理解已讲解的自定义 append：容量足够才追加，并更新有效数量",
    "tag": "列表操作",
    "question": "执行后，numbers 清单的有效元素是什么？",
    "correctIndex": 1,
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
              "text": "numbers",
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
            },
            {
              "text": "int",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "length",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "=",
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
            }
          ]
        },
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
      "不对哦～自定义 append 检查容量 4 足够，在有效末尾追加 4。",
      "正确！第四格保存 4，length 变为 4，有效元素是 1、2、3、4。",
      "不对哦～追加不覆盖前面的三项；C 数组本身也不会自动扩容。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 造句测验",
    "subtitle": "(10/14)",
    "description": "理解字符串格式化",
    "tag": "格式字符串",
    "question": "这段格式化输出的结果是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "lines": [
        {
          "tokens": [
            {
              "text": "const",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "char",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "*",
              "type": "操作符号",
              "colorClass": "text-red-500"
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
              "text": "\"姓名：%s，年龄：%d\\n\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ",",
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
      "不对哦～%s 与 %d 按参数读取值，不输出变量名。",
      "正确！%s 对应 name 字符串，%d 对应 age 整数。",
      "不对哦～占位符与参数类型匹配，这是正确的 printf 用法。"
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
              "text": "\"优秀\"",
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
              "text": "\"良好\"",
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
              "text": "\"不及格\"",
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
              "text": "\"及格\"",
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
      ]
    },
    "options": [
      "puts 拼写错误",
      "if 条件缺少圆括号 ( )",
      "缩进不正确"
    ],
    "explanations": [
      "不对哦～puts 拼写正确，问题在 if 条件的语法。",
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
              "text": "1",
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
              "text": "\"Hello\"",
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
      "正确！C 用花括号包围该分支，虽然没有缩进，条件为真仍会输出 Hello。应补齐缩进提升可读性。",
      "不对哦～C 不把缩进本身当作块边界；这里的花括号已经确定结构。",
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
              "text": "const",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "char",
              "type": "系统定义",
              "colorClass": "text-purple-600"
            },
            {
              "text": "*",
              "type": "操作符号",
              "colorClass": "text-red-500"
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
              "text": "prinntf",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": "(",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "\"%s\\n\"",
              "type": "文本内容",
              "colorClass": "text-green-700"
            },
            {
              "text": ",",
              "type": "操作符号",
              "colorClass": "text-red-500"
            },
            {
              "text": "name",
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
      "name 变量未定义",
      "字符串格式错误",
      "printf 拼写成了 prinntf"
    ],
    "explanations": [
      "不对哦～name 已在上一行定义。",
      "不对哦～字符串引号配对正确。",
      "正确！标准库函数名是 printf，不是 prinntf，严格 C17 编译会诊断未声明的函数。"
    ]
  }
];
