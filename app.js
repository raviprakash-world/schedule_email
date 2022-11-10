const nodemailer = require("nodemailer");
const cron = require("node-cron");

const mailOptions = {
  from: "abc@gmail.com",
  to: "abcd@gmail.com",
  subject: "Email from nodemailer",
  text: "Hello",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abc@gmail.com", //mail id
    pass: "ysdhfkdfvres", //mail password
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
cron.schedule(`${corn_date}`, () => {
  console.log(new Date());
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent : ", info);
    }
  });
});
