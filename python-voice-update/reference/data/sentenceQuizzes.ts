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
    id: 1,
    title: "🧠 造句测验",
    subtitle: "(1/14)",
    description: "掌握控制电脑逻辑的句型",
    tag: "句式选择",
    question: "如果你想让电脑\"一直做某件事，直到做完为止\"，应该用哪个句式？",
    correctIndex: 2,
    codeVisual: {
      type: 'emoji',
      content: '🔁'
    },
    options: [
      "if (如果)",
      "def (定义)",
      "for / while (循环)",
      "class (分类)"
    ],
    explanations: [
      "不对哦～if 是条件判断，只执行一次。想\"一直做\"要用循环！",
      "不对哦～def 是定义函数的，不能让代码重复执行。",
      "正确！for 和 while 都是循环语句，能让代码重复执行，直到条件不满足为止。",
      "不对哦～class 是定义类的，和重复执行没有关系。"
    ]
  },
  {
    id: 2,
    title: "🧠 造句测验",
    subtitle: "(2/14)",
    description: "理解代码的格式规则",
    tag: "语法规则",
    question: "为什么 'if' 句子的下一行通常会向右缩进（空几格）？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      content: 'if ok:\n    print("Yes")',
      lines: [
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " ok", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"Yes\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "表示从属关系：这一行归 if 管",
      "只是为了排版好看",
      "键盘坏了多按了空格"
    ],
    explanations: [
      "正确！缩进在 Python 中表示从属关系，缩进的代码属于上面的 if/for/def 等语句。",
      "不对哦～在 Python 中缩进不只是为了美观，它有实际意义，表示代码的层级关系。",
      "不对哦～Python 的缩进是语法规则，不是多按的空格，它表示代码块的从属关系。"
    ]
  },
  {
    id: 3,
    title: "🧠 造句测验",
    subtitle: "(3/14)",
    description: "理解列表的定义和使用",
    tag: "数据结构",
    question: "下面哪个语句正确定义了一个列表？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'fruits ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= [', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"苹果", "香蕉", "橘子"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ']', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "fruits = (\"苹果\", \"香蕉\", \"橘子\")",
      "fruits = [\"苹果\", \"香蕉\", \"橘子\"]",
      "fruits = {\"苹果\", \"香蕉\", \"橘子\"}"
    ],
    explanations: [
      "不对哦～圆括号 () 定义的是元组（tuple），不是列表。",
      "正确！方括号 [] 用于定义列表，列表是 Python 中最常用的数据结构之一。",
      "不对哦～花括号 {} 定义的是集合（set）或字典，不是列表。"
    ]
  },
  {
    id: 4,
    title: "🧠 造句测验",
    subtitle: "(4/14)",
    description: "理解变量赋值的顺序",
    tag: "变量赋值",
    question: "执行完这段代码后，x 的值是多少？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'x ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '5', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'x ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'x ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '+ ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '3', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "5",
      "3",
      "8"
    ],
    explanations: [
      "不对哦～第二行 x = x + 3 会把 x 更新为 5 + 3 = 8。",
      "不对哦～x 的最终值是 x + 3 = 5 + 3 = 8，不是 3。",
      "正确！第一行 x = 5，第二行 x = 5 + 3 = 8。赋值语句会更新变量的值。"
    ]
  },
  {
    id: 5,
    title: "🧠 造句测验",
    subtitle: "(5/14)",
    description: "理解条件判断的执行流程",
    tag: "条件判断",
    question: "当 score = 85 时，会输出什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'if', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' score ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '>= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '90', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"优秀"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: 'elif', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' score ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '>= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '60', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"及格"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "优秀",
      "及格",
      "什么都不输出"
    ],
    explanations: [
      "不对哦～85 < 90，所以第一个条件不满足，不会输出\"优秀\"。",
      "正确！85 >= 60 满足 elif 的条件，所以输出\"及格\"。",
      "不对哦～虽然第一个条件不满足，但 85 >= 60 满足 elif 条件，会输出\"及格\"。"
    ]
  },
  {
    id: 6,
    title: "🧠 造句测验",
    subtitle: "(6/14)",
    description: "理解函数定义的基本结构",
    tag: "函数定义",
    question: "下面哪个是正确的函数定义？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'def', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' say_hello', type: '文本内容', colorClass: 'text-green-700' },
            { text: '():', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"你好！"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "def say_hello():\n    print(\"你好！\")",
      "function say_hello():\n    print(\"你好！\")",
      "def say_hello()\n    print(\"你好！\")"
    ],
    explanations: [
      "正确！Python 用 def 关键字定义函数，函数名后面需要括号和冒号。",
      "不对哦～Python 用 def 而不是 function 来定义函数。",
      "不对哦～函数定义的末尾需要冒号 :，这里漏掉了。"
    ]
  },
  {
    id: 7,
    title: "🧠 造句测验",
    subtitle: "(7/14)",
    description: "理解 while 循环的终止条件",
    tag: "循环控制",
    question: "这个循环什么时候会停止？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'count ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '0', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'while', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' count ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '< ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '5', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'count ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'count ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '+ ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '1', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "永远不会停止",
      "当count等于5时停止",
      "当count大于等于5时停止"
    ],
    explanations: [
      "不对哦～因为 count 每次加1，最终会大于等于 5，条件不满足循环就会停止。",
      "不对哦～当 count 等于 5 时，count < 5 为 False，循环刚好停止，但其实是\"大于等于5\"时停止。",
      "正确！当 count 达到 5 时，count < 5 为 False，条件不满足，循环停止。"
    ]
  },
  {
    id: 8,
    title: "🧠 造句测验",
    subtitle: "(8/14)",
    description: "理解函数参数传递",
    tag: "参数传递",
    question: "调用 greet('小明') 后会输出什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'def', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' greet', type: '文本内容', colorClass: 'text-green-700' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'name', type: '文本内容', colorClass: 'text-green-700' },
            { text: '):', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '("你好，" ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '+ ', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'name', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "你好，name",
      "你好，小明",
      "会报错"
    ],
    explanations: [
      "不对哦～参数 name 会被实际传入的值 '小明' 替换，不会输出字面量 'name'。",
      "正确！调用 greet('小明') 时，name = '小明'，所以输出 '你好，小明'。",
      "不对哦～这个代码完全正确，不会报错。参数传递是 Python 的基本功能。"
    ]
  },
  {
    id: 9,
    title: "🧠 造句测验",
    subtitle: "(9/14)",
    description: "掌握列表方法",
    tag: "列表操作",
    question: "执行后，numbers列表的内容是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'numbers ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= [', type: '操作符号', colorClass: 'text-red-500' },
            { text: '1, 2, 3', type: '文本内容', colorClass: 'text-green-700' },
            { text: ']', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'numbers', type: '文本内容', colorClass: 'text-green-700' },
            { text: '.append', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '4', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "[4]"
    ],
    explanations: [
      "不对哦～.append(4) 会在列表末尾添加 4，所以不再是原来的 [1, 2, 3]。",
      "正确！append(4) 把 4 添加到列表末尾，结果是 [1, 2, 3, 4]。",
      "不对哦～.append() 是添加元素，不是替换整个列表，原有元素还在。"
    ]
  },
  {
    id: 10,
    title: "🧠 造句测验",
    subtitle: "(10/14)",
    description: "理解字符串格式化",
    tag: "f-string",
    question: "f-string格式化输出的结果是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'name ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"小红"', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'age ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '18', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'f"姓名：{name}，年龄：{age}"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "姓名：name，年龄：age",
      "姓名：小红，年龄：18",
      "会报错"
    ],
    explanations: [
      "不对哦～f-string 中 {name} 和 {age} 会被变量的值替换，不会输出变量名。",
      "正确！f-string 会把 {name} 替换为 '小红'，{age} 替换为 18。",
      "不对哦～f-string 是 Python 3.6+ 的标准功能，这个代码完全正确。"
    ]
  },
  {
    id: 11,
    title: "🧠 造句测验",
    subtitle: "(11/14)",
    description: "掌握多条件判断",
    tag: "elif判断",
    question: "当 score = 45 时，会输出什么？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'if', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' score ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '>= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '90', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"优秀"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: 'elif', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' score ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '>= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '60', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"良好"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: 'else', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"不及格"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "优秀",
      "良好",
      "不及格"
    ],
    explanations: [
      "不对哦～45 < 90，第一个条件不满足。",
      "不对哦～45 < 60，elif 条件也不满足。",
      "正确！45 不满足任何 if 或 elif 条件，所以执行 else 分支，输出 \"不及格\"。"
    ]
  },
  {
    id: 12,
    title: "🧠 造句测验",
    subtitle: "(12/14)",
    description: "找出代码中的语法错误",
    tag: "改病句",
    question: "这段代码有什么问题？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'if', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' score ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '> ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '60', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"及格"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 1
        }
      ]
    },
    options: [
      "print 拼写错误",
      "if 语句末尾缺少冒号 :",
      "缩进不正确"
    ],
    explanations: [
      "不对哦～print 的拼写是正确的，问题在别处。",
      "正确！if 语句末尾必须有冒号 :，这里漏掉了。正确写法是 if score > 60:",
      "不对哦～缩进是正确的，print 确实应该缩进。问题是 if 语句末尾缺少冒号。"
    ]
  },
  {
    id: 13,
    title: "🧠 造句测验",
    subtitle: "(13/14)",
    description: "理解代码缩进的重要性",
    tag: "改病句",
    question: "这段代码运行后会发生什么？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'if', type: '系统定义', colorClass: 'text-purple-600' },
            { text: ' True', type: '文本内容', colorClass: 'text-green-700' },
            { text: ':', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'print', type: '系统定义', colorClass: 'text-purple-600' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"Hello"', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "报错：IndentationError（缩进错误）",
      "输出 Hello",
      "什么都不输出"
    ],
    explanations: [
      "正确！if 语句后面的代码必须缩进，这里 print 没有缩进，会报 IndentationError。",
      "不对哦～虽然条件是 True，但 print 没有缩进，Python 不知道它属于 if，会报错。",
      "不对哦～代码不会正常运行，因为缩进错误会导致语法错误。"
    ]
  },
  {
    id: 14,
    title: "🧠 造句测验",
    subtitle: "(14/14)",
    description: "识别常见的拼写错误",
    tag: "改病句",
    question: "这段代码为什么会报错？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      lines: [
        {
          tokens: [
            { text: 'name ', type: '文本内容', colorClass: 'text-green-700' },
            { text: '= ', type: '操作符号', colorClass: 'text-red-500' },
            { text: '"小明"', type: '文本内容', colorClass: 'text-green-700' }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: 'prinnt', type: '文本内容', colorClass: 'text-green-700' },
            { text: '(', type: '操作符号', colorClass: 'text-red-500' },
            { text: 'name', type: '文本内容', colorClass: 'text-green-700' },
            { text: ')', type: '操作符号', colorClass: 'text-red-500' }
          ],
          indent: 0
        }
      ]
    },
    options: [
      "name 变量未定义",
      "字符串格式错误",
      "print 拼写成了 prinnt"
    ],
    explanations: [
      "不对哦～name 在第一行已经定义了，问题不在这里。",
      "不对哦～字符串 \"小明\" 的格式是正确的。",
      "正确！print 被错误地拼写成了 prinnt（多了一个 n），Python 不认识这个名字，会报 NameError。"
    ]
  }
];
