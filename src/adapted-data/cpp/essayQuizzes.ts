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
    "id": 1,
    "title": "🧠 写作测验",
    "subtitle": "(1/11)",
    "description": "学会如何封装功能。",
    "tag": "功能定义",
    "question": "要想把自己写的一段代码打包成一个新功能（函数），下面定义开头应填什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "content": "??? my_func(void) { /* 功能代码 */ }"
    },
    "options": [
      "void（不返回结果的类型）",
      "start（开始）",
      "create（创建）",
      "make（制作）"
    ],
    "explanations": [
      "正确！C++函数定义写返回类型、函数名、参数和大括号。void表示这个函数不返回结果。",
      "不对哦～start不是C++定义函数的关键字，这里需要返回类型void。",
      "不对哦～create不是C++定义函数的关键字，这里需要返回类型void。",
      "不对哦～make不是C++定义函数的关键字，这里需要返回类型void。"
    ]
  },
  {
    "id": 2,
    "title": "🧠 写作测验",
    "subtitle": "(2/11)",
    "description": "理解封装的意义。",
    "tag": "思维提升",
    "question": "为什么我们要把代码写成\"函数\"？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "emoji",
      "content": "🛠️ → 📦"
    },
    "options": [
      "为了让代码看起来更长",
      "为了复用：写一次，以后反复用",
      "为了让电脑运行速度变慢"
    ],
    "explanations": [
      "不对哦～函数的目的不是让代码变长，而是让代码更整洁、可复用。",
      "正确！函数就像工具箱，把常用的代码封装起来，需要时随时调用。",
      "不对哦～函数主要为了组织和复用代码，并不是为了故意变慢。"
    ]
  },
  {
    "id": 3,
    "title": "🧠 写作测验",
    "subtitle": "(3/11)",
    "description": "结合购物车示例：ShoppingCart 像购物车的设计图，cart 是照着图建立的购物车。",
    "tag": "面向对象",
    "question": "ShoppingCart 类与 cart 对象的关系是什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "emoji",
      "content": "🏭 → 🚗"
    },
    "options": [
      "ShoppingCart 是设计类型，cart 是根据该类型建立的对象",
      "类和对象是完全相同的概念",
      "cart 是设计类型，ShoppingCart 是它的一个对象"
    ],
    "explanations": [
      "正确！ShoppingCart 规定购物车有总价数据和加价动作，cart 是按这个定义建立的一辆购物车。",
      "不对哦～类像设计图，对象是照着图建立的具体东西。",
      "不对哦～关系说反了；ShoppingCart 是类，cart 才是对象。"
    ]
  },
  {
    "id": 4,
    "title": "🧠 写作测验",
    "subtitle": "(4/11)",
    "description": "掌握参数传递的概念。",
    "tag": "参数理解",
    "question": "函数的参数有什么作用？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "std::string greet(std::string name) { /* 使用名字 */ }"
    },
    "options": [
      "只是装饰，没有实际作用",
      "接收外部传入的数据，让函数更灵活",
      "用来返回结果"
    ],
    "explanations": [
      "不对哦～参数不是装饰，它让函数能处理不同的输入数据。",
      "正确！参数就像函数的\"入口\"，让同一个函数能处理不同的数据。",
      "不对哦～返回结果用的是 return，参数是用来接收输入的。"
    ]
  },
  {
    "id": 5,
    "title": "🧠 写作测验",
    "subtitle": "(5/11)",
    "description": "水果清单示例使用 std::vector，完整程序在开头包含相应头文件。",
    "tag": "头文件",
    "question": "#include <vector> 的作用是什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "content": "#include <vector>"
    },
    "options": [
      "创建一个叫 vector 的水果变量",
      "删除清单里的所有水果",
      "包含 vector 的声明，方便使用这个清单类型"
    ],
    "explanations": [
      "不对哦～#include 是引入头文件，不是创建变量。",
      "不对哦～引入头文件不会删除任何清单内容。",
      "正确！包含 <vector> 后，程序就能使用 std::vector 这个标准清单类型。"
    ]
  },
  {
    "id": 6,
    "title": "🧠 写作测验",
    "subtitle": "(6/11)",
    "description": "理解代码的组织结构。",
    "tag": "代码组织",
    "question": "为什么要把程序分成多个函数，而不是写成一大段？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "emoji",
      "content": "🧩"
    },
    "options": [
      "便于理解、维护和重用",
      "让程序运行更慢",
      "只是个人喜好，没有实际意义"
    ],
    "explanations": [
      "正确！将程序分成小函数，每个函数做一件事，代码更清晰、更容易复用。",
      "不对哦～分函数主要让代码更清晰、更容易维护，不是为了让程序变慢。",
      "不对哦～函数分解是编程的最佳实践，有实际的工程价值。"
    ]
  },
  {
    "id": 7,
    "title": "🧠 写作测验",
    "subtitle": "(7/11)",
    "description": "Student 的构造函数接收 text，并把它存进新对象的 name。",
    "tag": "构造函数",
    "question": "执行 Student student(\"小明\") 创建对象时，构造函数会做什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "emoji",
      "content": "🧬"
    },
    "options": [
      "必须手动再调用一次 Student，才会保存姓名",
      "自动把传入的“小明”存进新对象的 name",
      "把程序中所有学生的姓名都改为“小明”"
    ],
    "explanations": [
      "不对哦～创建对象时就会调用对应的构造函数，不需要再手动调用一次。",
      "正确！构造函数在创建对象时完成准备，把收到的姓名放进这个对象。",
      "不对哦～这里只是在建立 student，并给这个对象填入姓名，不会修改其他学生。"
    ]
  },
  {
    "id": 8,
    "title": "🧠 写作测验",
    "subtitle": "(8/11)",
    "description": "理解模块化编程。",
    "tag": "模块化",
    "question": "模块化编程的主要优点是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "emoji",
      "content": "📦"
    },
    "options": [
      "让代码运行更快",
      "让代码更容易维护和复用",
      "减少内存占用"
    ],
    "explanations": [
      "不对哦～模块化的主要目的不是速度，而是代码组织和复用。",
      "正确！模块化让代码分成独立的部分，每部分可以单独维护和复用。",
      "不对哦～模块化不一定减少内存，它的主要目的是提高代码质量。"
    ]
  },
  {
    "id": 9,
    "title": "🧠 写作测验",
    "subtitle": "(9/11)",
    "description": "记事本示例先写入，离开花括号自动关闭，再重新打开文件读取。",
    "tag": "文件读写",
    "question": "以下代码以什么目的打开文件？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "std::ifstream in(\"note.txt\");"
    },
    "options": [
      "删除文件",
      "读取文件内容",
      "写入文件内容"
    ],
    "explanations": [
      "不对哦～ifstream 是输入文件流，用来读取，不会删除文件。",
      "正确！ifstream 默认以读取方式打开 note.txt；对象离开作用域时自动关闭文件。",
      "不对哦～写文件使用 ofstream；这里的 ifstream 用于读取。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 写作测验",
    "subtitle": "(10/11)",
    "description": "scores 中的三个成绩为70、80、90，循环使用 int& 修改每一项。",
    "tag": "引用修改原值",
    "question": "这个循环结束后，scores 中的三个成绩是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "std::vector<int> scores{70, 80, 90};\nfor (int& score : scores) { score += 5; }"
    },
    "options": [
      "70、80、90",
      "75、85、95",
      "5、5、5"
    ],
    "explanations": [
      "不对哦～循环使用引用，修改会存回原清单。",
      "正确！每个原成绩都增加5分，得到75、85、95。",
      "不对哦～+= 5 是在原成绩上加5，不是把成绩直接设成5。"
    ]
  },
  {
    "id": 11,
    "title": "🧠 写作测验",
    "subtitle": "(11/11)",
    "description": "ShoppingCart 的 total 初始为0，add 会把传入的价格加进 total。",
    "tag": "对象的数据和动作",
    "question": "执行这些语句后，会输出多少总价？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "ShoppingCart cart;\ncart.add(5);\nstd::cout << cart.total;"
    },
    "options": [
      "0",
      "5",
      "price"
    ],
    "explanations": [
      "不对哦～虽然总价开始是0，但 add(5) 已经给它增加了5。",
      "正确！add(5) 修改这辆购物车的总价，0加5得到5。",
      "不对哦～price 是方法接收价格时使用的参数名，输出的是对象保存的数值。"
    ]
  }
];
