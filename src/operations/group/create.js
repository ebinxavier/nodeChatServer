let mongoose = require('mongoose')
let Group = require('../../model/Group')


function createGroup(createdBy, groupName) {

    return new Promise((resolve, reject) => {
        var group = new Group({
            _id: new mongoose.Types.ObjectId(),
            members: [createdBy],
            admins: [createdBy],
            details: {
                name: groupName,

            }
        })

        group.save()
            .then(doc => {
                resolve({ type: "success", msg: "Added : " + doc.details.name, details: doc });
            })
            .catch(err => {
                reject({ type: "error", reason: "Network/DB error", details: err });
            })

    })

}
module.exports = createGroup;
