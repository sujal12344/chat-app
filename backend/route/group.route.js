import { Router } from "express";
import protectRoute from "../middleware/protect.middleware.js";
import { createGroup, getGroups } from "../controller/group.controller.js";

const groupRouter = Router();

groupRouter.get("/", protectRoute, getGroups);
groupRouter.post("/create", protectRoute, createGroup);
groupRouter.put("/update/:groupId", protectRoute, createGroup); //ye pura update karata hai, like purana hatake naya banata hai
groupRouter.patch("/updateName/:groupId", protectRoute, createGroup); //ye kuch fields ko update karata hai
groupRouter.delete("/delete/:groupId", protectRoute, createGroup);

export default groupRouter;
