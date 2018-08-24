let Group = require('../../model/Group')
let User = require('../../model/User')
module.exports = (admin, groupId, members) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: admin }).then(user => {
            if (!!user)
                Group.findOne({ _id: groupId }).then(group => {
                    if(group.admins.indexOf(admin)!=-1){
                    var saveFlag = false;
                    for (var i = 0; i < members.length && group.members.length>1; i++) {
                        if (group.members.indexOf(members[i]) != -1) {
                            saveFlag = true;
                            group.members.splice(group.members.indexOf(members[i]), 1);
                        }
                        if (group.admins.indexOf(members[i]) != -1) {
                            saveFlag = true;
                            group.admins.splice(group.members.indexOf(members[i]), 1);
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
                    else reject({ type: "error", reason: "Given members are no longer available or he is the last member in this group ", details: group });

                }
                else 
                reject({ type: "error", reason: "Permision denied.", details: "Member is not an administator." })

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