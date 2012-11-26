var express = require("express");
var app    = express(),
    server = require('http').createServer(app),
    io     = require("socket.io").listen(server);

var useRepl = process.argv[2] === "--use-repl";

app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

io.set('log level', 1);

io.sockets.on('connection', function (socket) {

    socket.emit('update', app.get("state") );

    socket.on("getstate", function() {
        socket.emit('update', app.get("state") );
    });

});

server.listen(3000, function() {

    console.log("   info  - http listening on port 3000");

    if (useRepl) {

        console.log("   info  - Opening REPL\n");
        console.log("------------------------------------");
        console.log("\nAvailable commands:\n");
        console.log("talk()     | Sets the state to 'talking'");
        console.log("idle()     | Sets the state to 'idle'");
        console.log("getState() | Gets the current state");
        console.log("\n");

        var repl = require("repl");
        repl.start("↦");

    }

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

app.post("/shutup", function(req, res) {
    app.set("state", "idle");
    res.send("\nState successfully changed to idle");
});


// Global functions for REPL
// -------------------------------------------------- //

global.getState = function () {
    return app.get("state");
};

global.talk = function () {
    app.set("state", "talking");
};

global.idle = function () {
    app.set("state", "idle");
};
