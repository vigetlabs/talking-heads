var socket = io.connect('http://localhost');

socket.on('update', function (data) {
    window.location.hash = data;
});

setInterval(function() {
    socket.emit("getstate");
}, 500);
