var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});
app.get('/*', function(req, res){
    res.sendfile(req.url());
});
var server = app.listen(8083, function() {
    console.log('Listening on port %d', server.address().port);
});