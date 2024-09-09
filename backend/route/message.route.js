import { Router } from "express";
import {
  sendMessage,
  getMessage,
  aboutMe,
  sendGroupMessage,
} from "../controller/message.controller.js";
import protectRoute from "../middleware/protect.middleware.js";

const messageRouter = Router();

messageRouter.get("/:id", protectRoute, getMessage);

messageRouter.post("/send/:id", protectRoute, sendMessage);

messageRouter.get("/user/aboutMe", protectRoute, aboutMe);

// messageRouter.get("/group/:groupId", protectRoute, getGroupMessage);

messageRouter.post("/group/send/:groupMembers", protectRoute, sendGroupMessage);

// messageRouter.get("/group/aboutGroup", protectRoute, aboutGroup);

export default messageRouter;
