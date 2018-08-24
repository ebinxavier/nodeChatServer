let mongoose = require('mongoose')
let types = mongoose.Schema.Types;
let messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: {
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        receivedUers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        seenUers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        receivedGroupUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        seenGroupUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    toType: { type: String, required: true },
    details: types.Mixed,
    created_at: Date,
    updated_at: Date
})


messageSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Message', messageSchema)