let database = require('./src/database')
database.connect();

let user = require('./src/operations/user')
let group = require('./src/operations/group')


// user.addUser("9496421507","Elsy",res=>{console.log(res);})
// user.addUser("8089578001","Ebin",res=>{console.log(res);})
// user.addUser("8714812137","Dibin",res=>{console.log(res);})
// user.addUser("9895083297","Xavier",res=>{console.log(res);})

user.addContact("8089578001", "9895083297", (res) => {
  console.log(res);
})


// group.create("5b6ebed3abe70428f6e2f887", "wp 007")
//   .then(res => {
//     console.log(res);
//   }).
//   catch(err => {
//     console.log(err)
//   })
// group.addMembers("5b706f670906bf18b13b0a9e",
// ["5b6ecd08830ef83779122dde"])



