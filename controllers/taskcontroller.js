const TASK = require("../models/task");
const mongoose = require("mongoose");

const getAllTasks = async (req, res) => {
  const tasks = await TASK.find({}).sort({ createdAt: -1 });
  const totalTasks = await TASK.countDocuments({});

  try {
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      totalTasks,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TASK.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Task Fetched Successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const { title, description, tag } = req.body;
  if (!title || !description || !tag) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const newTask = await TASK.create({
      title,
      description,
      tag,
    });
    const totalTasks = await TASK.countDocuments({});

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      totalTasks,
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, tag } = req.body;
  if (!title || !description || !tag) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const task = await TASK.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const updatedTask = await TASK.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tag,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  // Validate ID format (if using MongoDB)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }

  try {
    const task = await TASK.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletedTask: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
};
