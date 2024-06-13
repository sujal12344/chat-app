import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="../../../../public/bg.png" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-bold text-gray-200">Sujal p</p>
            <span className='text-2xl'>🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-0.5"></div>
    </>
  );
};

export default Conversation;
