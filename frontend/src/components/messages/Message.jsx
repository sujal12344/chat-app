import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedCon } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedCon?.profilePic;
  const bubbleBgColor = fromMe ? "bg-sky-500" : "bg-sky-950";
  let dateFromDB = message.createdAt;
  let date = new Date(dateFromDB);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
  });

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
              : `chat-bubble text-white ${bubbleBgColor} $/{shakeClass} pb-2`
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
