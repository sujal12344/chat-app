import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";
import { connectDB } from "./db/connectDB.js";
import messageRouter from "./route/message.route.js";
import authRouter from "./route/auth.route.js";
import userRouter from "./route/user.route.js";
import { app, server } from "./socket/socket.js";
import groupRouter from "./route/group.route.js";

// import { fileURLToPath } from "url";
// const __dirname = fileURLToPath(new URL  (".", import.meta.url));
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/group", groupRouter);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, async () => {
  console.log(`Server is runs on http://localhost:${PORT}`);
  await connectDB();
});
