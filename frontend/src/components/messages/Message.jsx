import React from "react";

const Message = () => {
  return (
    <>
      <div className={`chat chat-start`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="../../../../bg.png"
            />
          </div>
        </div>
        <div
          className={`chat-bubble text-white $/{bubbleBgColor} $/{shakeClass} pb-2 bg-sky-950`}
        >
          messages
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          time
        </div>
      </div>
      <div className={`chat chat-end`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="../../../../bg.png"
            />
          </div>
        </div>
        <div
          className={`chat-bubble text-white $/{bubbleBgColor} $/{shakeClass} pb-2 bg-sky-500`}
        >
          messages
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          time
        </div>
      </div>
    </>
  );
};

export default Message;
