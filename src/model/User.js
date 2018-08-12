let mongoose = require('mongoose')

let types = mongoose.Schema.Types;

let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: { type: String, required: true, unique: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    details: types.Mixed,
    created_at: Date,
    updated_at: Date

})


userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});


module.exports = mongoose.model('User', userSchema)