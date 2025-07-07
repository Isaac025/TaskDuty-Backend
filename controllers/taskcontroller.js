const TASK = require("../models/task");

const getAllTasks = async (req, res) => {
  const tasks = await TASK.find({});
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

const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
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
  const { title, description, status } = req.body;
  if (!title || !description || !status) {
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
        status,
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
  try {
    const task = await TASK.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    await TASK.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
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
  createTask,
  editTask,
  deleteTask,
};
