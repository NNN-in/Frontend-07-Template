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
.box {color: #333;}
</style>
</head>
<body>
  <div class="box">text</div>
  <input readonly type="text" />
</body>
</html>`
    );
  });
}).listen(8088);

console.log('server started');

