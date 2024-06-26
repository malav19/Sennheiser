const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
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
      userType,
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

module.exports.getUsers = async (req, res) => {
  try {

    const users = await User.find({ userType: 'user' });

    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find();

    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports.updateUser = async (req, res) => {
  try {
    const { id, username, email } = req.body;
    const user = await User.findOne({ username });
    let objectId;
    // Convert id to ObjectId if it's a string
    if (typeof id === 'string') {
      console.log("id", id);
      objectId = new mongoose.Types.ObjectId(id);
    }
    const data = await User.findByIdAndUpdate(
      objectId || id,
      { $set: { "username": username, "email": email } },
      { new: true });
    console.log("data", data);
    if (data) {
      return res.json({ status: true, data });
    } else return res.json({ msg: "Failed to update user to the database", status: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.addUserAddress = async (req, res) => {
  try {
    const { id, username, phoneNumber,
      street,
      city,
      state,
      pincode } = req.body;
    console.log("User Address--", req.body);
    let objectId;
    // Convert id to ObjectId if it's a string
    if (typeof id === 'string') {
      console.log("id", id);
      objectId = new mongoose.Types.ObjectId(id);
    }
    const updateQuery = {
      $set: {
        "address.phoneNumber": phoneNumber,
        "address.street": street,
        "address.city": city,
        "address.state": state,
        "address.pincode": pincode
      }
    };
    const data = await User.findByIdAndUpdate(objectId || id, updateQuery, { new: true });
    // const user = await User.findOne({ username });
    if (data) return res.json({ status: true, data });
    else return res.json({ msg: "Failed to add address to the database", status: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
