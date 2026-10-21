export interface WordExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const wordExamples: WordExample[] = [
  {
    "id": 1,
    "code": "#include <iostream>\n\nint main() {\n    std::cout << \"\";\n    return 0;\n}\n",
    "expectedOutput": ""
  },
  {
    "id": 2,
    "code": "#include <iostream>\n\nint main() {\n    std::cout << \"你好\" << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "你好\n"
  },
  {
    "id": 3,
    "code": "#include <iostream>\n\nint main() {\n    int age{10};\n    std::cout << age + 1 << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "11\n"
  },
  {
    "id": 4,
    "code": "#include <iostream>\n\nint main() {\n    int num1{100};\n    int num2{85};\n    std::cout << num1 + num2 << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "185\n"
  },
  {
    "id": 5,
    "code": "#include <iostream>\n\nint main() {\n    int score{80};\n    std::cout << std::boolalpha << (score >= 60) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 6,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << std::string(3, '!') << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "!!!\n"
  },
  {
    "id": 7,
    "code": "#include <iostream>\n\nint main() {\n    int score{100};\n    std::cout << std::boolalpha << (score == 100) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 8,
    "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> fruits{\"苹果\", \"香蕉\", \"橘子\"};\n    std::cout << fruits[0] << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "苹果\n"
  },
  {
    "id": 9,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string data{\"ABCD\"};\n    std::cout << data.substr(1, 2) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "BC\n"
  },
  {
    "id": 10,
    "code": "#include <iostream>\n#include <string>\n\nstruct Student { std::string name; };\n\nint main() {\n    Student student{\"小明\"};\n    std::cout << student.name << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "小明\n"
  },
  {
    "id": 11,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string text;\n    std::cout << std::boolalpha << text.empty() << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 12,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums{1, 2, 3};\n    nums.push_back(4);\n    for (std::size_t i = 0; i < nums.size(); ++i) { std::cout << (i ? \" \" : \"\") << nums[i]; }\n    std::cout << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "1 2 3 4\n"
  },
  {
    "id": 13,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string text{std::to_string(123)};\n    std::cout << text << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "123\n"
  },
  {
    "id": 14,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << 1 + 1 << \" \" << std::string(\"1\") + \"1\" << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "2 11\n"
  },
  {
    "id": 15,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string name{\"小明\"};\n    std::cout << \"你好，\" << name << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "你好，小明\n"
  },
  {
    "id": 16,
    "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> fruits{\"苹果\", \"香蕉\", \"橘子\"};\n    std::cout << fruits[0] << \" \" << fruits[1] << \" \" << fruits[2] << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "苹果 香蕉 橘子\n"
  },
  {
    "id": 17,
    "code": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<std::string, std::string> info{{\"name\", \"小明\"}};\n    std::cout << info.at(\"name\") << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "小明\n"
  },
  {
    "id": 18,
    "code": "#include <iostream>\n\nint main() {\n    int age{25};\n    std::cout << std::boolalpha << (age > 18 && age < 60) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 19,
    "code": "#include <iostream>\n\nint main() {\n    bool is_vip{false};\n    int points{1200};\n    std::cout << std::boolalpha << (is_vip || points > 1000) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 20,
    "code": "#include <iostream>\n\nint main() {\n    bool is_done{false};\n    std::cout << std::boolalpha << !is_done << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 21,
    "code": "#include <iostream>\n\nint main() {\n    int score{80};\n    std::cout << (score >= 60 ? \"通过\" : \"重修\") << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "通过\n"
  }
];
