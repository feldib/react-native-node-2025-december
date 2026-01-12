import { Router } from "express";
import {
  requestJoinEvent,
  getJoinRequests,
  setJoinRequest,
} from "../controllers/approvalController";
import { authenticateAccessToken } from "../middleware/authenticate";

const router = Router();

// Protected routes - require authentication
router.post("/request-join", authenticateAccessToken, requestJoinEvent);
router.post("/join-requests", authenticateAccessToken, getJoinRequests);
router.post("/join-request", authenticateAccessToken, setJoinRequest);

export default router;
