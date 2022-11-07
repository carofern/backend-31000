require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function sendMail(from, to, subject, html) {
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  info = await transporter.sendMail(mailOptions);
  logger.info("Email enviado " + info.messageId);
}

module.exports = { sendMail };
