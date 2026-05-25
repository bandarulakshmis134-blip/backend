const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");


router.get("/status", (req, res) => {
  res.json({ message: "Backend is reachable" });
});

router.post("/register", registerUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);


module.exports = router;