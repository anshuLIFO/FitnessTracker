const express = require("express")
const app = express();
const cors = require("cors");

const sqlFileDriver = require('./dbDrivers/sqlDriver.js');

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
sqlFileDriver(["create_tables.sql", "insert_data.sql"])
    .then(() => console.log("DB Init Results: Success"))
    .catch(err => console.error("Failed to initialize database:", err));

// Export for Vercel Serverless
module.exports = app;
