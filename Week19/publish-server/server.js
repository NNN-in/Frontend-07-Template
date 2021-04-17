let http = require('http');
let fs = require('fs');
let unzipper = require('unzipper');

http.createServer(function (req, res) {
  // console.log(req.headers)

  // let outFile = fs.createWriteStream('../server/public/tmp.zip')
  // req.pipe(outFile);


  req.pipe(unzipper.Extract({ path: '../server/public/' }));
  
  // req.on('data', chunk => {
  //   console.log(chunk)
  //   outFile.write(chunk)
  // })
  // req.on('end', () => {
  //   outFile.end();
  //   res.end('success')
  // })
}).listen(8082)