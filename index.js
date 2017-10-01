// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;
var users=[];
var rooms=["default"];
function checkRoom(room){
var index= rooms.indexOf(room);
console.log(index);
if(index>-1)
	return true;
else return false;
}


io.on('connection', function (socket) {
  var addedUser = false;

  io.emit('room added', {

	  rooms:rooms
	  });// when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.to(socket.room).emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add room',function(room){
	  if(checkRoom(room))return;
	  rooms.push(room);
	  //console.log("room added would be broadcasted"+rooms[0]);

	  io.emit('room added', {
	  username: socket.username,
	  rooms:rooms
	  });
	  /*socket.emit('login', {
      numUsers: numUsers
    });
	 */

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
	socket.room="default";
	socket.join(socket.room);
	users.push(username);
    addedUser = true;
	//var room = io.adapter.rooms[socket.room];

    socket.emit('login', {
      numUsers: numUsers,
	  room:socket.room
    });
	console.log(users);
    // echo globally (all clients) that a person has connected
    socket.broadcast.to(socket.room).emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
	  room:socket.room
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.to(socket.room).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.to(socket.room).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
		var index = users.indexOf(socket.username);
		if (index > -1) {
    users.splice(index, 1);
}
      // echo globally that this client has left
      socket.broadcast.to(socket.room).emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
	  socket.leave(socket.room);
	  console.log(users);
    }
  });




  socket.on('switchRoom', function(data){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		var newroom=data.newroom;
		socket.join(newroom);
		//socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		//socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		socket.emit('clear');

		socket.broadcast.to(socket.room).emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
		// update socket session room title
		socket.room = newroom;
		 socket.broadcast.to(socket.room).emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
	  room:socket.room
    });//socket.emit('updaterooms', rooms, newroom);
	});









});
