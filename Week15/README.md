# 学习笔记

```
setInterval(() => {}, 16)

let tick = () => {
  setTimeout(tick, 16)
}

let tick = () => {
  let handler = requestAnimationFrame(tick);
  cancelAnimationFrame(handler)
}
```


## 手势


