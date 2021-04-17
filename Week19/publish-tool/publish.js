let http = require('http');
let fs = require('fs');
let archiver = require('archiver');

// 打开 https://github.com/login/oauth/authorize

 
fs.stat('./sample.html', (err, stats) => {
  let request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }, response => {
    console.log(response)
  });
  
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  archive.directory('./sample/', false);

  archive.finalize();
  
  archive.pipe(request);
})