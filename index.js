const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const templateOtp = require("./services/template");
let Port = process.env.Port || 3000;
let email = [
  "ghi@hotmail.com",
  "def@yahoo.com",
  "ghi@gmail.com",
  "abc@channelier.com",
  "abc@hotmail.com",
  "def@hotmail.com",
  "abc@gmail.com",
  "abc@yahoo.com",
  "def@channelier.com",
  "jkl@hotmail.com",
  "ghi@yahoo.com",
  "def@gmail.com",
];

app.get("/sendMail", async (req, res) => {
  try {
    let otp = (Math.random() * 1000000) >> 0;
    if (otp) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
      });
      var mailOptions = {
        from: "rhtsingh172@gmail.com",
        to: email,
        subject: "One Time Password From testing app",
        html: templateOtp(otp, "test"),
      };
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        }
        res
          .status(200)
          .json({ success: true, message: "Mail sent successfully" });
      });
    } else console.log("otp not created");
  } catch (err) {
    console.log(err);
  }
});

app.listen(Port, () => {
  console.log("listening on port " + Port);
});
