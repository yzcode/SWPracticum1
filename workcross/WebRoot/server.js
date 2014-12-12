var express = require('express');
var app = express();

app.use('/workcross/static', express.static(__dirname + '/static'));

function wx_test_remap(url, file) {
    app.get(url, function (req, res) {
        res.sendfile(__dirname + file);
    });
}
app.get('/workcross/dashboard', function (req, res) {
    res.sendfile(__dirname + '/views/MainFrm.html');
});
app.get('/workcross/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
wx_test_remap("/workcross/api/teams/","/static/json/testjson/teams.json");
wx_test_remap("/workcross/api/user/currentuser","/static/json/testjson/user.json");
wx_test_remap("/workcross/api/teams/:teamId/tasks/","/static/json/testjson/team_tasks.json");
wx_test_remap("/workcross/api/projects/:teamId/entries/","/static/json/testjson/entries.json");
wx_test_remap("/workcross/api/tasks/:taskId/comments/","/static/json/testjson/comment.json");
wx_test_remap("/workcross/api/projects/:projectId/","/static/json/testjson/project.json");

app.get("/workcross/api/teams/:teamId/", function (req, res) {
    res.sendfile(__dirname + '/static/json/testjson/team'+req.params.teamId+'.json');
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