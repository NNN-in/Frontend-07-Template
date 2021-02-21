# 学习笔记

CSS  
  at-rule  
  
* @charset
* @import
* @media
* @page
* @counter-style
* @keyframes
* @fontface
* @support
* @namespace

  rule
  
* selector
* declaration
  * value
  * key 
  

Selector  
  https://www.w3.org/TR/selector-3  
  https://www.w3.org/TR/selector-4

Key  
  Properties  
  Variables: https://www.w3.org/TR/css-variables/
  
Value  
  https://www.w3.org/TR/css-values-4/
  
  
### 伪类

链接/行为

* :any-link 匹配所有超链接
* :link 匹配没有访问的超链接 :visited 已经访问过的
* :hover
* :active
* :focus
* :target

一旦使用了link或者visited之后就不能再修改除了颜色之外的属性了

树结构

* :empty
* :nth-child()
* :nth-last-child()
* :first-child :last-child :only-child

> 尽量少使用破坏css回溯原则的属性 例如last-child 

逻辑型

* :not
* :where :has

> 避免过于复杂的选择起

### 伪元素

* ::before
* ::after
* ::first-line
* ::first-letter 相当于给第一个字母括起来
















  
  
  
  
  
  