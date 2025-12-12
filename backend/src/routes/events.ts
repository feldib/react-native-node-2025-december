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

const router = Router();

// Create a new event
router.post("/", createEvent);

// Get all events (exclude deleted)
router.get("/", getAllEvents);

// Get event by ID
router.get("/:id", getEventById);

// Get user's status for an event
router.get("/:id/user-status/:userId", getUserEventStatus);

// Update event
router.put("/:id", updateEvent);

// Soft delete event
router.delete("/:id", deleteEvent);

// Leave event
router.put("/:id/users/:userId", leaveEvent);

// Remove user from event
router.delete("/:id/users/:userId", removeEventUser);

export default router;
