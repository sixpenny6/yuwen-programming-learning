// Short labels preserve the original large word-by-word reading layout.
// The lexer still holds the detailed contextual explanations for tooltips.
export const shortMeanings:Record<string,string>={
 '#include':'引入头文件',int:'整数',double:'小数',float:'小数',char:'字符',void:'无值',
 const:'只读',return:'返回',if:'如果',else:'否则',for:'循环',while:'当…时',do:'先执行',
 break:'跳出',continue:'下一轮',switch:'选择',case:'分支',default:'默认',struct:'结构体',
 typedef:'类型别名',sizeof:'字节数',unsigned:'无符号',static:'静态',enum:'枚举',
 bool:'真假类型',true:'真',false:'假',printf:'显示',scanf:'输入',puts:'显示并换行',
 fgets:'读一行',strlen:'长度',strcmp:'比较文字',strcpy:'复制文字',malloc:'申请内存',
 size_t:'大小类型',snprintf:'限量格式化',toupper:'转大写',FILE:'文件流',fopen:'打开文件',
 fclose:'关闭文件',fprintf:'写入格式文字',fputs:'写入文字',ferror:'文件错误',feof:'已到文件尾',
 INT_MIN:'最小整数',INT_MAX:'最大整数',
 free:'释放',NULL:'空指针',main:'主函数',std:'标准库',cout:'显示',cin:'输入',
 string:'字符串',vector:'动态数组',map:'映射表',set:'不重复集合',insert:'插入',
 max_element:'最大值的位置',accumulate:'累加',begin:'起点',end:'终点',empty:'是否为空',
 size:'元素数量',push_back:'末尾添加',ifstream:'读文件流',ofstream:'写文件流',getline:'读取整行',
 class:'类',public:'公开',private:'私有',
 protected:'受保护',virtual:'虚函数',override:'重写',explicit:'显式构造',auto:'推导类型',
 nullptr:'空指针',new:'创建',delete:'释放',
 try:'尝试',catch:'处理异常',throw:'抛出异常',namespace:'命名空间',using:'使用',
 '=':'设为','+':'加','-':'减','*':'乘／指针','/':'除','%':'余数','>':'大于','<':'小于',
 '==':'等于','!=':'不等于','<=':'小于等于','>=':'大于等于','++':'加一','--':'减一',
 '+=':'累加','-=':'减去','&&':'并且','||':'或者','!':'取反','&':'地址／引用',
 '<<':'送出／左移','>>':'读入／右移',';':'句末','(':'（',')':'）','[':'下标',']':'下标结束',
 '{':'开始','}':'结束',',':'分隔','.':'的','->':'指向成员','::':'的',':':'分隔','?':'选择'
};
