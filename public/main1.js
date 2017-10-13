

var vm = new Vue({
  el: '#pages',
  data: {
    nickName: "What's your nickname?",
    show: true,
    showPage: false,
    messagePlaceHolder: "Type your message here",
    roomPlaceHolder: "Enter your room name here",
    welcomeMessage: '',
    username: null,
    socket: null,
    connected: false,
    userMessage: null,
    // userMessage: '',
    messagesArray: [],
    room: null,
    roomsArray: [],
    COLORS: [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ],
    colorCode: ''


  },
  methods: {
    getNickName: function (event) {
      if (event.which === 13) {
        if (this.room) {
          //this.room = false;
          this.addRoom();
        }

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
      console.log("inside rname function" + data);
      this.socket.emit('switchRoom', { newroom: data });
      this.messagesArray = [];
    },



    setUsername: function () {

      this.show = !this.show;
      this.showPage = true;

      this.socket.emit('add user', this.username);
    },

    log(message) {
      console.log("in log function" + message);

      this.welcomeMessage = message;

    },

    sendMessage() {
      console.log(" In send message function" + this.userMessage);

      if (this.userMessage && this.connected) {


        this.socket.emit('new message', this.userMessage);
        this.userMessage = "";

      }
    },



    addRoom() {
      console.log(this.room);


      if (this.room && this.connected) {

        this.socket.emit('add room', this.room);
        this.room = '';
      }
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
    let scope = this;
    this.socket.on('login', function (data) {
      console.log("in login event");
      scope.connected = true;
      var message = "Welcome to Socket.IO Chat ";
      scope.log(message);

    });


    this.socket.on('new message', function (data) {
      //  scope.addChatMessage(data);
      console.log(" in new message - client ");
      this.colorCode = scope.getUsernameColor(data.username);
      scope.messagesArray.push({ type: "userMessage", "username": data.username, "usermessage": data.message, "color": this.colorCode });
    });

    this.socket.on('room added', function (data) {
      console.log("rooms" + JSON.stringify(data));
      scope.roomsArray.splice(0, scope.roomsArray.length, ...data.rooms);
    });


    this.socket.on('user left', function (data) {
      console.log("user left" + JSON.stringify(data));
      // scope.userLog = data.username + "left";
      // scope.userLog.push({"message":data.username + "left"});
      var dataMessage = data.username + "left";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
    });

    this.socket.on('user joined', function (data) {
      console.log("user joined" + JSON.stringify(data));
      var dataMessage = data.username + "joined";
      //scope.userLog.push({"message":data.username + "joined"});
      // scope.userJoinedLog = data.username + "joined";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
    });

    this.socket.on('disconnect', function () {
      var dataMessage = "You have been disconnected";
      scope.messagesArray.push({ type: "userLogMessage", "message": dataMessage });
    });

    /* this.socket.on('reconnect', function () {
       var dataMessage = "You have been disconnected";
 
       if (scope.username) {
         this.socket.emit('add user', scope.username);
       }
     }); */

  }
})
