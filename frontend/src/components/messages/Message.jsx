import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import useGroupGloablState from "../../zustand/useGroupGlobalState";
import useGlobalState from "../../zustand/global";

const Message = ({ message }) => {
  const { view } = useGlobalState();
  const { authUser } = useAuthContext();

  const { selectedCon } = useConversation();
  const { selectedGroupCon } = useGroupGloablState();
  // console.log("message.senderId", message);

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // console.log("fromMe: ", fromMe);

  const profilePic = fromMe
    ? authUser.profilePic
    : view === "Chats"
    ? selectedCon?.profilePic
    : view === "Groups" && selectedGroupCon?.profilePic;

  const bubbleBgColor = fromMe ? "bg-sky-500" : "bg-sky-950";
  let dateFromDB = message.createdAt;
  let date = new Date(dateFromDB);
  const shakeClass = message.shouldShake ? "shake" : "";

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
  });

  // console.log("message", message);
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full text-center">
            <img alt="picture" src={profilePic} />
          </div>
        </div>
        <div
          className={` ${
            message?.type !== "text"
              ? `h-32 w-32`
              : `chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`
          }`}
        >
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </>
  );
};

export default Message;
