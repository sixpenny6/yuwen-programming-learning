export const language = import.meta.env.VITE_LANGUAGE === 'cpp' ? 'cpp' : 'c';
export const languageName = language === 'cpp' ? 'C++' : 'C';
const isCpp = language === 'cpp';
export const transitionKeywords = [
  {en:'#include',cn:'引入头文件'},{en:'int',cn:'整数'},{en:'if',cn:'如果'},
  {en:'else',cn:'否则'},{en:'for',cn:'循环'},{en:'return',cn:'返回'},
  {en:isCpp?'class':'struct',cn:isCpp?'类':'结构体'},{en:isCpp?'nullptr':'NULL',cn:'空指针'},
  {en:isCpp?'std::cout':'printf',cn:'输出'}
];
export const systemKeywords = (isCpp ? [
 ['false','假','bool flag = false;'],['true','真','bool flag = true;'],['if','如果','if (score > 60) { }'],['else','否则','else { std::cout << "no"; }'],
 ['int','整数／函数返回类型','int my_func() { return 1; }'],['return','返回','return result;'],['for','循环','for (int i = 0; i < 3; ++i) { }'],['while','条件循环','while (i < 10) { ++i; }'],
 ['#include','引入头文件','#include <iostream>'],['nullptr','空指针','int* box = nullptr;'],['class','定义类','class Dog { };'],['bool','布尔类型','bool done = false;'],
 ['std','标准库命名空间','std::string name = "Tom";'],['const','只读限定','const int limit = 10;'],['auto','推导类型','auto count = 3;'],['std::cout','输出流','std::cout << "Hi";']
] : [
 ['false','假（stdbool.h）','bool flag = false;'],['true','真（stdbool.h）','bool flag = true;'],['if','如果','if (score > 60) { }'],['else','否则','else { printf("no"); }'],
 ['int','整数／函数返回类型','int my_func(void) { return 1; }'],['return','返回','return result;'],['for','循环','for (int i = 0; i < 3; ++i) { }'],['while','条件循环','while (i < 10) { ++i; }'],
 ['#include','引入头文件','#include <stdio.h>'],['NULL','空指针常量','int* box = NULL;'],['struct','定义结构体','struct Dog { int age; };'],['bool','布尔类型（stdbool.h）','bool done = false;'],
 ['char','字符类型','char letter = \'A\';'],['const','只读限定','const int limit = 10;'],['sizeof','取得字节数','sizeof(int)'],['printf','标准库输出函数','printf("Hi");']
]).map(([code,cn,example])=>({code,cn,example}));
export const symbolKeywords = [
 {code:'( )',cn:'小括号 - 调用／条件',example:isCpp?'std::cout.put(\'A\');':'printf("Hi");',desc:'传递函数参数，或包住条件'},
 {code:'[ ]',cn:'中括号 - 数组／索引',example:'nums[0] = 1;',desc:'访问数组中的元素，下标从零开始'},
 {code:'{ }',cn:'花括号 - 代码块',example:'if (age > 18) { age++; }',desc:'把从属语句组织成一组'},
 {code:';',cn:'分号 - 语句结束',example:'int score = 100;',desc:'结束声明或表达式语句；代码块后并非总要分号'},
 {code:'=',cn:'赋值 - 设为',example:'score = 100;',desc:'将右边的值赋给左边'},
 {code:'==',cn:'比较 - 等于',example:'if (a == b) { }',desc:'判断两边是否相等'},
 {code:'!=',cn:'比较 - 不等于',example:'if (a != b) { }',desc:'判断两边是否不相等'},
 {code:'>',cn:'比较 - 大于',example:'if (age > 18) { }',desc:'判断左边是否大于右边'},
 {code:'<',cn:'比较 - 小于',example:'if (age < 18) { }',desc:'判断左边是否小于右边'},
 {code:'+',cn:isCpp?'加法／字符串拼接':'加法',example:'total = a + b;',desc:isCpp?'数字相加；std::string 也可拼接':'数字相加；字符数组不能用 + 拼接'},
 {code:'-',cn:'减法',example:'diff = a - b;',desc:'数字相减'},
 {code:'*',cn:'乘法／指针相关',example:'area = w * h;',desc:'这里表示乘法；在指针语境也有其他含义'},
 {code:'/',cn:'除法',example:'avg = sum / n;',desc:'整数相除舍去小数部分，除数不能为零'},
 {code:'%',cn:'取余数',example:'int rem = 10 % 3;',desc:'整数除法的余数'},
 {code:',',cn:'逗号 - 分隔',example:'int a = 1, b = 2;',desc:'分隔参数、声明或初始化元素'},
 {code:'.',cn:'点号 - 访问成员',example:isCpp?'text.size()':'student.age',desc:isCpp?'访问对象的方法或数据成员':'访问结构体的字段'}
];
export const contentKeywords = [
 {code:'"Hello"',cn:'字符串 - 文字内容',example:isCpp?'std::cout << "Hello";':'printf("Hello");'},
 {code:'"你好"',cn:'字符串 - 中文内容',example:isCpp?'std::cout << "你好";':'printf("你好");'},
 {code:'100',cn:'整数',example:'int score = 100;'},
 {code:'3.14',cn:'小数／浮点数',example:'double pi = 3.14;'},
 {code:'name',cn:'变量名 - 自定义标识符',example:isCpp?'std::string name = "Tom";':'char name[] = "Tom";'},
 {code:'age',cn:'变量名 - 自定义标识符',example:'int age = 18;'},
 {code:'result',cn:'变量名 - 存储结果',example:'int result = a + b;'},
 {code:'total',cn:'变量名 - 存储总计',example:'int total = 0;'},
 {code:'count',cn:'变量名 - 存储计数',example:'count = count + 1;'},
 {code:'items',cn:isCpp?'变量名 - 存储容器':'变量名 - 存储数组',example:isCpp?'std::vector<int> items = {1, 2, 3};':'int items[] = {1, 2, 3};'},
 {code:'data',cn:'变量名 - 存储数据',example:'int data = 0;'},
 {code:'i',cn:'循环变量 - 常用索引',example:'for (int i = 0; i < 10; ++i) { }'}
];
export const defaultCode = isCpp ? `#include <iostream>
int main() {
    int price = 10;
    int count = 5;
    int total = price * count;
    if (total > 40) {
        std::cout << "太贵了" << '\\n';
    } else {
        std::cout << "买了！" << '\\n';
    }
    return 0;
}` : `#include <stdio.h>
int main(void) {
    int price = 10;
    int count = 5;
    int total = price * count;
    if (total > 40) {
        printf("太贵了\\n");
    } else {
        printf("买了！\\n");
    }
    return 0;
}`;
