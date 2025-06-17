import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    content_type: {
      type: String,
      enum:["message,image"],
      default:"message",
    },
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
export default messageSchema;
