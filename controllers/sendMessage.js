const RedisClient = require("../config/connectRedis");
const { emailTransporter } = require("../services/emailService");
const { getQuote } = require("../utils/randomQuoteGenerator");

// ["0",   "1",   "2",   "3",   "4",   "5",   "6",   "7",   "8"]
// [ 9-10, 10-11, 11-12, 12-13, 13-14, 14-15, 15-16, 16-17, 17-18]

const sendMessage = async () => {
  let date = new Date();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  const schedule = await RedisClient.get("schedule");
  const parsedSchedule = JSON.parse(schedule);
  let messageToBeSent = "";

  const index = hour - 9;

  if (minutes === 30) {
    // send quote
    messageToBeSent = getQuote();
  } else {
    if (index - 1 >= 0) {
      // get schedule at index
      // remember at a time there would be something ending and next thing starting
      // check if last task is completed and next task is starting
      // mesage: It's time to start ${schedule[index]} task was ${schedule[index-1]} completed?
      messageToBeSent = `It's time to start ${parsedSchedule[index]} task was ${
        parsedSchedule[index - 1]
      } completed?`;
    } else if (index === 0) {
      messageToBeSent = `It's time to start ${parsedSchedule[index]}`;
    }
  }

  const sendersEmail = await RedisClient.get("sendersEmail");
  const receiversEmail = await RedisClient.get("receiversEmail");

  emailTransporter.sendMail({
    from: sendersEmail,
    to: receiversEmail,
    subject: "Schedule Reminder",
    text: messageToBeSent,
  }, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { sendMessage };
