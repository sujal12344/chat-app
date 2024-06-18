import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import messageRouter from "./route/message.route.js";
import authRouter from "./route/auth.route.js";
import userRouter from "./route/user.route.js";

config(dotenv);
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.listen(PORT, async () => {
  console.log(`Server is runs on http://localhost:${PORT}`);
  await connectDB();
});
