import axios from 'axios';
console.log(axios);

var lm = new Vue({
    el: '#wrapper',
    data: {
        user: {
            userName: '',
            password: '',
            displayName: '',
            imageURL: ''
        }

    },
    methods: {
        addUser: function (event) {
            this.user.userName = event.target.username.value;
            this.user.password = event.target.password.value;
            this.user.displayName = event.target.displayname.value;
            this.user.imageURL = '';
            console.log("in add user method" + this.user.userName);
            //this.$http.post('/api/add_level',self.data).then(function(res){
                axios.get('/demo');
        },


    },


    mounted() {
        this.
        this.socket = io();
        let scope = this;
        this.socket.on('login', function (data) {
            console.log("in login event");
            scope.connected = true;
            var message = "Welcome to Socket.IO Chat ";
            scope.log(message);

        });




    }
})
