const RedisClient = require("../config/connectRedis");

// @ROUTE:  POST /api/v1/schedule
// @DESC:   Create a new schedule
// @ACCESS: Public

const createSchedule = async (req, res) => {
  try {
    const { schedule, sendersEmail, receiversEmail } = req.body;

    await RedisClient.set("schedule", JSON.stringify(schedule));
    await RedisClient.set("sendersEmail", sendersEmail);
    await RedisClient.set("receiversEmail", receiversEmail);

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
