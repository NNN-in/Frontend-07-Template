let http = require('http');
let fs = require('fs');
let unzipper = require('unzipper');

// auth路由: 接受code code client_id client_secret -> token
// 用token获取用户信息检查权限
// 接受发布

http.createServer(function (req, res) {
  req.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen(8082)