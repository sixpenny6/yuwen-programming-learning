// 原版153页的一一对应语言适配；保留21组词/21演示/11测验与原步数。
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
    "id": 1,
    "title": "🧠 组词测验",
    "subtitle": "(1/11)",
    "description": "理解符号连接词语的含义。",
    "tag": "符号理解",
    "question": "在代码 'score = 100' 中，等号 '=' 的含义是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "score = 100",
      "tokens": [
        {
          "text": "score",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "=",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "100",
          "type": "文本内容",
          "colorClass": "text-green-700"
        }
      ]
    },
    "options": [
      "数学里的相等 (左边等于右边)",
      "给值动作：把右边的 100 放进左边的 score 盒子里",
      "没有任何意义"
    ],
    "explanations": [
      "不对哦～数学里的相等用两个等号 ==，单个 = 在编程中是赋值的意思。",
      "正确！单个 = 就像把东西放进盒子，把右边的 100 存到左边的 score 变量里。",
      "不对哦～= 是很重要的赋值符号，表示\"把右边的值给左边\"。"
    ]
  },
  {
    "id": 2,
    "title": "🧠 组词测验",
    "subtitle": "(2/11)",
    "description": "分辨不同类型的词组功能。",
    "tag": "词组类型",
    "question": "下面哪个词组是在让电脑\"做算术\"？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "emoji",
      "content": "🧮"
    },
    "options": [
      "total + 1",
      "std::cout << \"Hello\"",
      "score > 60"
    ],
    "explanations": [
      "正确！total + 1 是算术表达式，计算 total 加1的结果。",
      "不对哦～这一项是输出操作，不是加减乘除。",
      "不对哦～> 比较大小，产生真假判断。"
    ]
  },
  {
    "id": 3,
    "title": "🧠 组词测验",
    "subtitle": "(3/11)",
    "description": "理解逻辑判断的含义。",
    "tag": "逻辑理解",
    "question": "'age > 18' 这个词组的作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "age > 18",
      "tokens": [
        {
          "text": "age",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": ">",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "18",
          "type": "文本内容",
          "colorClass": "text-green-700"
        }
      ]
    },
    "options": [
      "把18赋值给age",
      "判断age是否大于18",
      "打印age的值"
    ],
    "explanations": [
      "不对哦～赋值用单个 =，> 用来比较大小。",
      "正确！age > 18 判断年龄是否大于18，结果为bool类型的true或false。",
      "不对哦～显示年龄需要输出操作；这个词组只做比较。"
    ]
  },
  {
    "id": 4,
    "title": "🧠 组词测验",
    "subtitle": "(4/11)",
    "description": "掌握字符串拼接。",
    "tag": "字符串操作",
    "question": "std::string(\"hello\") + \"world\" 的结果是什么？",
    "correctIndex": 0,
    "codeVisual": {
      "type": "code",
      "content": "std::string(\"hello\") + \"world\"",
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
          "text": ") ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "+ ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "\"world\"",
          "type": "文本内容",
          "colorClass": "text-green-700"
        }
      ]
    },
    "options": [
      "\"helloworld\"（两个词连在一起）",
      "两个词相加得到数字",
      "报错"
    ],
    "explanations": [
      "正确！左侧是std::string对象，+合法连接文本，得到 \"helloworld\"。",
      "不对哦～这里得到字符串，不是数字加法结果。",
      "不对哦～一侧是std::string，拼接合法；两个裸字符串字面量直接相加才不合法。"
    ]
  },
  {
    "id": 5,
    "title": "🧠 组词测验",
    "subtitle": "(5/11)",
    "description": "理解逻辑运算符。",
    "tag": "逻辑运算",
    "question": "'a && b' 表示什么意思？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "a && b",
      "tokens": [
        {
          "text": "a ",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "&& ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "b",
          "type": "文本内容",
          "colorClass": "text-green-700"
        }
      ]
    },
    "options": [
      "a或b有一个为真就行",
      "a和b都必须为真",
      "a和b都必须为假"
    ],
    "explanations": [
      "不对哦～至少一个为真是 || 的意思。",
      "正确！&& 表示并且，两个条件都为真时结果才为真；左边为假时不计算右边。",
      "不对哦～两个都为假时，&& 的结果是假。"
    ]
  },
  {
    "id": 6,
    "title": "🧠 组词测验",
    "subtitle": "(6/11)",
    "description": "掌握函数调用的格式。",
    "tag": "函数调用",
    "question": "name.size() 的作用是什么（name 为 ASCII 字符串）？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "content": "name.size()",
      "tokens": [
        {
          "text": "name",
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
        }
      ]
    },
    "options": [
      "显示 name 的内容",
      "删除 name 变量",
      "获取 name 的长度"
    ],
    "explanations": [
      "不对哦～读取长度不等于输出字符串。",
      "不对哦～读取长度不会删除变量。",
      "正确！size 返回string中的char元素个数；UTF-8中文的字节长度不等于汉字个数。"
    ]
  },
  {
    "id": 7,
    "title": "🧠 组词测验",
    "subtitle": "(7/11)",
    "description": "掌握容器索引访问。",
    "tag": "元素索引",
    "question": "如何访问非空 fruits 向量中的第一个元素？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "content": "fruits[0]",
      "tokens": [
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
          "text": "0",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "]",
          "type": "操作符号",
          "colorClass": "text-red-500"
        }
      ]
    },
    "options": [
      "fruits(1)",
      "fruits[1]",
      "fruits[0]"
    ],
    "explanations": [
      "不对哦～已知fruits是数组或向量，取元素应使用方括号。",
      "不对哦～下标1是第二项；编号从0开始。",
      "正确！下标0访问第一项；还须保证序列不为空。"
    ]
  },
  {
    "id": 8,
    "title": "🧠 组词测验",
    "subtitle": "(8/11)",
    "description": "理解字符串转换函数。",
    "tag": "字符串成员函数",
    "question": "text.empty() 的作用是什么？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "text.empty()",
      "tokens": [
        {
          "text": "text",
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
        }
      ]
    },
    "options": [
      "把字符串改成大写",
      "判断字符串是否没有任何字符",
      "删除字符串中的全部字符"
    ],
    "explanations": [
      "不对哦～empty() 不做大小写转换，而是判断有无字符。",
      "正确！empty() 只检查 std::string 是否为空，返回 bool；它不会修改文字。",
      "不对哦～empty() 只检查有无字符，不会删除文字。"
    ]
  },
  {
    "id": 9,
    "title": "🧠 组词测验",
    "subtitle": "(9/11)",
    "description": "理解从零开始的数字序列。",
    "tag": "数字序列",
    "question": "没有提前退出时，for (int i = 0; i < 5; ++i) 中 i 依次取哪些值？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "for (int i = 0; i < 5; ++i)",
      "tokens": [
        {
          "text": "for ",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        },
        {
          "text": "(",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "int ",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        },
        {
          "text": "i ",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "= ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "0",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "; ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "i ",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "< ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "5",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": "; ",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "++",
          "type": "操作符号",
          "colorClass": "text-red-500"
        },
        {
          "text": "i",
          "type": "文本内容",
          "colorClass": "text-green-700"
        },
        {
          "text": ")",
          "type": "操作符号",
          "colorClass": "text-red-500"
        }
      ]
    },
    "options": [
      "1, 2, 3, 4, 5",
      "0, 1, 2, 3, 4",
      "0, 1, 2, 3, 4, 5"
    ],
    "explanations": [
      "不对哦～初始化从0开始，条件不包含5。",
      "正确！i 从0开始，依次为0、1、2、3、4；到5时条件不成立。",
      "不对哦～i < 5 不包含5，因此是五个值，不是六个。"
    ]
  },
  {
    "id": 10,
    "title": "🧠 组词测验",
    "subtitle": "(10/11)",
    "description": "先看变量声明中的类型名字。",
    "tag": "基础类型",
    "question": "在 int age = 18; 中，age 保存的是什么类型的数据？",
    "correctIndex": 1,
    "codeVisual": {
      "type": "code",
      "content": "int age = 18;",
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
          "text": " 18",
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
    "options": [
      "文字类型 std::string",
      "整数类型 int",
      "真假类型 bool"
    ],
    "explanations": [
      "不对哦～这里声明使用 int；std::string 用来保存文字。",
      "正确！int 是整数类型，age 在这里保存整数18。",
      "不对哦～bool 保存 true 或 false，这里使用的是整数类型 int。"
    ]
  },
  {
    "id": 11,
    "title": "🧠 组词测验",
    "subtitle": "(11/11)",
    "description": "理解break语句。",
    "tag": "循环控制",
    "question": "'break' 语句在循环中的作用是什么？",
    "correctIndex": 2,
    "codeVisual": {
      "type": "code",
      "content": "break",
      "tokens": [
        {
          "text": "break",
          "type": "系统定义",
          "colorClass": "text-purple-600"
        }
      ]
    },
    "options": [
      "暂停程序1秒",
      "跳过本次循环，继续下次",
      "立即退出当前所在的最内层循环"
    ],
    "explanations": [
      "不对哦～break 不负责等待时间，它用于离开循环或switch。",
      "不对哦～跳过本轮用 continue；break 会离开当前最内层循环。",
      "正确！break 立即退出当前最内层循环，然后继续执行循环后面的语句。"
    ]
  }
];
