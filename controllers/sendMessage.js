const { getQuote } = require("../utils/randomQuoteGenerator");
const RedisClient = require("../config/connectRedis");

// ["0",   "1",   "2",   "3",   "4",   "5",   "6",   "7",   "8"]
// [ 9-10, 10-11, 11-12, 12-13, 13-14, 14-15, 15-16, 16-17, 17-18]

const sendMessage = async () => {
  let date = new Date();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  const schedule = await RedisClient.get("schedule");

  const index = hour - 9;

  if(minutes === 30) {
    // send quote
  } else {
    if(index - 1 >= 0) {
      // get schedule at index
      // remember at a time there would be something ending and next thing starting
      // check if last task is completed and next task is starting
      // mesage: It's time to start ${schedule[index]} task was ${schedule[index-1]} completed?
    }
  }
};

module.exports = { sendMessage };
