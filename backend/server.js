import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { socketHandler } from "./routes/socket.js";

const app = express();
const server = http.createServer(app);
dotenv.config();
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL
   },
});

socketHandler(io);

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});


const PORT = process.env.PORT || 5500;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server and Socket.IO running on port ${PORT}`);
});

