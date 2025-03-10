import Group from "../model/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    members.push({
      _id: req.user._id,
      fullName: req.user.fullName,
      username: req.user.username,
      gender: req.user.gender,
      profilePic: req.user.profilePic,
    });
    const newGroup = new Group({
      name,
      description: description || "",
      members,
      groupAdmin: req.user,
    });
    await newGroup.save();
    res.status(200).json({ message: "Group created successfully", newGroup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getGroupsForSidebar = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id }).select(
      "_id name description members groupAdmin profilePic"
    );
    res.status(200).json({ message: "All Groups are here", groups });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
