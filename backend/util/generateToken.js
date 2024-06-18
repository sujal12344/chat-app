import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
config(dotenv);

const generateToken = async (userId) => {
  userId = userId.toString();
  const token = jwt.sign({_id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
    algorithm: "HS256",
  });
  return token;
};

export default generateToken;
