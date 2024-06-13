import { Router } from "express";
import { sendMessage, getMessage, aboutMe,} from "../controller/message.controller.js";
import protectRoute from "../middleware/protect.middleware.js";

const messageRouter = Router();

messageRouter.post("/:id", protectRoute, getMessage);
messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.post("/user/aboutMe", protectRoute, aboutMe);

export default messageRouter;
