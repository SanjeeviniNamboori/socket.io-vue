
# Socket.IO Chat

A simple chat demo for socket.io

## How to use

```
$ cd socket.io
$ npm install
$ cd examples/chat
$ npm install
$ npm start
```

And point your browser to `http://localhost:3000`. Optionally, specify
a port by supplying the `PORT` env variable.

## Features

- Multiple users can join a chat room by each entering a unique username
on website load.
- Users can type chat messages to the chat room.
- A notification is sent to all users when a user joins or leaves
the chatroom.



DROP procedure IF exists VoltusWave.add_users_data;
DELIMITER $$
CREATE PROCEDURE VoltusWave.add_users_data 
( userid       INT(11), username     VARCHAR(15), password     VARCHAR(15), displayname  VARCHAR(15), imageurl     VARCHAR(15) )
BEGIN 

    INSERT INTO VoltusWave.users
         (username, password, displayname, imageurl)
    VALUES 
         (username,password,displayname,url);
end$$

DELIMITER ;