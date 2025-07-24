const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
