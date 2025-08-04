import Message from "../models/Message.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("join_room", (userId) => {
      socket.join(userId);
      console.log(`User ${socket.id} joined room ${userId}`);
    });
    socket.on("send_message", async (data) => {
      const { senderId, receiverId, content, content_type } = data;
      console.log("message data",data)
      try {
        const newMessage  = new Message({
          sender:senderId,
          receiver:receiverId,
          content,
          content_type
        })
        console.log("newMessage",newMessage);
        
        await newMessage.save();
        io.to(receiverId).emit("receive_message", {
          ...data,
          timestamp: new Date().toLocaleString(),
          sender: senderId,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });
};
