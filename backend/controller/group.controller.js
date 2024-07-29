import mongoose from "mongoose";
import Conversation from "../model/conversation.model.js";

const createGroup = async (req, res) => {
  try {
    const participants = req.body.members;

    console.log(`Creating group`, participants);

    const Group = await Conversation.create({ participants });

    if (!Group) {
      return res.status(400).json({ message: "Group creation failed" });
    }

    console.log("Group created successfully");
    console.log(`Grops:`, Group);

    return res.status(201).json({ Group });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in createGroup: ${error.message}` });
  }
};

export { createGroup };
