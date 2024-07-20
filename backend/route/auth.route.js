import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  signup,
} from "../controller/auth.controller.js";
import protectRoute from "../middleware/protect.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.delete("/delete/account/:userId", protectRoute, deleteAccount);

export default authRouter;
