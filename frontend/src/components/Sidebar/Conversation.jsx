import React from "react";
import useConversation from "../../zustand/useConversation";
import useGetMessageById from "../../hooks/useGetMessagesById";

const Conversation = ({ conversation, emoji }) => {
  const { _id, username, profilePic } = conversation;
  const { selectedCon, setSelectedCon } = useConversation();

  const isSelected = selectedCon?._id === _id;
  // isSelected ? useGetMessageById(_id) : console.log(`No conversation selected`)

  return (
    <>
      <div
        className={`flex gap-2 items-center
          ${isSelected ? `bg-sky-700 hover:bg-sky-600` : `hover:bg-sky-500`}
          rounded p-2 py-1 cursor-pointer`}
        onClick={() => setSelectedCon(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={profilePic} alt={`${username} avatar`} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-bold text-gray-200">{username}</p>
            <span className="text-2xl">{emoji}</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
