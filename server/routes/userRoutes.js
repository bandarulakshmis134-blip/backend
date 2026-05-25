const express = require("express");

const router = express.Router();

const {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { loginUser, getCurrentUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");


router.get("/status", (req, res) => {
  res.json({ message: "Backend is reachable" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);


module.exports = router;