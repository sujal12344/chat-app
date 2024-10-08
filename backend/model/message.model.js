import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: [
      {
        type: String,
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

// Message model --> (_id), senderId, receiverId, message, (createdAt, updatedAt)
