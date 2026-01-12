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
import { authenticateAccessToken } from "../middleware/authenticate";

const router = Router();

// Public routes

router.get("/", getAllEvents);
// Protected routes - require authentication
router.post("/", authenticateAccessToken, createEvent);

router.get("/:id", authenticateAccessToken, getEventById);
router.get(
  "/:id/user-status/:userId",
  authenticateAccessToken,
  getUserEventStatus
);
router.put("/:id", authenticateAccessToken, updateEvent);
router.delete("/:id", authenticateAccessToken, deleteEvent);
router.put("/:id/users/:userId", authenticateAccessToken, leaveEvent);
router.delete("/:id/users/:userId", authenticateAccessToken, removeEventUser);

export default router;
