const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config();

const email = process.env.nodeMailerEmail;
const oAuth2Client = new google.auth.OAuth2({
  CLIENT_ID: process.env.nodeMailerClId,
  ClIENT_SECRET: process.env.nodeMailerSecret,
  REDIRECT_URI: 'https://developers.google.com/oauthplayground',
});

oAuth2Client.setCredentials({
  refresh_token: process.env.nodeMailerRefreshToken,
});

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // true for 465, false for other ports
  pool: true,
  auth: {
    type: 'OAuth2',
    user: email,
    // Get From Google Console OAuth Credential
    clientId: process.env.nodeMailerClId,
    clientSecret: process.env.nodeMailerSecret,
    // Get From Google Developer OAuth20 PlayGround
    refreshToken: process.env.nodeMailerRefreshToken,
    access_token: async () => oAuth2Client.getAccessToken(),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  sendOTP: (receiverEmail, otp) => {
    const mailOptions = {
      from: "Online Academy",
      to: `${receiverEmail}`,
      subject: 'Activate Online Academy Account',
      text: `Provide following OTP to activate your account: ${otp} \n  If this is not you, ignore this email!`,
    };
    return new Promise((resolve) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve({
            success: false,
            error,
          });
        } else {
          resolve({
            success: true,
            info,
          });
        }
      });
    });
  },
}