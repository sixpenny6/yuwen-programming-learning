/**
 * 组词阶段 - 代码用途展示数据
 * 与 wordSlides.ts 严格一一对应，解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';

export const wordPurposeSlides: CodePurposeData[] = [
  // 1. print() - 动作格式
  {
    id: 1,
    title: "演示",
    subtitle: "print()",
    code: [
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    purpose: "向屏幕输出内容的指令，括号里放你想说的话",
    purposeIcon: "💬",
    expectedBehavior: "执行后会在屏幕上显示括号内的内容"
  },
  
  // 2. print("你好") - 执行动作
  {
    id: 2,
    title: "演示",
    subtitle: 'print("你好")',
    code: [
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"你好"', type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    purpose: "让电脑在屏幕上说一声「你好」",
    purposeIcon: "💬",
    expectedBehavior: "屏幕输出: 你好"
  },
  
  // 3. age + 1 - 简单计算
  {
    id: 3,
    title: "演示",
    subtitle: "age + 1",
    code: [
      { 
        tokens: [
          { text: "age", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "1", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { age: 10 },
    purpose: "把年龄加上1岁，计算出新的年龄",
    purposeIcon: "🧮",
    expectedBehavior: "age=10 时，结果是 11"
  },
  
  // 4. num1 + num2 - 变量组合
  {
    id: 4,
    title: "演示",
    subtitle: "num1 + num2",
    code: [
      { 
        tokens: [
          { text: "num1", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "num2", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { num1: 100, num2: 85 },
    purpose: "把两个数值加在一起，求它们的和",
    purposeIcon: "🧮",
    expectedBehavior: "num1=100, num2=85 时，结果是 185"
  },
  
  // 5. score >= 60 - 逻辑判断
  {
    id: 5,
    title: "演示",
    subtitle: "score >= 60",
    code: [
      { 
        tokens: [
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: ">=", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { score: 75 },
    purpose: "判断分数是否大于等于60分（及格线）",
    purposeIcon: "🔀",
    expectedBehavior: "score=75 时，结果是 True (及格)"
  },
  
  // 6. greeting * 3 - 文字造词（重复）
  {
    id: 6,
    title: "演示",
    subtitle: "greeting * 3",
    code: [
      { 
        tokens: [
          { text: "greeting", type: "文本内容", colorClass: "text-green-700" },
          { text: "*", type: "操作符号", colorClass: "text-red-500" },
          { text: "3", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { greeting: '"你好"' },
    purpose: "把文字重复3遍，像排比句一样",
    purposeIcon: "🔗",
    expectedBehavior: "greeting=\"你好\" 时，结果是「你好你好你好」"
  },
  
  // 7. score == 100 - 等于判断
  {
    id: 7,
    title: "演示",
    subtitle: "score == 100",
    code: [
      { 
        tokens: [
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: "==", type: "操作符号", colorClass: "text-red-500" },
          { text: "100", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { score: 100 },
    purpose: "检查分数是否刚好等于100分（满分）",
    purposeIcon: "🔀",
    expectedBehavior: "score=100 时，结果是 True (满分)"
  },
  
  // 8. age != 18 - 不等判断
  {
    id: 8,
    title: "演示",
    subtitle: "age != 18",
    code: [
      { 
        tokens: [
          { text: "age", type: "文本内容", colorClass: "text-green-700" },
          { text: "!=", type: "操作符号", colorClass: "text-red-500" },
          { text: "18", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { age: 20 },
    purpose: "检查年龄是否不等于18岁",
    purposeIcon: "🔀",
    expectedBehavior: "age=20 时，结果是 True (不是18岁)"
  },
  
  // 9. price - 10 - 减法运算
  {
    id: 9,
    title: "演示",
    subtitle: "price - 10",
    code: [
      { 
        tokens: [
          { text: "price", type: "文本内容", colorClass: "text-green-700" },
          { text: "-", type: "操作符号", colorClass: "text-red-500" },
          { text: "10", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { price: 100 },
    purpose: "从原价中减去10元，计算折扣后价格",
    purposeIcon: "🧮",
    expectedBehavior: "price=100 时，结果是 90"
  },
  
  // 10. total / 5 - 除法运算
  {
    id: 10,
    title: "演示",
    subtitle: "total / 5",
    code: [
      { 
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: "/", type: "操作符号", colorClass: "text-red-500" },
          { text: "5", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { total: 100 },
    purpose: "用总数除以5，计算平均分配",
    purposeIcon: "🧮",
    expectedBehavior: "total=100 时，结果是 20.0"
  },
  
  // 11. num % 2 - 取余运算
  {
    id: 11,
    title: "演示",
    subtitle: "num % 2",
    code: [
      { 
        tokens: [
          { text: "num", type: "文本内容", colorClass: "text-green-700" },
          { text: "%", type: "操作符号", colorClass: "text-red-500" },
          { text: "2", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { num: 7 },
    purpose: "除以2后取余数，常用来判断奇偶",
    purposeIcon: "🧮",
    expectedBehavior: "num=7 时，余数是 1 (奇数)"
  },
  
  // 12. count * 3 - 乘法运算
  {
    id: 12,
    title: "演示",
    subtitle: "count * 3",
    code: [
      { 
        tokens: [
          { text: "count", type: "文本内容", colorClass: "text-green-700" },
          { text: "*", type: "操作符号", colorClass: "text-red-500" },
          { text: "3", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { count: 5 },
    purpose: "把数量乘以3，计算三倍的结果",
    purposeIcon: "🧮",
    expectedBehavior: "count=5 时，结果是 15"
  },
  
  // 13. name + "同学" - 字符拼接
  {
    id: 13,
    title: "演示",
    subtitle: 'name + "同学"',
    code: [
      { 
        tokens: [
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: '"同学"', type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { name: '"小明"' },
    purpose: "把人名和「同学」拼成一句完整的称呼",
    purposeIcon: "🔗",
    expectedBehavior: "name=\"小明\" 时，结果是「小明同学」"
  },
  
  // 14. 形近字辨析：数字 vs 文字
  {
    id: 14,
    title: "演示",
    subtitle: '1+1 vs "1"+"1"',
    code: [
      { 
        tokens: [
          { text: "1", type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: "1", type: "文本内容", colorClass: "text-green-700" },
          { text: " → 2    ", type: "文本内容", colorClass: "text-slate-400" },
          { text: '"1"', type: "文本内容", colorClass: "text-green-700" },
          { text: "+", type: "操作符号", colorClass: "text-red-500" },
          { text: '"1"', type: "文本内容", colorClass: "text-green-700" },
          { text: ' → "11"', type: "文本内容", colorClass: "text-slate-400" }
        ]
      }
    ],
    purpose: "编程中的\"形近字\"：同样是+号，数字相加得2，文字拼接得\"11\"",
    purposeIcon: "🔤",
    expectedBehavior: "没有引号是数字运算，有引号是文字拼接"
  },
  
  // 15. score < 60 - 小于判断
  {
    id: 15,
    title: "演示",
    subtitle: "score < 60",
    code: [
      { 
        tokens: [
          { text: "score", type: "文本内容", colorClass: "text-green-700" },
          { text: "<", type: "操作符号", colorClass: "text-red-500" },
          { text: "60", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { score: 45 },
    purpose: "判断分数是否低于60分（不及格）",
    purposeIcon: "🔀",
    expectedBehavior: "score=45 时，结果是 True (需补考)"
  },
  
  // 16. age > 18 - 大于判断
  {
    id: 16,
    title: "演示",
    subtitle: "age > 18",
    code: [
      { 
        tokens: [
          { text: "age", type: "文本内容", colorClass: "text-green-700" },
          { text: ">", type: "操作符号", colorClass: "text-red-500" },
          { text: "18", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { age: 20 },
    purpose: "判断年龄是否大于18岁（成年）",
    purposeIcon: "🔀",
    expectedBehavior: "age=20 时，结果是 True (是成年人)"
  },
  
  // 17. is_valid and is_ready - 逻辑与
  {
    id: 17,
    title: "演示",
    subtitle: "is_valid and is_ready",
    code: [
      { 
        tokens: [
          { text: "is_valid", type: "文本内容", colorClass: "text-green-700" },
          { text: "and", type: "系统定义", colorClass: "text-purple-600" },
          { text: "is_ready", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { is_valid: "True", is_ready: "True" },
    purpose: "两个条件都要满足才行，既要有效又要就绪",
    purposeIcon: "🔀",
    expectedBehavior: "两个都为True时，结果才是True"
  },
  
  // 18. is_error or is_warning - 逻辑或
  {
    id: 18,
    title: "演示",
    subtitle: "is_error or is_warning",
    code: [
      { 
        tokens: [
          { text: "is_error", type: "文本内容", colorClass: "text-green-700" },
          { text: "or", type: "系统定义", colorClass: "text-purple-600" },
          { text: "is_warning", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { is_error: "False", is_warning: "True" },
    purpose: "满足任意一个条件就行，有错误或有警告都要处理",
    purposeIcon: "🔀",
    expectedBehavior: "任一为True，结果就是True"
  },
  
  // 19. not is_ready - 逻辑非
  {
    id: 19,
    title: "演示",
    subtitle: "not is_ready",
    code: [
      { 
        tokens: [
          { text: "not", type: "系统定义", colorClass: "text-purple-600" },
          { text: "is_ready", type: "文本内容", colorClass: "text-green-700" }
        ]
      }
    ],
    mockVars: { is_ready: "True" },
    purpose: "把条件反过来，如果没准备好就等待",
    purposeIcon: "🔀",
    expectedBehavior: "is_ready为True时，not is_ready 是 False"
  },
  
  // 20. range(10) - 范围生成
  {
    id: 20,
    title: "演示",
    subtitle: "range(10)",
    code: [
      { 
        tokens: [
          { text: "range", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "10", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    purpose: "生成一串数字序列 0,1,2...9，常用于循环",
    purposeIcon: "🔢",
    expectedBehavior: "产生数字 0, 1, 2, ..., 9 (共10个)"
  },
  
  // 21. len(text) - 长度查询
  {
    id: 21,
    title: "演示",
    subtitle: "len(text)",
    code: [
      { 
        tokens: [
          { text: "len", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "text", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ]
      }
    ],
    mockVars: { text: '"你好"' },
    purpose: "数一数文本里有多少个字符",
    purposeIcon: "📏",
    expectedBehavior: "text=\"你好\" 时，结果是 2"
  }
];
