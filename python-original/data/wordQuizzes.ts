export interface WordQuizData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  question: string;
  correctIndex: number;
  codeVisual?: {
    type: 'code' | 'emoji';
    content: string;
    tokens?: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
  };
  options: string[];
  explanations?: string[];
}

export const wordQuizzes: WordQuizData[] = [
  {
    id: 1,
    title: "🧠 组词测验",
    subtitle: "(1/11)",
    description: "理解符号连接词语的含义。",
    tag: "符号理解",
    question: "在代码 'score = 100' 中，等号 '=' 的含义是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'score = 100',
      tokens: [
        { text: "score", type: "文本内容", colorClass: "text-green-700" },
        { text: "=", type: "操作符号", colorClass: "text-red-500" },
        { text: "100", type: "文本内容", colorClass: "text-green-700" }
      ]
    },
    options: [
      "数学里的相等 (左边等于右边)",
      "给值动作：把右边的 100 放进左边的 score 盒子里",
      "没有任何意义"
    ],
    explanations: [
      "不对哦～数学里的相等用两个等号 ==，单个 = 在编程中是赋值的意思。",
      "正确！单个 = 就像把东西放进盒子，把右边的 100 存到左边的 score 变量里。",
      "不对哦～= 是很重要的赋值符号，表示\"把右边的值给左边\"。"
    ]
  },
  {
    id: 2,
    title: "🧠 组词测验",
    subtitle: "(2/11)",
    description: "分辨不同类型的词组功能。",
    tag: "词组类型",
    question: "下面哪个词组是在让电脑\"做算术\"？",
    correctIndex: 0,
    codeVisual: {
      type: 'emoji',
      content: '🧮'
    },
    options: [
      "total + 1",
      "print('Hello')",
      "if score > 60"
    ],
    explanations: [
      "正确！total + 1 是算术表达式，让电脑计算 total 加 1 的结果。",
      "不对哦～print('Hello') 是输出操作，不是算术运算。",
      "不对哦～if score > 60 是条件判断，不是算术运算。虽然有比较，但不是做加减乘除。"
    ]
  },
  {
    id: 3,
    title: "🧠 组词测验",
    subtitle: "(3/11)",
    description: "理解逻辑判断的含义。",
    tag: "逻辑理解",
    question: "'age > 18' 这个词组的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'age > 18',
      tokens: [
        { text: 'age', type: '文本内容', colorClass: 'text-green-700' },
        { text: '>', type: '操作符号', colorClass: 'text-red-500' },
        { text: '18', type: '文本内容', colorClass: 'text-green-700' }
      ]
    },
    options: [
      "把18赋值给age",
      "判断age是否大于18",
      "打印age的值"
    ],
    explanations: [
      "不对哦～赋值用单个 = 号，> 是比较符号，用来判断大小关系。",
      "正确！> 是比较运算符，age > 18 会判断 age 是否大于 18，结果是 True 或 False。",
      "不对哦～打印要用 print(age)，这里的 age > 18 是在做大小比较。"
    ]
  },
  {
    id: 4,
    title: "🧠 组词测验",
    subtitle: "(4/11)",
    description: "掌握字符串拼接。",
    tag: "字符串操作",
    question: "'hello' + 'world' 的结果是什么？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      content: "'hello' + 'world'",
      tokens: [
        { text: "'hello'", type: '文本内容', colorClass: 'text-green-700' },
        { text: '+', type: '操作符号', colorClass: 'text-red-500' },
        { text: "'world'", type: '文本内容', colorClass: 'text-green-700' }
      ]
    },
    options: [
      "'helloworld'（两个词连在一起）",
      "两个词相加得到数字",
      "报错"
    ],
    explanations: [
      "正确！字符串用 + 号会拼接在一起，'hello' + 'world' 结果是 'helloworld'。",
      "不对哦～字符串相加不会得到数字，而是把两个字符串拼接起来。",
      "不对哦～两个字符串用 + 号连接是完全合法的，不会报错。"
    ]
  },
  {
    id: 5,
    title: "🧠 组词测验",
    subtitle: "(5/11)",
    description: "理解逻辑运算符。",
    tag: "逻辑运算",
    question: "'a and b' 表示什么意思？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'a and b',
      tokens: [
        { text: 'a', type: '文本内容', colorClass: 'text-green-700' },
        { text: 'and', type: '系统定义', colorClass: 'text-purple-600' },
        { text: 'b', type: '文本内容', colorClass: 'text-green-700' }
      ]
    },
    options: [
      "a或b有一个为真就行",
      "a和b都必须为真",
      "a和b都必须为假"
    ],
    explanations: [
      "不对哦～\"有一个为真就行\"是 or 的意思，and 要求两边都为真。",
      "正确！and 表示\"并且\"，只有当 a 和 b 都为真时，整个表达式才为真。",
      "不对哦～and 要求两边都为真，不是都为假。如果都为假，结果是 False。"
    ]
  },
  {
    id: 6,
    title: "🧠 组词测验",
    subtitle: "(6/11)",
    description: "掌握函数调用的格式。",
    tag: "函数调用",
    question: "'len(name)' 的作用是什么？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      content: 'len(name)',
      tokens: [
        { text: 'len', type: '系统定义', colorClass: 'text-purple-600' },
        { text: '(', type: '操作符号', colorClass: 'text-red-500' },
        { text: 'name', type: '文本内容', colorClass: 'text-green-700' },
        { text: ')', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "打印name的值",
      "删除name变量",
      "获取name的长度"
    ],
    explanations: [
      "不对哦～打印用 print(name)，len(name) 是用来获取长度的。",
      "不对哦～删除变量用 del name，len 是用来获取长度的函数。",
      "正确！len 是 length（长度）的缩写，len(name) 会返回 name 中有多少个字符。"
    ]
  },
  {
    id: 7,
    title: "🧠 组词测验",
    subtitle: "(7/11)",
    description: "掌握列表索引访问。",
    tag: "列表索引",
    question: "如何访问列表中的第一个元素？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      content: 'fruits[0]',
      tokens: [
        { text: 'fruits', type: '文本内容', colorClass: 'text-green-700' },
        { text: '[', type: '操作符号', colorClass: 'text-red-500' },
        { text: '0', type: '文本内容', colorClass: 'text-green-700' },
        { text: ']', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "list(1)",
      "list[1]",
      "list[0]"
    ],
    explanations: [
      "不对哦～list(1) 是创建列表的语法，不是访问元素。访问元素要用方括号 []。",
      "不对哦～list[1] 访问的是第二个元素，因为索引从 0 开始。第一个要用 [0]。",
      "正确！在 Python 中，索引从 0 开始，所以 list[0] 访问的是第一个元素。"
    ]
  },
  {
    id: 8,
    title: "🧠 组词测验",
    subtitle: "(8/11)",
    description: "理解字符串方法。",
    tag: "字符串转换",
    question: "'.upper()' 方法的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'text.upper()',
      tokens: [
        { text: 'text', type: '文本内容', colorClass: 'text-green-700' },
        { text: '.upper()', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "将字符串转为小写",
      "将字符串转为大写",
      "计算字符串长度"
    ],
    explanations: [
      "不对哦～转小写用的是 .lower()，.upper() 是转大写的。",
      "正确！.upper() 会把字符串中所有字母转成大写，比如 'hello'.upper() 结果是 'HELLO'。",
      "不对哦～计算长度用的是 len()，.upper() 是转大写的方法。"
    ]
  },
  {
    id: 9,
    title: "🧠 组词测验",
    subtitle: "(9/11)",
    description: "理解range函数。",
    tag: "数字序列",
    question: "'range(5)' 会生成哪些数字？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'range(5)',
      tokens: [
        { text: 'range', type: '系统定义', colorClass: 'text-purple-600' },
        { text: '(', type: '操作符号', colorClass: 'text-red-500' },
        { text: '5', type: '文本内容', colorClass: 'text-green-700' },
        { text: ')', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "1, 2, 3, 4, 5",
      "0, 1, 2, 3, 4",
      "0, 1, 2, 3, 4, 5"
    ],
    explanations: [
      "不对哦～range(5) 从 0 开始，不包括 5，所以不会有 1-5。",
      "正确！range(5) 生成从 0 到 4 的数字，共 5 个，不包括 5 本身。",
      "不对哦～range(5) 生成 5 个数字(0-4)，不包括结束值 5。"
    ]
  },
  {
    id: 10,
    title: "🧠 组词测验",
    subtitle: "(10/11)",
    description: "理解type函数。",
    tag: "类型查询",
    question: "'type()' 函数的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'type(x)',
      tokens: [
        { text: 'type', type: '系统定义', colorClass: 'text-purple-600' },
        { text: '(', type: '操作符号', colorClass: 'text-red-500' },
        { text: 'x', type: '文本内容', colorClass: 'text-green-700' },
        { text: ')', type: '操作符号', colorClass: 'text-red-500' }
      ]
    },
    options: [
      "改变变量的类型",
      "查看变量的数据类型",
      "删除变量"
    ],
    explanations: [
      "不对哦～改变类型用的是 int(), str() 等转换函数，type() 只是查看类型。",
      "正确！type() 函数会返回变量的数据类型，比如 int、str、list 等。",
      "不对哦～删除变量用 del，type() 是用来查看类型的。"
    ]
  },
  {
    id: 11,
    title: "🧠 组词测验",
    subtitle: "(11/11)",
    description: "理解break语句。",
    tag: "循环控制",
    question: "'break' 语句在循环中的作用是什么？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      content: 'break',
      tokens: [
        { text: 'break', type: '系统定义', colorClass: 'text-purple-600' }
      ]
    },
    options: [
      "暂停程序1秒",
      "跳过本次循环，继续下次",
      "立即退出整个循环"
    ],
    explanations: [
      "不对哦～暂停程序要用 time.sleep(1)，break 是退出循环的意思。",
      "不对哦～跳过本次循环继续下次用的是 continue，break 会直接退出整个循环。",
      "正确！break 会立即终止当前所在的循环，不再执行剩余的循环次数。"
    ]
  }
];
