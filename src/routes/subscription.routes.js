import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
  .route("/c/:channelId") // Get subscribers of this channel
  .get(getUserChannelSubscribers)
  .post(toggleSubscription); // Toggle subscription for this channel

router
  .route("/u/:userId") // Get all channels this user has subscribed to
  .get(getSubscribedChannels);

export default router;
