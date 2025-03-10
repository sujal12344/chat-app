import Messages from "./Messages.jsx";
import MessageInput from "./MessageInput";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import useConversation from "../../zustand/useConversation.js";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useGlobalState from "../../zustand/global.js";
import useGroupGloablState from "../../zustand/useGroupGlobalState.js";

const MessageContainer = () => {
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
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedCon ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-cyan-400 px-4 py-2 mb-2">
            <span className="label-text text-black font-normal">
              {view === "Chats" ? "TO: " : "GROUP: "}
            </span>
            <span className="text-gray-900 font-bold">
              {view === "Chats"
                ? selectedCon?.fullName
                : selectedGroupCon?.name +
                  ` (${selectedGroupCon?.members.length})`}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <HiOutlineChatAlt2 className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
