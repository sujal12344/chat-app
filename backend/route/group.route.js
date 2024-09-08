import { Router } from "express";
import protectRoute from "../middleware/protect.middleware.js";
import { createGroup } from "../controller/group.controller.js";

const groupRouter = Router();

groupRouter.post("/create", protectRoute, createGroup);

export default groupRouter;
