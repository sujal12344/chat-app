import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "_id fullName username profilePic gender"
    );

    res.status(200).json({
      filteredUser,
      loggedInUser: req.user,
      message: "All friends are here",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
