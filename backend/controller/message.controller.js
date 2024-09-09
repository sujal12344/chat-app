import ApiResponse from "../util/ApiResponse.js";
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const { id: receiverId } = req.params;
    const { type } = req.query;
    const { message } = req.body;

    const sendUser = await User.findById(senderId).select("-password");
    const receiveUser = await User.findById(receiverId).select("-password");

    if (!senderId) {
      return res.status(400).json({ message: "Sender not found" });
    }

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver not found" });
    }

    if (senderId == receiverId) {
      return res
        .status(400)
        .json({ message: "You can't send message to yourself" });
    }

    if (!message.trim()) {
      return res.status(400).json({ message: "Please type some message" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      type,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.openMessages.push(
        `${sendUser.username}:  ${message}  :${receiveUser.username}`
      );
      conversation = await conversation.save({ validateBeforeSave: false });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socketId>).emit("eventName", data) used to send specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    ApiResponse(
      res,
      201,
      { sendUser, receiveUser, message, conversation, newMessage },
      "Message sent"
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error from server Side due to: ${error.message}` });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatIdWithOthers } = req.params;
    const senderId = req.user?._id;
    const userToChatIdWithOthersUser = await User.findById(
      userToChatIdWithOthers
    ).select("-password");

    // const conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, userToChatIdWithOthers] },
    // })
    // const message = await Message.find({ _id: { $in: conversation.messages } })

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatIdWithOthers] },
    }).populate("messages");

    if (!conversation) {
      return res.status(201).json({
        message: `${req.user.username}, No conversation found from you to ${userToChatIdWithOthersUser.username}`,
      });
    }

    const messages = conversation.messages;

    if (!messages) {
      return res.status(404).json({ message: "No message found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const aboutMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    ApiResponse(res, 200, user, "User found");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const { type } = req.query;
    const { message } = req.body;
    const { groupMembers: receiverIds } = req.params;
    //receiverIds:  66d56238ac9a308f14d77c0e,66d56209ac9a308f14d77c08,66d441c1b44dcf0a01c99529
    const arrayOfReceiverIdsWithSender = receiverIds.split(",");
    //gives an array of receiverIds
    const arrayOfReceiverIds = arrayOfReceiverIdsWithSender.filter(
      (id) => id != senderId
    );
    //give array of all userIds exept senderId, like [66d56209ac9a308f14d77c08,66d441c1b44dcf0a01c99529]
    //when we ...arrayOfReceiverIds, it will be like 66d56209ac9a308f14d77c08,66d441c1b44dcf0a01c99529

    if (!senderId) {
      return res.status(400).json({ message: "Sender not found" });
    }

    if (!receiverIds) {
      return res.status(400).json({ message: "Receivers are not found" });
    }

    if (!message.trim()) {
      return res.status(400).json({ message: "Please type some message" });
    }

    const sendUser = await User.findById(senderId).select("-password");
    console.log(`sendUser`, sendUser);

    const receiveUsers = await User.find({
      _id: { $in: arrayOfReceiverIds },
    }).select("-password");
    console.log(`receiveUsers`, receiveUsers);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, ...arrayOfReceiverIds] },
    });
    console.log(`conversation`, conversation);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, ...arrayOfReceiverIds],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId: arrayOfReceiverIds,
      message,
      type,
    });
    console.log(`newMessage`, newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.openMessages.push(
        `${sendUser.username}:  ${message}  :GroupMessage`
      );
      conversation = await conversation.save({ validateBeforeSave: false });
    }
    console.log(`conversation`, conversation);

    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   // io.to(<socketId>).emit("eventName", data) used to send specific client
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    ApiResponse(
      res,
      201,
      { sendUser, receiveUsers, message, conversation, newMessage },
      "Message sent"
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error from server Side due to: ${error.message}` });
  }
};
