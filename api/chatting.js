const router = require('express').Router();
const { MessageMedia, Location } = require("whatsapp-web.js");
const request = require('request')
const vuri = require('valid-url');
const fs = require('fs');

const mediadownloader = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }

router.post('/sendmessage/:phone', async (req,res) => {
    let phone = req.params.phone;
    let message = req.body.message;

    if (phone == undefined || message == undefined) {
        res.send({ status:"error", message:"please enter valid phone and message" })
    } else {
        client.sendMessage(phone + '@c.us', message).then((response) => {
            if (response.id.fromMe) {
                res.send({ status:'success', message: `WhatsApp Message successfully sent to ${phone}` })
            }else {
                res.send({ status:'failed', message: 'Send whatsapp message failed.' })
            }
        });
    }
});

module.exports = router;