const nodemailer = require("nodemailer");
require("dotenv").config();

const SMTP_PORT = 587;
const HOST_SERVICE = "smtp-relay.sendinblue.com";
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

const emailTransporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

module.exports = { emailTransporter };
