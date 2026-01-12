import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  logout,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateAccessToken } from "../middleware/authenticate";

const router = Router();

// Authentication routes (public)
router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

// Protected routes - require authentication
router.get("/", authenticateAccessToken, getAllUsers);
router.get("/:id", authenticateAccessToken, getUserById);
router.put("/:id", authenticateAccessToken, updateUser);
router.delete("/:id", authenticateAccessToken, deleteUser);

export default router;
