let mongoose = require('mongoose')
let types = mongoose.Schema.Types;
let groupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admins:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    details: types.Mixed,
    created_at: Date,
    updated_at: Date
})

groupSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Group', groupSchema)