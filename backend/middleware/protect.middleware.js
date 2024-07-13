import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv, { config } from "dotenv";
config(dotenv);

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({
        message: "You don't have token, please login again!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized, your tokrn is invalid",
      });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: `Error while protecting route due to: ${error.message}`,
    });
  }
};

export default protectRoute;
