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
    status: {
      type: String,
      enum: ["urgent", "important"],
      required: true,
    },
  },
  { timestamps: true }
);

const TASK = mongoose.model("task", taskSchema);

module.exports = TASK;
