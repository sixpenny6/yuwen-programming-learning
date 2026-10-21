/** 与13个原写作槽位对应的完整、可编译程序。 */
export interface EssayExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const essayExamples: EssayExample[] = [
  {
    "id": 1,
    "code": "#include <iostream>\n\nint total(int price, int num) {\n    return price * num;\n}\n\nint main() {\n    std::cout << total(50, 3) << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "150\n"
  },
  {
    "id": 2,
    "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> fruits;\n    fruits.push_back(\"苹果\");\n    fruits.push_back(\"香蕉\");\n    std::cout << fruits[0] << ' ' << fruits[1] << '\\n';\n    std::cout << fruits.size() << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "苹果 香蕉\n2\n"
  },
  {
    "id": 3,
    "code": "#include <iostream>\n#include <string>\n\nstd::string greet(std::string name) {\n    return \"你好，\" + name;\n}\n\nint main() {\n    std::cout << greet(\"小明\") << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "你好，小明\n"
  },
  {
    "id": 4,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores{80, 90, 85};\n    double total = 0;\n    for (int score : scores) {\n        total += score;\n    }\n    if (!scores.empty()) {\n        std::cout << total / scores.size() << '\\n';\n    }\n    return 0;\n}\n",
    "expectedOutput": "85\n"
  },
  {
    "id": 5,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores{85, 92, 78};\n    int highest = scores[0];\n    for (int score : scores) {\n        if (score > highest) {\n            highest = score;\n        }\n    }\n    std::cout << highest << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "92\n"
  },
  {
    "id": 6,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers{1, 2, 3, 4};\n    std::vector<int> evens;\n    for (int value : numbers) {\n        if (value % 2 == 0) {\n            evens.push_back(value);\n        }\n    }\n    for (int value : evens) {\n        std::cout << value << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "2 4 \n"
  },
  {
    "id": 7,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string message = \"你好，\";\n    message += \"小明\";\n    std::cout << message << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "你好，小明\n"
  },
  {
    "id": 8,
    "code": "#include <iostream>\n#include <string>\n\nint main() {\n    bool playing = true;\n    while (playing) {\n        std::cout << \"你面前有两扇门\\n\";\n        std::string choice;\n        std::cout << \"左/右?\";\n        if (!(std::cin >> choice)) {\n            break;\n        }\n        if (choice == \"左\") {\n            std::cout << \"遇到恶龙！游戏结束\\n\";\n            playing = false;\n        } else if (choice == \"右\") {\n            std::cout << \"发现宝箱！获得金币\\n\";\n        }\n    }\n    return 0;\n}\n",
    "stdin": "右\n左\n",
    "expectedOutput": "你面前有两扇门\n左/右?发现宝箱！获得金币\n你面前有两扇门\n左/右?遇到恶龙！游戏结束\n"
  },
  {
    "id": 9,
    "code": "#include <iostream>\n\nclass ShoppingCart {\npublic:\n    int total = 0;\n    void add(int price) { total += price; }\n};\n\nint main() {\n    ShoppingCart cart;\n    cart.add(5);\n    cart.add(3);\n    std::cout << \"总价: \" << cart.total << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "总价: 8\n"
  },
  {
    "id": 10,
    "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores{70, 80, 90};\n    for (int& score : scores) {\n        score += 5;\n    }\n    for (int score : scores) {\n        std::cout << score << ' ';\n    }\n    std::cout << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "75 85 95 \n"
  },
  {
    "id": 11,
    "code": "#include <iostream>\n#include <string>\n\nclass Student {\npublic:\n    std::string name;\n    Student(std::string text) { name = text; }\n};\n\nint main() {\n    Student student(\"小明\");\n    std::cout << student.name << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "小明\n"
  },
  {
    "id": 12,
    "code": "#include <iostream>\n#include <string>\n\nint count_char(std::string text, char target) {\n    int count = 0;\n    for (char letter : text) {\n        if (letter == target) { count += 1; }\n    }\n    return count;\n}\n\nint main() {\n    std::cout << count_char(\"hello\", 'l') << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "2\n"
  },
  {
    "id": 13,
    "code": "#include <iostream>\n#include <fstream>\n#include <string>\n\nint main() {\n    {\n        std::ofstream out(\"note.txt\");\n        if (!out) { return 1; }\n        out << \"今天学 C++\\n\";\n        if (!out) { return 1; }\n    }\n    std::ifstream in(\"note.txt\");\n    if (!in) { return 1; }\n    std::string note;\n    if (!std::getline(in, note)) { return 1; }\n    std::cout << note << '\\n';\n    return 0;\n}\n",
    "expectedOutput": "今天学 C++\n"
  }
];
