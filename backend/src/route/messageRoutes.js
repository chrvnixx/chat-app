import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import { getMessages, getUsersForSidebar } from "../controllers/messageControllers.js";

const router = express.Router();

router.get('/user', protectRoute,getUsersForSidebar);
router.get("/:id", protectRoute, getMessages)

export default router;
