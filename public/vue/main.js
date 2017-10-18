

var vm = new Vue({
    el: '#pages',
    data: {
        nickName: "What's your nickname?",
        show: true,
        showPage: false,
        messagePlaceHolder: "Type your message here",
        roomPlaceHolder: "Enter your room name here",
        welcomeMessage: '',
        messageElements: [],
        username: null,
        socket: null,
        connected: false,
        userMessage: "",
        COLORS: [
            '#e21400', '#91580f', '#f8a700', '#f78b00',
            '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
            '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
        ]


    },
    methods: {
        getNickName: function (event) {
            if (event.which === 13) {
                if (this.username) {
                    this.sendMessage();

                } else {
                    console.log("hey" + event.target.value);
                    this.username = event.target.value;

                    this.setUsername();



                }
            }
        },
        setUsername: function () {
            //this.show=false;
            this.show = !this.show;
            this.showPage = true;

            this.socket.emit('add user', this.username);
        },

        log(message) {
            console.log("in log function" + message);
            // this.messageElements.push(message);
            this.welcomeMessage = message;

        },

        sendMessage() {
            console.log(" In send message function", this.userMessage);

            if (this.userMessage && this.connected) {
                this.socket.emit('new message', this.userMessage);
                this.userMessage = "";
            }
        },
        getUsernameColor(username) {
            // Compute hash code
            var hash = 7;
            for (var i = 0; i < username.length; i++) {
                hash = username.charCodeAt(i) + (hash << 5) - hash;
            }
            // Calculate color
            var index = Math.abs(hash % COLORS.length);
            return this.COLORS[index];
        },
        addChatMessage(data, options) {

            var $usernameDiv = $('<span class="username"/>')
                .text(data.username)
                .css('color', getUsernameColor(data.username));
            var $messageBodyDiv = $('<span class="messageBody">')
                .text(data.message);

            var typingClass = data.typing ? 'typing' : '';
            var $messageDiv = $('<li class="message"/>')
                .data('username', data.username)
                .addClass(typingClass)
                .append($usernameDiv, $messageBodyDiv);

            addMessageElement($messageDiv, options);
            console.log("added chat message");
        }

    },
    mounted() {
        this.socket = io();


        let scope = this;
        this.socket.on('login', function (data) {
            console.log("in login event");
            scope.connected = true;
            // Display the welcome message
            var message = "Welcome to Socket.IO Chat ";
            scope.log(message);
            // addParticipantsMessage(data);
        });

        this.socket.on('new message', function (data) {

            this.addChatMessage(data);
        });
    }
});