import { Router } from "express";
import protectRoute from "../middleware/protect.middleware.js";
import { getUsersForSidebar } from "../controller/user.controller.js";

const userRouter = Router({ strict: false });

userRouter.get("/", protectRoute, getUsersForSidebar);

export default userRouter;
