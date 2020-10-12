var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.set('Content-Type', 'text/html');
    //res.send('<h1>html</h1>');
    res.send('<!DOCTYPE html>'+
    '<html>'+
    '    <head>'+
    '        <meta charset="utf-8" />'+
    '        <title> Node.js !</title>'+
    '    </head>'+ 
    '    <body>'+
    '     	<p>Bonjour <strong>GLSID</strong> !</p>'+
    '    </body>'+
    '</html>')
});

app.listen(8080);