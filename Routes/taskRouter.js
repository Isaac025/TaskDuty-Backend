const {
  getAllTasks,
  createTask,
  editTask,
  deleteTask,
  getSingleTask,
} = require("../controllers/taskcontroller");

const { isLoggedIn } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", isLoggedIn, getAllTasks);
router.get("/:id", isLoggedIn, getSingleTask);
router.post("/new-task", isLoggedIn, createTask);
router.patch("/:id", isLoggedIn, editTask);
router.delete("/:id", isLoggedIn, deleteTask);

module.exports = router;
