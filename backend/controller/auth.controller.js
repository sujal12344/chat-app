import requiredFieldFunnction from "../util/requiredFieldFunction.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../util/generateToken.js";
import ApiResponse from "../util/ApiResponse.js";
import isStrongPassword from "../util/isStrongPassword.js";

const options = {
  httpOnly: true,
  secure: false,
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "strict",
};

const signup = async (req, res) => {
  try {
    // await User.deleteMany();
    const { fullName, username, password, confirmPassword, gender } = req.body;

    let { DOB } = req.body;
    let profilePic;
    const primaryAvatarURL = `https://avatar.iran.liara.run/public/${
      gender === "male" ? "boy" : "girl"
    }?username=${username}`;
    const secondaryAvatarURL = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;
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
    DOB = new Date(DOB);
    const DOY = new Date(DOB).getFullYear();

    if (DOY > new Date().getFullYear() - 18) {
      return res
        .status(400)
        .json({ message: "You must be 18 years old to register" });
    }

    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res
        .status(400)
        .json({ message: `User already exists with username: '${username}'` });
    }

    const primaryAvatarURLRes = await fetch(primaryAvatarURL);
    if (primaryAvatarURLRes.status === 200) profilePic = primaryAvatarURL;
    else profilePic = secondaryAvatarURL;

    const salt = await bcryptjs.genSalt(10);
    const encriptedPassword = await bcryptjs.hash(password, salt);

    const user = await User.create({
      fullName,
      username,
      password: encriptedPassword,
      gender,
      DOB,
      profilePic,
    });

    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }

    const token = await generateToken(user._id);

    const createdUser = await User.findById(user._id).select("-password");

    req.user = createdUser;
    // ApiResponse(res, 201, createdUser, "User created successfully");
    res
      .cookie("jwt", token, options)
      .status(201)
      .json({ message: "User created successfully", createdUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in signup: ${error.message}` });
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
        .status(404)
        .json({ message: `User not found with username: ${username}` });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: `Invalid password` });
    }

    const loggedInUser = await User.findById(user._id).select("-password");
    const token = await generateToken(user._id);
    await loggedInUser.save({ validateBeforeSave: false });

    req.user = loggedInUser;
    res
      .cookie("jwt", token, options)
      .status(200)
      .json({
        message: `'${username}' logged in successfully`,
        loggedInUser,
      });
    // ApiResponse(res, 200, loggedInUser, "User logged in successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in login: ${error.message}` });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", options);

    ApiResponse(res, 200, null, "You logged out.");
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error while logout due to: ${error.message}` });
  }
};

export { signup, login, logout };
