let database = require('./src/database')
database.connect();

let user = require('./src/operations/user')
let group = require('./src/operations/group')

let User = require('./src/model/User')

// user.addUser("9496421507","Elsy",res=>{console.log(res);})
// user.addUser("8089578001","Ebin",res=>{console.log(res);})
// user.addUser("8714812137","Dibin",res=>{console.log(res);})
// user.addUser("9895083297","Xavier",res=>{console.log(res);})

// user.addContact("8089578001", "9496421507", (res) => {  //  (user,newContact)
//   console.log(res);
// })


// group.create("5b712a536dee0f40f5fe1971", "wp 007")  // (admin,groupName)
//   .then(res => {
//     console.log(res);
//   }).
//   catch(err => {
//     console.log(err)
//   })

// group.addMembers("5b7131cb71de4f48e47beea0", ["5b712a536dee0f40f5fe1972"]) // (groupId,[members...])
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

group.removeMembers("5b712a536dee0f40f5fe1971","5b7131cb71de4f48e47beea0", ["5b712a536dee0f40f5fe1971"]) // (admin,groupId,[members...])
  .then(res => {
    // console.log(res)
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


