import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = Message.find({
      $or: { sender: user1, receiver: user2 },
      $or: { sender: user2, receiver: user1 },
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
