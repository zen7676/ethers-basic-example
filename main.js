var http = require("http");
var fs = require('fs');
var exserver = require('./server.js')

var server = http.createServer(function (req, res) {
  var url = "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  console.log(url);
  if (fs.existsSync(url)) {
    if (url.split('/')[1].split('.')[1] == 'html'){
        encoding = 'UTF-8';
    } else {
        encoding = null;
    }
    fs.readFile(url, encoding,(err, data) => {
      if (!err) {
        res.writeHead(200, {"Content-Type": exserver.getType(url)});
        res.write(data);
        res.end();
      } else{
          console.log(url);
      }
    });
  }
});
var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Open URL: http://localhost:" + port);
});