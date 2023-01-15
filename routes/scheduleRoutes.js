const Router = require("express").Router();
const {
  createSchedule,
  getSchedule,
} = require("../controllers/scheduleControllers");

Router.route("/").post(createSchedule);

module.exports = Router;
