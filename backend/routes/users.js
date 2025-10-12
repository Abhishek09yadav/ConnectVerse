import express from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import {
  getSimilarUsers,
  getUserProfile,
  updateUserProfile,
  sendFriendRequest,
  respondToFriendRequest,
  getFriendRequests,
  getFriendsList,
} from "../controllers/userController.js";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Get users with similar hobbies in the same city
router.get("/similar", auth, getSimilarUsers);

// Get user profile
router.get("/profile", auth, getUserProfile);

// Update user profile
router.put("/profile", auth, upload.single("profileImage"), updateUserProfile);

// Send friend request
router.post("/friend-request/:userId", auth, sendFriendRequest);

// Respond to friend request
router.post("/friend-request/:requestId/respond", auth, respondToFriendRequest);

// Get friend requests
router.get("/friend-requests", auth, getFriendRequests);

// Get friends list
router.get("/friends", auth, getFriendsList);

export default router;
