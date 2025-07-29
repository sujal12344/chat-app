import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput";
import { HiOutlineChatAlt2, HiArrowLeft } from "react-icons/hi";
import useConversation from "../../zustand/useConversation.js";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useGlobalState from "../../zustand/global.js";
import useGroupGloablState from "../../zustand/useGroupGlobalState.js";

const MessageContainer = ({ onBackClick }) => {
  const { selectedCon, setSelectedCon } = useConversation();
  const { selectedGroupCon, setSelectedGroupCon } = useGroupGloablState();
  // console.log(`selectedGroupCon`, selectedGroupCon);
  // console.log(`setSelectedGroupCon`, setSelectedGroupCon);
  const { view } = useGlobalState();

  useEffect(() => {
    // cleanup function
    return () => setSelectedCon(null);
  }, [setSelectedCon]); //tab close karane par setselectedcon method unmount hota hai

  // selectedCon && getMessagesById();
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    }
    // Also clear selection on mobile
    setSelectedCon(null);
  };

  return (
    <div className="w-full min-w-[320px] min-[480px]:min-w-[280px] sm:min-w-[380px] md:min-w-[480px] lg:min-w-[560px] flex flex-col h-full">
      {!selectedCon && !selectedGroupCon ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-cyan-400 px-2 min-[400px]:px-3 sm:px-4 md:px-5 py-2 min-[400px]:py-2.5 sm:py-3 mb-0 flex-shrink-0 flex items-center gap-2">
            {/* Back button only for very small screens (< 400px) */}
            <button
              onClick={handleBackClick}
              className="min-[400px]:hidden btn btn-ghost btn-xs p-0.5 text-black hover:bg-cyan-500"
            >
              <HiArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex-1 min-w-0">
              <span className="label-text text-black font-normal text-sm min-[400px]:text-base sm:text-lg">
                {view === "Chats" ? "TO: " : "GROUP: "}
              </span>
              <span className="text-gray-900 font-bold text-sm min-[400px]:text-base sm:text-lg truncate">
                {view === "Chats"
                  ? selectedCon?.fullName
                  : selectedGroupCon?.name +
                    ` (${selectedGroupCon?.members.length})`}
              </span>
            </div>
          </div>

          <Messages />
          <div className="flex-shrink-0">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div className="text-center text-sm sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p className="text-base sm:text-lg md:text-xl">
          Welcome 👋 {authUser.fullName} ❄
        </p>
        <p className="text-sm sm:text-base md:text-lg">
          Select a chat to start messaging
        </p>
        <HiOutlineChatAlt2 className="text-2xl sm:text-3xl md:text-6xl text-center mt-2" />
      </div>
    </div>
  );
};
