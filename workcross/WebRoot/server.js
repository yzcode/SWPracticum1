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

var server = app.listen(8083, function () {
    console.log('Listening on port %d', server.address().port);
});