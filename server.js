var express = require('express');
var connect = require('connect');
var fs = require('fs');
var app = express();

app.use(express.bodyParser());

app.get('/', function(req, res){
    console.log('GET /')
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', function(req, res){
    console.log('POST /');
    console.log('..........................');
    console.log('Message Body is :');
    console.dir(req.body);
    console.log('..........................');
    console.log('Message Headers are :');
    console.dir(req.headers);
    console.log('..........................');
    console.log('End of Message');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Request Processed');
});

app.post('/scheduled', function(req, res){
    console.log('POST /scheduled');
    console.log('..........................');
    console.log('Cron Request Received; Do something ... :');
    console.log('Cron YAML Request Headers : ')
    console.dir(req.headers);
    console.log('..........................');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Request Processed');
});

port = 8081;
app.listen(port);
console.log('Listening at http://localhost:' + port)
