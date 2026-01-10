import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUserEventStatus,
  updateEvent,
  deleteEvent,
  removeEventUser,
  leaveEvent,
} from "../controllers/eventController";
import { authenticateToken } from "../middleware/authenticate";

const router = Router();

// Public routes

router.get("/", getAllEvents);
// Protected routes - require authentication
router.post("/", authenticateToken, createEvent);

router.get("/:id", authenticateToken, getEventById);
router.get("/:id/user-status/:userId", authenticateToken, getUserEventStatus);
router.put("/:id", authenticateToken, updateEvent);
router.delete("/:id", authenticateToken, deleteEvent);
router.put("/:id/users/:userId", authenticateToken, leaveEvent);
router.delete("/:id/users/:userId", authenticateToken, removeEventUser);

export default router;
