import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { getRandomEmoji } from "../../util/emojis";
import useGroupGloablState from "../../zustand/useGroupGlobalState";

const Conversation = ({ conversation }) => {
  const { _id, username, profilePic } = conversation;

  const { selectedCon, setSelectedCon } = useConversation();
  const isSelected = selectedCon?._id === _id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const { selectGroup } = useGroupGloablState();
  const [clickedforGrp, setClickedforGrp] = useState(false);

  const { groupMembers, setGroupMembers } = useGroupGloablState();

  const addSelect = (newMember) => {
    if (groupMembers.includes(newMember)) return;
    setGroupMembers([...groupMembers, newMember]);
  };

  const removeSelect = (newMember) => {
    if (!groupMembers.includes(newMember)) return;
    setGroupMembers(groupMembers.filter((member) => member !== newMember));
  };

  return (
    <>
      <div className="flex items-center">
        {selectGroup && (
          <div className="mr-2 scale-75">
            <input
              id="groupCheckbox"
              type="checkbox"
              className="checkbox checkbox-primary border-slate-900"
              onChange={() =>
                clickedforGrp
                  ? removeSelect(conversation)
                  : addSelect(conversation)
              }
              checked={groupMembers.includes(conversation) ? true : false}
            />
          </div>
        )}
        <div
          className={`flex flex-row gap-2 items-center
          ${isSelected ? `bg-sky-700 hover:bg-sky-600` : `hover:bg-sky-500`}
          rounded p-2 py-1 cursor-pointer flex-grow justify-self-start`}
          onClick={
            selectGroup
              ? clickedforGrp
                ? () => {
                    removeSelect(conversation), setClickedforGrp(false);
                  }
                : () => {
                    addSelect(conversation), setClickedforGrp(true);
                  }
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
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Conversation;
