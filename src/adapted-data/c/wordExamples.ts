export interface WordExample { id: number; code: string; stdin?: string; expectedOutput: string; }
export const wordExamples: WordExample[] = [
  {
    "id": 1,
    "code": "#include <stdio.h>\n\nint main(void) {\n    printf(\"%s\", \"\");\n    return 0;\n}\n",
    "expectedOutput": ""
  },
  {
    "id": 2,
    "code": "#include <stdio.h>\n\nint main(void) {\n    printf(\"你好\\n\");\n    return 0;\n}\n",
    "expectedOutput": "你好\n"
  },
  {
    "id": 3,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int age = 10;\n    printf(\"%d\\n\", age + 1);\n    return 0;\n}\n",
    "expectedOutput": "11\n"
  },
  {
    "id": 4,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int num1 = 100;\n    int num2 = 85;\n    printf(\"%d\\n\", num1 + num2);\n    return 0;\n}\n",
    "expectedOutput": "185\n"
  },
  {
    "id": 5,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 80;\n    printf(\"%d\\n\", score >= 60);\n    return 0;\n}\n",
    "expectedOutput": "1\n"
  },
  {
    "id": 6,
    "code": "#include <stdio.h>\n\nvoid repeat(const char *text, int count) {\n    for (int i = 0; i < count; ++i) { printf(\"%s\", text); }\n}\n\nint main(void) {\n    const char *greeting = \"你好\";\n    repeat(greeting, 3);\n    printf(\"\\n\");\n    return 0;\n}\n",
    "expectedOutput": "你好你好你好\n"
  },
  {
    "id": 7,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 100;\n    printf(\"%d\\n\", score == 100);\n    return 0;\n}\n",
    "expectedOutput": "1\n"
  },
  {
    "id": 8,
    "code": "#include <stdio.h>\n\nint main(void) {\n    const char *fruits[] = {\"苹果\", \"香蕉\", \"橘子\"};\n    printf(\"%s\\n\", fruits[0]);\n    return 0;\n}\n",
    "expectedOutput": "苹果\n"
  },
  {
    "id": 9,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 85;\n    printf(\"%d\\n\", *(&score));\n    return 0;\n}\n",
    "expectedOutput": "85\n"
  },
  {
    "id": 10,
    "code": "#include <stdio.h>\n\nstruct Student { const char *name; };\n\nint main(void) {\n    struct Student student = {\"小明\"};\n    printf(\"%s\\n\", student.name);\n    return 0;\n}\n",
    "expectedOutput": "小明\n"
  },
  {
    "id": 11,
    "code": "#include <stdio.h>\n\nint main(void) {\n    char word[] = \"hello\";\n    puts(word);\n    return 0;\n}\n",
    "expectedOutput": "hello\n"
  },
  {
    "id": 12,
    "code": "#include <stdio.h>\n\nint append(int *nums, size_t *count, int value) {\n    if (*count >= 4) { return 0; }\n    nums[*count] = value;\n    ++*count;\n    return 1;\n}\n\nint main(void) {\n    int nums[4] = {1, 2, 3};\n    size_t count = 3;\n    if (!append(nums, &count, 4)) { return 1; }\n    for (size_t i = 0; i < count; ++i) { printf(i ? \" %d\" : \"%d\", nums[i]); }\n    printf(\"\\n\");\n    return 0;\n}\n",
    "expectedOutput": "1 2 3 4\n"
  },
  {
    "id": 13,
    "code": "#include <stdio.h>\n\nint main(void) {\n    printf(\"%.1f\\n\", (double)5 / 2);\n    return 0;\n}\n",
    "expectedOutput": "2.5\n"
  },
  {
    "id": 14,
    "code": "#include <stdio.h>\n\nint main(void) {\n    printf(\"%d %s\\n\", 1 + 1, \"1\" \"1\");\n    return 0;\n}\n",
    "expectedOutput": "2 11\n"
  },
  {
    "id": 15,
    "code": "#include <stdio.h>\n\nint main(void) {\n    const char *name = \"小明\";\n    printf(\"你好，%s\", name);\n    printf(\"\\n\");\n    return 0;\n}\n",
    "expectedOutput": "你好，小明\n"
  },
  {
    "id": 16,
    "code": "#include <stdio.h>\n\nint main(void) {\n    const char *fruits[] = {\"苹果\", \"香蕉\", \"橘子\"};\n    printf(\"%s %s %s\\n\", fruits[0], fruits[1], fruits[2]);\n    return 0;\n}\n",
    "expectedOutput": "苹果 香蕉 橘子\n"
  },
  {
    "id": 17,
    "code": "#include <stdio.h>\n\nstruct Student { const char *name; };\n\nint main(void) {\n    struct Student student = {.name = \"小明\"};\n    printf(\"%s\\n\", student.name);\n    return 0;\n}\n",
    "expectedOutput": "小明\n"
  },
  {
    "id": 18,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int age = 25;\n    printf(\"%d\\n\", age > 18 && age < 60);\n    return 0;\n}\n",
    "expectedOutput": "1\n"
  },
  {
    "id": 19,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int is_vip = 0;\n    int points = 1200;\n    printf(\"%d\\n\", is_vip || points > 1000);\n    return 0;\n}\n",
    "expectedOutput": "1\n"
  },
  {
    "id": 20,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int is_done = 0;\n    printf(\"%d\\n\", !is_done);\n    return 0;\n}\n",
    "expectedOutput": "1\n"
  },
  {
    "id": 21,
    "code": "#include <stdio.h>\n\nint main(void) {\n    int score = 80;\n    printf(\"%s\\n\", score >= 60 ? \"通过\" : \"重修\");\n    return 0;\n}\n",
    "expectedOutput": "通过\n"
  }
];
