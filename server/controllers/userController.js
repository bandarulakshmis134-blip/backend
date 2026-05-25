const User = require("../models/User");
const bcrypt = require("bcryptjs");


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

    res.status(201).json(user);

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