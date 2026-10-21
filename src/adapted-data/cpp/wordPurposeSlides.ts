// 原版153页的一一对应语言适配；保留21组词/21演示/11测验与原步数。
export interface PurposeToken { text: string; type: '系统定义' | '操作符号' | '文本内容' | '注释'; colorClass: string; }
export interface PurposeLine { tokens: PurposeToken[]; indent?: number; }
export interface CodePurposeData { id: number; title: string; subtitle: string; code: PurposeLine[]; mockVars?: Record<string, any>; ghostText?: Record<string, string>; purpose: string; purposeIcon?: string; expectedBehavior?: string; }

export const wordPurposeSlides: CodePurposeData[] = [
  {
    "id": 1,
    "title": "演示",
    "subtitle": "std::cout << \"\"",
    "code": [
      {
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
            "text": "cout ",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<< ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "purpose": "向屏幕输出内容的动作格式",
    "purposeIcon": "💬",
    "expectedBehavior": "空字符串不显示可见内容；这是合法的动作格式"
  },
  {
    "id": 2,
    "title": "演示",
    "subtitle": "std::cout << \"你好\"",
    "code": [
      {
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
            "text": "cout ",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<< ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"你好\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "purpose": "让电脑在屏幕上说一声「你好」",
    "purposeIcon": "💬",
    "expectedBehavior": "完整示例输出：你好"
  },
  {
    "id": 3,
    "title": "演示",
    "subtitle": "age + 1",
    "code": [
      {
        "tokens": [
          {
            "text": "age ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "+ ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "1",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "age": 10
    },
    "purpose": "把年龄加上1岁，计算出新的年龄；表达式不会修改 age",
    "purposeIcon": "🧮",
    "expectedBehavior": "完整示例输出：11"
  },
  {
    "id": 4,
    "title": "演示",
    "subtitle": "num1 + num2",
    "code": [
      {
        "tokens": [
          {
            "text": "num1 ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "+ ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "num2",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "num1": 100,
      "num2": 85
    },
    "purpose": "把两个数值加在一起，求它们的和",
    "purposeIcon": "🧮",
    "expectedBehavior": "完整示例输出：185"
  },
  {
    "id": 5,
    "title": "演示",
    "subtitle": "score >= 60",
    "code": [
      {
        "tokens": [
          {
            "text": "score ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">= ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "60",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "score": 80
    },
    "purpose": "判断成绩是否达到及格线",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：true"
  },
  {
    "id": 6,
    "title": "演示",
    "subtitle": "std::string(3, '!')",
    "code": [
      {
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
            "text": "3",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ",",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": " '!'",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "purpose": "使用标准字符串的构造格式，把一个字符重复指定次数",
    "purposeIcon": "🔁",
    "expectedBehavior": "3 表示重复三次，'!' 是一个 char，生成并输出 !!!",
    "mockVars": {}
  },
  {
    "id": 7,
    "title": "演示",
    "subtitle": "score == 100",
    "code": [
      {
        "tokens": [
          {
            "text": "score ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "== ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "100",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "score": 100
    },
    "purpose": "判断成绩是否恰好等于100，不执行赋值",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：true"
  },
  {
    "id": 8,
    "title": "演示",
    "subtitle": "fruits[0]",
    "code": [
      {
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
      }
    ],
    "mockVars": {
      "fruits": "{\"苹果\",\"香蕉\",\"橘子\"}"
    },
    "purpose": "用从零开始的下标取第一个水果",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：苹果"
  },
  {
    "id": 9,
    "title": "演示",
    "subtitle": "data.substr(1, 2)",
    "code": [
      {
        "tokens": [
          {
            "text": "data",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ".",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "substr",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "1",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ", ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "2",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "mockVars": {
      "data": "\"ABCD\""
    },
    "purpose": "substr 从下标1取长度2的字符串，不把第二个参数当成结束下标",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：BC"
  },
  {
    "id": 10,
    "title": "演示",
    "subtitle": "student.name",
    "code": [
      {
        "tokens": [
          {
            "text": "student",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ".",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "name",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "student.name": "\"小明\""
    },
    "purpose": "获取学生资料卡的姓名成员",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：小明"
  },
  {
    "id": 11,
    "title": "演示",
    "subtitle": "text.empty()",
    "code": [
      {
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
      }
    ],
    "purpose": "调用 std::string 已有的成员函数，判断文字是否为空",
    "purposeIcon": "🔎",
    "expectedBehavior": "这里 text 是空字符串，empty() 得到 true；它不会删除已有文字",
    "mockVars": {
      "text": ""
    }
  },
  {
    "id": 12,
    "title": "演示",
    "subtitle": "nums.push_back(4)",
    "code": [
      {
        "tokens": [
          {
            "text": "nums",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ".",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "push_back",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "4",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "mockVars": {
      "nums": "{1,2,3}"
    },
    "purpose": "向数字序列末尾添加4",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：1 2 3 4"
  },
  {
    "id": 13,
    "title": "演示",
    "subtitle": "std::to_string(123)",
    "code": [
      {
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
            "text": "to_string",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "(",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "123",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ")",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "purpose": "将数字123转换成文本 \"123\"",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：123"
  },
  {
    "id": 14,
    "title": "演示",
    "subtitle": "1 + 1 → 2    std::string(\"1\") + \"1\" → \"11\"",
    "code": [
      {
        "tokens": [
          {
            "text": "1 ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "+ ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "1 ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "→ ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "2    ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
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
            "text": "\"1\"",
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
            "text": "\"1\" ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "→ ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"11\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "purpose": "区分整数相加与字符串连接，注意语言各自的合法规则",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：2 11"
  },
  {
    "id": 15,
    "title": "演示",
    "subtitle": "std::cout << \"你好，\" << name",
    "code": [
      {
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
            "text": "cout ",
            "type": "系统定义",
            "colorClass": "text-purple-600"
          },
          {
            "text": "<< ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"你好，\" ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "<< ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "name",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "name": "\"小明\""
    },
    "purpose": "将姓名填入问候语，组合成一句话",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：你好，小明"
  },
  {
    "id": 16,
    "title": "演示",
    "subtitle": "{\"苹果\", \"香蕉\", \"橘子\"}",
    "code": [
      {
        "tokens": [
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"苹果\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ", ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"香蕉\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ", ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"橘子\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "purpose": "用并列的初始化元素准备三个水果名",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：苹果 香蕉 橘子"
  },
  {
    "id": 17,
    "title": "演示",
    "subtitle": "{{\"name\", \"小明\"}}",
    "code": [
      {
        "tokens": [
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "{",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"name\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ", ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"小明\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "}",
            "type": "操作符号",
            "colorClass": "text-red-500"
          }
        ]
      }
    ],
    "purpose": "用带名字的资料记录人物姓名；std::map 使用唯一键关联字符串值",
    "purposeIcon": "💡",
    "expectedBehavior": "完整示例输出：小明"
  },
  {
    "id": 18,
    "title": "演示",
    "subtitle": "age > 18 && age < 60",
    "code": [
      {
        "tokens": [
          {
            "text": "age ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "> ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "18 ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "&& ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "age ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "< ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "60",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "age": 25
    },
    "purpose": "判断年龄大于18并且小于60",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：true"
  },
  {
    "id": 19,
    "title": "演示",
    "subtitle": "is_vip || points > 1000",
    "code": [
      {
        "tokens": [
          {
            "text": "is_vip ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "|| ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "points ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "> ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "1000",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "is_vip": "false",
      "points": 1200
    },
    "purpose": "判断是否VIP或者积分超过1000；两边都真也为真",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：true"
  },
  {
    "id": 20,
    "title": "演示",
    "subtitle": "!is_done",
    "code": [
      {
        "tokens": [
          {
            "text": "!",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "is_done",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "is_done": "false"
    },
    "purpose": "把完成状态取反，判断是否尚未完成",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：true"
  },
  {
    "id": 21,
    "title": "演示",
    "subtitle": "score >= 60 ? \"通过\" : \"重修\"",
    "code": [
      {
        "tokens": [
          {
            "text": "score ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ">= ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "60 ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": "? ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"通过\" ",
            "type": "文本内容",
            "colorClass": "text-green-700"
          },
          {
            "text": ": ",
            "type": "操作符号",
            "colorClass": "text-red-500"
          },
          {
            "text": "\"重修\"",
            "type": "文本内容",
            "colorClass": "text-green-700"
          }
        ]
      }
    ],
    "mockVars": {
      "score": 80
    },
    "purpose": "根据成绩是否及格，只选择一段结果文字",
    "purposeIcon": "🔀",
    "expectedBehavior": "完整示例输出：通过"
  }
];
