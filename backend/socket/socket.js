import express from "express";
// import {createServer} from 'https'

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  // console.log(`user connected with socketId: `, socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    // console.log(`disconnect from here: `, socket.id);
    delete userSocketMap[userId]; // delete operator is used to remove properties from objects
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

});

export { app, io, server };
