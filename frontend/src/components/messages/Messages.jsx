import { useEffect, useRef } from "react";
import useGetMessageById from "../../hooks/useGetMessagesById.jsx";
import LoadingSkeleton from "../ui/LoadingSkeleton.jsx";
import NewChatModal from "../ui/NewChatModal.jsx";
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

  if (view === "Chats") {
    useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }, [messages]);
  }

  if (view === "Groups") {
    useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }, [groupMessages]);
  }
  const isMessagesArray = Array.isArray(messages);
  const isGroupMessagesArray = Array.isArray(groupMessages);

  return (
    <div className="md:p-4 p-1 flex-1 overflow-auto">
      {view === "Chats" ? (
        <>
          {!loading && isMessagesArray && messages.length === 0 && (
            <NewChatModal />
          )}
          {!loading &&
            isMessagesArray &&
            messages.length > 0 &&
            messages.map((message) => (
              <div className="" key={message._id} ref={lastMessageRef}>
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
              groupMessages.map((message2) => (
                <div className="" key={message2._id} ref={lastMessageRef}>
                  <Message
                    message={message2}
                    key={message2._id + Math.random().length}
                  />
                  {/* {message2} */}
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
