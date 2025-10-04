import User from "../models/User";

export const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!user.lastActionDate) {
      user.lastActionDate = today;
      user.streakCount = 1;
      user.maxStreak = 1;
    } else {
      const lastDate = new Date(user.lastActionDate);
      lastDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        return res.json({
          streakCount: user.streakCount,
          maxStreak: user.maxStreak,
        });
      }
      if (diffDays === 1) {
        user.streakCount++;
        user.maxStreak = Math.max(user.streakCount, user.maxStreak);
      } else {
        user.streakCount = 1;
        user.maxStreak = Math.max(user.streakCount , user.maxStreak || 0 )
        user.lastActionDate = today;
      }
    }
    await user.save();
    res.json({ streakCount: user.streakCount, maxStreak: user.maxStreak });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "streakCount maxStreak lastActionDate"
    );
    res.json({
      streakCount: user.streakCount || 0,
      maxStreak: user.maxStreak || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
