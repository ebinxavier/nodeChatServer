let Group = require('../../model/Group')
let User = require('../../model/User')
module.exports = (admin, groupId, members) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: admin }).then(user => {
            if (!!user)
                Group.findOne({ _id: groupId }).then(group => {
                    var saveFlag = false;
                    for (var i = 0; i < members.length && group.members.length>1; i++) {
                        if (group.members.indexOf(members[i]) != -1) {
                            saveFlag = true;
                            group.members.splice(i, 1);
                        }
                        if (group.admins.indexOf(members[i]) != -1) {
                            saveFlag = true;
                            group.admins.splice(i, 1);
                        }
                    
                    }
                    if(!group.admins.length && group.members.length)
                    group.admins.push(group.members[0])

                    if (saveFlag)
                        group.save()
                            .then(doc => {
                                resolve({ type: "success", msg: "Members : " + doc.members, details: doc });
                            })
                            .catch(err => {
                                reject({ type: "error", reason: "Network/DB error", details: err });
                            })
                    else reject({ type: "error", reason: "Nothing to save", details: "Given members are no longer available in this group" });

                })
                    .catch(err => {
                        reject({ type: "error", reason: "Network/DB error", details: err });
                    })
            else
                reject({ type: "error", reason: "No record found", details: null })
        })
            .catch(err => {
                reject({ type: "error", reason: "Network/DB error", details: err });
            })


    })
}