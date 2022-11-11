const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

const mailOptions = {
  from: "ravi.pr90s@gmail.com",
  to: "ravi.pr90z@gmail.com",
  subject: "Email from nodemailer",
  text: "Hello",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_NAME, //mail id
    pass: process.env.PASSWORD, //mail password
  },
});

const dateToCron = (date) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  return ` ${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

const dateText = "2022-11-10T09:49:08.956Z"; // schedule date
const date = new Date(dateText);

const corn_date = dateToCron(date);
console.log(corn_date);
console.log(new Date());

// send mail
const url_taskMap = {};
const scheduler = cron.schedule(` * * * * * *`, () => {
  console.log(new Date());
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent : ", info);
    }
  });
});
const url = Object.keys(url_taskMap).length;
url_taskMap[url] = scheduler;
console.log("url_taskMap :", url_taskMap[url]);
scheduler.start();
setTimeout(() => {
  let my_job = url_taskMap[url];
  my_job.stop();
}, 5 * 60 * 10);
