export interface EssayQuizData {
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
  };
  options: string[];
  explanations?: string[];
}

export const essayQuizzes: EssayQuizData[] = [
  {
    id: 1,
    title: "🧠 写作测验",
    subtitle: "(1/11)",
    description: "学会如何封装功能。",
    tag: "功能定义",
    question: "要想把自己写的一段代码打包成一个新功能（函数），第一步是写什么？",
    correctIndex: 0,
    codeVisual: {
      type: 'code',
      content: '??? my_func():'
    },
    options: [
      "def (define)",
      "start (开始)",
      "create (创建)",
      "make (制作)"
    ],
    explanations: [
      "正确！def 是 define（定义）的缩写，是 Python 中定义函数的关键字。",
      "不对哦～Python 没有 start 关键字，定义函数用的是 def。",
      "不对哦～create 不是 Python 的关键字，定义函数用 def。",
      "不对哦～make 不是 Python 的关键字，定义函数用 def。"
    ]
  },
  {
    id: 2,
    title: "🧠 写作测验",
    subtitle: "(2/11)",
    description: "理解封装的意义。",
    tag: "思维提升",
    question: "为什么我们要把代码写成\"函数\"？",
    correctIndex: 1,
    codeVisual: {
      type: 'emoji',
      content: '🛠️ → 📦'
    },
    options: [
      "为了让代码看起来更长",
      "为了复用：写一次，以后反复用",
      "为了让电脑运行速度变慢"
    ],
    explanations: [
      "不对哦～函数的目的不是让代码变长，而是让代码更整洁、可复用。",
      "正确！函数就像工具箱，把常用的代码封装起来，需要时随时调用。",
      "不对哦～函数不会让程序变慢，相反可能更高效，因为避免了重复代码。"
    ]
  },
  {
    id: 3,
    title: "🧠 写作测验",
    subtitle: "(3/11)",
    description: "理解类和对象的概念。",
    tag: "面向对象",
    question: "class（类）和对象的关系是什么？",
    correctIndex: 0,
    codeVisual: {
      type: 'emoji',
      content: '🏭 → 🚗'
    },
    options: [
      "类是模板，对象是根据模板创建的实例",
      "类和对象是完全相同的概念",
      "对象是模板，类是实例"
    ],
    explanations: [
      "正确！类就像图纸，对象是根据图纸造出来的具体产品。",
      "不对哦～类和对象是不同的概念，类是模板，对象是实例。",
      "不对哦～说反了！类是模板，对象是实例，不是反过来。"
    ]
  },
  {
    id: 4,
    title: "🧠 写作测验",
    subtitle: "(4/11)",
    description: "掌握参数传递的概念。",
    tag: "参数理解",
    question: "函数的参数有什么作用？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'def greet(name):'
    },
    options: [
      "只是装饰，没有实际作用",
      "接收外部传入的数据，让函数更灵活",
      "用来返回结果"
    ],
    explanations: [
      "不对哦～参数不是装饰，它让函数能处理不同的输入数据。",
      "正确！参数就像函数的\"入口\"，让同一个函数能处理不同的数据。",
      "不对哦～返回结果用的是 return，参数是用来接收输入的。"
    ]
  },
  {
    id: 5,
    title: "🧠 写作测验",
    subtitle: "(5/11)",
    description: "理解模块导入的意义。",
    tag: "模块化",
    question: "'import math' 的作用是什么？",
    correctIndex: 2,
    codeVisual: {
      type: 'code',
      content: 'import math'
    },
    options: [
      "创建一个新的数学变量",
      "删除数学相关的功能",
      "导入数学库，使用其中的函数"
    ],
    explanations: [
      "不对哦～import math 不是创建变量，而是导入数学模块。",
      "不对哦～import 是导入，不是删除。导入后可以使用 math.sqrt() 等函数。",
      "正确！import math 导入数学库，可以使用平方根、三角函数等数学功能。"
    ]
  },
  {
    id: 6,
    title: "🧠 写作测验",
    subtitle: "(6/11)",
    description: "理解代码的组织结构。",
    tag: "代码组织",
    question: "为什么要把程序分成多个函数，而不是写成一大段？",
    correctIndex: 0,
    codeVisual: {
      type: 'emoji',
      content: '🧩'
    },
    options: [
      "便于理解、维护和重用",
      "让程序运行更慢",
      "只是个人喜好，没有实际意义"
    ],
    explanations: [
      "正确！将程序分成小函数，每个函数做一件事，代码更清晰、更容易复用。",
      "不对哦～分函数不会让程序变慢，相反会让代码更清晰、更容易维护。",
      "不对哦～函数分解是编程的最佳实践，有实际的工程价值。"
    ]
  },
  {
    id: 7,
    title: "🧠 写作测验",
    subtitle: "(7/11)",
    description: "理解类的继承。",
    tag: "类继承",
    question: "以下关于类继承的说法，哪个是正确的？",
    correctIndex: 1,
    codeVisual: {
      type: 'emoji',
      content: '🧬'
    },
    options: [
      "子类不能使用父类的方法",
      "子类可以继承父类的属性和方法",
      "一个类只能有一个子类"
    ],
    explanations: [
      "不对哦～子类可以使用父类的方法，这正是继承的意义所在。",
      "正确！继承让子类自动拥有父类的属性和方法，还可以扩展新功能。",
      "不对哦～一个类可以有多个子类，比如 动物 可以有 狗、猫、鸟 等多个子类。"
    ]
  },
  {
    id: 8,
    title: "🧠 写作测验",
    subtitle: "(8/11)",
    description: "理解模块化编程。",
    tag: "模块化",
    question: "模块化编程的主要优点是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'emoji',
      content: '📦'
    },
    options: [
      "让代码运行更快",
      "让代码更容易维护和复用",
      "减少内存占用"
    ],
    explanations: [
      "不对哦～模块化的主要目的不是速度，而是代码组织和复用。",
      "正确！模块化让代码分成独立的部分，每部分可以单独维护和复用。",
      "不对哦～模块化不一定减少内存，它的主要目的是提高代码质量。"
    ]
  },
  {
    id: 9,
    title: "🧠 写作测验",
    subtitle: "(9/11)",
    description: "理解文件操作。",
    tag: "文件读写",
    question: "以下代码的作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: 'with open(\"data.txt\", \"r\") as file:'
    },
    options: [
      "删除文件",
      "读取文件内容",
      "写入文件内容"
    ],
    explanations: [
      "不对哦～\"r\" 模式是读取，不是删除。删除文件要用 os.remove()。",
      "正确！\"r\" 表示 read（读取），with open 会安全地打开文件并读取内容。",
      "不对哦～写入文件用 \"w\" 或 \"a\" 模式，\"r\" 是读取模式。"
    ]
  },
  {
    id: 10,
    title: "🧠 写作测验",
    subtitle: "(10/11)",
    description: "理解列表推导式。",
    tag: "列表推导",
    question: "列表推导式的主要优点是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: '[i**2 for i in range(5)]'
    },
    options: [
      "运行速度更慢但更清晰",
      "用一行代码简洁地创建列表",
      "只能处理数字列表"
    ],
    explanations: [
      "不对哦～列表推导式通常比 for 循环更快，而且更简洁。",
      "正确！列表推导式是 Python 的优雅写法，一行代码就能创建列表。",
      "不对哦～列表推导式可以处理任何类型的数据，不只是数字。"
    ]
  },
  {
    id: 11,
    title: "🧠 写作测验",
    subtitle: "(11/11)",
    description: "理解装饰器概念。",
    tag: "装饰器",
    question: "装饰器的主要作用是什么？",
    correctIndex: 1,
    codeVisual: {
      type: 'code',
      content: '@decorator'
    },
    options: [
      "美化代码的外观",
      "在不修改函数代码的情况下增加功能",
      "加快函数运行速度"
    ],
    explanations: [
      "不对哦～装饰器不是为了美观，而是为了给函数添加额外功能。",
      "正确！装饰器可以在不改变原函数的情况下，添加日志、计时等功能。",
      "不对哦～装饰器不一定加快速度，它的作用是增强函数功能。"
    ]
  }
];
