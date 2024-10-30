import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (msg) => {
    io.emit("getMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
