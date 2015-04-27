var socket = io();


$("form").submit(function() {
	socket.emit("chat message", {m: $("#m").val(), u: $("#u").val()});
	$("#m").val("");
	return false;
});
socket.on("chat message", function(msg) {
	$("#messages").append($("<li>").text(msg.u + ":" + msg.m));
});