import { User } from "../model/user.model.js";
import ApiResponse from "../util/ApiResponse.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "_id username profilePic"
    );

    ApiResponse(res, 200, {filteredUser, loggedInUser: req.user}, "All users except logged in user")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
