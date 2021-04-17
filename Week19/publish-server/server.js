let http = require('http');
let https = require('https');
let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');
const { info } = require('console');

// 2 auth路由: 接受code code client_id client_secret -> token
function auth(req, res) {
  let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, function (info) {
    res.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`);
    res.end();
  })
}

function getToken(code, callback) {
  let request = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.cdd00056fa35d8fa&client_secret=257f61994ed09a929ad8ebcc269df73d24d1813c`,
    port: 443,
    method: 'post'
  }, (response) => {
    let body = '';

    response.on('data', chunk => {
      body += chunk.toString();
    })

    response.on('end', chunk => {
      let o = querystring.parse(body);
      callback(o)
    })
  })
  request.end();
}

// 4 publish路由 用token获取用户信息检查权限 接受发布
function publish(req, res) {
  let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);

  if (query.token) {
    getUser(query.token, function (info) {
      if (info.login === 'NNN-in') {
        console.log('success')
        req.pipe(unzipper.Extract({ path: '../server/public/' }));

        req.on('end', function () {
          res.end('success')
        })
      }
    })
  }
}

function getUser(token, callback) {
  let request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'toy-publish'
    }
  }, (response) => {
    let body = '';

    response.on('data', chunk => {
      body += chunk.toString();
    })

    response.on('end', chunk => {
      console.log(JSON.parse(body))
      callback(JSON.parse(body))
    })
  })
  request.end();
}

http.createServer(function (req, res) {
  if (req.url.match(/^\/auth\?/)) {
    return auth(req, res)
  }


  if (req.url.match(/^\/publish\?/)) {
    return publish(req, res)
  }
  
}).listen(8082)