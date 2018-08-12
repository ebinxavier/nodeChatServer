let mongoose = require('mongoose')
let types = mongoose.Schema.Types;
let messageSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    details: types.Mixed
})
module.exports = mongoose.model('Message', messageSchema)