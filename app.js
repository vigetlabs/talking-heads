var express = require("express");
var app    = express(),
    server = require('http').createServer(app),
    io     = require("socket.io").listen(server);

server.listen(3000);

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

io.sockets.on('connection', function (socket) {

    socket.on("getstate", function() {
        socket.emit('update', state);
    });

});

var state = "idle";

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/robot", function(req, res) {
    res.render("robot.html");
});

app.get("/yeti", function(req, res) {
    res.render("yeti.html");
});

app.post("/state/:value", function(req, res) {
    state = req.params.value;
    if (state !== 'idle' && state !== 'talking') {
        state = 'idle';
    }
    res.send("State successfully changed to "  + state);
});
