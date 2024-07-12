import React, { useEffect } from "react";
import Conversation from "./Conversation.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import { getRandomEmoji } from "../../util/emojis.js";

const Conversations = ({ getConversations = null }) => {
  const { loading, conversations } = useGetConversation();

  if (getConversations) getConversations(conversations); //pass to its parent component

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
