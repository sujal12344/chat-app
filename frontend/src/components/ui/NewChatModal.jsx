import React from "react";
import { getRandomEmoji } from "../../util/emojis";
import useSendMessage from "../../hooks/useSendMessage";
import { getRandomGif } from "../../util/gifs";

const NewChatModal = () => {
  const { loading, sendMessage } = useSendMessage();
  const Emoji = getRandomGif();

  return (
    <div className="flex items-center justify-center h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <span className="loading loading-lg"></span>
        </div>
      ) : (
        <div className="h-56 w-44 bg-[#519eb34d] card text-center text-black p-3 gap-y-0.5">
          <div className="font-bold text-[17px]">No messages here</div>
          <div className="text-[14px]">
            Send a message or tap the greeting below.
          </div>
          <div className="flex items-center justify-center h-full w-full -mt-2">
            <div
              className="cursor-alias"
              onClick={() => {
                sendMessage(Emoji);
              }}
            >
              <img src={Emoji} alt="Emoji" className="scale-[0.8]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewChatModal;
