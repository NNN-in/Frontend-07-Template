const http = require('http');

http.createServer((request, response) => {
  let body = [];

  request.on('error', err => {
    console.error('req error', err);
  }).on('data', chunk => {
    console.log('server', chunk.toString())
    body.push(chunk.toString());
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(
`<html lang="en">
<head>
<style>
.box {display: flex;background-color: rgb(255,255,255);width: 500px;height: 300px;}
.box .one {width: 100px;height: 200px;background-color: rgb(0,0,0);}
.box .two {flex: 1;height: 300px;background-color: rgb(255,0,0);}
</style>
</head>
<body>
  <div class="box">
    <div class="one"></div>
    <div class="two"></div>
  </div>
</body>
</html>`
    );
  });
}).listen(8088);

console.log('server started');

