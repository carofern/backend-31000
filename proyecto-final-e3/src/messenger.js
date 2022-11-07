require("dotenv").config();
const logger = require("./logger");

//https://www.twilio.com/console/sms/whatsapp/sandbox

const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendWhatsAppMessage(messageBody, messageMedia, destNumber) {
  try {
    options = {
      body: messageBody,
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:` + destNumber,
    };
    if (messageMedia) {
      options.mediaUrl = messageMedia;
    } else {
      options.mediaUrl = [];
    }

    message = await client.messages.create(options);
    logger.info("Mensaje Whatsapp enviado: " + message.sid);
  } catch (error) {
    logger.error("Error enviando mensaje de whatsapp: " + error);
  }
}

async function sendSMS(messageBody, destNumber) {
  try {
    message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_SMS_NUMBER,
      to: destNumber,
    });
    logger.info("Mensaje SMS enviado: " + message.sid);
  } catch (error) {
    logger.error("Error enviando SMS: " + error);
  }
}

module.exports = { sendWhatsAppMessage, sendSMS };
