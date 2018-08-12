let User = require('../../model/Group')

module.exports = (groupId, members) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: groupId }).then(group => {
            console.log(group)
        }).catch(err => {
            console.log(err)
        })
    })
}