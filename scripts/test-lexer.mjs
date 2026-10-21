import fs from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";
const source = fs.readFileSync(
  new URL("../src/lexer.ts", import.meta.url),
  "utf8",
);
const javascript = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { tokenize } = await import(
  "data:text/javascript;base64," + Buffer.from(javascript).toString("base64")
);
const tokens = (code, meanings = {}) => tokenize(code, "cpp", meanings);
assert.equal(
  tokens("int count{3};", { count: "数量" }).find((t) => t.text === "count")
    .kind,
  "content",
);
assert.match(
  tokens("int count{3};").find((t) => t.text === "count").meaning,
  /自定义/,
);
assert.equal(
  tokens("std::count(a.begin(),a.end(),3);").find((t) => t.text === "count")
    .kind,
  "system",
);
assert.equal(
  tokens("explicit Student(int age);").find((t) => t.text === "explicit").kind,
  "system",
);
assert.match(
  tokens("virtual ~Base() = default;").find((t) => t.text === "default")
    .meaning,
  /默认实现/,
);
assert.match(
  tokens("virtual int speak() const = 0;").find((t) => t.text === "=").meaning,
  /纯虚/,
);
assert.match(
  tokenize("int main(void){}", "c").find((t) => t.text === "void").meaning,
  /不接收参数/,
);
assert.match(
  tokens("Student(int value) : age(value) {}").find((t) => t.text === ":")
    .meaning,
  /初始化列表/,
);
assert.equal(
  tokens("#include <iostream>\nint main(){}")[0].text,
  "#include <iostream>",
);
for (const text of [
  '#include <stdio.h>\n// 中文\nint main(void){printf("hi\\n");return 0;}',
  "std::vector<int> a{1,2}; /* 整段注释 */ a[0]+=2;\n",
  'char c=\'\\n\'; std::cout << "a\\\"b";',
])
  assert.equal(
    tokens(text)
      .map((t) => t.text)
      .join(""),
    text,
  );
// The revised lessons use standard-library names as well as equally named
// student variables. Keep their teaching categories and source text distinct.
for (const name of ["set", "max_element", "accumulate"]) {
  assert.equal(tokens(`std::${name}(first, last);`).find(t => t.text === name).kind, "system");
  assert.equal(tokens(`int ${name} = 1;`).find(t => t.text === name).kind, "content");
}
for (const text of [
  'int *p = malloc(3 * sizeof *p); if (p != NULL) { free(p); }',
  'FILE *file = fopen("note.txt", "w"); if (file != NULL) { fputs("hello", file); fclose(file); }',
  'std::set<int> seen; bool added = seen.insert(2).second;',
]) assert.equal(tokenize(text, text.startsWith("std::") ? "cpp" : "c").map(t => t.text).join(""), text);
assert.match(tokens("std::max_element(first,last);").find(t=>t.text==="max_element").meaning,/空区间/);
assert.equal(tokenize("a == INT_MIN && b == -1", "c").find(t=>t.text==="INT_MIN").kind,"system");
console.log(
  "Lexer context, source preservation, headers and C/C++ keyword tests passed",
);
