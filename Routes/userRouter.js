const {
  handleRegister,
  handleLogin,
  getAllUsers,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/", getAllUsers);

module.exports = router;
