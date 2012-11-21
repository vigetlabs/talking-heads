var express = require("express");
var app    = express(),
    server = require('http').createServer(app),
    io     = require("socket.io").listen(server);

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

io.sockets.on('connection', function (socket) {

    socket.emit('update', app.get("state") );

    socket.on("getstate", function() {
        socket.emit('update', app.get("state") );
    });

});

server.listen(3000, function() {
    console.log("listening on port 3000");
});

app.set("state", "idle");

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/:head", function(req, res) {
    var head = req.params.head + ".html";
    res.render(head);
});

app.post("/say", function(req, res) {
    var message = req.query.message,
        state = message ? "talking" : "idle";

    app.set("state", state);
    res.send("\nState successfully changed to "  + state);
});
