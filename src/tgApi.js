const { TelegramClient } = require('messaging-api-telegram');
// https://api.telegram.org/bot692564636:AAFPToeWo4-f132zRNalvT88dOjJhfGJJjU/getUpdates  // to get group id/ chat id
// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const client = TelegramClient.connect('692564636:AAFPToeWo4-f132zRNalvT88dOjJhfGJJjU');

function saveFile(url, caption) {
    return new Promise((resolve, reject) => {
        client.sendDocument("-211078964", url, {
            caption,
            disable_notification: true,
        })
            .then(msg => {
                let file = msg.document || msg.video || msg.audio || msg.photo || msg.voice;
                resolve({ id: file.file_id, thumb: (file.thumb ? file.thumb.file_id : null), type: file.mime_type, msg })
            })
            .catch(error => {
                reject(error);
            });
    })
}

function getFile(fileId) {
    return client
        .getFileLink(fileId)
}

module.exports = { getFile, saveFile }