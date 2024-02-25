const {
  login,
  register,
  logOut,
  forgotPassword,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout/:id", logOut);
router.post("/update-password", forgotPassword);

module.exports = router;
