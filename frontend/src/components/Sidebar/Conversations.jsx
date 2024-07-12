import React from "react";
import Conversation from "./Conversation.jsx";
import { getRandomEmoji } from "../../util/emojis.js";

const Conversations = ({ conversations, loading }) => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}

      {loading ? (
        <div className="flex justify-center items-center h-dvh text-white">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conversations;
