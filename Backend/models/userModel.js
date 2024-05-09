const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter and one digit",
    },
  },
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
