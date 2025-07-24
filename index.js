require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const taskRouter = require("./Routes/taskRouter");
const userRouter = require("./Routes/userRouter");

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);
//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Task Duty Api Running" });
});

//error route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

//save to db
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "task-duty" });
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectToDB();
