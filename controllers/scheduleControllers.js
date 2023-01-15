const Redis = require("redis");
// const axios = require("axios");
const scheduler = require("node-cron");
const { getQuote } = require("../utils/randomQuoteGenerator");

const RedisClient = Redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  legacyMode: true,
});

/*
// RedisClient.on("error", function (err) {
//   console.log("Error " + err);
// });

// RedisClient.on("connect", function () {
//   console.log("Connected to Redis");
// });
*/

RedisClient.connect()
  .then(console.log("Connected to redis"))
  .catch((err) => {
    console.log("Error " + err);
  });

// @ROUTE:  POST /api/v1/schedule
// @DESC:   Create a new schedule
// @ACCESS: Public

const createSchedule = async (req, res) => {
  try {
    const { schedule } = req.body;
    let taskAtHand = 0;

    RedisClient.set("schedule", JSON.stringify(schedule));

    const job = scheduler.schedule("*/30 * * * *", () => {
      let date = new Date();
      let minutes = date.getMinutes();

      if (minutes === 30) {
        /*
        // Code for sending a request to the API
        // Link to the API: https://rapidapi.com/HealThruWords/api/universal-inspirational-quotes/
        const options = {
            method: 'GET',
            url: 'https://healthruwords.p.rapidapi.com/v1/quotes/',
            params: {t: 'Wisdom', maxR: '1', size: 'medium', id: '731'},
            headers: {
                'X-RapidAPI-Key': 'Enter your API key here',
                'X-RapidAPI-Host': 'healthruwords.p.rapidapi.com'
            }
        };
        
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
        */

        console.log(getQuote());
      } else {
        if (taskAtHand === 0) {
          console.log(`Time to start: ${schedule[taskAtHand]}`);
          taskAtHand++;
        } else if (taskAtHand === schedule.length) {
          if (schedule[taskAtHand] - 1 !== "") {
            console.log(`Have you completed: ${schedule[taskAtHand - 1]}?`);
          }
          console.log("Congratulations! You have completed your schedule!");
          process.exit(0);
        } else {
          if (schedule[taskAtHand] - 1 === "") {
            console.log("Welcome back from your break!");
          } else {
            console.log(`Have you completed: ${schedule[taskAtHand - 1]}?`);
            if (schedule[taskAtHand] === "") {
              console.log("Time to take a break!");
            } else {
              console.log(`Time to start: ${schedule[taskAtHand]}`);
            }
          }
          taskAtHand++;
        }
      }
    });

    console.log(schedule);
    res.status(200).json({
      success: true,
      data: {
        message: "Schedule created successfully",
        createdSchedule: schedule,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createSchedule,
};
