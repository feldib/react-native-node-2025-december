import { Router } from "express";
import {
  requestJoinEvent,
  getJoinRequests,
  setJoinRequest,
} from "../controllers/approvalController";
import { authenticateToken } from "../config/jwt";

const router = Router();

// Protected routes - require authentication
router.post("/request-join", authenticateToken, requestJoinEvent);
router.post("/join-requests", authenticateToken, getJoinRequests);
router.post("/join-request", authenticateToken, setJoinRequest);

export default router;
