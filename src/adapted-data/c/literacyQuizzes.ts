import type {LiteracyQuizData} from '../../original/data/literacyQuizzes';
export const literacyQuizzes:LiteracyQuizData[]= [
  {
    "id": 1,
    "title": "🧠 识字测验",
    "subtitle": "(1/11)",
    "description": "巩固一下关于\"代码积木\"的分类知识。",
    "tag": "概念辨析",
    "question": "下面的代码中，紫色的 'if' 属于哪一类字？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "if",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "固定指令：电脑规定的，不能改",
      "具体数据：我们可以随意修改",
      "连接符号：用来做数学运算"
    ],
    "explanations": [
      "正确！if 是 C 的保留关键字，属于系统定义的固定指令，我们不能把它当变量名使用。",
      "不对哦～if 不是数据，它是一个判断指令。数据是像数字、文字这样可以修改的内容。",
      "不对哦～if 不是运算符号，它是用来做条件判断的关键字。像 + - * / 才是运算符号。"
    ]
  },
  {
    "id": 2,
    "title": "🧠 识字测验",
    "subtitle": "(2/11)",
    "description": "考验你对指令规则的理解。",
    "tag": "规则判断",
    "question": "如果我们想在屏幕上显示文字，应该使用哪个指令？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "emoji",
      "content": "🖥️"
    },
    "options": [
      "show (展示)",
      "printf（格式化输出函数）",
      "write (书写)"
    ],
    "explanations": [
      "不对哦～C 的标准控制台输出不使用 show。编程语言有自己的规定。",
      "正确！printf 可以把内容显示在屏幕上，就像把内容“打印”出来。",
      "write 不是这里使用的标准输出写法。想显示内容可以用 printf。"
    ]
  },
  {
    "id": 3,
    "title": "🧠 识字测验",
    "subtitle": "(3/11)",
    "description": "理解关键字的作用。",
    "tag": "关键字识别",
    "question": "下面哪个是正确的函数定义格式？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "emoji",
      "content": "📦"
    },
    "options": [
      "int add(int a, int b) { return a + b; }",
      "fun add(a, b)",
      "function add(a, b)"
    ],
    "explanations": [
      "正确！C 用返回类型、函数名、参数列表和函数体定义函数。这里 int 表示返回整数。",
      "不对哦～fun 不是 C 定义函数的关键字。",
      "不对哦～C 不用 function 这个关键字来定义函数。"
    ]
  },
  {
    "id": 4,
    "title": "🧠 识字测验",
    "subtitle": "(4/11)",
    "description": "区分不同类型的符号。",
    "tag": "符号分类",
    "question": "'=' 符号在 C 中表示什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "=",
          "type": "操作符号",
          "colorClass": "text-red-500"
        }
      ]
    },
    "options": [
      "判断相等",
      "赋值（把右边的值给左边）",
      "不等于"
    ],
    "explanations": [
      "不对哦～判断相等要用两个等号 ==，单个等号 = 是赋值的意思。",
      "正确！单个等号 = 是赋值符号，意思是\"把右边的值放进左边的盒子里\"。",
      "不对哦～不等于是 !=，单个等号 = 表示赋值操作。"
    ]
  },
  {
    "id": 5,
    "title": "🧠 识字测验",
    "subtitle": "(5/11)",
    "description": "认识循环关键字。",
    "tag": "循环理解",
    "question": "'for' 关键字的作用是什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "for",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "判断条件",
      "定义函数",
      "重复执行代码"
    ],
    "explanations": [
      "不对哦～判断条件用的是 if，for 是用来做循环的。",
      "不对哦～定义函数要写返回类型、函数名和参数，for 是循环关键字。",
      "正确！for 是循环关键字，可以让一段代码重复执行多次，比如逐个处理数组中的元素。"
    ]
  },
  {
    "id": 6,
    "title": "🧠 识字测验",
    "subtitle": "(6/11)",
    "description": "理解注释的作用。",
    "tag": "代码注释",
    "question": "'//' 符号在代码中的作用是什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "//",
          "type": "注释",
          "colorClass": "text-slate-400"
        },
        {
          "text": " 这是注释",
          "type": "注释",
          "colorClass": "text-slate-400"
        }
      ]
    },
    "options": [
      "写注释说明，不会被执行",
      "表示数字",
      "连接两个变量"
    ],
    "explanations": [
      "正确！// 到行尾是注释，编译器会忽略，是给程序员自己看的说明文字。",
      "不对哦～// 在 C 中是单行注释的开头，不表示数字。",
      "不对哦～// 不能连接变量，它是单行注释符号。"
    ]
  },
  {
    "id": 7,
    "title": "🧠 识字测验",
    "subtitle": "(7/11)",
    "description": "认识输入函数。",
    "tag": "输入函数",
    "question": "'scanf' 的作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "scanf",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "向屏幕输出信息",
      "从键盘接收用户输入",
      "定义一个函数"
    ],
    "explanations": [
      "不对哦～输出可用 printf，scanf 是用来接收输入的。",
      "正确！scanf 可以从标准输入读取数据；没有数据时通常会等待键盘输入。",
      "不对哦～scanf 是标准库输入函数，不是定义函数的写法。"
    ]
  },
  {
    "id": 8,
    "title": "🧠 识字测验",
    "subtitle": "(8/11)",
    "description": "认识条件判断关键字。",
    "tag": "条件判断",
    "question": "'if' 关键字表示什么意思？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "if",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "如果，用于条件判断",
      "循环，用于重复执行",
      "定义，用于创建函数"
    ],
    "explanations": [
      "正确！if 就是\"如果\"的意思，用来做条件判断。如果条件成立，就执行下面的代码。",
      "不对哦～循环用的是 for 或 while，if 是用来做条件判断的。",
      "不对哦～定义函数需要返回类型、函数名和参数，if 用来做“如果…就…”的条件判断。"
    ]
  },
  {
    "id": 9,
    "title": "🧠 识字测验",
    "subtitle": "(9/11)",
    "description": "理解else的作用。",
    "tag": "条件分支",
    "question": "'else' 关键字的作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "else",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        },
        {
          "text": "{ }",
          "type": "操作符号",
          "colorClass": "text-red-500"
        }
      ]
    },
    "options": [
      "开始一个新的循环",
      "当if条件不满足时执行",
      "结束程序运行"
    ],
    "explanations": [
      "不对哦～开始循环用 for 或 while，else 是配合 if 使用的\"否则\"分支。",
      "正确！else 的意思是\"否则\"，当 if 的条件不满足时，就会执行 else 下面的代码。",
      "不对哦～结束程序可以从 main 中 return，else 是条件判断的“否则”分支。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 识字测验",
    "subtitle": "(10/11)",
    "description": "理解return语句。",
    "tag": "函数返回",
    "question": "'return' 语句的主要作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "return",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "打印结果到屏幕",
      "结束当前函数，并在需要时返回结果",
      "重复执行代码"
    ],
    "explanations": [
      "不对哦～输出到屏幕可用 printf；return 结束函数，不直接显示内容。",
      "正确！return 结束当前函数；有返回值时把结果交给调用者，不返回值的 void 函数可以用 return; 提前结束。",
      "不对哦～重复执行需要 for 或 while；return 会结束本次函数执行。"
    ]
  },
  {
    "id": 11,
    "title": "🧠 识字测验",
    "subtitle": "(11/11)",
    "description": "认识引入头文件的写法。",
    "tag": "头文件引入",
    "question": "'#include' 指令的作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "tokens": [
        {
          "text": "#include",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "定义新函数",
      "引入头文件中的声明",
      "创建变量"
    ],
    "explanations": [
      "不对哦～定义函数要写返回类型、函数名和参数，#include 是预处理指令。",
      "正确！#include 把头文件的内容引入当前源文件。例如 #include <stdio.h> 提供 printf 等声明。",
      "不对哦～创建变量需要声明类型和名字，#include 用来引入头文件。"
    ]
  }
];
