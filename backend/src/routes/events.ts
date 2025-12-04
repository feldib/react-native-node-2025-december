import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEvent,
  updateEventUser,
  removeEventUser,
} from "../controllers/eventController";

const router = Router();

// Create a new event
router.post("/", createEvent);

// Get all events (exclude deleted)
router.get("/", getAllEvents);

// Get event by ID
router.get("/:id", getEventById);

// Update event
router.put("/:id", updateEvent);

// Soft delete event
router.delete("/:id", deleteEvent);

// Join user to event
router.post("/:id/users", joinEvent);

// Update user's event relationship
router.put("/:id/users/:userId", updateEventUser);

// Remove user from event
router.delete("/:id/users/:userId", removeEventUser);

export default router;
