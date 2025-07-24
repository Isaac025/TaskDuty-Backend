const USER = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../helpers/generateToken");
const { sendWelcomeEmail } = require("../email/sendEmail");

const handleRegister = async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;
  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const existingUser = await USER.findOne({
      $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateToken();
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    const user = await USER.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      verificationToken,
      verificationTokenExpires,
    });

    //send an email
    const clientUrl = `${process.env.FRONTEND_URL}`;
    await sendWelcomeEmail({
      fullName: user.fullName,
      email: user.email,
      clientUrl,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found, Please Register",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await USER.find({});
  const totalUsers = await USER.countDocuments({});

  try {
    res.status(200).json({
      success: true,
      message: "users fetched successfullly",
      totalUsers,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { handleRegister, handleLogin, getAllUsers };
