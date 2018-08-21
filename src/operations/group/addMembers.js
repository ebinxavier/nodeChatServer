let Group = require('../../model/Group')
let User = require('../../model/User')

module.exports = (admin, groupId, members) => {
    var details = {};
    return new Promise((resolve, reject) => {
        Group.findOne({ _id: groupId }).then(group => {
            if (group && group.admins.indexOf(admin) != -1)
                Promise.all(members.map(member => User.findOne({ _id: member })))
                    .then(allUsers => {

                        if (allUsers.filter(user => {
                            if (!user) details.type1 = "Invalid User, returned null";
                            if (user && group.members.indexOf(user._id) == -1) {
                                group.members.push(user._id);
                                return true;
                            }
                            if (user)
                                details.type2 = "User already exist";
                            return false;
                        })
                            .some(() => true)) {
                            group.save()
                                .then(doc => {
                                    resolve({ type: "success", reason: "Members : " + doc.members, details: doc });
                                })
                                .catch(err => {
                                    reject({ type: "error", reason: "Network/DB error", details: err });
                                })
                        }
                        else
                            reject({ type: "error", reason: "Member(s) already exist or invalid member.", details: details })




                    }).catch(err => {
                        console.log(err);
                        reject({ type: "error", reason: "Network/DB", details: err })
                    })
            else {
                var reason = "Permision denied, Member is not an administator."
                if (!group)
                reason = "Group not exist."

                    reject({ type: "error", reason, details: null })
            }

        }).catch(err => {
            console.log(err);
            reject({ type: "error", reason: "Network/DB", details: err })
        })
    })
}