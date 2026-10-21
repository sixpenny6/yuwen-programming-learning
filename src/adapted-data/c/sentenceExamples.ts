/** 原12个造句槽位对应的完整可编译验证程序；不增加教学页面。 */
export interface SentenceExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const sentenceExamples: SentenceExample[] = [
  {
    "id": 1,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 75;\n    if (score > 60) {\n        puts(\"合格\");\n    }\n    return 0;\n}\n",
    "expectedOutput": "合格\n"
  },
  {
    "id": 2,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 95;\n    char grade;\n    if (score > 90) {\n        grade = 'A';\n    } else {\n        grade = 'F';\n    }\n    printf(\"%c\\n\", grade);\n    return 0;\n}\n",
    "expectedOutput": "A\n"
  },
  {
    "id": 3,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int scores[] = {85, 92, 78};\n    int total = 0;\n    for (int i = 0; i < 3; ++i) {\n        total = total + scores[i];\n    }\n    printf(\"%d\\n\", total);\n    return 0;\n}\n",
    "expectedOutput": "255\n"
  },
  {
    "id": 4,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int power = 3;\n    while (power > 0) {\n        puts(\"Running\");\n        power = power - 1;\n    }\n    return 0;\n}\n",
    "expectedOutput": "Running\nRunning\nRunning\n"
  },
  {
    "id": 5,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int scores[] = {85, 92, 78};\n    printf(\"%d %d %d\\n\", scores[0], scores[1], scores[2]);\n    return 0;\n}\n",
    "expectedOutput": "85 92 78\n"
  },
  {
    "id": 6,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int scores[] = {85, 92, 78};\n    int first = scores[0];\n    printf(\"%d\\n\", first);\n    return 0;\n}\n",
    "expectedOutput": "85\n"
  },
  {
    "id": 7,
    "code": "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int left = 3;\n    int right = 8;\n    swap(&left, &right);\n    printf(\"%d %d\\n\", left, right);\n    return 0;\n}\n",
    "expectedOutput": "8 3\n"
  },
  {
    "id": 8,
    "code": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main(void) {\n    printf(\"%d\\n\", add(3, 5));\n    return 0;\n}\n",
    "expectedOutput": "8\n"
  },
  {
    "id": 9,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 75;\n    char grade = 'F';\n    if (score >= 90) {\n        grade = 'A';\n    } else if (score >= 60) {\n        grade = 'C';\n    }\n    printf(\"%c\\n\", grade);\n    return 0;\n}\n",
    "expectedOutput": "C\n"
  },
  {
    "id": 10,
    "code": "#include <stdio.h>\n\nvoid append(int numbers[], int *length, int capacity, int value) {\n    if (*length < capacity) {\n        numbers[*length] = value;\n        *length = *length + 1;\n    }\n}\n\nint main(void) {\n    int numbers[4] = {1, 2, 3};\n    int length = 3;\n    append(numbers, &length, 4, 42);\n    for (int i = 0; i < length; ++i) { printf(\"%d\\n\", numbers[i]); }\n    return 0;\n}\n",
    "expectedOutput": "1\n2\n3\n42\n"
  },
  {
    "id": 11,
    "code": "#include <stdio.h>\n\nint main(void) {\n    struct Student {\n        const char *name;\n        int age;\n    };\n    struct Student student = {\n        .age = 20,\n        .name = \"Alice\"\n    }; \n    printf(\"%s %d\\n\", student.name, student.age);\n    return 0;\n}\n",
    "expectedOutput": "Alice 20\n"
  },
  {
    "id": 12,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int age = 0;\n    if (scanf(\"%d\", &age) == 1) {\n        printf(\"年龄: %d\\n\", age);\n    } else {\n        puts(\"请输入整数\");\n    }\n    return 0;\n}\n",
    "expectedOutput": "年龄: 18\n",
    "stdin": "18\n"
  }
];
