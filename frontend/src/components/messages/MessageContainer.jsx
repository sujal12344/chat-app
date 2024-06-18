import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import useConversation from "../../zustand/useConversation.js";
import getMessagesById from "../../hooks/useGetMessagesById.js";
import { useEffect } from "react";
// import useGetMessageById from "../../hooks/useGetMessagesById.js";

const MessageContainer = () => {
  const { selectedCon, setSelectedCon } = useConversation();

  useEffect(() => {
    // cleanup function
    return () => setSelectedCon(null);
  }, [setSelectedCon]) //tab close karane par setselectedcon method unmount hota hai

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedCon ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-cyan-400 px-4 py-2 mb-2">
            <span className="label-text text-black font-normal">To: </span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedCon?.fullName}
            </span>
            {console.log(selectedCon)}
          </div>
          {console.log(getMessagesById(selectedCon?._id))}

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 John auther ❄</p>
        <p>Select a chat to start messaging</p>
        <HiOutlineChatAlt2 className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
