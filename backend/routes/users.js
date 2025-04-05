const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

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

module.exports = router;
