const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const bcrypt = require("bcrypt");
>>>>>>> master

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
<<<<<<< HEAD
    min: 3,
    max: 20,
    unique: true,
=======
>>>>>>> master
  },
  email: {
    type: String,
    required: true,
    unique: true,
<<<<<<< HEAD
    max: 50,
=======
>>>>>>> master
  },
  password: {
    type: String,
    required: true,
<<<<<<< HEAD
    min: 8,
  },
});

module.exports = mongoose.model("Users", userSchema);
=======
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
>>>>>>> master
