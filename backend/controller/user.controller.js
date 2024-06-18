import User from "../model/user.model.js";
import ApiResponse from "../util/ApiResponse.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // const token = req.cookies?.jwt || req.jwt
    // console.log(req.cookies, req.cookie, res.cookie, res.cookies, req.jwt, res.jwt, token);
    const loggedInUser = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "_id fullName username profilePic gender"
    );

    ApiResponse(res, 200, {filteredUser, loggedInUser: req.user}, "All friends are here")
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
