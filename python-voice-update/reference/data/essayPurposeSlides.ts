/**
 * 写作阶段 - 代码用途展示数据
 * 与 essaySlides.ts 严格一一对应（共13个），解释"这段代码在干什么"
 */

import { CodePurposeData } from '../components/CodePurposeSlide';

export const essayPurposeSlides: CodePurposeData[] = [
  // 1. 累加求和 - def total(price, num): return price * num
  {
    id: 1,
    title: "演示",
    subtitle: "累加求和函数",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " total", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "price", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: " num", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
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
    ],
    mockVars: { price: 50, num: 3 },
    purpose: "计算总价：单价乘以数量",
    purposeIcon: "🧮",
    expectedBehavior: "total(50, 3) 返回 150"
  },
  
  // 2. 检查重复 - has_dup(lst)
  {
    id: 2,
    title: "演示",
    subtitle: "检查重复函数",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " has_dup", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "lst", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " i ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " range", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(len(lst)):", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " j ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " range(i+1, len(lst)):", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " lst[i]", type: "文本内容", colorClass: "text-green-700" },
          { text: " == ", type: "操作符号", colorClass: "text-red-500" },
          { text: "lst[j]:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 3
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " True", type: "系统定义", colorClass: "text-purple-600" }
        ],
        indent: 4
      }
    ],
    mockVars: { lst: "[1, 2, 2]" },
    purpose: "检查列表中是否有重复的元素",
    purposeIcon: "🔍",
    expectedBehavior: "has_dup([1,2,2]) 返回 True (有重复)"
  },
  
  // 3. 打招呼 - greet(name)
  {
    id: 3,
    title: "演示",
    subtitle: "打招呼函数",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " greet", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: ' "你好，"', type: "文本内容", colorClass: "text-green-700" },
          { text: " + ", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { name: '"小明"' },
    purpose: "生成问候语：把「你好，」和名字拼在一起",
    purposeIcon: "💬",
    expectedBehavior: "greet('小明') 返回「你好，小明」"
  },
  
  // 4. 计算平均值 - average(nums)
  {
    id: 4,
    title: "演示",
    subtitle: "计算平均值",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " average", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "nums", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "sum", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(nums)", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " total", type: "文本内容", colorClass: "text-green-700" },
          { text: " / ", type: "操作符号", colorClass: "text-red-500" },
          { text: "len(nums)", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { nums: "[80, 90, 100]" },
    purpose: "计算一组数字的平均值",
    purposeIcon: "🧮",
    expectedBehavior: "average([80,90,100]) 返回 90.0"
  },
  
  // 5. 查找最大值 - find_max(nums)
  {
    id: 5,
    title: "演示",
    subtitle: "查找最大值",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " find_max", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "nums", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "max_val", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "nums[0]", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " nums:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n", type: "文本内容", colorClass: "text-green-700" },
          { text: " > ", type: "操作符号", colorClass: "text-red-500" },
          { text: "max_val:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "max_val", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "n", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 3
      }
    ],
    mockVars: { nums: "[3, 7, 2, 9, 1]" },
    purpose: "从一堆数字中找出最大的那个",
    purposeIcon: "🔍",
    expectedBehavior: "find_max([3,7,2,9,1]) 返回 9"
  },
  
  // 6. 筛选偶数 - filter_even(nums)
  {
    id: 6,
    title: "演示",
    subtitle: "筛选偶数",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " filter_even", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "nums", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "result", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "[]", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " nums:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n", type: "文本内容", colorClass: "text-green-700" },
          { text: " % ", type: "操作符号", colorClass: "text-red-500" },
          { text: "2", type: "文本内容", colorClass: "text-green-700" },
          { text: " == ", type: "操作符号", colorClass: "text-red-500" },
          { text: "0:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "result.append(n)", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 3
      }
    ],
    mockVars: { nums: "[1, 2, 3, 4, 5, 6]" },
    purpose: "从列表中筛选出所有偶数",
    purposeIcon: "🧹",
    expectedBehavior: "filter_even([1,2,3,4,5,6]) 返回 [2, 4, 6]"
  },
  
  // 7. 字符串转换 - to_upper(text)
  {
    id: 7,
    title: "演示",
    subtitle: "字符串转换",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " to_upper", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "text", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
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
    ],
    mockVars: { text: '"hello"' },
    purpose: "把小写字母全部转成大写",
    purposeIcon: "🔄",
    expectedBehavior: "to_upper('hello') 返回 'HELLO'"
  },
  
  // 8. 递归计算 - factorial(n)
  {
    id: 8,
    title: "演示",
    subtitle: "递归计算阶乘",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " factorial", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "n", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n", type: "文本内容", colorClass: "text-green-700" },
          { text: " == ", type: "操作符号", colorClass: "text-red-500" },
          { text: "0:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " 1", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n", type: "文本内容", colorClass: "text-green-700" },
          { text: " * ", type: "操作符号", colorClass: "text-red-500" },
          { text: "factorial(n-1)", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      }
    ],
    mockVars: { n: 5 },
    purpose: "计算 n! = n×(n-1)×...×1（自己调用自己）",
    purposeIcon: "🔢",
    expectedBehavior: "factorial(5) = 5×4×3×2×1 = 120"
  },
  
  // 9. 面向对象 - class Student
  {
    id: 9,
    title: "演示",
    subtitle: "面向对象编程",
    code: [
      { 
        tokens: [
          { text: "class", type: "系统定义", colorClass: "text-purple-600" },
          { text: " Student", type: "文本内容", colorClass: "text-green-700" },
          { text: ":", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " __init__", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "self", type: "文本内容", colorClass: "text-green-700" },
          { text: ",", type: "操作符号", colorClass: "text-red-500" },
          { text: " name", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "self", type: "文本内容", colorClass: "text-green-700" },
          { text: ".", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " greet", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "self", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "print", type: "系统定义", colorClass: "text-purple-600" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: '"\u4f60\u597d\uff0c"', type: "文本内容", colorClass: "text-green-700" },
          { text: " + ", type: "操作符号", colorClass: "text-red-500" },
          { text: "self", type: "文本内容", colorClass: "text-green-700" },
          { text: ".", type: "操作符号", colorClass: "text-red-500" },
          { text: "name", type: "文本内容", colorClass: "text-green-700" },
          { text: ")", type: "操作符号", colorClass: "text-red-500" }
        ],
        indent: 2
      }
    ],
    purpose: "定义一个「学生」类，包含姓名和问好方法",
    purposeIcon: "🏗️",
    expectedBehavior: "Student('小明').greet() 显示「你好，小明」"
  },
  
  // 10. 列表求和 - sum_list(nums)
  {
    id: 10,
    title: "演示",
    subtitle: "列表求和",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " sum_list", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "nums", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " n ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " nums:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "total", type: "文本内容", colorClass: "text-green-700" },
          { text: " += ", type: "操作符号", colorClass: "text-red-500" },
          { text: "n", type: "文本内容", colorClass: "text-green-700" }
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
    ],
    mockVars: { nums: "[1, 2, 3, 4, 5]" },
    purpose: "把列表中所有数字加起来求总和",
    purposeIcon: "🧮",
    expectedBehavior: "sum_list([1,2,3,4,5]) 返回 15"
  },
  
  // 11. 条件验证 - is_valid(value)
  {
    id: 11,
    title: "演示",
    subtitle: "条件验证",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " is_valid", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "value", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " value", type: "文本内容", colorClass: "text-green-700" },
          { text: " > ", type: "操作符号", colorClass: "text-red-500" },
          { text: "0:", type: "文本内容", colorClass: "text-green-700" }
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
    ],
    mockVars: { value: 10 },
    purpose: "验证数值是否有效（大于0）",
    purposeIcon: "✅",
    expectedBehavior: "is_valid(10) 返回 True"
  },
  
  // 12. 字符计数 - count_char(text, char)
  {
    id: 12,
    title: "演示",
    subtitle: "字符计数",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " count_char", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "text, char", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "count", type: "文本内容", colorClass: "text-green-700" },
          { text: " = ", type: "操作符号", colorClass: "text-red-500" },
          { text: "0", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "for", type: "系统定义", colorClass: "text-purple-600" },
          { text: " c ", type: "文本内容", colorClass: "text-green-700" },
          { text: "in", type: "系统定义", colorClass: "text-purple-600" },
          { text: " text:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " c", type: "文本内容", colorClass: "text-green-700" },
          { text: " == ", type: "操作符号", colorClass: "text-red-500" },
          { text: "char:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "count", type: "文本内容", colorClass: "text-green-700" },
          { text: " += ", type: "操作符号", colorClass: "text-red-500" },
          { text: "1", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 3
      }
    ],
    mockVars: { text: '"hello"', char: '"l"' },
    purpose: "统计某个字符在文本中出现的次数",
    purposeIcon: "🔢",
    expectedBehavior: "count_char('hello', 'l') 返回 2"
  },
  
  // 13. 字典查询 - get_value(data, key)
  {
    id: 13,
    title: "演示",
    subtitle: "字典查询",
    code: [
      { 
        tokens: [
          { text: "def", type: "系统定义", colorClass: "text-purple-600" },
          { text: " get_value", type: "文本内容", colorClass: "text-green-700" },
          { text: "(", type: "操作符号", colorClass: "text-red-500" },
          { text: "data, key", type: "文本内容", colorClass: "text-green-700" },
          { text: "):", type: "操作符号", colorClass: "text-red-500" }
        ]
      },
      { 
        tokens: [
          { text: "if", type: "系统定义", colorClass: "text-purple-600" },
          { text: " key", type: "文本内容", colorClass: "text-green-700" },
          { text: " in ", type: "系统定义", colorClass: "text-purple-600" },
          { text: "data:", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 1
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " data[key]", type: "文本内容", colorClass: "text-green-700" }
        ],
        indent: 2
      },
      { 
        tokens: [
          { text: "return", type: "系统定义", colorClass: "text-purple-600" },
          { text: " None", type: "系统定义", colorClass: "text-purple-600" }
        ],
        indent: 1
      }
    ],
    mockVars: { data: '{"name": "小明"}', key: '"name"' },
    purpose: "从字典中安全地获取某个键对应的值",
    purposeIcon: "🗂️",
    expectedBehavior: "如果键存在返回值，否则返回 None"
  }
];
