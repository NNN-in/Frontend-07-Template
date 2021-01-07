# 学习笔记

## 语言按语法分类

* 非形式语言
  
  中文，英文

* 形式语言（乔姆斯基谱系）

> 计算机科学中刻画形式文法表达能力的一个分类谱系，是由语言学家诺姆·乔姆斯基于1956年提出的

  0型 无限制文法
  1型 上下文相关文法
  2型 上下文无关文法
  3型 正则文法

## 产生式（BNF 巴科斯-诺尔范式）

用尖括号括按起来的名称表示语法结构名
语法结构分成基础结构和需要用其他语法结构定义的复合结构
  基础结构称终结符 terminal symbol
  复合结构称非终结符 nonterminal symbol

引号和中间的字符表示终结符
可以有括号
`*` 重复多次
`|` 或
`+` 至少一次


## 语言分类

形式语言——用途
  数据描述语言 JSON, HTML, CSS, SGML, XML, sql
  编程语言 C, Java, C++, Python, Ruby, Perl, Lisp, Clojure, Haskell, JavaScript...

形式语言——表达方式
  声明式语言 JSON, HTML, CSS, SQL, XAML, Lisp, Clojure, Haskell...
  命令型语言 C, C++, Java, c#, Python, Ruby, Perl, JavaScript

## 编程语言的性质

图灵完备性
  命令式——图灵机
    goto
    if和while
  声明式——lambda
    递归

动态与静态
  在用户的


## JS类型

类型

Number 
String 
Boolean 
Object 
Null 有值但为空 
Undefined 未赋值 
Symbol 用于object属性名 

### Number

双精度浮点类型 IEEE754 Double Float

Sign（1）符号 0正 1负 
Exponent（11）指数 
Fraction（52）精度 


精度损失

十进制 
`0` 
`0.` 
`.2` 
`1e3` 

```JavaScript
0.toString()
// Uncaught SyntaxError: Invalid or unexpected token
0 .toString()
// '0'
```

二进制
0b111

八进制 
0o10

十六进制 
0xFF

### String

计算机中用code point表示character

* ASCII  
0~127 规定了128个字符的编码

* Unicode 
所有符号的编码

* UCS

* GB 
  GB2312，GBK，GB18030 大全版本

* ISO-8859 

* BIG5 


UTF8 
UTF16 

function UTF8_Encoding(string) {}

### Boolean

true false

### Null Undefined

null 关键字 

undefined 全局变量 

void 0 


