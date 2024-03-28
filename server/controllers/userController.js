const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("user ", user);
    console.log("req.body ", req.body);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("password is invalid");
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    // delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {

  try {
    const { username, email, password, userType } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    // const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      username,
      password,
      userType
    });

    console.log("user in registration ", user);
    // delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Username and newPassword are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    return res.json({
      status: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
