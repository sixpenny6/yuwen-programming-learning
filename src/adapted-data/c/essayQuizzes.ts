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
      "正确！C函数定义写返回类型、函数名、参数和大括号。void表示这个函数不返回结果。",
      "不对哦～start不是C定义函数的关键字，这里需要返回类型void。",
      "不对哦～create不是C定义函数的关键字，这里需要返回类型void。",
      "不对哦～make不是C定义函数的关键字，这里需要返回类型void。"
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
    "description": "理解结构体和具体变量的关系。",
    "tag": "结构体",
    "question": "struct（结构体类型）和具体结构体变量的关系是什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "emoji",
      "content": "🏭 → 🚗"
    },
    "options": [
      "结构体类型是模板，变量是按模板建立的具体数据",
      "结构体类型和每个变量是完全相同的概念",
      "变量是模板，结构体类型是实例"
    ],
    "explanations": [
      "正确！结构体类型像图纸，具体变量按图纸保存各自的数据。",
      "不对哦～类型描述数据结构，变量保存具体的一份数据。",
      "不对哦～说反了！类型是模板，变量是具体的一份数据。"
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
      "content": "void greet(const char *name) { /* 使用参数 */ }"
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
    "description": "理解常用头文件提供声明的作用。",
    "tag": "头文件声明",
    "question": "'#include <stdio.h>' 的作用是什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "content": "#include <stdio.h>"
    },
    "options": [
      "创建一个名叫stdio的变量",
      "删除输入和输出的功能",
      "提供printf、scanf、puts等函数的声明"
    ],
    "explanations": [
      "不对哦～#include <stdio.h>是包含头文件，不是创建变量。",
      "不对哦～包含头文件不是删除功能，它让编译器知道这些函数的声明。",
      "正确！#include <stdio.h>提供printf、scanf、puts等常用输入输出函数的声明。"
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
    "description": "理解通过有效地址修改调用者的变量。",
    "tag": "指针与原变量",
    "question": "函数需要修改main中的int score，哪种做法正确？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "emoji",
      "content": "📍"
    },
    "options": [
      "只复制score的整数值，函数内赋值一定自动传回",
      "把&score传给int *形参，再通过解引用修改score",
      "用printf输出一个新数字就能修改score"
    ],
    "explanations": [
      "不对哦～C按值传递，修改普通int形参只会修改那个副本。",
      "正确！把有效的&score地址值传入指针形参，函数通过解引用访问并修改原变量。",
      "不对哦～printf只输出内容；修改变量需要对相应对象赋值。"
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
    "description": "已知 fopen 的 \"r\" 模式表示只读打开；使用文件前还应检查返回指针是否为 NULL。",
    "tag": "文件读写",
    "question": "以下代码以什么目的打开文件？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "FILE *file = fopen(\"data.txt\", \"r\");"
    },
    "options": [
      "删除文件",
      "读取文件内容",
      "写入文件内容"
    ],
    "explanations": [
      "不对哦～\"r\"模式表示读取，不是删除文件。",
      "正确！fopen的\"r\"模式用来打开文件供读取；检查打开成功后读取，并用fclose关闭。",
      "不对哦～写入使用\"w\"或\"a\"等模式，\"r\"是读取模式。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 写作测验",
    "subtitle": "(10/11)",
    "description": "理解用循环创建数组。",
    "tag": "数组生成",
    "question": "下面的循环主要在做什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "int squares[5];\nfor (int i = 0; i < 5; ++i) squares[i] = i * i;"
    },
    "options": [
      "故意让程序运行得更慢",
      "按统一规则生成0到4的平方数据",
      "只能处理数字，循环不能处理其他数据"
    ],
    "explanations": [
      "不对哦～循环的目的是重复执行生成规则，不是故意变慢。",
      "正确！依次取0、1、2、3、4，算出平方并放入结果，就得到0、1、4、9、16。",
      "不对哦～循环能处理多种数据；这里恰好用整数演示生成规则。"
    ]
  },
  {
    "id": 11,
    "title": "🧠 写作测验",
    "subtitle": "(11/11)",
    "description": "理解固定数组的容量与下标。",
    "tag": "数组容量",
    "question": "int scores[3]可以使用哪些下标访问这三个元素？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "int scores[3] = {80, 90, 85};"
    },
    "options": [
      "只能使用下标1、2、3",
      "可以使用下标0、1、2",
      "有3个元素，所以可以访问scores[3]"
    ],
    "explanations": [
      "不对哦～C数组下标从0开始；下标3已经在这三个元素之外。",
      "正确！容量为3表示三个位置，下标依次是0、1、2。",
      "不对哦～scores[3]是第四个位置，会超出这个数组，不能访问。"
    ]
  }
];
