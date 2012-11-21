var socket = io.connect('http://' + window.location.hostname);

socket.on('update', function (data) {
    window.location.hash = data;
});

setInterval(function() {
    socket.emit("getstate");
}, 500);
