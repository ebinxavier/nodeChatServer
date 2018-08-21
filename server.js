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

group.addMembers("5b716f307e0fee2ac2bf106c","5b716f563594732afb7fc0c0", ["5b716f307e0fee2ac2bf106e","5b716f307e0fee2ac2bf106c","5b716f307e0fee2ac2bf106d"]) // (admin,groupId,[members...])
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// group.removeMembers("5b716f307e0fee2ac2bf106e","5b716f563594732afb7fc0c0", ["5b716f307e0fee2ac2bf106e","5b716f307e0fee2ac2bf106c"]) // (admin,groupId,[members...])
//   .then(res => {
//     console.log(res)
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


