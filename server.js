var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/public/index.html');
});


io.on('connection', function (socket) {

  var room = socket.handshake['query']['r_var'].split(',')[0];
  var userId = socket.handshake['query']['r_var'].split(',')[1];

  socket.join(room);
  console.log("User: "+userId+" joined theGroup:"+room);
  socket.on('disconnect', function () {
      socket.leave(room)
      console.log('user disconnected');
  });

  socket.on('chat message', function (msg) {
      // io.to(room).emit('chat message', msg);
      socket.broadcast.to( room ).emit('chat message',userId+': '+msg);
  });

  socket.on('msgAck',function(data){
      console.log("acknowledgment recieved from: "+data.user);
  })

}); 










let database = require('./src/database')
database.connect();

let user = require('./src/operations/user')
let group = require('./src/operations/group')

let User = require('./src/model/User')

// user.addUser("9496421507","Elsy",res=>{console.log(res);})  //5b716f307e0fee2ac2bf106c
// user.addUser("8089578001","Ebin",res=>{console.log(res);}) //5b716f307e0fee2ac2bf106b
// user.addUser("8714812137","Dibin",res=>{console.log(res);}) //5b716f307e0fee2ac2bf106d
// user.addUser("9895083297","Xavier",res=>{console.log(res);}) //5b716f307e0fee2ac2bf106e

// user.addContact("8089578001", "9496421507", (res) => {  //  (user,newContact)
//   console.log(res);
// })


// group.create("5b716f307e0fee2ac2bf106c", "wp 007")  // (admin,groupName)
//   .then(res => {
//     console.log(res);
//   }).
//   catch(err => {
//     console.log(err)
//   })

// group.addMembers("5b716f307e0fee2ac2bf106d","5b716f563594732afb7fc0c0",
//  ["5b716f307e0fee2ac2bf106e","5b716f307e0fee2ac2bf106c","5b716f307e0fee2ac2bf106d"]) // (admin,groupId,[members...])
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

group.removeMembers("5b716f307e0fee2ac2bf106e","5b716f563594732afb7fc0c0", 
["5b716f307e0fee2ac2bf106d"]) // (admin,groupId,[members...])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })



/*Populate Example */

// User.
//   findOne({ "details.name": 'Ebin' }).
//   populate('contacts').
//   exec(function (err, user) {
//     if (err) return handleError(err);
//     console.log('The author is %s', user.contacts);
//     // prints "The author is Ian Fleming"
//   });


