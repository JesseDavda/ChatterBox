var socket = io();

var username = "curly cheese ass";

$("form").submit(function() {
	socket.emit("chat message", $("#m").val());
	$("#m").val("");
	return false;
});
socket.on("chat message", function(msg) {
	$("#messages").append($("<li>" + username).text(msg));
});