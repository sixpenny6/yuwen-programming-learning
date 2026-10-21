/** 原12个造句槽位对应的完整可编译验证程序；不增加教学页面。 */
export interface SentenceExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const sentenceExamples: SentenceExample[] = [
  {
    "id": 1,
    "code": "#include <iostream>\n\nint main() {\n    int score = 75;\n    if (score > 60) {\n        std::cout << \"合格\\n\";\n    }\n    return 0;\n}\n",
    "expectedOutput": "合格\n"
  },
  {
    "id": 2,
    "code": "#include <iostream>\n\nint main() {\n    int score = 95;\n    char grade;\n    if (score > 90) {\n        grade = 'A';\n    } else {\n        grade = 'F';\n    }\n    std::cout << grade << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "A\n"
  },
  {
    "id": 3,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {85, 92, 78};\n    int total = 0;\n    for (int s : scores) {\n        total = total + s;\n    }\n    std::cout << total << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "255\n"
  },
  {
    "id": 4,
    "code": "#include <iostream>\n\nint main() {\n    int power = 3;\n    while (power > 0) {\n        std::cout << \"Running\\n\";\n        power = power - 1;\n    }\n    return 0;\n}\n",
    "expectedOutput": "Running\nRunning\nRunning\n"
  },
  {
    "id": 5,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {85, 92, 78};\n    std::cout << scores[0] << \" \" << scores[1] << \" \" << scores[2] << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "85 92 78\n"
  },
  {
    "id": 6,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {85, 92, 78};\n    int first = scores[0];\n    std::cout << first << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "85\n"
  },
  {
    "id": 7,
    "code": "#include <iostream>\n\nvoid add_bonus(int& score) {\n    score += 5;\n}\n\nint main() {\n    int score = 75;\n    add_bonus(score);\n    std::cout << score << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "80\n"
  },
  {
    "id": 8,
    "code": "#include <iostream>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << add(3, 5) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "8\n"
  },
  {
    "id": 9,
    "code": "#include <iostream>\n\nint main() {\n    int score = 75;\n    char grade = 'F';\n    if (score >= 90) {\n        grade = 'A';\n    } else if (score >= 60) {\n        grade = 'C';\n    }\n    std::cout << grade << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "C\n"
  },
  {
    "id": 10,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3};\n    numbers.push_back(42);\n    for (int value : numbers) { std::cout << value << '\\n'; }\n    return 0;\n}\n",
    "expectedOutput": "1\n2\n3\n42\n"
  },
  {
    "id": 11,
    "code": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, std::string> student = {\n        {\"name\", \"Alice\"}, {\"age\", \"20\"}\n    };\n    std::cout << student.at(\"name\") << \" \" << student.at(\"age\") << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "Alice 20\n"
  },
  {
    "id": 12,
    "code": "#include <iostream>\n\nint main() {\n    int age = 0;\n    if (std::cin >> age) {\n        std::cout << \"年龄: \" << age << '\\n';\n    } else {\n        std::cout << \"请输入整数\\n\";\n    }\n    return 0;\n}\n",
    "expectedOutput": "年龄: 18\n",
    "stdin": "18\n"
  }
];
