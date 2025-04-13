const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "findhobby/profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

// Get users with similar hobbies in the same city
router.get("/similar", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    // Find users in the same city
    const users = await User.find({
      city: currentUser.city,
      _id: { $ne: currentUser._id }, // Exclude current user
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
      if (hobbies) {
        user.hobbies = hobbies.split(",").map((hobby) => hobby.trim());
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
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
