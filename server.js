let formidable = require('formidable');
let uuidv1 = require('uuid/v1');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 8081;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('uploads'))
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);

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
















// app.listen(port,(req,res)=>{
//   console.log(`listening to ${port}...`);
// })
app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})

app.post('/sendFile',(req,res)=>{
  console.log(req.body)
  res.send("success");
})

app.post('/upload', function (req, res){
  
  try{
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file){
    console.log("begin...");
    
      file.path = __dirname + '/uploads/' + uuidv1()+file.name;
  });

  form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    var progress = {
      type: 'progress',
      bytesReceived: bytesReceived,
      bytesExpected: bytesExpected
    };
    console.log(progress.bytesReceived/progress.bytesExpected*100)
  
    // socket.broadcast(JSON.stringify(progress));
  });
// res.send("success");
  res.sendFile(__dirname + '/index.html');

  }
  catch(e){
    console.log("Error: ",e);
  }
});


let user = require('./src/operations/user')
let group = require('./src/operations/group')
let message = require('./src/operations/message')


let User = require('./src/model/User')

let tgBot = require('./src/tgApi')

var url = "https://avatars0.githubusercontent.com/u/2918581?v=4" //thumb

// tgBot.saveFile(url)
//   .then(msg => {
//     console.log(msg);
//   })
//   .catch(error => {
//     console.log(error); // formatted error message

//   });

// tgBot.getFile("BQADBAADNAADv2asU6Ll95NUsOUpAg")
//   .then(link => {
//     console.log(link);
//   })
//   .catch(err => {
//     console.log(err);
//   })


// user.addUser("9496421507","Elsy",res=>{console.log(res);})
// user.addUser("8089578001","Ebin",res=>{console.log(res);})
// user.addUser("8714812137","Dibin",res=>{console.log(res);})
// user.addUser("9895083297","Xavier",res=>{console.log(res);})

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

// group.removeMembers("5b712a536dee0f40f5fe1971","5b7131cb71de4f48e47beea0", ["5b712a536dee0f40f5fe1971"]) // (admin,groupId,[members...])
//   .then(res => {
//     // console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })



/*Populate Example */

// User.
//   findOne({ "details.name": 'Ebin' }).
//   populate('contacts').
//   exec(function (err, user) {
//     if (err) return handleError(err);
//     console.log('The author is %s', user.contacts);
//     // prints "The author is Ian Fleming"
//   });

message.create("5b72f780a1b74d0cafb4026b", ["5b72f780a1b74d0cafb4026a","5b72f780a1b74d0cafb4026b"], "toUser", /*{base64:"Hii...!"}*/ "Poda...")
// message.create("5b72f780a1b74d0cafb4026b", ["5b72fbffb6be040f1481cb25"], "toGroup", {"Hii Group...!"} )
  

.then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

