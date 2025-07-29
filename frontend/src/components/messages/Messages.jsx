import { useEffect, useRef } from "react";
import useGetMessageById from "../../hooks/useGetMessagesById.jsx";
import LoadingSkeleton from "../ui/LoadingSkeleton.jsx";
import NewChatModal from "../ui/NewChatModal.jsx";
import ServerError from "../ui/ServerError.jsx";
import Message from "./Message.jsx";
// import useListenMessages from "../../hooks/useListenMessages.jsx";
import useGetGroupMessages from "../../hooks/useGetGroupMessages.jsx";
import useGlobalState from "../../zustand/global.js";

const Messages = () => {
  const { view } = useGlobalState();

  const { loading: loading, messages: messages } = useGetMessageById();
  const { loading: groupLoading, messages: groupMessages } =
    useGetGroupMessages();
  // console.log("groupMessages: ", groupMessages);
  const lastMessageRef = useRef();

  // useListenMessages();

  useEffect(() => {
    const currentMessages = view === "Chats" ? messages : groupMessages;
    if (currentMessages && currentMessages.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, groupMessages, view]);

  const isMessagesArray = Array.isArray(messages);
  const isGroupMessagesArray = Array.isArray(groupMessages);

  return (
    <div className="p-1 min-[480px]:p-2 sm:p-3 md:p-4 lg:p-5 flex-1 overflow-y-auto overflow-x-hidden max-h-full hide-scrollbar">
      {view === "Chats" ? (
        <>
          {!loading && isMessagesArray && messages.length === 0 && (
            <NewChatModal />
          )}
          {!loading &&
            isMessagesArray &&
            messages.length > 0 &&
            messages.map((message, index) => (
              <div
                className=""
                key={message._id}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                <Message message={message} />
              </div>
            ))}
          {!loading && !isMessagesArray && <ServerError />}
          {loading && <LoadingSkeleton />}
        </>
      ) : (
        view === "Groups" && (
          <>
            {!groupLoading &&
              isGroupMessagesArray &&
              groupMessages.length === 0 && <NewChatModal />}
            {!groupLoading &&
              isGroupMessagesArray &&
              groupMessages.length > 0 &&
              groupMessages.map((message2, index) => (
                <div
                  className=""
                  key={message2._id}
                  ref={
                    index === groupMessages.length - 1 ? lastMessageRef : null
                  }
                >
                  <Message message={message2} />
                </div>
              ))}
            {!groupLoading && !isGroupMessagesArray && <ServerError />}
            {groupLoading && <LoadingSkeleton />}
          </>
        )
      )}
    </div>
  );
};
export default Messages;
