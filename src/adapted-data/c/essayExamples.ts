/** 与13个原写作槽位对应的完整、可编译程序。 */
export interface EssayExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const essayExamples: EssayExample[] = [
  {
    "id": 1,
    "code": "#include <stdio.h>\n\nint total(int price, int num) {\n    return price * num;\n}\n\nint main(void) {\n    printf(\"%d\\n\", total(50, 3));\n    return 0;\n}\n",
    "expectedOutput": "150\n"
  },
  {
    "id": 2,
    "code": "#include <stdio.h>\n#include <stdbool.h>\n\nbool has_dup(const int lst[], int size) {\n    for (int i = 0; i < size; ++i) {\n        for (int j = i + 1; j < size; ++j) {\n            if (lst[i] == lst[j]) {\n                return true;\n            }\n        }\n    }\n    return false;\n}\n\nint main(void) {\n    int lst[] = {1, 2, 2};\n    puts(has_dup(lst, 3) ? \"true\" : \"false\");\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 3,
    "code": "#include <stdio.h>\n#include <stddef.h>\n\nvoid greet(const char *name, char result[], size_t size) {\n    snprintf(result, size, \"你好，%s\", name);\n}\n\nint main(void) {\n    char message[64];\n    greet(\"小明\", message, sizeof message);\n    puts(message);\n    return 0;\n}\n",
    "expectedOutput": "你好，小明\n"
  },
  {
    "id": 4,
    "code": "#include <stdio.h>\n#include <stddef.h>\n\ndouble average(const int scores[], size_t count) {\n    double total = 0.0;\n    for (size_t i = 0; i < count; ++i) {\n        total += scores[i];\n    }\n    return count > 0 ? total / (double)count : 0.0;\n}\n\nint main(void) {\n    int scores[] = {80, 90, 85};\n    size_t count = sizeof scores / sizeof scores[0];\n    printf(\"%.1f\\n\", average(scores, count));\n    return 0;\n}\n",
    "expectedOutput": "85.0\n"
  },
  {
    "id": 5,
    "code": "#include <stdio.h>\n\nint find_max(const int nums[], int size) {\n    int max_val = nums[0];\n    for (int i = 0; i < size; ++i) {\n        if (nums[i] > max_val) {\n            max_val = nums[i];\n        }\n    }\n    return max_val;\n}\n\nint main(void) {\n    int nums[] = {3, 9, 2};\n    printf(\"%d\\n\", find_max(nums, 3));\n    return 0;\n}\n",
    "expectedOutput": "9\n"
  },
  {
    "id": 6,
    "code": "#include <stdio.h>\n\nint filter_even(const int nums[], int size, int result[]) {\n    int count = 0;\n    for (int i = 0; i < size; ++i) {\n        if (nums[i] % 2 == 0) {\n            result[count++] = nums[i];\n        }\n    }\n    return count;\n}\n\nint main(void) {\n    int nums[] = {1, 2, 3, 4};\n    int result[4];\n    int count = filter_even(nums, 4, result);\n    for (int i = 0; i < count; ++i) {\n        printf(\"%d \", result[i]);\n    }\n    putchar('\\n');\n    return 0;\n}\n",
    "expectedOutput": "2 4 \n"
  },
  {
    "id": 7,
    "code": "#include <stdio.h>\n\nint main(void) {\n    char word[] = \"hello\";\n    word[0] = 'H';\n    puts(word);\n    return 0;\n}\n",
    "expectedOutput": "Hello\n"
  },
  {
    "id": 8,
    "code": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nint main(void) {\n    bool playing = true;\n    while (playing) {\n        puts(\"你面前有两扇门\");\n        char choice[16];\n        printf(\"左/右?\");\n        if (scanf(\"%15s\", choice) != 1) {\n            break;\n        }\n        if (strcmp(choice, \"左\") == 0) {\n            puts(\"遇到恶龙！游戏结束\");\n            playing = false;\n        } else if (strcmp(choice, \"右\") == 0) {\n            puts(\"发现宝箱！获得金币\");\n        }\n    }\n    return 0;\n}\n",
    "stdin": "右\n左\n",
    "expectedOutput": "你面前有两扇门\n左/右?发现宝箱！获得金币\n你面前有两扇门\n左/右?遇到恶龙！游戏结束\n"
  },
  {
    "id": 9,
    "code": "#include <stdio.h>\n\nint main(void) {\n    struct Product {\n        const char *name;\n        int price;\n    };\n    struct Product prices[] = {{\"苹果\", 5}, {\"香蕉\", 3}};\n    int cart[2];\n    int count = 0;\n    cart[count++] = 0;\n    cart[count++] = 1;\n    int total = 0;\n    for (int i = 0; i < count; ++i) {\n        total += prices[cart[i]].price;\n    }\n    printf(\"总价: %d\\n\", total);\n    return 0;\n}\n",
    "expectedOutput": "总价: 8\n"
  },
  {
    "id": 10,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int scores[3] = {0};\n    int total = 0;\n    for (int i = 0; i < 3; ++i) {\n        if (scanf(\"%d\", &scores[i]) != 1) {\n            puts(\"请输入整数成绩\");\n            return 1;\n        }\n        total += scores[i];\n    }\n    printf(\"总分: %d\\n\", total);\n    return 0;\n}\n",
    "expectedOutput": "总分: 255\n",
    "stdin": "80 90 85\n"
  },
  {
    "id": 11,
    "code": "#include <stdio.h>\n#include <stdbool.h>\n\nbool is_valid_age(int age) {\n    if (age >= 0 && age <= 120) {\n        return true;\n    }\n    return false;\n}\n\nint main(void) {\n    puts(is_valid_age(25) ? \"true\" : \"false\");\n    return 0;\n}\n",
    "expectedOutput": "true\n"
  },
  {
    "id": 12,
    "code": "#include <stdio.h>\n\nint count_char(const char *text, char target) {\n    int count = 0;\n    for (int i = 0; text[i] != '\\0'; ++i) {\n        if (text[i] == target) {\n            count += 1;\n        }\n    }\n    return count;\n}\n\nint main(void) {\n    printf(\"%d\\n\", count_char(\"hello\", 'l'));\n    return 0;\n}\n",
    "expectedOutput": "2\n"
  },
  {
    "id": 13,
    "code": "#include <stdio.h>\n\nint main(void) {\n    char text[32];\n    FILE *file = fopen(\"note.txt\", \"w\");\n    if (file == NULL) {\n        return 1;\n    }\n    if (fprintf(file, \"Hello, C!\\n\") < 0) {\n        fclose(file);\n        return 1;\n    }\n    if (fclose(file) != 0) {\n        return 1;\n    }\n    file = fopen(\"note.txt\", \"r\");\n    if (file == NULL) {\n        return 1;\n    }\n    if (fgets(text, sizeof text, file) == NULL) {\n        fclose(file);\n        return 1;\n    }\n    printf(\"%s\", text);\n    if (fclose(file) != 0) {\n        return 1;\n    }\n    return 0;\n}\n",
    "expectedOutput": "Hello, C!\n"
  }
];
