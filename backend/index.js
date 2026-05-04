const express = require("express")
const app = express();
const cors = require("cors");

const initDb = require('./dbDrivers/initDb.js');

const goalRouter = require('./routes/Goals.js');
const activityRouter = require('./routes/Activities.js');
const progressRouter = require('./routes/Progress.js');
const userRouter = require('./routes/Users.js');

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/goals", goalRouter);
app.use("/api/activities", activityRouter);
app.use("/api/progress", progressRouter);

// Initialize DB if not already initialized
initDb();

// Export for Vercel Serverless
module.exports = app;
