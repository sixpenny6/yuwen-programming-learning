/**
 * 造句阶段 - 代码用途展示数据
 * 与 sentenceSlides.ts 严格一一对应，解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';

export const sentencePurposeSlides: CodePurposeData[] = [
  // 1. if score > 60: print("合格") - 逻辑判断
  {
    id: 1,
    title: "演示",
    subtitle: "if 条件判断",
    code: [
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"合格"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      }
    ],
    mockVars: { score: 75 },
    purpose: "如果分数超过60，就在屏幕上显示「合格」",
    purposeIcon: "🔀",
    expectedBehavior: "score=75 时，屏幕显示「合格」"
  },
  
  // 2. if-else 二选一
  {
    id: 2,
    title: "演示",
    subtitle: "if-else 二选一",
    code: [
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "90", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"A"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "else", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"F"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { score: 95 },
    purpose: "二选一：分数超90给A，否则给F",
    purposeIcon: "🔀",
    expectedBehavior: "score=95 时，grade 被赋值为「A」"
  },
  
  // 3. for s in scores: total = total + s - 循环
  {
    id: 3,
    title: "演示",
    subtitle: "for 循环遍历",
    code: [
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: "s", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "s", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { scores: "[85, 92, 78]" },
    purpose: "遍历每个成绩，累加到总分里",
    purposeIcon: "🔄",
    expectedBehavior: "把 85+92+78 加起来，total 变成 255"
  },
  
  // 4. while power > 0 - 坚持到底
  {
    id: 4,
    title: "演示",
    subtitle: "while 循环",
    code: [
      { 
        tokens: [
          { text: "while", type: "系统定义", colorClass: "text-purple-600" },
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Running"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "power", type: "文本内容", colorClass: "text-green-700" },
          { text: "-", type: "操作符号", colorClass: "text-red-500" },
          { text: "1", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { power: 3 },
    purpose: "只要还有能量，就一直运行并消耗1点能量",
    purposeIcon: "🔄",
    expectedBehavior: "power=3 时，显示3次「Running」后停止"
  },
  
  // 5. scores = [85, 92, 78] - 定义清单
  {
    id: 5,
    title: "演示",
    subtitle: "列表定义",
    code: [
      { 
        tokens: [
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "[", type: "操作符号", colorClass: "text-red-500" },
          { text: "85", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "92", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "78", type: "文本内容", colorClass: "text-green-700" },
          { text: "]", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    purpose: "创建一个成绩单，里面装着三门课的分数",
    purposeIcon: "📋",
    expectedBehavior: "scores 变成包含 [85, 92, 78] 的列表"
  },
  
  // 6. first = scores[0] - 访问元素
  {
    id: 6,
    title: "演示",
    subtitle: "列表访问",
    code: [
      { 
        tokens: [
          { text: "first", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "scores", type: "文本内容", colorClass: "text-green-700" },
          { text: "[", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" },
          { text: "]", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    mockVars: { scores: "[85, 92, 78]" },
    purpose: "取出列表中第一个元素（编号从0开始）",
    purposeIcon: "📋",
    expectedBehavior: "first 得到 85（第一个成绩）"
  },
  
  // 7. def greet(name): print(...) - 函数定义
  {
    id: 7,
    title: "演示",
    subtitle: "函数定义",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: "greet", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Hello,"', type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      }
    ],
    purpose: "定义一个「问好」功能：输入名字，打印问候语",
    purposeIcon: "📦",
    expectedBehavior: "调用 greet('小明') 显示「Hello,小明」"
  },
  
  // 8. def add(a, b): return a + b - 函数返回
  {
    id: 8,
    title: "演示",
    subtitle: "函数返回",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: "add", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "a", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: "b", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: "a", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "b", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    purpose: "定义一个「加法」功能：输入两数，返回它们的和",
    purposeIcon: "📦",
    expectedBehavior: "调用 add(3, 5) 得到 8"
  },
  
  // 9. if-elif 多条件判断
  {
    id: 9,
    title: "演示",
    subtitle: "elif 多条件",
    code: [
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">=", type: "操作符号", colorClass: "text-red-500" },
          { text: "90", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"A"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "elif", type: "系统定义", colorClass: "text-purple-600" },
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">=", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "grade", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: '"C"', type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { score: 75 },
    purpose: "分档评级：90分以上A，60分以上C",
    purposeIcon: "🔀",
    expectedBehavior: "score=75 时，grade 被赋值为「C」"
  },
  
  // 10. numbers.append(42) - 列表添加
  {
    id: 10,
    title: "演示",
    subtitle: "列表添加",
    code: [
      { 
        tokens: [
          { text: "numbers", type: "文本内容", colorClass: "text-green-700" },
          { text: ".", type: "操作符号", colorClass: "text-red-500" },
          { text: "append", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "42", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    mockVars: { numbers: "[1, 2, 3]" },
    purpose: "往列表末尾追加一个新元素 42",
    purposeIcon: "📋",
    expectedBehavior: "numbers 变成 [1, 2, 3, 42]"
  },
  
  // 11. student = {"name": "Alice", "age": 20} - 字典定义
  {
    id: 11,
    title: "演示",
    subtitle: "字典定义",
    code: [
      { 
        tokens: [
          { text: "student", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "{", type: "操作符号", colorClass: "text-red-500" },
          { text: '"name"', type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Alice"', type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: '"age"', type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" },
          { text: "20", type: "文本内容", colorClass: "text-green-700" },
          { text: "}", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    purpose: "创建一张「资料卡」：记录学生姓名和年龄",
    purposeIcon: "🗂️",
    expectedBehavior: "student['name'] 得到 'Alice'"
  },
  
  // 12. try-except 异常处理
  {
    id: 12,
    title: "演示",
    subtitle: "try-except",
    code: [
      { 
        tokens: [
          { text: "try", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "result", type: "文本内容", colorClass: "text-green-700" },
          { text: "=", type: "操作符号", colorClass: "text-red-500" },
          { text: "10", type: "文本内容", colorClass: "text-green-700" },
          { text: "/", type: "操作符号", colorClass: "text-red-500" },
          { text: "num", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "except", type: "系统定义", colorClass: "text-purple-600" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"Error"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      }
    ],
    mockVars: { num: 0 },
    purpose: "尝试执行除法，如果出错就显示错误信息",
    purposeIcon: "🛡️",
    expectedBehavior: "num=0 时除法出错，显示「Error」"
  }
];
