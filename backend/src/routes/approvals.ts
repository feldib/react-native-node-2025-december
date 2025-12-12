import { Router } from "express";
import {
  requestJoinEvent,
  getJoinRequests,
  setJoinRequest,
} from "../controllers/approvalController";

const router = Router();

// Request to join an event
router.post("/request-join", requestJoinEvent);

// Get pending join requests for an event
router.post("/join-requests", getJoinRequests);

// Approve or reject a join request
router.post("/join-request", setJoinRequest);

export default router;
