const express = require("express");
const logger = require("morgan");
const app = express();
const scheduleRoutes = require("./routes/scheduleRoutes");

const PORT = 1338;

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/api/v1/schedule", scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use("/api/v1/schedule", require("./routes/scheduleRoutes"));
