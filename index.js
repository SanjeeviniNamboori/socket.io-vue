// Setup basic express server
var express = require('express');
var mysql = require('mysql');
var app = express();
app.io = io;
var path = require('path');
var cors = require("cors");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require("redis");
var sub = redis.createClient();
var pub = redis.createClient();
var bodyParser = require('body-parser')
var port = process.env.PORT || 3001;
var ejs = require('ejs');
const timber = require('timber');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var dateandtime = new Date();
var clients = {};

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '')));
app.set('view engine', 'html');

// view engine setup
app.engine('html', ejs.renderFile);
//app.use(timber.middlewares.express())


// Database connectivity

var mysql_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Apple#123',
    database: 'VoltusWave'
});


mysql_connection.connect(function (error) {
    if (error) {
        console.log("Database connection failed" + error);
    } else {
        console.log("Database connection successfull");
    }
})


app.get('/login', function (request, response) {
    // app.call('/demo');
    response.render('login');
})



// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.get('/reg', function (request, response) {
    //response.sendFile(path.join(__dirname + '/public/login.html'));
    response.render('register');
})




app.get('/demo', function (request, response) {
    console.log(" In demo route");
})

app.post('/api/addUser', function (request, response) {
    // console.log(request.body.username);
    var username = request.body.username;
    var password = request.body.password;
    var displayname = request.body.displayname;
    var imageurl = request.body.imageurl;

    mysql_connection.query(`call add_users_data(?,?,?,?)`, [username, password, displayname, imageurl], function (error, result) {
        if (error) {
            console.log(error);
            //  return;
            response.status(400).send({ "failure": error });
        }

        if (result) {
            console.log("User added successfully" + result);

            //response.render('login');
            response.status(200).send({ "success": "user added successfully" });
        }
    })

})


app.post('/api/login', function (request, response) {
    var p_username = request.body.username;
    var p_password = request.body.password;
    console.log("in login function" + p_username + p_password);
    mysql_connection.query('select * from users where username =? and password = ? ', [p_username, p_password], function (error, result) {
        //  mysql_connection.query(`call login(?,?)`, [p_username, p_password], function (error, result) {
        if (error) {
            console.log(error);
            return
        }
        if (result == 0) {
            return response.render('login', { "error": "Wrong username / password" });
        } else {
            //  var UserItem;
            //UserItem.userId  =  result[0].userid;
            // UserItem.userName = result[0].username;
            //   loggedInUsers.push({"lUserId":  result[0].userid , "lUserName" :  result[0].username});
            response.cookie('userid', result[0].userid);
            response.cookie('username', result[0].username);
            response.redirect('/');
        }
    })
})

app.post('/api/login1', function (request, response) {
    var p_username = request.body.username;
    var p_password = request.body.password;
    console.log("in login function" + p_username + p_password);
    mysql_connection.query('select * from users where username =? and password = ? ', [p_username, p_password], function (error, result) {
        //  mysql_connection.query(`call login(?,?)`, [p_username, p_password], function (error, result) {
        if (error) {
            console.log(error);
            response.status(400).send({ "error": error });
            return;
        }

        if (result == 0) {
            response.status(200).send({ "wrong": "Wrong username / password" });
            // return response.render('login', { "error": "Wrong username / password" });
        } else {
            response.cookie('userid', result[0].userid);
            response.cookie('username', result[0].username);
            response.status(200).send({ "success": "success" });
        }
    })
});





// Chatroom

var numUsers = 0;
var users = [];
//var rooms = ["default"];
var rooms = [];




function checkRoom(room) {
    var index = rooms.indexOf(room);
    console.log(index);
    if (index > -1)
        return true;
    else return false;
}



sub.on("message", function (channel, data) {
    data = JSON.parse(data);
    console.log("Inside Redis_Sub: data from channel " + channel + ": " + (data.sendType));
    if (parseInt("sendToSelf".localeCompare(data.sendType)) === 0) {
        io.emit(data.sendTo, data.data);
    } else if (parseInt("sendToAllConnectedClients".localeCompare(data.sendType)) === 0) {
        io.sockets.emit(data.sendTo, data.data);
    } else if (parseInt("sendToAllClientsInRoom".localeCompare(data.sendType)) === 0) {
        console.log("emiting to " + channel + "and to method " + data.sendTo);
        io.sockets.in(channel).emit(data.sendTo, data.data);
    }

});




io.on('connection', function (socket) {



    var addedUser = false;
    // var cookieObj = socket.handshake.headers['cookie'];
    var cookieObj = socket.handshake.headers.cookie;
    console.log("in io connection" + cookieObj);
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    addUser(socket);

    function addUser(socket) {

        clients.demo = 1;
        socket.userid = cookies.userid;
        socket.username = cookies.username;
        socket.id = socket.id;
        socket.room = "default";
        socket.roomid = 1;
        console.log(" Inside add user function " + socket.userid);
        ++numUsers;

        if (clients.hasOwnProperty(socket.username)) {
            console.log("in if clients");
            clients[socket.username].push(socket.id);
        } else {
            console.log(" in else clients");
            clients[socket.username] = [];
            clients[socket.username].push(socket.id);
        }
        /* Object.keys(clients).forEach(function (key, index) {
 
             console.log("key value" + key + clients[key]);
             if (key == socket.username) {
                  clients[socket.username].push(socket.id);
                // key.push(socket.id);
             } else {
                 console.log("in else");
                 clients[socket.username] = [];
                 clients[socket.username].push(socket.id);
             }
         });  */
        //key = the name of the object key //index = the ordinal position of the key within the object });

        //clients[socket.username] = [];
        //clients[socket.username].push(socket.id);

        socket.join(socket.room);
        users.push(socket.username);
        addedUser = true;
        sub.subscribe("default");
        socket.emit('login', {
            numUsers: numUsers,
            room: socket.room
        });
        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToAllClientsInRoom',
            data: {
                username: socket.username,
                room: socket.room
            },
            sendTo: 'user joined'
        });
        pub.publish(socket.room, reply);


        // To check if socket ids are being pushed into the array.

       /* for (var property in clients) {
            // console.log("in for" + property[property]);
            if (property == socket.username) {
                console.log("property name" + property + "value" + clients[socket.username]);
                //    for(var y=0;y<property.length; y++){
                //        console.log("for" +  property[y]);
                //    }
            }

        }  */




    }






    // io.emit('room added', {

    //     rooms: rooms
    // });

    // when the client emits 'new message', this listens and executes
    socket.on('getallrooms', function (params, ackCallback) {
        var roomsList = [];
        console.log(" In get rooms");
        mysql_connection.query(`call roomsList`, function (error, result) {
            if (error) {
                return;
            }

            if (result) {
                console.log(result[0]);
                var dataPacket = result[0];
                for (var g = 0; g < dataPacket.length; g++) {
                    var room_id = JSON.stringify(dataPacket[g].roomid);
                    var room_name = JSON.stringify(dataPacket[g].roomname);
                    console.log("values" + JSON.stringify(dataPacket[g].roomid) + JSON.stringify(dataPacket[g].roomname));
                    roomsList.push({ "roomid": room_id, "roomname": room_name });

                }

                ackCallback(null, roomsList);
            }
        });



    });

    socket.on('new message', function (msg) {
        // we tell the client to execute 'new message'
        //   var dateandtime = new Date();
        console.log("in new message event" + msg);
        console.log("in new message event" + socket.room);
        console.log("in new message event" + socket.roomid);
        mysql_connection.query(`call addmessage(?,?,?,?)`, [msg, socket.userid, socket.roomid, dateandtime], function (error, result) {
            if (error) {
                console.log(error);
                return
            }

            if (result) {
                console.log(result)
            }
        })

        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToAllClientsInRoom',
            data: {
                username: socket.username,
                room: socket.room,
                message: msg
            },
            sendTo: 'new message'
        });
        pub.publish(socket.room, reply);

        /*
        socket.broadcast.to(socket.room).emit('new message', {
          username: socket.username,
          message: msg
        });*/
    });

    socket.on('independant message', function (data) {
        var temp = data.receivername;
        var temp_S = data.sendername;
        var temp_U = data.userMessage;
        console.log("temp value" + temp);

        //  console.log("in independant messge" + temp);
        //  console.log("in independant messge" +temp.senderid +  temp.sendername + temp.receiverid + temp.receivername);

        mysql_connection.query(`call usertousermessages(?,?,?,?)`, [data.senderid, data.receiverid, data.userMessage, dateandtime],
            function (error, result) {
                if (error) {
                    console.log("In independant message event" + error);
                    return;
                }

                if (result) {
                    var data = {
                        username: temp_S,
                        message: temp_U
                    };

                    console.log("In independant message event" + result);

                    if (clients.hasOwnProperty(temp) && clients.hasOwnProperty(temp_S)) {
                        var senderAndReceiverSocketIds = [];
                        console.log("in temp" + clients[temp]);
                        console.log("in temp" + clients[temp_S]);
                        var temp_array_socketids_receiver = clients[temp];
                        var temp_array_socketids_sender = clients[temp_S];
                        for (var i = 0; i < temp_array_socketids_receiver.length; i++) {
                            senderAndReceiverSocketIds.push(temp_array_socketids_receiver[i]);

                        }
                        for (var j = 0; j < temp_array_socketids_sender.length; j++) {
                            senderAndReceiverSocketIds.push(temp_array_socketids_sender[j]);

                        }

                        for (var h = 0; h < senderAndReceiverSocketIds.length; h++) {
                            //  socket.broadcast.to(senderAndReceiverSocketIds[h]).emit('new message', data);
                            io.sockets.in(senderAndReceiverSocketIds[h]).emit("new message", data);

                        }
                    }

                    /* if (clients.hasOwnProperty(temp)) {
                         console.log("in temp" + clients[temp]);
                         var temp_array_socketids = clients[temp];
                         for (var i = 0; i < temp_array_socketids.length; i++) {
                             console.log("temp_array_socketids" + temp_array_socketids[i]);
                             //  socket.to(temp_array_socketids[i]).emit("new message", data);
                             //  socket.broadcast.to(temp_array_socketids[i]).emit('message1', 'for your eyes only');
                             // socket.emit('new message', data);
                             io.sockets.in(temp_array_socketids[i]).emit("new message", data);
                         }
 
                     } */

                    else {
                        console.log("in else");
                    }
                }

            });

        // var temp1 = Object.keys(clients);
        // console.log("value of temp 1 " + temp1);





    });





    socket.on('add room', function (room) {


        // io.on('add room', function (room) {
        // if (checkRoom(room)) return;

        console.log("in server side  " + room);
        rooms.push(room);
        //console.log("room added would be broadcasted"+rooms[0]);
        mysql_connection.query(`call add_rooms(?)`, [room], function (error, result) {
            if (error) {
                console.log(error);
                return
            }

            if (result) {
                console.log("in rooms" + JSON.stringify(result));
            }
        })
        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToAllConnectedClients',
            data: {
                username: socket.username,
                rooms: rooms
            },
            sendTo: 'room added'
        });
        pub.publish(socket.room, reply);

    });




    // when the client emits 'add user', this listens and executes
    /*  socket.on('add user', function (username) {
          //console.log("in socket fun");
          //if (addedUser) return;
  
          // we store the username in the socket session for this client
          socket.username = username;
          // console.log("server side" +  socket.username);
          ++numUsers;
          socket.room = "default";
          socket.join(socket.room);
          users.push(username);
          addedUser = true;
          //var room = io.adapter.rooms[socket.room];
          sub.subscribe("default");
          socket.emit('login', {
              numUsers: numUsers,
              room: socket.room
          });
          console.log(users);
          // echo globally (all clients) that a person has connected
  
  
          var reply = JSON.stringify({
              method: 'message',
              sendType: 'sendToAllClientsInRoom',
              data: {
                  username: socket.username,
                  room: socket.room
              },
              sendTo: 'user joined'
          });
          pub.publish(socket.room, reply);
  
  
          /*  socket.broadcast.to(socket.room).emit('user joined', {
              username: socket.username,
              numUsers: numUsers,
              room:socket.room
            });*/
    /*   });  */

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


    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;
            // socket.broadcast.to(socket.room).emit('user left', {
            //     username: socket.username,
            //     numUsers: numUsers
            //   }); 
            var reply = JSON.stringify({
                method: 'message',
                sendType: 'sendToAllClientsInRoom',
                data: {
                    username: socket.username,
                    room: socket.room
                },
                sendTo: 'user left'
            });
            pub.publish(socket.room, reply);

        }
    }),


        socket.on('switchRoom', function (data, callback) {
            let previousMessages = null;
            console.log(JSON.stringify(data) + "switch room");
            console.log(data.newroom.rid + "switch room");
            console.log(data.newroom.rname + "switch room");
            console.log("room left" + socket.room)
            socket.leave(socket.room);
            var newroom = data.newroom.rname.replace(/"/g, "");
            socket.join(newroom);
            //socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
            // sent message to OLD room
            //socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
            socket.emit('clear');
            /* socket.broadcast.to(socket.room).emit('user left', {
                 username: socket.username,
                 numUsers: numUsers
             });  */

            //db call to get previous messages 
            //  mysql_connection.query('select chatmessages.usermessage, users.username from chatmessages INNER JOIN users ON chatmessages.userid = users.userid WHERE chatmessages.roomid = ?  ', [data.newroom.rid], function (err, result) {

            var reply = JSON.stringify({
                method: 'message',
                sendType: 'sendToAllClientsInRoom',
                data: {
                    username: socket.username,
                    numUsers: numUsers,
                    room: socket.room
                },
                sendTo: 'user left'
            });
            pub.publish(socket.room, reply);


            socket.room = newroom;
            socket.roomid = data.newroom.rid;
            sub.subscribe(newroom);


            /*
             socket.broadcast.to(socket.room).emit('user joined', {
          username: socket.username,
          numUsers: numUsers,
          room:socket.room
        });
        */
            //socket.emit('updaterooms', rooms, newroom);
            reply = JSON.stringify({
                method: 'message',
                sendType: 'sendToAllClientsInRoom',
                data: {
                    username: socket.username,
                    room: socket.room
                },
                sendTo: 'user joined'
            });
            pub.publish(socket.room, reply);

            mysql_connection.query(`call roomMessages(?)`, [data.newroom.rid], function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                };

                if (result) {
                    console.log("In switch room messages" + JSON.stringify(result));
                    previousMessages = result;
                    callback(previousMessages);
                }
            });
        });


    socket.on('usertouser', function (data, callback) {
        let independantpreviousMessages = null;
        console.log("data" + JSON.stringify(data) + socket.room);
        socket.leave(socket.room);

        mysql_connection.query(`call getOneToOneMessage(?,?)`, [data.senderid, data.receiverid], function (err, result) {
            if (err) {
                console.log("in usertouser event" + err);
                return;
            }

            if (result) {
                console.log("in usertouser event" + JSON.stringify(result));
                independantpreviousMessages = result;
                callback(independantpreviousMessages);

            }
        })



        //  var h = data.sendername + "" + data.receivername;
        //  console.log("value of h" + h);
        /* socket.emit('user joined', {
            username: h,
              utou: data
 
          });    */


    });


    socket.on('getusers', function (data, callback) {
        var usersList = null;
        console.log(" In getusers");
        mysql_connection.query(`call getAllUsers`, (err, result) => {
            if (err) {
                console.log(err);
                return;

            }
            if (result) {
                usersList = JSON.stringify(result);
                callback(usersList);

            }
        });


    });

    sub.on("subscribe", function (channel, count) {
        console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
    });








});




