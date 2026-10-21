export interface LiteracyQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual: {
    type: 'code' | 'emoji';
    content?: string;
    tokens?: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
  };
  options: string[];
  explanations?: string[];
}

export const literacyQuizzes: LiteracyQuizData[] = [
  {
    id: 1,
    title: "🧠 识字测验",
    subtitle: "(1/11)",
    description: "巩固一下关于\"代码积木\"的分类知识。",
    tag: "概念辨析",
    question: "下面的代码中，紫色的 'if' 属于哪一类字？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'if', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "固定指令：电脑规定的，不能改",
      "具体数据：我们可以随意修改",
      "连接符号：用来做数学运算"
    ],
    explanations: [
      "正确！if 是 Python 的保留关键字，属于系统定义的固定指令，我们不能把它当变量名使用。",
      "不对哦～if 不是数据，它是一个判断指令。数据是像数字、文字这样可以修改的内容。",
      "不对哦～if 不是运算符号，它是用来做条件判断的关键字。像 + - * / 才是运算符号。"
    ]
  },
  {
    id: 2,
    title: "🧠 识字测验",
    subtitle: "(2/11)",
    description: "考验你对指令规则的理解。",
    tag: "规则判断",
    question: "如果我们想在屏幕上显示文字，应该使用哪个指令？",
    correctIndex: 1,
    codeVisual: {
      type: 'emoji',
      content: '🖥️'
    },
    options: [
      "show (展示)",
      "print (打印/显示)",
      "write (书写)"
    ],
    explanations: [
      "不对哦～Python 里没有 show 这个内置指令。虽然英文意思接近，但编程语言有自己的规定。",
      "正确！print 是 Python 中用来在屏幕上显示内容的函数，就像打印机把内容\"打印\"出来一样。",
      "不对哦～write 通常用于写入文件，不是显示到屏幕。想显示内容要用 print。"
    ]
  },
  {
    id: 3,
    title: "🧠 识字测验",
    subtitle: "(3/11)",
    description: "理解关键字的作用。",
    tag: "关键字识别",
    question: "下面哪个是用来定义函数的关键字？",
    correctIndex: 0,
    codeVisual: {
      type: 'emoji',
      content: '📦'
    },
    options: [
      "def",
      "fun",
      "function"
    ],
    explanations: [
      "正确！def 是 define（定义）的缩写，在 Python 中专门用来定义函数。",
      "不对哦～fun 不是 Python 的关键字。虽然函数很有趣(fun)，但定义函数要用 def。",
      "不对哦～function 是 JavaScript 中定义函数的关键字，Python 用的是更简短的 def。"
    ]
  },
  {
    id: 4,
    title: "🧠 识字测验",
    subtitle: "(4/11)",
    description: "区分不同类型的符号。",
    tag: "符号分类",
    question: "'=' 符号在 Python 中表示什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: '=', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "判断相等",
      "赋值（把右边的值给左边）",
      "不等于"
    ],
    explanations: [
      "不对哦～判断相等要用两个等号 ==，单个等号 = 是赋值的意思。",
      "正确！单个等号 = 是赋值符号，意思是\"把右边的值放进左边的盒子里\"。",
      "不对哦～不等于是 !=，单个等号 = 表示赋值操作。"
    ]
  },
  {
    id: 5,
    title: "🧠 识字测验",
    subtitle: "(5/11)",
    description: "认识循环关键字。",
    tag: "循环理解",
    question: "'for' 关键字的作用是什么？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'for', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "判断条件",
      "定义函数",
      "重复执行代码"
    ],
    explanations: [
      "不对哦～判断条件用的是 if，for 是用来做循环的。",
      "不对哦～定义函数用的是 def，for 是用来重复执行代码的循环关键字。",
      "正确！for 是循环关键字，可以让一段代码重复执行多次，比如遍历列表中的每个元素。"
    ]
  },
  {
    id: 6,
    title: "🧠 识字测验",
    subtitle: "(6/11)",
    description: "理解注释的作用。",
    tag: "代码注释",
    question: "'#' 符号在代码中的作用是什么？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: '#', type: '注释', colorClass: 'text-slate-400' },
        { text: ' 这是注释', type: '注释', colorClass: 'text-slate-400' }
      ]
    },
    options: [
      "写注释说明，不会被执行",
      "表示数字",
      "连接两个变量"
    ],
    explanations: [
      "正确！# 后面的内容是注释，电脑会忽略它，是给程序员自己看的说明文字。",
      "不对哦～# 在 Python 中不表示数字，它是注释符号。数字直接写就可以了。",
      "不对哦～# 不能连接变量，它是注释符号。连接字符串用 +，连接变量要用逗号或格式化。"
    ]
  },
  {
    id: 7,
    title: "🧠 识字测验",
    subtitle: "(7/11)",
    description: "认识输入函数。",
    tag: "输入函数",
    question: "'input()' 函数的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'input', type: '系统定义', colorClass: 'text-purple-600' },
        { text: '()', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "向屏幕输出信息",
      "从键盘接收用户输入",
      "定义一个函数"
    ],
    explanations: [
      "不对哦～输出信息用的是 print，input 是用来接收用户输入的。",
      "正确！input 函数会暂停程序，等待用户从键盘输入内容，然后把输入的内容返回。",
      "不对哦～定义函数用的是 def，input 是 Python 内置的输入函数。"
    ]
  },
  {
    id: 8,
    title: "🧠 识字测验",
    subtitle: "(8/11)",
    description: "认识条件判断关键字。",
    tag: "条件判断",
    question: "'if' 关键字表示什么意思？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'if', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "如果，用于条件判断",
      "循环，用于重复执行",
      "定义，用于创建函数"
    ],
    explanations: [
      "正确！if 就是\"如果\"的意思，用来做条件判断。如果条件成立，就执行下面的代码。",
      "不对哦～循环用的是 for 或 while，if 是用来做条件判断的。",
      "不对哦～定义函数用的是 def，if 是用来做\"如果...就...\"的条件判断。"
    ]
  },
  {
    id: 9,
    title: "🧠 识字测验",
    subtitle: "(9/11)",
    description: "理解else的作用。",
    tag: "条件分支",
    question: "'else' 关键字的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'else', type: '系统定义', colorClass: 'text-purple-600' },
        { text: ':', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "开始一个新的循环",
      "当if条件不满足时执行",
      "结束程序运行"
    ],
    explanations: [
      "不对哦～开始循环用 for 或 while，else 是配合 if 使用的\"否则\"分支。",
      "正确！else 的意思是\"否则\"，当 if 的条件不满足时，就会执行 else 下面的代码。",
      "不对哦～结束程序可以用 exit() 或 sys.exit()，else 是条件判断的\"否则\"分支。"
    ]
  },
  {
    id: 10,
    title: "🧠 识字测验",
    subtitle: "(10/11)",
    description: "理解return语句。",
    tag: "函数返回",
    question: "'return' 语句的主要作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'return', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "打印结果到屏幕",
      "从函数中返回值",
      "重复执行代码"
    ],
    explanations: [
      "不对哦～打印到屏幕用 print，return 是用来从函数中返回结果的。",
      "正确！return 的意思是\"返回\"，它会把一个值从函数中送出来，供外部使用。",
      "不对哦～重复执行用 for 或 while 循环，return 是用来返回函数结果的。"
    ]
  },
  {
    id: 11,
    title: "🧠 识字测验",
    subtitle: "(11/11)",
    description: "认识导入关键字。",
    tag: "模块导入",
    question: "'import' 关键字的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      tokens: [
        { text: 'import', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "定义新函数",
      "导入外部模块或库",
      "创建变量"
    ],
    explanations: [
      "不对哦～定义函数用 def，import 是用来导入别人写好的代码库的。",
      "正确！import 的意思是\"导入\"，可以引入 Python 自带的或第三方的功能模块，比如 import math。",
      "不对哦～创建变量直接用 变量名 = 值 就可以，import 是用来导入模块的。"
    ]
  }
];
