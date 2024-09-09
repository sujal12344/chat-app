import React from "react";
import GrpConversation from "./GrpConversation.jsx";

const GrpCon = ({ conversations, loading }) => {
  return (
    <div className={`py-2 flex flex-col overflow-auto`}>
      {conversations.map((conversation) => (
        <GrpConversation key={conversation._id} conversation={conversation} />
      ))}

      {loading ? (
        <div className="flex justify-center items-center h-dvh text-white">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
    </div>
  );
};

export default GrpCon;
