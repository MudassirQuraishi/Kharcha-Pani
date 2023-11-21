const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.signup = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    // Validate request body
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide userName, userEmail, and userPassword",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Check if user already exists

    const existingUser = await User.findOne({ userEmail: userEmail });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User Already Exists" });
    }
    const user = await User.create({
      userName: userName,
      userEmail: userEmail,
      userPassword: hashedPassword,
    });

    console.log(user);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
