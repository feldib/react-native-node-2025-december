import { Router } from "express";
import {
  login,
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateToken } from "../config/jwt";

const router = Router();

// Authentication routes (public)
router.post("/login", login);
router.post("/register", register);

// Protected routes - require authentication
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
