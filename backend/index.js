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
app.use("/users", userRouter);

app.use("/api/goals", goalRouter);
app.use("/goals", goalRouter);

app.use("/api/activities", activityRouter);
app.use("/activities", activityRouter);

app.use("/api/progress", progressRouter);
app.use("/progress", progressRouter);

// Initialize DB if not already initialized
initDb();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
