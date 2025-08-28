import express, { json } from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "findhobby/profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Get users with similar hobbies in the same city
router.get("/similar", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    // Find users in the same city
    const users = await User.find({
      city: currentUser.city,
      _id: { $ne: currentUser._id },
    });

    // Filter users to only include those with at least one matching hobby
    const usersWithMatchingHobbies = users.filter((user) => {
      return user.hobbies.some((hobby) => currentUser.hobbies.includes(hobby));
    });

    res.json(usersWithMatchingHobbies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile
router.put(
  "/profile",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, email, phone, city, hobbies } = req.body;
      // console.log("🚀 ~ req.body:", req.body)
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.city = city || user.city;

      // Update hobbies if provided
      const parsedHobbies = JSON.parse(hobbies)
      if (parsedHobbies) {
        user.hobbies = parsedHobbies.map((hobby) => hobby.trim());
      }

      // Update profile image if uploaded
      if (req.file) {
        user.profileImage = req.file.path;
      }

      await user.save();

      // Return updated user data (excluding password)
      const userData = user.toObject();
      delete userData.password;

      res.json(userData);
    } catch (error) {
      console.log("error in updating profile" , error)
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Send friend request
router.post("/friend-request/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already friends
    if (currentUser.friends.includes(userId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Check if request already exists
    const existingRequest = targetUser.friendRequests.find(
      (request) =>
        request.from.toString() === currentUser._id.toString() &&
        request.status === "pending"
    );

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add friend request
    targetUser.friendRequests.push({
      from: currentUser._id,
      status: "pending",
    });

    await targetUser.save();
    res.json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Respond to friend request
router.post("/friend-request/:requestId/respond", auth, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const currentUser = await User.findById(req.user.userId);

    // Find the friend request
    const request = currentUser.friendRequests.id(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (action === "accept") {
      // Add to friends list for both users
      currentUser.friends.push(request.from);
      const sender = await User.findById(request.from);
      sender.friends.push(currentUser._id);
      await sender.save();
    }

    // Update request status
    request.status = action === "accept" ? "accepted" : "rejected";
    await currentUser.save();

    res.json({ message: `Friend request ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get friend requests
router.get("/friend-requests", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "friendRequests.from",
      "name email profileImage"
    );

    const pendingRequests = user.friendRequests.filter(
      (request) => request.status === "pending"
    );

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get friends list
router.get("/friends", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "friends",
      "name email profileImage hobbies city"
    );

    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
