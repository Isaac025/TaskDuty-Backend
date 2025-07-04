const {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/taskcontroller");

const router = require("express").Router();

router.get("/", getAllTasks);
router.post("/new-task", createTask);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
