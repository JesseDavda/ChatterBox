var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var currentPage = "index.html";

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/" + currentPage);
});

io.on("connection", function(socket) {
	console.log("a user connnected");
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
});

io.on("connection", function(socket) {
	socket.on("chat message", function(msg) {
		console.log("message " + msg);
	});
});

io.on("connection", function(socket) {
	socket.on("chat message", function(msg) {
		io.emit("chat message", msg);
	});
});

http.listen(80, function() {
	console.log("chat listening on port 3000");
});
