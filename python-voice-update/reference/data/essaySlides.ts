export interface EssayBlockData {
  title?: string;
  lines: Array<{
    tokens: Array<{
      text: string;
      type: string;
      colorClass: string;
    }>;
    indent?: number;
  }>;
}

export interface EssaySlideData {
  id: number;
  title: string;
  subtitle: string;
  stepsText: string[];
  blocks: EssayBlockData[];
}

export const essaySlides: EssaySlideData[] = [
{
  id: 1,
  title: "写作",
  subtitle: "(1/13)",
  stepsText: [
    "第一个例子：累加求和",
    "🧱 看整体：定义函数并调用",
    "✂️ 看细节：参数和返回值",
    "🔍 看逻辑：price * num",
    "🏷️ 词性：def、return关键字",
    "🧠 理解：函数封装计算逻辑"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " total", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "price", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " num", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " price ", type: "文本内容", colorClass: "text-green-700" },
            { text: "*", type: "操作符号", colorClass: "text-red-500" },
            { text: " num", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "total", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "50", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " 3", type: "文本内容", colorClass: "text-green-700" },
            { text: "))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 2,
  title: "写作",
  subtitle: "(2/13)",
  stepsText: [
    "第二个例子：检查重复",
    "🧱 看整体：遍历查找重复元素",
    "✂️ 看细节：双层循环比较",
    "🔍 看逻辑：i≠j且相等则重复",
    "🏷️ 词性：for和if关键字",
    "🧠 理解：嵌套循环解决复杂问题"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " has_dup", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "lst", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " i ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " range", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "len", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "lst", type: "文本内容", colorClass: "text-green-700" },
            { text: ")):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " j ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " range", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "i", type: "文本内容", colorClass: "text-green-700" },
            { text: "+", type: "操作符号", colorClass: "text-red-500" },
            { text: "1", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " len", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "lst", type: "文本内容", colorClass: "text-green-700" },
            { text: ")):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " lst", type: "文本内容", colorClass: "text-green-700" },
            { text: "[", type: "操作符号", colorClass: "text-red-500" },
            { text: "i", type: "文本内容", colorClass: "text-green-700" },
            { text: "]", type: "操作符号", colorClass: "text-red-500" },
            { text: " == ", type: "操作符号", colorClass: "text-red-500" },
            { text: "lst", type: "文本内容", colorClass: "text-green-700" },
            { text: "[", type: "操作符号", colorClass: "text-red-500" },
            { text: "j", type: "文本内容", colorClass: "text-green-700" },
            { text: "]:", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 3
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " True", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 3
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " False", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "has_dup", type: "文本内容", colorClass: "text-green-700" },
            { text: "([", type: "操作符号", colorClass: "text-red-500" },
            { text: "1", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "2", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "2", type: "文本内容", colorClass: "text-green-700" },
            { text: "]))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 3,
  title: "写作",
  subtitle: "(3/13)",
  stepsText: [
    "第三个例子：打招呼",
    "🧱 看整体：格式化字符串输出",
    "✂️ 看细节：字符串拼接",
    "🔍 看逻辑：返回'你好，'+name",
    "🏷️ 词性：+号连接字符串",
    "🧠 理解：字符串操作的基本方式"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " greet", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "name", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " \"", type: "操作符号", colorClass: "text-red-500" },
            { text: "你好，", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"", type: "操作符号", colorClass: "text-red-500" },
            { text: " + ", type: "操作符号", colorClass: "text-red-500" },
            { text: "name", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "greet", type: "文本内容", colorClass: "text-green-700" },
            { text: "(\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "小明", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 4,
  title: "写作",
  subtitle: "(4/13)",
  stepsText: [
    "第四个例子：计算平均值",
    "🧱 看整体：求和后除以个数",
    "✂️ 看细节：sum()和len()函数",
    "🔍 看逻辑：总和÷数量=平均",
    "🏷️ 词性：sum和len内置函数",
    "🧠 理解：利用内置函数简化代码"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " average", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " sum", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" },
            { text: " / ", type: "操作符号", colorClass: "text-red-500" },
            { text: "len", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "average", type: "文本内容", colorClass: "text-green-700" },
            { text: "([", type: "操作符号", colorClass: "text-red-500" },
            { text: "80", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " 90", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " 85", type: "文本内容", colorClass: "text-green-700" },
            { text: "]))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 5,
  title: "写作",
  subtitle: "(5/13)",
  stepsText: [
    "第五个例子：查找最大值",
    "🧱 看整体：遍历比较找最大",
    "✂️ 看细节：初始化、遍历、条件更新",
    "🔍 看逻辑：如果n>max，更新max",
    "🏷️ 词性：for循环和if判断",
    "🧠 理解：保留当前最大值的算法思想"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " find_max", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "max_val", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: "[", type: "操作符号", colorClass: "text-red-500" },
            { text: "0", type: "文本内容", colorClass: "text-green-700" },
            { text: "]", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " n ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " nums", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " n", type: "文本内容", colorClass: "text-green-700" },
            { text: ">", type: "操作符号", colorClass: "text-red-500" },
            { text: "max_val", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "max_val", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: "n", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 3
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " max_val", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "find_max", type: "文本内容", colorClass: "text-green-700" },
            { text: "([", type: "操作符号", colorClass: "text-red-500" },
            { text: "3", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "9", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "2", type: "文本内容", colorClass: "text-green-700" },
            { text: "]))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 6,
  title: "写作",
  subtitle: "(6/13)",
  stepsText: [
    "第六个例子：筛选偶数",
    "🧱 看整体：遍历筛选列表",
    "✂️ 看细节：初始化空列表、判断、添加",
    "🔍 看逻辑：num%2==0为偶数",
    "🏷️ 词性：%取模运算符",
    "🧠 理解：条件筛选是数据处理的基础"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " filter_even", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "nums", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "result ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " []", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " n ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " nums", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " n ", type: "文本内容", colorClass: "text-green-700" },
            { text: "%", type: "操作符号", colorClass: "text-red-500" },
            { text: " 2 ", type: "文本内容", colorClass: "text-green-700" },
            { text: "==", type: "操作符号", colorClass: "text-red-500" },
            { text: " 0", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "result", type: "文本内容", colorClass: "text-green-700" },
            { text: ".", type: "操作符号", colorClass: "text-red-500" },
            { text: "append", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "n", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 3
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " result", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "filter_even", type: "文本内容", colorClass: "text-green-700" },
            { text: "([", type: "操作符号", colorClass: "text-red-500" },
            { text: "1", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "2", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "3", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "4", type: "文本内容", colorClass: "text-green-700" },
            { text: "]))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 7,
  title: "写作",
  subtitle: "(7/13)",
  stepsText: [
    "第七个例子：字符串转换",
    "🧱 看整体：字符串方法调用",
    "✂️ 看细节：识别.upper()方法",
    "🔍 看逻辑：返回大写结果",
    "🏷️ 词性：upper内置方法",
    "🧠 理解：字符串有很多内置方法"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " to_upper", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "text", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " text", type: "文本内容", colorClass: "text-green-700" },
            { text: ".", type: "操作符号", colorClass: "text-red-500" },
            { text: "upper", type: "系统定义", colorClass: "text-purple-600" },
            { text: "()", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "to_upper", type: "文本内容", colorClass: "text-green-700" },
            { text: "(\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "hello", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 8,
  title: "写作",
  subtitle: "(8/13)",
  stepsText: [
    "第八个例子：文字冒险游戏",
    "🧱 看整体：用代码写一个互动小说",
    "✂️ 看细节：input获取指令，if判断剧情",
    "🔍 看逻辑：while让游戏持续进行",
    "🏷️ 词性：while循环 + if分支 + input输入",
    "🧠 理解：综合运用所学知识写互动程序"
  ],
  blocks: [
    {
      title: "游戏主循环",
      lines: [
        {
          tokens: [
            { text: "playing ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " True", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "while", type: "系统定义", colorClass: "text-purple-600" },
            { text: " playing", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"你面前有两扇门\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "choice ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " input", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"左/右?\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "剧情分支",
      lines: [
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " choice ", type: "文本内容", colorClass: "text-green-700" },
            { text: "==", type: "操作符号", colorClass: "text-red-500" },
            { text: " \"左\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"遇到恶龙！游戏结束\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "playing ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " False", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "elif", type: "系统定义", colorClass: "text-purple-600" },
            { text: " choice ", type: "文本内容", colorClass: "text-green-700" },
            { text: "==", type: "操作符号", colorClass: "text-red-500" },
            { text: " \"右\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"发现宝箱！获得金币\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        }
      ]
    }
  ]
},
{
  id: 9,
  title: "写作",
  subtitle: "(9/13)",
  stepsText: [
    "第九个例子：简易购物车",
    "🧱 看整体：列表存商品，字典存价格",
    "✂️ 看细节：append添加，for循环累加",
    "🔍 看逻辑：巩固\"组词\"和\"造句\"的组合",
    "🏷️ 词性：list列表 + dict字典 + for循环",
    "🧠 理解：数据结构与逻辑的综合应用"
  ],
  blocks: [
    {
      title: "购物车数据",
      lines: [
        {
          tokens: [
            { text: "prices ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " {", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"苹果\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" },
            { text: " 5", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " \"香蕉\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" },
            { text: " 3", type: "文本内容", colorClass: "text-green-700" },
            { text: "}", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "cart ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " []", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "cart", type: "文本内容", colorClass: "text-green-700" },
            { text: ".", type: "操作符号", colorClass: "text-red-500" },
            { text: "append", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"苹果\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "cart", type: "文本内容", colorClass: "text-green-700" },
            { text: ".", type: "操作符号", colorClass: "text-red-500" },
            { text: "append", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"香蕉\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    },
    {
      title: "计算总价",
      lines: [
        {
          tokens: [
            { text: "total ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 0", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " item ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " cart", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "total ", type: "文本内容", colorClass: "text-green-700" },
            { text: "+=", type: "操作符号", colorClass: "text-red-500" },
            { text: " prices", type: "文本内容", colorClass: "text-green-700" },
            { text: "[", type: "操作符号", colorClass: "text-red-500" },
            { text: "item", type: "文本内容", colorClass: "text-green-700" },
            { text: "]", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "\"总价:\"", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " total", type: "文本内容", colorClass: "text-green-700" },
            { text: ")", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 10,
  title: "写作",
  subtitle: "(10/13)",
  stepsText: [
    "第十个例子：列表求和",
    "🧱 看整体：遍历累加的逻辑",
    "✂️ 看细节：初始化、循环、累加",
    "🔍 看逻辑：sum += num累加每个元素",
    "🏷️ 词性：for循环与+=运算符",
    "🧠 理解：遍历是处理集合的基本方式"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " sum_list", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "numbers", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "total ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 0", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " num ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " numbers", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "total ", type: "文本内容", colorClass: "text-green-700" },
            { text: "+=", type: "操作符号", colorClass: "text-red-500" },
            { text: " num", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " total", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "sum_list", type: "文本内容", colorClass: "text-green-700" },
            { text: "([", type: "操作符号", colorClass: "text-red-500" },
            { text: "1", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "2", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "3", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: "4", type: "文本内容", colorClass: "text-green-700" },
            { text: "]))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 11,
  title: "写作",
  subtitle: "(11/13)",
  stepsText: [
    "第十一个例子：条件验证",
    "🧱 看整体：范围检查函数",
    "✂️ 看细节：and连接多个条件",
    "🔍 看逻辑：0<=age<=120为有效",
    "🏷️ 词性：and逻辑运算符",
    "🧠 理解：用逻辑运算组合多个判断"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " is_valid_age", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "age", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " age ", type: "文本内容", colorClass: "text-green-700" },
            { text: ">=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 0 ", type: "文本内容", colorClass: "text-green-700" },
            { text: "and", type: "系统定义", colorClass: "text-purple-600" },
            { text: " age ", type: "文本内容", colorClass: "text-green-700" },
            { text: "<=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 120", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " True", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " False", type: "系统定义", colorClass: "text-purple-600" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "is_valid_age", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "25", type: "文本内容", colorClass: "text-green-700" },
            { text: "))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 12,
  title: "写作",
  subtitle: "(12/13)",
  stepsText: [
    "第十二个例子：字符计数",
    "🧱 看整体：遍历统计字符",
    "✂️ 看细节：初始化计数器、遍历、条件累加",
    "🔍 看逻辑：遇到目标字符则count+1",
    "🏷️ 词性：if判断与for遍历",
    "🧠 理解：计数是数据统计的基础"
  ],
  blocks: [
    {
      title: "函数定义",
      lines: [
        {
          tokens: [
            { text: "def", type: "系统定义", colorClass: "text-purple-600" },
            { text: " count_char", type: "文本内容", colorClass: "text-green-700" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "text", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " char", type: "文本内容", colorClass: "text-green-700" },
            { text: "):", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "count ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 0", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "for", type: "系统定义", colorClass: "text-purple-600" },
            { text: " c ", type: "文本内容", colorClass: "text-green-700" },
            { text: "in", type: "系统定义", colorClass: "text-purple-600" },
            { text: " text", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "if", type: "系统定义", colorClass: "text-purple-600" },
            { text: " c ", type: "文本内容", colorClass: "text-green-700" },
            { text: "==", type: "操作符号", colorClass: "text-red-500" },
            { text: " char", type: "文本内容", colorClass: "text-green-700" },
            { text: ":", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 2
        },
        {
          tokens: [
            { text: "count ", type: "文本内容", colorClass: "text-green-700" },
            { text: "+=", type: "操作符号", colorClass: "text-red-500" },
            { text: " 1", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 3
        },
        {
          tokens: [
            { text: "return", type: "系统定义", colorClass: "text-purple-600" },
            { text: " count", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "count_char", type: "文本内容", colorClass: "text-green-700" },
            { text: "(\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "hello", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"", type: "操作符号", colorClass: "text-red-500" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" },
            { text: " \"", type: "操作符号", colorClass: "text-red-500" },
            { text: "l", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"))", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
},
{
  id: 13,
  title: "写作",
  subtitle: "(13/13)",
  stepsText: [
    "第十三个例子：字典查询",
    "🧱 看整体：定义字典并查询",
    "✂️ 看细节：键值对结构",
    "🔍 看逻辑：用键获取对应的值",
    "🏷️ 词性：{}字典、[]索引运算符",
    "🧠 理解：字典是键值对的集合"
  ],
  blocks: [
    {
      title: "字典定义",
      lines: [
        {
          tokens: [
            { text: "scores ", type: "文本内容", colorClass: "text-green-700" },
            { text: "=", type: "操作符号", colorClass: "text-red-500" },
            { text: " {", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        },
        {
          tokens: [
            { text: "\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "小明", type: "文本内容", colorClass: "text-green-700" },
            { text: "\":", type: "操作符号", colorClass: "text-red-500" },
            { text: " 85", type: "文本内容", colorClass: "text-green-700" },
            { text: ",", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "小红", type: "文本内容", colorClass: "text-green-700" },
            { text: "\":", type: "操作符号", colorClass: "text-red-500" },
            { text: " 92", type: "文本内容", colorClass: "text-green-700" }
          ],
          indent: 1
        },
        {
          tokens: [
            { text: "}", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    },
    {
      title: "使用示例",
      lines: [
        {
          tokens: [
            { text: "print", type: "系统定义", colorClass: "text-purple-600" },
            { text: "(", type: "操作符号", colorClass: "text-red-500" },
            { text: "scores", type: "文本内容", colorClass: "text-green-700" },
            { text: "[\"", type: "操作符号", colorClass: "text-red-500" },
            { text: "小明", type: "文本内容", colorClass: "text-green-700" },
            { text: "\"])", type: "操作符号", colorClass: "text-red-500" }
          ],
          indent: 0
        }
      ]
    }
  ]
}
];
