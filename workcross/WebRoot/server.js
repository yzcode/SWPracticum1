var express = require('express');
var app = express();

app.use('/workcross/static', express.static(__dirname + '/static'));

app.get('/workcross/dashboard', function(req, res){
    res.sendfile(__dirname+'/views/MainFrm.html');
});
app.get('/workcross/', function(req, res){
    res.sendfile(__dirname+'/index.html');
});
app.post('/workcross/api/tasks/', function(req, res){
    res.sendfile(__dirname+'/static/json/testjson/new_task.json');
});
app.post('/workcross/api/entries/', function(req, res){
    res.sendfile(__dirname+'/static/json/testjson/new_entry.json');
});
var server = app.listen(8083, function() {
    console.log('Listening on port %d', server.address().port);
});