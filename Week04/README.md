#学习笔记

字符串算法
* 字典树 大量高重复字符串的存储和分析
又称单词查找树，Trie树，是哈希树的特例；应用于统计，排序和保存大量的字符串，经常被搜索引擎系统用于文本词频统计

创建随机字符`String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))`

> String.fromCharCode(num1[, ...[, numN]])

返回由指定的 UTF-16 代码单元序列创建的字符串

> str.charCodeAt(index)

返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元

* KMP  在长字符串里找模式
* Wildcard  带通配符的字符串模式
* 正则   字符串通用模式匹配
* 状态机   通用的字符串分析
* LL LR   字符串多层级结构分析