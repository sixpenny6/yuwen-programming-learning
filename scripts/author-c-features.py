"""Maintain the C-specific examples while retaining the original lesson slots.

Run: python scripts/author-c-features.py [--check]
Only literal exported data arrays are rewritten; interfaces/imports are retained.
The same fragments generate lecture, purpose and complete compilable examples.
"""
from __future__ import annotations
import argparse
import copy
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
DIRECTORY = ROOT / "src/adapted-data/c"
NAMES = [
    "wordSlides", "wordPurposeSlides", "wordExamples", "wordQuizzes",
    "sentenceSlides", "sentencePurposeSlides", "sentenceExamples", "sentenceQuizzes",
    "essaySlides", "essayPurposeSlides", "essayExamples", "essayQuizzes",
]
SYSTEM = set("""auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Bool _Complex _Imaginary bool true false size_t FILE NULL EOF printf scanf puts putchar fopen fprintf fgets fclose""".split())
TOKEN = re.compile(r'''(?:u8|L|u|U)?"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|/\*.*?\*/|//.*|#[A-Za-z_]\w*|(?:0[xX][\da-fA-F]+|\d+(?:\.\d*)?)(?:[uUlLfF]*)|[A-Za-z_]\w*|<<=|>>=|==|!=|<=|>=|&&|\|\||\+\+|--|->|\+=|-=|\*=|/=|<<|>>|[^\s]''')

def tokens(source):
    result, end = [], 0
    for match in TOKEN.finditer(source):
        value = match.group()
        if value in SYSTEM:
            kind, color = "系统定义", "text-purple-600"
        elif value.startswith(("//", "/*")):
            kind, color = "注释", "text-slate-500"
        elif re.match(r"""[A-Za-z_\d'"#]""", value):
            kind, color = "文本内容", "text-green-700"
        else:
            kind, color = "操作符号", "text-red-500"
        result.append({"text": source[end:match.start()] + value, "type": kind, "colorClass": color})
        end = match.end()
    if result:
        result[-1]["text"] += source[end:]
    assert "".join(t["text"] for t in result) == source
    return result

def lines(source):
    result = []
    for line in source.strip().splitlines():
        if not line.strip():
            continue
        spaces = len(line) - len(line.lstrip(" "))
        assert spaces % 4 == 0, "Use four-space visual indentation"
        result.append({"tokens": tokens(line[spaces:]), "indent": spaces // 4})
    return result

def complete(headers, functions, main, expected, stdin=None):
    code = "".join("#include <" + h + ">\n" for h in headers) + "\n"
    if functions:
        code += functions.strip() + "\n\n"
    code += "int main(void) {\n" + "\n".join("    " + l for l in main.strip().splitlines())
    code += "\n    return 0;\n}\n"
    return {"code": code, "expectedOutput": expected, **({"stdin": stdin} if stdin is not None else {})}

def shape(array):
    return [{"id": e["id"], "steps": len(e["stepsText"]) if "stepsText" in e else None,
             "blocks": len(e["blocks"]) if "blocks" in e else None,
             "quizType": e.get("codeVisual", {}).get("type") if "options" in e else None,
             "options": len(e["options"]) if "options" in e else None,
             "explanations": len(e["explanations"]) if "explanations" in e else None} for e in array]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    modules, data = {}, {}
    for name in NAMES:
        file = DIRECTORY / (name + ".ts")
        source = file.read_text(encoding="utf-8")
        match = re.search(r"export\s+const\s+" + name + r"\b[^=]*=\s*", source)
        assert match, name
        start = match.end()
        array, consumed = json.JSONDecoder().raw_decode(source[start:])
        modules[name] = (file, source, start, start + consumed)
        data[name] = array
    before = {name: shape(data[name]) for name in NAMES}
    def item(name, entry_id):
        return next(x for x in data[name] if x["id"] == entry_id)
    def essay(entry_id, steps, blocks, purpose, selected=None):
        lecture = item("essaySlides", entry_id)
        assert len(steps) == len(lecture["stepsText"])
        assert len(blocks) == len(lecture["blocks"])
        lecture["stepsText"] = steps
        lecture["blocks"] = [{"title": title, "lines": lines(code)} for title, code in blocks]
        demo = item("essayPurposeSlides", entry_id)
        demo.update(purpose)
        demo["code"] = copy.deepcopy(lecture["blocks"][selected]["lines"] if selected is not None else
                                     [line for block in lecture["blocks"] for line in block["lines"]])

    pointer = "*(&score)"
    item("wordSlides", 9).update(title="组词：地址访问", label="取地址与解引用", tokens=tokens(pointer),
        stepsText=[
            "这是一组“按地址找盒子”的词：先取位置，再读取位置里的值",
            "✂️ 1. 分词：&score取得score的地址，外层*沿这个地址访问score",
            "🔍 2. 识别：&取得地址，*解引用有效地址；这里不是乘法",
            "🏷️ 3. 词性：红色运算符组织访问，绿色score是我们定义的变量",
            "🧠 4. 内化：若score是85，*(&score)读到85；地址本身与85这个值不同"])
    item("wordPurposeSlides", 9).update(subtitle=pointer, code=[{"tokens": tokens(pointer)}],
        mockVars={"score": 85}, purpose="先用&取得score的地址，再用*读取该地址对应变量的值",
        purposeIcon="📍", expectedBehavior="score为85时，完整示例输出85；只解引用指向有效对象的地址")
    item("wordExamples", 9).update(complete(["stdio.h"], "", r'''int score = 85;
printf("%d\n", *(&score));''', "85\n"))
    item("wordQuizzes", 9).update(description="区分变量的值、地址和解引用。", tag="地址访问",
        question="已知 int score = 85;，表达式 *(&score) 的值是什么？",
        codeVisual={"type": "code", "content": pointer, "tokens": tokens(pointer)},
        options=["score的内存地址", "85", "一定发生错误"], explanations=[
            "不对哦～&score取得地址，但外层*又访问了该地址对应的score变量。",
            "正确！&取得score的地址，*读取该地址对应变量的值，所以结果是85。",
            "不对哦～score是有效的int变量，取得它的地址并立即解引用是合法操作。"])

    output_phrase = "puts(word)"
    item("wordSlides", 11).update(title="组词：函数调用", tokens=tokens(output_phrase), stepsText=[
        "文字的“动作”：调用标准库函数，把字符数组的内容显示出来",
        "✂️ 1. 分词：puts是函数名，括号里的word是传入的文字",
        "🔍 2. 识别：puts读取word中的字符串，输出后自动换行",
        "🏷️ 3. 词性：紫色是标准库动作，绿色是变量，红色是调用格式",
        "🧠 4. 内化：word存着hello时，puts(word)显示hello并换行，不改变word"])
    item("wordPurposeSlides", 11).update(subtitle=output_phrase, code=[{"tokens": tokens(output_phrase)}],
        mockVars={"word": "hello"}, purpose="调用puts输出字符数组里的文字，并在末尾换行",
        expectedBehavior="word为hello时，完整示例显示hello并换行")
    item("wordExamples", 11).update(complete(["stdio.h"], "", r'''char word[] = "hello";
puts(word);''', "hello\n"))
    item("wordQuizzes", 8).update(description="理解标准库输出函数。", tag="函数调用",
        question='已知 char word[] = "hello";，puts(word)会做什么？',
        codeVisual={"type": "code", "content": output_phrase, "tokens": tokens(output_phrase)},
        options=["把word全部改成大写", "显示word里的hello并换行", "计算word的长度"],
        explanations=[
            "不对哦～puts只输出文字，不会把字符数组改成大写。",
            "正确！puts读取word里的字符串，显示hello，并自动在末尾换行。",
            "不对哦～puts负责输出，不负责计算字符串长度。"])

    number_text = "(double)5 / 2"
    item("wordSlides", 13).update(tokens=tokens(number_text), resultText="→ 2.5", stepsText=[
        "编程中的“词性转换”：先把整数变成小数，再做除法",
        "✂️ 1. 分词：识别括号里的double、数字5、除号与数字2",
        "🔍 2. 识别：5 / 2是整数除法，结果为2；先把5转成double，结果就是2.5",
        "🏷️ 3. 词性：紫色double表示小数类型，红色括号和除号组织运算",
        "🧠 4. 内化：(double)5转换当前表达式的值，让这次除法保留小数"])
    item("wordPurposeSlides", 13).update(subtitle=number_text, code=[{"tokens": tokens(number_text)}],
        purpose="把整数5转换为double后做除法，保留小数部分", expectedBehavior="完整示例输出2.5")
    item("wordExamples", 13).update(complete(["stdio.h"], "", r'''printf("%.1f\n", (double)5 / 2);''', "2.5\n"))

    swap = r'''void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}'''
    item("sentenceSlides", 7).update(title="造句：指针参数函数", lines=lines(swap), stepsText=[
        "这是一个函数定义句：用指针参数交换调用者的两个整数。",
        "✂️ 1. 结构分析：int *a和int *b声明接收整数地址的指针参数。",
        "🔍 2. 识别：临时变量temp先保存旧值，*a和*b访问原来的整数。",
        "🏷️ 3. 词性：void表示不返回值，*在声明中表示指针，在表达式中用于解引用。",
        "🧠 4. 内化：调用swap(&left, &right)；C仍然按值传递，传入的是两个有效地址的副本。"])
    item("sentencePurposeSlides", 7).update(subtitle="指针参数交换", code=lines(swap),
        purpose="接收两个整数变量的有效地址，通过解引用交换原变量的值", purposeIcon="🔄",
        expectedBehavior="left为3、right为8时，调用swap(&left, &right)后输出8 3")
    item("sentenceExamples", 7).update(complete(["stdio.h"], swap, r'''int left = 3;
int right = 8;
swap(&left, &right);
printf("%d %d\n", left, right);''', "8 3\n"))
    item("sentenceQuizzes", 8).update(description="理解C的地址值传递与通过指针修改原变量。", tag="指针参数",
        question="已知left为3、right为8，调用swap(&left, &right)后，两个原变量的值是什么？",
        codeVisual={"type": "code", "lines": lines(swap)},
        options=["left为3，right为8", "left为8，right为3", "只有形参改变，原变量一定不变"], explanations=[
            "不对哦～这里传入了两个原变量的地址，*a和*b会访问并修改原变量。",
            "正确！地址值传给指针参数后，*a和*b交换两个原变量的值，结果是8和3。",
            "不对哦～C的确按值传递地址副本，但通过这个有效地址解引用仍能修改原变量。"])

    student = r'''struct Student {
    const char *name;
    int age;
};
struct Student student = {
    .age = 20,
    .name = "Alice"
};'''
    item("sentenceSlides", 11).update(title="造句：结构体初始化", lines=lines(student), stepsText=[
        "这是一个资料声明句：用结构体把姓名和年龄组成一张固定格式的资料卡。",
        "✂️ 1. 结构分析：struct Student声明字段，student保存一份具体资料。",
        "🔍 2. 识别：.age和.name按字段名指定初值，不必按字段声明的顺序填写。",
        "🏷️ 3. 词性：struct和类型规定资料格式，点号与字段名标明填写位置。",
        "🧠 4. 内化：student.name访问姓名，student.age访问整数年龄；字段在结构体类型中事先确定。"])
    item("sentencePurposeSlides", 11).update(subtitle="结构体指定初始化", code=lines(student),
        purpose="定义学生资料格式，再按字段名填写姓名和年龄",
        expectedBehavior="虽然先填写.age再填写.name，student.name仍为Alice，student.age为20")
    item("sentenceExamples", 11).update(complete(["stdio.h"], "", student +
        r''' 
printf("%s %d\n", student.name, student.age);''', "Alice 20\n"))

    read_age = r'''int age = 0;
if (scanf("%d", &age) == 1) {
    printf("年龄: %d\n", age);
} else {
    puts("请输入整数");
}'''
    item("sentenceSlides", 12).update(title="造句：输入结果检查", lines=lines(read_age), stepsText=[
        "这是一个输入检查句：读到整数才显示年龄，读不到就给出提示。",
        "✂️ 1. 结构分析：scanf尝试读取一个整数，if根据它的返回值选择分支。",
        "🔍 2. 识别：这里只有一个%d，返回1表示成功读到一个整数。",
        "🏷️ 3. 词性：scanf负责输入，&age给出存放位置，==1检查是否成功。",
        "🧠 4. 内化：成功时显示读到的年龄；输入不是整数或已经结束时，提示请输入整数。"])
    item("sentencePurposeSlides", 12).update(subtitle="检查scanf是否成功", code=lines(read_age),
        mockVars={"age": 18}, purpose="读取一个整数；scanf返回1时显示结果，否则提示输入整数",
        expectedBehavior="输入18后显示年龄: 18；输入hello则显示请输入整数")
    item("sentenceExamples", 12).update(complete(["stdio.h"], "", read_age, "年龄: 18\n", "18\n"))

    average = r'''double average(const int scores[], size_t count) {
    double total = 0.0;
    for (size_t i = 0; i < count; ++i) {
        total += scores[i];
    }
    return count > 0 ? total / (double)count : 0.0;
}'''
    average_use = r'''int scores[] = {80, 90, 85};
size_t count = sizeof scores / sizeof scores[0];
printf("%.1f\n", average(scores, count));'''
    essay(4, [
        "第四个例子：计算固定数组的平均成绩",
        "🧱 看整体：在数组定义处计算元素数量，再把数组和数量一起传给函数",
        "✂️ 看细节：sizeof scores是整个数组的字节数，sizeof scores[0]是一个元素的字节数",
        "🔍 看逻辑：两者相除得到3个元素；循环求和后除以数量",
        "🏷️ 词性：sizeof取得字节大小，size_t保存数量，double保存小数结果",
        "🧠 理解：数组作为函数参数时不会自动携带长度，不能在该形参上用sizeof计算元素数"],
        [("接收数组与显式长度", average), ("在数组定义处计算数量", average_use)],
        {"subtitle": "数组容量与元素计数", "mockVars": {"scores": "{80, 90, 85}", "count": 3},
         "purpose": "在固定数组定义处用sizeof计算元素数量，把数据与长度一起传入平均值函数",
         "expectedBehavior": "三个成绩80、90、85，完整示例输出85.0"}, selected=1)
    item("essayExamples", 4).update(complete(["stdio.h", "stddef.h"], average, average_use, "85.0\n"))

    word_array = r'''char word[] = "hello";'''
    change_letter = r'''word[0] = 'H';
puts(word);'''
    essay(7, [
        "第七个例子：修改字符数组的第一个字母",
        "🧱 看整体：先用char word[]存放hello，再修改第一个位置",
        "✂️ 看细节：下标从0开始，所以word[0]就是第一个字符",
        "🔍 看逻辑：把word[0]设成单个字符'H'，再用puts显示整串文字",
        "🏷️ 词性：单引号'H'表示一个字符，双引号\"hello\"表示字符串",
        r"🧠 理解：可写数组从hello变成Hello；末尾的NUL空字符\0仍然保留，不是数字字符0"],
        [("准备可写的字符数组", word_array), ("修改首字母并输出", change_letter)],
        {"subtitle": "修改字符数组首字母", "mockVars": {"word": "hello"},
         "purpose": "把可写字符数组中的第一个字母改成H，其余字符保持不变",
         "expectedBehavior": "同一份word数组从hello变成Hello，完整示例输出Hello"})
    item("essayExamples", 7).update(complete(["stdio.h"], "", word_array + "\n" + change_letter, "Hello\n"))

    score_array = "int scores[3] = {0};"
    fixed_scores = r'''int total = 0;
for (int i = 0; i < 3; ++i) {
    if (scanf("%d", &scores[i]) != 1) {
        puts("请输入整数成绩");
        return 1;
    }
    total += scores[i];
}
printf("总分: %d\n", total);'''
    essay(10, [
        "第十个例子：读取固定三项成绩并求总分",
        "🧱 看整体：准备一个能放3个整数的数组，用已学的循环逐项输入",
        "✂️ 看细节：i依次为0、1、2，scanf把整数写入scores[i]",
        "🔍 看逻辑：每读到一项成绩，就把它加进total；读不到整数时给出提示",
        "🏷️ 词性：int scores[3]说明固定容量，方括号与下标选择具体位置",
        "🧠 理解：本例输入三个0到100的整数成绩；数组只有下标0、1、2三个位置"],
        [("准备固定三项成绩数组", score_array), ("循环输入并累加", fixed_scores)],
        {"subtitle": "固定三项成绩单", "mockVars": {"scores": "{80, 90, 85}"},
         "purpose": "用固定三项数组保存成绩，循环读取并累加总分",
         "expectedBehavior": "依次输入80、90、85，完整示例输出总分: 255"}, selected=1)
    item("essayExamples", 10).update(complete(["stdio.h"], "", score_array + "\n" + fixed_scores, "总分: 255\n", "80 90 85\n"))

    write_note = r'''char text[32];
FILE *file = fopen("note.txt", "w");
if (file == NULL) {
    return 1;
}
if (fprintf(file, "Hello, C!\n") < 0) {
    fclose(file);
    return 1;
}
if (fclose(file) != 0) {
    return 1;
}'''
    read_note = r'''file = fopen("note.txt", "r");
if (file == NULL) {
    return 1;
}
if (fgets(text, sizeof text, file) == NULL) {
    fclose(file);
    return 1;
}
printf("%s", text);
if (fclose(file) != 0) {
    return 1;
}'''
    essay(13, [
        "第十三个例子：在同一次程序运行中写入记事本，再重新打开读回",
        "🧱 看整体：用w模式写入并关闭，再用r模式读取并关闭",
        "✂️ 看细节：先检查文件是否打开成功，再用文件流写入或读取",
        "🔍 看逻辑：fprintf写入文字，fgets把读到的一行放进text数组",
        "🏷️ 词性：FILE是文件流类型，fopen打开，fprintf写入，fgets读取，fclose关闭",
        "🧠 理解：每次使用后用fclose关闭；本例在同一次运行中完成写入和读回"],
        [("写入记事本并关闭", write_note), ("重新打开、读回并关闭", read_note)],
        {"subtitle": "FILE记事本写读", "mockVars": {}, "purposeIcon": "📝",
         "purpose": "用文件流写入一行文字，关闭后重新打开读回",
         "expectedBehavior": "本次运行写入note.txt后读回，完整示例输出Hello, C!；文件使用后已经关闭"})
    item("essayExamples", 13).update(complete(["stdio.h"], "", write_note + "\n" + read_note, "Hello, C!\n"))

    item("essayQuizzes", 5).update(description="理解常用头文件提供声明的作用。", tag="头文件声明",
        question="'#include <stdio.h>' 的作用是什么？",
        codeVisual={"type": "code", "content": "#include <stdio.h>"},
        options=["创建一个名叫stdio的变量", "删除输入和输出的功能", "提供printf、scanf、puts等函数的声明"],
        explanations=[
            "不对哦～#include <stdio.h>是包含头文件，不是创建变量。",
            "不对哦～包含头文件不是删除功能，它让编译器知道这些函数的声明。",
            "正确！#include <stdio.h>提供printf、scanf、puts等常用输入输出函数的声明。"])
    item("essayQuizzes", 7).update(description="理解通过有效地址修改调用者的变量。", tag="指针与原变量",
        question="函数需要修改main中的int score，哪种做法正确？", codeVisual={"type": "emoji", "content": "📍"},
        options=["只复制score的整数值，函数内赋值一定自动传回", "把&score传给int *形参，再通过解引用修改score", "用printf输出一个新数字就能修改score"],
        explanations=[
            "不对哦～C按值传递，修改普通int形参只会修改那个副本。",
            "正确！把有效的&score地址值传入指针形参，函数通过解引用访问并修改原变量。",
            "不对哦～printf只输出内容；修改变量需要对相应对象赋值。"])
    item("essayQuizzes", 11).update(description="理解固定数组的容量与下标。", tag="数组容量",
        question="int scores[3]可以使用哪些下标访问这三个元素？",
        codeVisual={"type": "code", "content": "int scores[3] = {80, 90, 85};"},
        options=["只能使用下标1、2、3", "可以使用下标0、1、2", "有3个元素，所以可以访问scores[3]"],
        explanations=[
            "不对哦～C数组下标从0开始；下标3已经在这三个元素之外。",
            "正确！容量为3表示三个位置，下标依次是0、1、2。",
            "不对哦～scores[3]是第四个位置，会超出这个数组，不能访问。"])

    corrected_size = 0
    def reclassify(value):
        nonlocal corrected_size
        if isinstance(value, list):
            for child in value:
                reclassify(child)
        elif isinstance(value, dict):
            if isinstance(value.get("text"), str) and value["text"].strip() == "size" and value.get("type") == "系统定义":
                value.update(type="文本内容", colorClass="text-green-700")
                corrected_size += 1
            for child in value.values():
                reclassify(child)
    for name in NAMES:
        reclassify(data[name])
    changed = []
    for name in NAMES:
        assert shape(data[name]) == before[name], "Original slot shape changed: " + name
        file, source, start, end = modules[name]
        output = source[:start] + json.dumps(data[name], ensure_ascii=False, indent=2) + source[end:]
        if source != output:
            changed.append(file.relative_to(ROOT).as_posix())
            if not args.check:
                file.write_bytes(output.encode("utf-8"))
    if args.check:
        assert not changed, "Authored data are stale: " + ", ".join(changed)
    print(json.dumps({"ok": True, "mode": "check" if args.check else "write", "datasets": len(NAMES),
                      "sizeTokensReclassified": corrected_size, "changed": changed}, ensure_ascii=False))

if __name__ == "__main__":
    main()

