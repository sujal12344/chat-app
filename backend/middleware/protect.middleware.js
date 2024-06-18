import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import dotenv, { config } from "dotenv";
config(dotenv);

const protectRoute = async (req, res, next) => {
  try {
    // const token = req.cookies?.jwt || req.headers?.authorization?.split(' ')[1];
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcwM2RmN2RlNzNlZWE3ZjViMWJiM2UiLCJpYXQiOjE3MTg2OTU0MTIsImV4cCI6MTcxOTk5MTQxMn0.cw7bJZweQbnFOp8gqif8KQYVnp_EOEoftzNmDxt23q8"; //raj
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No Token Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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

    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({
      message: `Error while protecting route due to: ${error.message}`,
    });
  }
};

export default protectRoute;
