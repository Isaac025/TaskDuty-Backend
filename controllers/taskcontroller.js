const TASK = require("../models/task");
const mongoose = require("mongoose");

const getAllTasks = async (req, res) => {
  const userId = req.user.userId;
  const tasks = await TASK.find({ user: userId }).sort({ createdAt: -1 });
  const totalTasks = await TASK.countDocuments({ user: userId });

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
  const userId = req.user.userId;

  try {
    const task = await TASK.findOne({ _id: id, user: userId });

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
  const userId = req.user.userId;

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
      user: userId,
    });
    const totalTasks = await TASK.countDocuments({ user: userId });

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
  const userId = req.user.userId;

  if (!title || !description || !tag) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const task = await TASK.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, tag },
      { new: true }
    );

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
      task,
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
  const userId = req.user.userId;

  // Validate ID format (if using MongoDB)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID format",
    });
  }

  try {
    const task = await TASK.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized",
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
