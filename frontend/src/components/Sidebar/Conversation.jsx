import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { getRandomEmoji } from "../../util/emojis";

const Conversation = ({ conversation, forGroup }) => {
  const { _id, username, profilePic } = conversation;

  const { selectedCon, setSelectedCon } = useConversation();
  const isSelected = selectedCon?._id === _id;

  const { onlineUsers } = useSocketContext();
  const isOnline =
    onlineUsers.includes(conversation._id) || _id === `bot12345678`;

  // const [selectedParticipants, setSelectedParticipants] = useState([]);
  // console.log(`selectedParticipants`, selectedParticipants);

  let list = [];
  console.log(`all`, list);

  const addSelect = (participant) => {
    // if (selectedParticipants.includes(participant)) {
    //   setSelectedParticipants(
    //     selectedParticipants.filter((p) => p !== participant)
    //   );
    // } else {
    //   setSelectedParticipants([...selectedParticipants, participant]);
    // }
    list.push(conversation);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center
          ${isSelected ? `bg-sky-700 hover:bg-sky-600` : `hover:bg-sky-500`}
          rounded p-2 py-1 cursor-pointer`}
        onClick={
          forGroup
            ? () => addSelect(conversation)
            : () => setSelectedCon(conversation)
        }
      >
        <div className={`avatar ${isOnline && `online`}`}>
          <div className="w-12 rounded-full text-center">
            <img src={profilePic} alt={`${username} avatar`} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-bold text-gray-200">{username}</p>
            <span className="text-2xl">{getRandomEmoji()}</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
