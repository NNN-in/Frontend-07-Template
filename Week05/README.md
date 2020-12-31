# 学习笔记

## Map

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

`Map.prototype.set(key, value)`

`Map.prototype.has(key)`

Map 可以使用for..of方法迭代，可以将二维键值数组转为Map对象

## Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

```javascript
const proxy = new Proxy(target, handler);
```

target: 使用Proxy包装的目标对象（对象，数组，函数，proxy）

handler: 定制拦截行为的对象

```javascript
const obj = { a: 1 };

const proxy = new Proxy(obj, {
  get(object, prop) {
    return object[prop];
  },

  set(object, prop, value) {
    object[prop] = value;
  }
})
```

## 1-5总结

* 基础知识的查缺补漏
* 平时做业务几乎没怎么涉及算法方面的知识，最近学习后发现js编程上的确很...弱...，课程进度差不多可以跟上，也在力扣上补一些简单的算法练习

