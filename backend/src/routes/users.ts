import { Router } from "express";
import {
  login,
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// Authentication routes
router.post("/login", login);
router.post("/register", register);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Soft delete user
router.delete("/:id", deleteUser);

export default router;
