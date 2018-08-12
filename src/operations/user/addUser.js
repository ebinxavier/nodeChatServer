let mongoose = require('mongoose')
let User = require('../../model/User')

function addUser(phone,name,cb) {
    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        phone,
        contacts: [],
        groups: [],
        details: {
            name
        }
    })


    user.save()
        .then(doc => {
            cb({ type: "success", msg: "Added : " + doc.details.name, details: doc });
        })
        .catch(err => {
            cb({ type: "error", reason: "Network/DB error", details: err });
        })
}
module.exports = addUser;
