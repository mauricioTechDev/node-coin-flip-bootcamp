const http = require('http');
const fs = require('fs')//filesystem
// // allows you acess to look at the URL//it is a module
const url = require('url');
// // gives access to the packages
const querystring = require('querystring');
const figlet = require('figlet')
const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  console.log(page)
  if(page=="/"){
// wherever you see data it is actualy that file
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }else if(page=="/css/master.css"){
    fs.readFile('css/master.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else if(page=="/main.js"){
    fs.readFile('main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else if (page=="/calculation"){
    res.writeHead(200, {'Content-Type': 'application/json'});
    var calc = (Math.floor(Math.random()*10))%2==0 ? "heads":"tails";
    const objToSend = {
      face: calc
    };
    res.end(JSON.stringify(objToSend));
  }else{
    figlet('404!!\n oops', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});
server.listen(8000);
