let mongoose = require('mongoose')
let Message = require('../../model/Message')
let User = require('../../model/User')
let Group = require('../../model/Group')

let tgBot = require('../../tgApi')

function getHttpUrlFromBase64(base64) {
    // fill the logic  later for now sending dummy url
    return new Promise((resolve, reject) => {
        resolve("https://avatars0.githubusercontent.com/u/2918581?v=4");
    })
}


function saveFile(message, resolve, reject) {
    if (typeof message.details != 'string') {
        getHttpUrlFromBase64(message.details.base64).then(url => {
            tgBot.saveFile(url)
                .then(res => {
                    message.details = res;
                    message.save()
                        .then(doc => {
                            resolve({ type: "success", msg: "message created.", details: doc });
                        })
                        .catch(err => {
                            reject({ type: "error Save", reason: "Network/DB error", details: err });
                        })
                })
                .catch(error => {
                    reject({ type: "error Save", reason: "TG Bot Error", details: error }); // formatted error message

                });
        })
            .catch();
    }
    else {
        message.save()
            .then(doc => {
                resolve({ type: "success", msg: "message created.", details: doc });
            })
            .catch(err => {
                reject({ type: "error Save", reason: "Network/DB error", details: err });
            })
    }

}



function createMessage(from, to, toType, msg) { //(from, [to] ,toType[toUser, toGroup], msg["hi" | {type:"audio",base64:"sSfSAas5sSDF5521"}])
    return new Promise((resolve, reject) => {
        User.findOne({ _id: from })
            .then(fromUser => {
                if (!fromUser)
                    reject({ type: "error", reason: "No fromUser found", details: fromUser });
                else {
                    if (toType == 'toUser') {
                        User.find({ _id: to })
                            .then(toUser => {
                                if (!toUser.length)
                                    reject({ type: "error", reason: "No toUsers found", details: toUser });
                                else {
                                    var message = new Message({
                                        _id: new mongoose.Types.ObjectId(),
                                        from,
                                        toType,
                                        to: {
                                            users: toUser.map(e => e._id),
                                        },
                                        details: msg
                                    })
                                    //  console.log(message);

                                    saveFile(message, resolve, reject);
                                }
                            })
                            .catch()
                    }
                    else if (toType == 'toGroup') {
                        Group.findOne({ _id: to })
                            .then(toGroup => {
                                if (!toGroup)
                                    reject({ type: "error", reason: "No User found", details: toGroup });
                                else {
                                    var message = new Message({
                                        _id: new mongoose.Types.ObjectId(),
                                        from,
                                        toType,
                                        to: {
                                            group: to[0], // only one group allowed 
                                        },
                                        details: msg
                                    })
                                    saveFile(message, resolve, reject);
                                }
                            })
                            .catch()
                    }

                }

            })
            .catch(err => {
                reject({ type: "error", reason: "Network/DB error", details: err });
            })

    })

}
module.exports = createMessage;
