import React from "react";
import { getRandomEmoji } from "../../util/emojis";

const NewChatModal = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="h-56 w-44 bg-[#519eb34d] card text-center text-black p-3 gap-y-0.5">
        <div className="font-bold text-[17px]">No messages here</div>
        <div className="text-[14px]">
          Send a message or tap the greeting below.
        </div>
        <div className="flex items-center justify-center h-full w-full">
          <div className="scale-[6]">{getRandomEmoji()}</div>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
