import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv, { config } from "dotenv";
config(dotenv);

const protectRoute = async (req, res, next) => {
  try {
    console.log("req.cookie: ", req.cookies);
    const token = req.cookies?.jwt;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcwM2U1ZjYwMmQ5MTk4YmNlNTdhY2QiLCJpYXQiOjE3MjA3OTM0NTAsImV4cCI6MTcyMjA4OTQ1MH0.a0OlxJ31aj58MudATQC4KzL7gygOzQq-IF26Woc-6hI";
    // const token = req.cookies?.jwt;
    console.log("token: ", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded: ", decoded);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized, token not valid",
      });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, user not found",
      });
    }

    console.log("user: ", user);
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: `Error while protecting route due to: ${error.message}`,
    });
  }
};

export default protectRoute;
