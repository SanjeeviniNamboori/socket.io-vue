

var vm = new Vue({
  el: '#pages',
  data: {
    nickName: "What's your nickname?",
    show: true,
    // showPage: false,
    showPage: true,
    messagePlaceHolder: "Type your message here",
    roomPlaceHolder: "Enter your room name here",
    welcomeMessage: '',
    username: null,
    userid: null,
    socket: null,
    connected: false,
    userMessage: null,
    // userMessage: '',
    messagesArray: [],
    userListDb: [],
    room: null,
    roomsArray: [],
    COLORS: [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ],
    colorCode: '',
    useridvalues: null,
    usernamevalues: null,
    type: 0,
    user2user: {
      senderid: null,
      sendername: null,
      receiverid: null,
      receivername: null

    }


  },
  methods: {

    getRoomsList: function () {
      let scope = this;
      this.socket.emit('getallrooms', {}, (err, data) => {
        for (var p = 0; p < data.length; p++) {
          console.log(data[p].roomid);
          console.log(data[p].roomname);
          scope.roomsArray.push({ "rid": data[p].roomid, "rname": data[p].roomname });
        }
      });
    },
    getUsersList: function () {
     // console.log("In get users list" + id);
      let scope = this;
      console.log("In get logged in users list");
      this.socket.emit('getusers', {}, function (output) {
        var y = JSON.parse(output);
        var x = y[0];

        for (var n = 0; n < x.length; n++) {
          console.log(x[n].userid + x[n].username);
         
           

            scope.userListDb.push({ "userid": x[n].userid, "username": x[n].username });
          
          
        }

      });

    },


    getRoom: function (event) {
      if (event.which === 13) {
        console.log("in this room" + event.target.value);

        this.addRoom();
      }
    },


    getNickName: function (event) {
      if (event.which === 13) {
        /*if (this.room == null) {
          
          //this.room = false;
          this.addRoom();
        }  */

        if (this.username) {
          console.log("in if loop");
          this.sendMessage();

        } else {
          console.log("in else loop");
          console.log("hey" + event.target.value);
          this.username = event.target.value;
          this.setUsername();


        }
      }
    },


    /* getInputMessage: function (event) {
      // if (event.which === 13) {
         console.log("In getInputMessage");
         this.sendMessage();
      // }
   
     },
   
     getRoomName: function (event) {
       if (event.which === 13) {
         this.room = false;
         this.addRoom();
       }
     },
   
   */


    rName: function (data) {

      console.log("inside rname function" + JSON.stringify(data));

      let scope = this;
      this.type = 0;
      this.socket.emit('switchRoom', { newroom: data }, function (output) {

        scope.messagesArray.splice(0, scope.messagesArray.length);

        if (Array.isArray(output) && output[0] && Array.isArray(output[0])) {
          output[0].forEach(function (msgItem) {
            msgItem.color = scope.getUsernameColor(msgItem.username);
            console.log(msgItem.color);
            msgItem.type = "userMessage";
            scope.messagesArray.push(msgItem);
          });
        }

      });
    },

    userChat: function (data) {
      var scope = this;
      var person = {};
      person.senderid = this.userid;
      person.sendername = this.username;
      person.receiverid = data.userid;
      person.receivername = data.username;
      this.type = 1;
      //  person.room = this.room;

      this.user2user.senderid = person.senderid;
      this.user2user.sendername = person.sendername;
      this.user2user.receiverid = person.receiverid;
      this.user2user.receivername = person.receivername;

      console.log("In user chat" + JSON.stringify(person));

      //this.socket.emit('usertouser', person);
      this.socket.emit('usertouser', person, function (output) {

        console.log("In user chat message " + JSON.stringify(output.data));
        scope.messagesArray.splice(0, scope.messagesArray.length);
        if (Array.isArray(output) && output[0] && Array.isArray(output[0])) {
          output[0].forEach(function (msgItem) {
            msgItem.color = scope.getUsernameColor(msgItem.username);
            msgItem.usermessage = msgItem.message;
            console.log(msgItem.color);
            console.log("hey " + msgItem.message);
            msgItem.type = "userMessage";
            scope.messagesArray.push(msgItem);
          });
        }

      })
    },

    /* setUsername: function () {
 
       this.show = !this.show;
       this.showPage = true;
 
       this.socket.emit('add user', this.username);
     },  */

    log(message) {

      console.log("in log function" + message);

      this.welcomeMessage = message;

    },

    sendMessage() {
      console.log(" In send message function" + this.userMessage);

      if (this.type == 1) {
        console.log("In 1");
        var data = {
          userMessage: this.userMessage,
          senderid: this.user2user.senderid,
          sendername: this.user2user.sendername,
          receiverid: this.user2user.receiverid,
          receivername: this.user2user.receivername
        }


        this.socket.emit('independant message', data);
        this.userMessage = "";

      } else {

        /* if (this.userMessage && this.connected) {   */


        this.socket.emit('new message', this.userMessage);
        this.userMessage = "";
      }

      /* }   */
    },



    addRoom() {
      console.log(this.room);


      // if (this.room && this.connected) {

      this.socket.emit('add room', this.room);
      this.room = '';
      // }
    },

    userlog(data) {
      console.log("In userlog" + data);
      this.userLog = data.username;
    },

    getUsernameColor(username) {
      console.log("in getusrname color");
      // Compute hash code
      var hash = 7;
      for (var i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
      }
      // Calculate color
      var index = Math.abs(hash % this.COLORS.length);
      console.log("in colors" + index);
      console.log("colors " + this.COLORS[index]);
      return this.COLORS[index];
    }




  },


  mounted() {
    this.socket = io();
    // console.log("socket id " + this.socket.id);
    let scope = this;

    console.log(document.cookie);
    var cookie = document.cookie;
    var cookieSplitObj = cookie.split(';');
    for (var t = 0; t < cookieSplitObj.length; t++) {
      console.log(cookieSplitObj[t]);
      scope.useridvalues = cookieSplitObj[0];
      console.log(scope.useridvalues + "useridvalues");
      scope.usernamevalues = cookieSplitObj[1];
      console.log(scope.usernamevalues + "usernamevalues");
      /*var k = cookieSplitObj[t].split('=');
       for(var g=0;g< k.length; g++){
         console.log(k[g]);
         if(k[g] == 'username'){
           console.log("username value"  );
          // scope.username =  k[g]+1;
         }
       }   */

    }



    var y = scope.usernamevalues.split('=');
    for (var j = 0; j < y.length; j++) {
      console.log("in j loop " + y[1]);
      scope.username = y[1];
    }

    var m = scope.useridvalues.split('=');
    for (var u = 0; u < m.length; u++) {
      console.log(" in u loop" + m[1]);
      scope.userid = m[1];
    }



    scope.getRoomsList();

    scope.getUsersList();



    this.socket.on('login', function (data) {
      console.log("in login event");
      scope.connected = true;
      var message = "Welcome to Socket.IO Chat ";
      scope.log(message);

    });


    this.socket.on('new message', function (data) {
      console.log(" in new message - client " + JSON.stringify(data));
      this.colorCode = scope.getUsernameColor(data.username);
      scope.messagesArray.push({ type: "userMessage", "username": data.username, "usermessage": data.message, "color": this.colorCode });
    });

    this.socket.on('message1', function (data) {
      console.log("in message1" + data);
    })


    this.socket.on('room added', function (data) {
      console.log("rooms" + JSON.stringify(data));
      // scope.roomsArray.splice(0, scope.roomsArray.length, ...data.rooms);
      scope.roomsArray = [];
      scope.getRoomsList();
      //this.socket.emit('getallrooms');
      //  scope.roomsArray.splice(0, scope.roomsArray.length, ...data.rooms);
    });


    this.socket.on('user left', function (data) {
      console.log("user left" + JSON.stringify(data));
      var dataMessage = data.username + "left";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
    });

    this.socket.on('user joined', function (data) {
      console.log("user joined" + JSON.stringify(data));
      /*  if (data.hasOwnProperty('utou')) {
          var temp_data = data.utou;
          console.log(temp_data);
          scope.user2user.senderid = temp_data.senderid;
          scope.user2user.sendername = temp_data.sendername;
          scope.user2user.receiverid = temp_data.receiverid;
          scope.user2user.receivername = temp_data.receivername;
          var dataMessage = data.username + "joined";
          scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
        } else {  */
      var dataMessage = data.username + "joined";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
      /* }   */
    });


    this.socket.on('disconnect', function () {
      var dataMessage = "You have been disconnected";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
    });

    this.socket.on('fetchallrooms', function (data) {
      console.log(JSON.stringify(data));
      for (var p = 0; p < data.length; p++) {
        console.log(data[p].roomid);
        console.log(data[p].roomname);
        scope.roomsArray.push({ "rid": data[p].roomid, "rname": data[p].roomname });
      }

    });

    this.socket.on('display', function (data) {
      console.log("client side" + JSON.stringify(data));
    });

  }
})
