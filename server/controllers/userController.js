const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword

    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// GET ALL USERS
exports.getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// GET USER BY ID
exports.getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select("-password");

    res.json(user);

  }

  catch (error) {

    res.status(400).json({
      message: "Invalid ID"
    });

  }

};



// UPDATE USER
exports.updateUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    let updatedData = { name, email };

    if (password) {

      updatedData.password = await bcrypt.hash(password, 10);

    }

    const user = await User.findByIdAndUpdate(

      req.params.id,
      updatedData,
      { new: true }

    ).select("-password");

    res.json(user);

  }

  catch (error) {

    res.status(400).json({
      message: "Invalid ID"
    });

  }

};



// DELETE USER
exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted"
    });

  }

  catch (error) {

    res.status(400).json({
      message: "Invalid ID"
    });

  }

};


// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id, name: user.name, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "devsecret", {
      expiresIn: "1h",
    });

    res.json({ token, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET CURRENT USER (protected)
exports.getCurrentUser = async (req, res) => {
  try {
    // `req.user` is set by the auth middleware
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};