var FADE_TIME = 150; // ms
var TYPING_TIMER_LENGTH = 400; // ms
var COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

var $usernameInput = document.getElementsByClassName("usernameInput"); // Input for username
var $currentInput = $usernameInput.focus();

/*var $messages = document.getElementsByClassName("messages").value; // Messages area
var $inputMessage = document.getElementsByClassName("inputMessage").value; // Input message input box

var $rooms = document.getElementsByClassName("rooms"); // Rooms area
var $inputRoom = document.getElementsByClassName("inputRoom").value; // Input Room input box

var $loginPage = document.getElementsByClassName("login.page"); // The login page
var $chatPage = $('.chat.page'); // The chatroom page
var $roomPage=$('.room.page');//The room page
// Prompt for setting a username

var $roomName =$('.roomData');
var username;
var room=false;
var connected = false;
var typing = false;
var lastTypingTime;
//var $currentInput = $usernameInput.focus();

var socket = io();


*/

var username;
var socket = io();





// Sets the client's username
function setUsername () {
console.log("In set" + username);

// If the username is valid
if (username) {
  document.getElementById("loginpage").fadeOut();

}
}

new Vue({
 el: '#pages',
 data: {
     nickName : "What's your nickname?",
     show: true,
     showPage: false

 },
 methods:{
     getNickName: function(event) {
       if (event.which === 13) {
         if(username){
           console.log("hello");
         }else{
          console.log("hey"+ event.target.value);
          username = event.target.value;

    this.setUsername();



        }
     }
 },
 setUsername: function(){
   //this.show=false;
   this.show = !this.show;
//this.showPage= false;
socket.emit('add user', username);
 }

}
})
