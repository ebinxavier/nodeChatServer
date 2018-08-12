let mongoose = require('mongoose');
// mongodb://ebin:capacitance1@ds217002.mlab.com:17002/node-chat-room
// const server = 'ebin:capacitance1@ds217002.mlab.com:17002'; 
const server = '127.0.0.1:27017';
const database = 'node-chat-room';      
class Database {
  constructor() {
    // this.connect()
  }
  
connect() {
     mongoose.connect(`mongodb://${server}/${database}`,{ useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error',err)
       })
  }
}
module.exports = new Database()