import Group from "../model/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    console.log("name", name);
    console.log("description", description);
    console.log("members", members);
    members.push(req.user);
    console.log("members", members);
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
//function for get group
export const getGroup = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
