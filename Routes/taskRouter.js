const {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
  getSingleTask,
} = require("../controllers/taskcontroller");

const router = require("express").Router();

router.get("/", getAllTasks);
router.get("/:id", getSingleTask);
router.post("/new-task", createTask);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
