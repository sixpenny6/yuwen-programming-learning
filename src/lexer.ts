import type { Language } from "./types";
export type TeachingToken = {
  text: string;
  kind: "system" | "symbol" | "content" | "space" | "comment";
  meaning: string;
  line: number;
};
const common: Record<string, string> = {
  "#include": "引入头文件，好比查阅一本工具词典",
  "#define": "定义宏，在预处理阶段替换文字",
  int: "整数类型，用来声明整数或整数返回值",
  double: "双精度小数类型",
  float: "单精度小数类型",
  char: "字符类型，保存一个字符单元",
  void: "不返回值；在参数列表中可表示无参数",
  const: "只读限定，不能通过这个名字修改值",
  return: "从当前函数返回一个值或结束函数",
  if: "如果条件成立就执行",
  else: "否则执行另一条路径",
  for: "按初始化、条件和更新反复执行",
  while: "条件成立就继续循环",
  do: "先执行一次，再判断是否继续",
  break: "结束当前循环或 switch",
  continue: "跳过本轮剩余内容，进入下一轮",
  switch: "根据一个值选择分支",
  case: "分支对应的常量值",
  default: "没有其他分支匹配时的分支",
  struct: "把相关字段组织成一种结构体类型",
  typedef: "给已有类型起一个别名",
  sizeof: "取得类型或对象占用的字节数",
  unsigned: "无符号整数类型限定，值不为负；运算仍有固定范围",
  signed: "有符号整数类型限定，可表示正数和负数",
  long: "整数或浮点类型的长度限定，具体宽度取决于类型和平台",
  short: "较短整数类型限定",
  static: "在不同位置可表示静态存储期或限定名字的链接范围",
  enum: "定义一组有名字的枚举常量",
  size_t: "表示大小和下标的无符号整数类型；printf 中与 %zu 配对",
  printf: "标准库输出函数；格式字符串决定怎样展示数据",
  scanf: "标准库输入函数；通常需要接收变量的地址",
  puts: "输出字符串并换行",
  fputs: "向指定文件流写入字符串，不自动追加换行",
  snprintf: "按容量上限把格式化文字写入字符数组；返回需要的长度，须检查失败或截断",
  toupper: "把可表示为 unsigned char 的英文小写字符转为大写；EOF 也是允许的输入",
  getchar: "读取一个字符；用 int 保留 EOF 状态",
  putchar: "输出一个字符",
  fflush: "刷新输出缓冲，让提示及时显示",
  strlen: "计算字符串终止符前的字符单元数",
  strcmp: "比较两个字符串；返回 0 才表示相等",
  strcpy: "复制字符串，目标空间必须足够",
  fgets: "在容量限制内读取一行",
  malloc: "申请内存，必须检查返回值并在使用后释放",
  calloc: "申请并清零内存",
  free: "释放之前申请的动态内存",
  NULL: "空指针常量，表示没有指向有效对象",
  FILE: "标准库文件流类型",
  fopen: "打开文件，失败会返回空指针",
  fclose: "关闭文件流",
  rewind: "把文件位置移回开头，并清除文件结束和错误标志",
  ferror: "检查文件流是否发生了读写错误",
  feof: "检查之前的读取是否已遇到文件结尾，不能用它提前预测下一次读取",
  fprintf: "向指定文件按格式写入",
  fscanf: "从指定文件按格式读取",
  EOF: "文件结束或读取失败的标记",
  INT_MIN: "由 <limits.h> 提供的 int 最小值；它除以 -1 的数学结果超出 int 的范围",
  INT_MAX: "由 <limits.h> 提供的 int 最大值，具体范围取决于实现",
  "=": "赋值，把右侧结果存入左侧对象；不是数学等式",
  "==": "判断两侧是否相等",
  "!=": "判断两侧是否不等",
  "+": "数值相加；C 字符数组不能直接用加号拼接",
  "-": "相减或取负",
  "*": "在表达式中可为乘法或解引用，在声明中可表示指针",
  "/": "除法；两个整数相除会舍去小数部分",
  "%": "整数除法的余数",
  ">": "大于",
  "<": "比较左侧是否小于右侧",
  ">=": "大于或等于",
  "<=": "小于或等于",
  "&&": "逻辑并且；左侧为假时不再计算右侧",
  "||": "逻辑或者",
  "!": "逻辑取反",
  "&": "取地址或按位与，具体取决于表达式中的位置",
  "++": "让可修改的数值加一",
  "--": "让可修改的数值减一",
  "+=": "把相加结果赋回原对象",
  "-=": "把相减结果赋回原对象",
  ";": "结束一条语句，类似句号；for 头部也用它分隔三个部分",
  ",": "分隔项目，例如参数、声明或初始化元素",
  "{": "开始一个代码块或初始化列表",
  "}": "结束一个代码块或初始化列表",
  "(": "开始参数、条件或分组表达式",
  ")": "结束参数、条件或分组表达式",
  "[": "开始数组声明的长度部分或元素下标",
  "]": "结束数组声明的长度部分或元素下标",
  ".": "访问对象的成员",
  "->": "通过指针访问对象成员",
  ":": "分隔标签或位字段；也与问号组成条件选择表达式",
  "?": "条件运算符：根据条件选择结果",
  main: "程序入口函数；返回 0 通常表示正常结束",
};
const cStandardMacros: Record<string, string> = {
  bool: "C17 中由 <stdbool.h> 提供的类型宏，展开为布尔类型 _Bool",
  true: "C17 中由 <stdbool.h> 提供的宏，表示真，展开为整数常量 1",
  false: "C17 中由 <stdbool.h> 提供的宏，表示假，展开为整数常量 0",
};
const cpp: Record<string, string> = {
  "+": "数值相加；std::string 也支持字符串拼接",
  "<": "比较小于；在模板中也可界定类型参数",
  "&&": "表达式中表示逻辑并且；声明中也可表示右值引用",
  "&": "取地址或按位与；在声明中也可表示引用",
  "[": "开始数组下标；也可开始 lambda 捕获列表",
  "]": "结束数组下标或 lambda 捕获列表",
  ":": "分隔标签、位字段、条件选择、范围 for 或访问权限等结构",
  std: "标准库所在的命名空间",
  "::": "指定命名空间或类的作用域",
  cout: "标准输出流，把内容送到结果区",
  cin: "标准输入流，从输入区读取数据",
  cerr: "标准错误输出流",
  endl: "输出换行并刷新输出缓冲",
  "<<": "流表达式中把右侧内容送给输出流；整数表达式中也可表示左移",
  ">>": "流表达式中从输入流提取内容；整数表达式中也可表示右移",
  string: "标准库字符串类型，自动管理字符存储",
  vector: "标准库动态数组，自动管理元素存储",
  map: "按键组织键值对的有序容器",
  set: "按顺序保存不重复的键；插入已有键不会新增元素",
  insert: "向容器插入元素；set 的返回结果含位置和是否成功新增的标志",
  max_element: "查找区间内最大元素的位置；空区间返回结束位置，不能直接解引用",
  accumulate: "从给定初值开始依次累加区间；初值类型也决定累加结果的类型",
  boolalpha: "让流用 true 和 false 文字显示布尔值",
  bool: "布尔类型，只有 true 和 false 两种值",
  true: "布尔真值",
  false: "布尔假值",
  auto: "让编译器根据初始化表达式推导类型",
  class: "定义类，把状态和行为组织在一起",
  public: "公开成员，允许类外访问",
  private: "私有成员，只允许类及其友元访问",
  protected: "受保护成员，供类和派生类使用",
  virtual: "虚函数，通过基类指针或引用可动态选择实现",
  override: "要求当前函数确实重写了基类虚函数",
  nullptr: "C++ 的空指针值",
  new: "创建动态对象，通常优先使用容器或智能指针",
  delete: "销毁动态对象，需与正确的创建方式配对",
  unique_ptr: "独占拥有对象的智能指针，离开作用域时自动释放",
  make_unique: "创建 unique_ptr 管理的对象",
  sort: "对一个迭代器区间排序",
  count: "统计区间中等于某值的元素数量",
  find: "在区间中查找元素，找不到时返回结束迭代器",
  begin: "取得容器起始迭代器",
  end: "取得容器结束位置的迭代器",
  push_back: "在容器末尾添加一个元素",
  size: "取得当前元素数量",
  empty: "判断容器是否为空",
  getline: "读取整行文本，包括行内空格",
  ofstream: "输出文件流，负责向文件写入",
  ifstream: "输入文件流，负责从文件读取",
  try: "尝试执行可能抛出异常的代码",
  catch: "处理匹配的异常",
  throw: "抛出异常",
  using: "引入名字或声明类型别名",
  this: "指向当前对象的指针",
  explicit: "显式构造或转换，避免把一个值悄悄隐式转换成对象",
  constexpr: "声明可用于常量表达式的对象或函数，具体仍受语法条件约束",
  namespace: "定义命名空间，把相关名字组织在一起",
  friend: "授予指定函数或类访问非公开成员的权限",
  noexcept: "声明函数不会向外抛出异常，或在表达式中查询这一性质",
  final: "限制进一步继承，或禁止派生类继续重写这个虚函数",
};
const cKeywords = new Set(
  "auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Alignas _Alignof _Atomic _Bool _Complex _Generic _Imaginary _Noreturn _Static_assert _Thread_local".split(
    " ",
  ),
);
const cppKeywords = new Set([
  ...cKeywords,
  ..."alignas alignof and and_eq asm bitand bitor bool catch char16_t char32_t class compl constexpr const_cast decltype delete dynamic_cast explicit export false friend mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public reinterpret_cast static_assert static_cast template this thread_local throw true try typeid typename using virtual wchar_t xor xor_eq override final".split(
    " ",
  ),
]);
export function tokenize(
  code: string,
  language: Language,
  meanings: Record<string, string> = {},
): TeachingToken[] {
  const pattern =
    /(#[ \t]*include[ \t]*(?:<[^>\n]+>|"[^"\n]+")|#[ \t]*(?:include|define|ifdef|ifndef|endif|pragma)|\/\*[\s\S]*?\*\/|\/\/[^\n]*|(?:u8|u|U|L)?"(?:\\.|[^"\\])*"|(?:u|U|L)?'(?:\\.|[^'\\])*'|\r?\n|[^\S\n]+|(?:0[xX][\da-fA-F]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)[uUlLfF]*|[A-Za-z_]\w*|>>=|<<=|->|::|==|!=|<=|>=|\+\+|--|&&|\|\||\+=|-=|\*=|\/=|<<|>>|[^\w\s])/g;
  const dictionary = language === "cpp" ? { ...common, ...cpp } : { ...common, ...cStandardMacros };
  let line = 1;
  let groupingDepth = 0;
  const conditionalDepths: number[] = [];
  const matches = [...code.matchAll(pattern)];
  const significant = (at: number, direction: number) => {
    for (let i = at + direction; i >= 0 && i < matches.length; i += direction)
      if (!/^\s+$/.test(matches[i][0])) return matches[i][0];
    return "";
  };
  return matches.map((match, index) => {
    const text = match[0];
    // Match ?: at the same nesting depth, so a parenthesized true branch
    // is not mistaken for a constructor's member-initializer list.
    if ([")", "]", "}"].includes(text)) {
      groupingDepth = Math.max(0, groupingDepth - 1);
      while (conditionalDepths.length && conditionalDepths[conditionalDepths.length - 1] > groupingDepth)
        conditionalDepths.pop();
    }
    const conditionalColon = text === ":" && conditionalDepths[conditionalDepths.length - 1] === groupingDepth;
    if (conditionalColon) conditionalDepths.pop();
    if (text === "?") conditionalDepths.push(groupingDepth);
    if (text === ";") {
      while (conditionalDepths.length && conditionalDepths[conditionalDepths.length - 1] >= groupingDepth)
        conditionalDepths.pop();
    }
    if (["(", "[", "{"].includes(text)) groupingDepth++;
    let kind: TeachingToken["kind"] = "content";
    const keyword = (language === "cpp" ? cppKeywords : cKeywords).has(text);
    const previous = significant(index, -1),
      next = significant(index, 1);
    const library =
      Boolean(dictionary[text]) &&
      (text === "main" ||
        ["FILE", "NULL", "EOF", "size_t", "INT_MIN", "INT_MAX"].includes(text) ||
        (language === "c" && Object.hasOwn(cStandardMacros, text)) ||
        (language === "cpp" && text === "std") ||
        previous === "::" ||
        next === "(");
    let meaning =
      meanings[text] ||
      (keyword || library || !/^\w+$/.test(text) ? dictionary[text] : "") ||
      "";
    if (/^\s+$/.test(text)) kind = "space";
    else if (/^\/\//.test(text) || /^\/\*/.test(text)) {
      kind = "comment";
      meaning = "注释，给读者看的说明，不作为程序指令执行";
    } else if (text.startsWith("#")) {
      kind = "system";
      meaning = text.startsWith("#include")
        ? "引入头文件，好比查阅这本工具词典，让编译器认识其中的声明"
        : "预处理指令，在编译前处理源代码";
    } else if (keyword || (/^[A-Za-z_]\w*$/.test(text) && library)) {
      kind = "system";
      meaning ||= `${language === "cpp" ? "C++" : "C"} 语法关键字，按它所在的声明或语句理解`;
    } else if (!/^[\w"']/.test(text)) {
      kind = "symbol";
      meaning ||= "用于组织代码的符号";
    } else if (/^[uUL]*["']/.test(text)) {
      meaning ||= text.includes('"')
        ? "字符串字面量；反斜杠可表示转义字符"
        : "字符字面量；不能把它当作字符串";
    } else if (/^\d/.test(text)) {
      meaning ||= "数值字面量，代码里直接写出的数";
    } else meaning ||= "自定义名字，具体含义取决于它的声明和上下文";
    if (language === "cpp" && text === "default" && previous === "=")
      meaning =
        "显式要求编译器生成这个特殊成员函数的默认实现，不是 switch 的兜底分支";
    if (language === "cpp" && text === "=" && next === "default")
      meaning = "与 default 一起指定默认成员函数实现，这里不是变量赋值";
    if (language === "cpp" && text === "=" && next === "delete")
      meaning = "与 delete 一起禁止这个函数被调用，这里不是变量赋值";
    if (
      language === "cpp" &&
      text === "=" &&
      next === "0" &&
      /\)\s*(?:(?:const|noexcept|override|final)\s*)?$/.test(
        code.slice(0, match.index),
      )
    )
      meaning = "在虚函数声明末尾使用 = 0，声明纯虚函数；不是给变量赋零";
    if (text === "void" && previous === "(" && next === ")")
      meaning = "参数列表中的 void 表示这个函数不接收参数，不是在说明返回值";
    if (
      language === "cpp" &&
      text === ":" &&
      /\)\s*$/.test(code.slice(0, match.index))
    )
      meaning = "构造函数成员初始化列表的开始；在函数体执行前初始化成员或基类";
    if (conditionalColon)
      meaning = "与 ? 组成条件选择表达式；条件为假时选择冒号后面的值";
    const token = { text, kind, meaning, line };
    line += (text.match(/\n/g) || []).length;
    return token;
  });
}
