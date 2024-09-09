import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profilePic: {
      type: String,
      default: `https://avatar.iran.liara.run/public/boy?username=${Math.ceil(
        Math.random() * 100
      )}`,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      // required: [true, "Group description is required"],
      trim: true,
      index: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;

// Group model --> (_id), name, description, members, (createdAt, updatedAt)
