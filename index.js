var express = require("express"),
	app = express(),
	http = require("http").Server(app),
	io = require("socket.io")(http);
	     
var ipAddress = process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_INTERNAL_IP || process.env.OPENSHIFT_NODEJS_PORT || process.argv[2] || 3030;


app.use(express.static("static"));
app.use(express.static("node_modules/materialize-css"));
app.use(express.static("node_modules/dist/jquery.min.js"));

io.on("connection", function(socket) {
	console.log("a user connnected");
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
	
	socket.on("chat message", function(msg) {
		console.log("message " + msg);
		io.emit("chat message", {m: msg.m, u: msg.u});
	});
});

http.listen(port, ipAddress, function() {
	console.log("chat listening on port " + port + ".");
});
