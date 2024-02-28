const nodemailer = require("nodemailer");
const ejs = require('ejs');
//const temp= require('../../public/mail.template.ejs')
let sendEmail = async (data) => {
  const { to, subject, bookingData } = data;
  bookingData.to = process.env.MAIL_FROM;
  // Render the EJS template with the booking data
  const html = await ejs.renderFile('D:/projects/TrainingProjects/Projects/backend_hotel_room_management/public/mail.template.ejs', bookingData);

  const partner = {
    service: process.env.MAIL_SERVICE,
    userName: process.env.MAIL_FROM,
    password: process.env.MAIL_PASS,
  };
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  };

  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: partner?.service,
      auth: {
        user: partner?.userName,
        pass: partner?.password,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        reject(error);
      } else {
        console.log("info",info);
        resolve({
          messageId: info.messageId.replace(/<|>/g, "").split("@")[0],
        });
      }
    });
  });
};

module.exports = { sendEmail };
