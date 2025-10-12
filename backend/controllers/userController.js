import User from "../models/User.js";

// Get users with similar hobbies in the same city
export const getSimilarUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    const users = await User.find({
      city: currentUser.city,
      _id: { $ne: currentUser._id },
    });

    const usersWithMatchingHobbies = users.filter((user) => {
      return user.hobbies.some((hobby) => currentUser.hobbies.includes(hobby));
    });

    res.json(usersWithMatchingHobbies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, city, hobbies } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.city = city || user.city;

    if (hobbies) {
      if (typeof hobbies === 'string') {
        user.hobbies = JSON.parse(hobbies);
      } else {
        user.hobbies = hobbies;
      }
    }

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();

    const userData = user.toObject();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    console.log("error in updating profile", error);
    res.status(500).json({ message: "Something went wrong!", error: error.message, stack: error.stack });
  }
};

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.friends.includes(userId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    const existingRequest = targetUser.friendRequests.find(
      (request) =>
        request.from.toString() === currentUser._id.toString() &&
        request.status === "pending"
    );

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    targetUser.friendRequests.push({
      from: currentUser._id,
      status: "pending",
    });

    await targetUser.save();
    res.json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Respond to friend request
export const respondToFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body;
    const currentUser = await User.findById(req.user.userId);

    const request = currentUser.friendRequests.id(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (action === "accept") {
      currentUser.friends.push(request.from);
      const sender = await User.findById(request.from);
      sender.friends.push(currentUser._id);
      await sender.save();
    }

    request.status = action === "accept" ? "accepted" : "rejected";
    await currentUser.save();

    res.json({ message: `Friend request ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get friend requests
export const getFriendRequests = async (req, res) => {
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
};

// Get friends list
export const getFriendsList = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "friends",
      "name email profileImage hobbies city"
    );

    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
