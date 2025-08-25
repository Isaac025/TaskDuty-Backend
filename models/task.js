const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // 👇 associate each task with a user
    user: {
      type: mongoose.Types.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    tag: {
      type: String,
      enum: ["urgent", "important"],
      required: true,
    },
  },
  { timestamps: true }
);

const TASK = mongoose.model("task", taskSchema);

module.exports = TASK;
