import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Group from "../model/group.model.js";

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
      console.log("senderId", senderId);
      console.log("arrayOfReceiverIds", arrayOfReceiverIds);
      console.log("conversation from sendGroupMessage", conversation);
      console.log("conversation", conversation);
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

    res
      .status(201)
      .json({ sendUser, receiveUser, message, conversation, newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error from server Side due to: ${error.message}` });
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
    // console.log("arrayOfReceiverIds", arrayOfReceiverIds);
    // console.log("...arrayOfReceiverIds", ...arrayOfReceiverIds);

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

    const receiveUsers = await User.find({
      _id: { $in: arrayOfReceiverIds },
    }).select("-password");

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, ...arrayOfReceiverIds],
      },
    });
    // if (conversation) console.log("conversation found", conversation);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, ...arrayOfReceiverIds], //Its is work in mongoDB? becoz ...arrayOfReceiverIds, is 66d56209ac9a308f14d77c08 66d56238ac9a308f14d77c0e
      });
      // console.log("conversation create");
      // console.log("senderId", senderId);
      // console.log("arrayOfReceiverIds", arrayOfReceiverIds);
      // console.log("conversation from sendGroupMessage", conversation);
      // console.log("conversation", conversation);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId: arrayOfReceiverIds,
      message,
      type,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
      // console.log("con.message", conversation.messages);
      conversation.openMessages.push(
        `${sendUser.username}:  ${message}  :GroupMessage`
      );
      conversation = await conversation.save({ validateBeforeSave: false });
    }
    // console.log("conversation", conversation);

    // const receiverSocketIds = getReceiverSocketIds(...arrayOfReceiverIds);
    // if (receiverSocketId) {
    //   // io.to(<socketId>).emit("eventName", data) used to send specific client
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res
      .status(201)
      .json({ sendUser, receiveUsers, message, conversation, newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error from server Side due to: ${error.message}` });
  }
};

export const getGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);

    const members = group.members;

    if (!members) {
      return res.status(404).json({ message: "Group not found" });
    }

    console.log("groupMembers", members);
    const conversation = await Conversation.findOne({
      participants: { $all: members },
    });

    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" });
    }

    const messages = conversation.messages;

    res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
