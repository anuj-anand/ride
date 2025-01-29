const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  sendOtp,
  verifyOtp, // Import sendOTP from the user controller
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// User routes
router.post("/", createUser); // Route to create a new user
router.get("/", getAllUsers); // Route to get all users
router.get("/:id", getUserById); // Route to get a user by ID
router.put("/:id", verifyToken, updateUser); // Route to update a user
router.delete("/:id", verifyToken, deleteUser); // Route to delete a user
router.post("/auth/send-otp", sendOtp);
router.post("/auth/verify",verifyOtp);
// Route to send OTP (no need for verifyToken here)

module.exports = router;
