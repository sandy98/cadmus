#!/usr/bin/env node

// Generated by CoffeeScript 1.4.0
(function() {
var Router, argv, http, router, server, converter, fs, Showdown;


Router = require('node-simple-router');
Showdown = require('showdown');
http = require('http');
fs = require('fs');

router = Router({
list_dir: true
});

/*
Routes
*/

router.get("/hello", function(req, res) {
  return res.end("Hello, World!, Hola, Mundo!");
});

router.get("/users", function(req, res) {
  res.writeHead(200, {
  'Content-type': 'text/html'
  });
  return res.end("<h1 style='color: navy; text-align: center;'>Active members registry</h1>");
});

router.get("/users/:id", function(req, res) {
  res.writeHead(200, {
    'Content-type': 'text/html'
  });
  return res.end("<h1>User No: <span style='color: red;'>" + req.params.id + "</span></h1>");
});

router.get("/readme", function(req, res) {
  res.writeHead(200, {'Content-type': 'text/html'});
  fs.readFile(__dirname + "/README.md", "utf8", function(err, md_data) {
     res.write("<style type='text/css'>body {padding-left: 10em;}</style>");
     res.write("<title>README.md</title>\n");
     if (router.logging) {
       router.log(md_data);
     }
     var converter = new Showdown.converter({extensions:['github', 'prettify']});
     res.end(converter.makeHtml(md_data).replace('public/', ''));
  });
});

router.get("/fiddle", function(req, res) {
  router.proxy_pass("http://jsfiddle.net/sandy98/BBkcs/show/", res);
});

/*
End of routes
*/


argv = process.argv.slice(2);

server = http.createServer(router);

server.on('listening', function() {
  var addr;
  addr = server.address() || {
    address: '0.0.0.0',
    port: argv[0] || 8000
  };
  return router.log("Serving web content at " + addr.address + ":" + addr.port + " with PID: " + process.pid);
});

var sigHandler = function() {
  server.close();
  router.log(" ");
  router.log("Server shutting up...");
  router.log(" ");
  return process.exit(0);
};

process.on("SIGINT", sigHandler);
process.on("SIGTERM", sigHandler);

server.listen((argv[0] != null) && !isNaN(parseInt(argv[0])) ? parseInt(argv[0]) : 8000);

}).call(this);
