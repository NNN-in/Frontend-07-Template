学习笔记


```
npx express-generator

npm install

npm start
```

request和response是流式处理

## nodejs stream

https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable


流式传输的内容类型

```
headers: {
  'Content-Type': 'application/octet-stream'
}
```

展开： 可以了解HTTP RFC标准


publish-tool 发送数据到publish-server  

publish-server  读取数据写到文件  

server  服务  

## 多文件

Archiver https://www.npmjs.com/package/archiver  压缩

Unzipper https://www.npmjs.com/package/unzipper  解压

nodejs pipe https://nodejs.org/dist/latest-v14.x/docs/api/stream.html#stream_readable_pipe_destination_options

pipe 把一个可读的流导入到一个可写的流里面

fs.stat  https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_stat_path_options_callback

## 鉴权

Github oAuth

github -> settings -> Developer settings

https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps



https://nodejs.org/dist/latest-v14.x/docs/api/child_process.html