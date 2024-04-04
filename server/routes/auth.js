const {
  login,
  register,
  logOut,
  forgotPassword,
  getUsers,
  getAllUsers,
  updateUser,
  addUserAddress
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout/:id", logOut);
router.post("/update-password", forgotPassword);
router.get("/getUsers", getUsers);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser", updateUser);
router.post("/addingAddress", addUserAddress);
module.exports = router;
