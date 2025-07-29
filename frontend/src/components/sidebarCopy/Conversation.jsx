import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { getRandomEmoji } from "../../util/emojis";
import useGroupGloablState from "../../zustand/useGroupGlobalState";

const Conversation = ({ conversation, onChatSelect }) => {
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
          className={`flex flex-row gap-1.5 min-[480px]:gap-2 items-center
          ${isSelected ? `bg-sky-700 hover:bg-sky-600` : `hover:bg-sky-500`}
          rounded p-1.5 min-[480px]:p-2 py-1 cursor-pointer flex-grow justify-self-start`}
          onClick={
            selectGroup
              ? clickedforGrp
                ? () => {
                    removeSelect(conversation), setClickedforGrp(false);
                  }
                : () => {
                    addSelect(conversation), setClickedforGrp(true);
                  }
              : () => {
                  setSelectedCon(conversation);
                  if (onChatSelect) onChatSelect();
                }
          }
        >
          <div className={`avatar ${isOnline && `online`}`}>
            <div className="w-8 min-[480px]:w-10 sm:w-12 rounded-full text-center">
              <img src={profilePic} alt={`${username} avatar`} />
            </div>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-200 text-xs min-[480px]:text-sm sm:text-base truncate pr-1">
                {username}
              </p>
              <span className="text-lg min-[480px]:text-xl sm:text-2xl flex-shrink-0">
                {getRandomEmoji()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-0.5 min-[480px]:h-1"></div>
    </>
  );
};

export default Conversation;
