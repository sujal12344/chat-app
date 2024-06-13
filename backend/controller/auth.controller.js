import { requiredFieldFunnction } from "../util/requiredFieldFunction.js";
import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../util/generateToken&SetCookies.js";
import ApiResponse from "../util/ApiResponse.js";
import isStrongPassword from "../util/isStrongPassword.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, DOB } =
      req.body;

    requiredFieldFunnction(
      [
        { name: "fullName", value: fullName },
        { name: "username", value: username },
        { name: "password", value: password },
        { name: "confirmPassword", value: confirmPassword },
        { name: "gender", value: gender },
        { name: "DOB", value: DOB },
      ],
      res
    );

    const passwordIsStrong = isStrongPassword(password);
    if (passwordIsStrong !== true) {
      return res.status(400).json({ message: passwordIsStrong });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password should be same" });
    }

    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: `User already exists with username: ${username}` });
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // password encription
    const salt = await bcryptjs.genSalt(10);
    const encriptedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      fullName,
      username,
      password: encriptedPassword,
      gender,
      DOB,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      // token: "",
    });

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    //set cookie
    await generateTokenAndSetCookie(user._id, res);

    const createdUser = await User.findById(user._id).select("-password");

    ApiResponse(res, 201, createdUser, "User created successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while signup due to: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    requiredFieldFunnction(
      [
        { name: "username", value: username },
        { name: "password", value: password },
      ],
      res
    );

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found with username: ${username}` });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: `Invalid password` });
    }

    const loggedInUser = await User.findById(user._id).select("-password");
    // loggedInUser.token = await generateTokenAndSetCookie(user._id, res);
    await generateTokenAndSetCookie(user._id, res);
    await loggedInUser.save({ validateBeforeSave: false });
    // req.user = loggedInUser;
    // req.user.token = loggedInUser.token;

    ApiResponse(res, 200, loggedInUser, "User logged in successfully");
  } catch (error) {
    return res.status(500).json({ message: `Error while login due to: ${error.message}` });
  }
};

const logout = async (req, res) => {
  try {
    const { username, password } = req.body;

    requiredFieldFunnction(
      [
        { name: "username", value: username },
        { name: "password", value: password },
      ],
      res
    );

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found with username: ${username}` });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: `Invalid password` });
    }

    res.clearCookie("jwt", options);

    ApiResponse(res, 200, null, "User logged out successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while logout due to: ${error.message}` });
  }
};

export { signup, login, logout };
