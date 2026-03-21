// GET ALL USERS
exports.getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};



// GET USER BY ID
exports.getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

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

      const bcrypt = require("bcryptjs");

      updatedData.password = await bcrypt.hash(password, 10);

    }

    const user = await User.findByIdAndUpdate(

      req.params.id,

      updatedData,

      { new: true }

    ).select("-password");

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

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

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {

      return res.status(404).json({

        message: "User not found"

      });

    }

    res.json({

      message: "User deleted successfully"

    });

  }

  catch (error) {

    res.status(400).json({

      message: "Invalid ID"

    });

  }

};