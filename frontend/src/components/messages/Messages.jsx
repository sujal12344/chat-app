import { useEffect, useRef } from "react";
import useGetMessageById from "../../hooks/useGetMessagesById.js";
import LoadingSkeleton from "../ui/LoadingSkeleton.jsx";
import NewChatModal from "../ui/NewChatModal.jsx";
import Message from "./Message.jsx";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { loading, messages } = useGetMessageById();
  const lastMessageRef = useRef();

  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  const isMessagesArray = Array.isArray(messages);
  return (
    <div className="md:p-4 p-1 flex-1 overflow-auto">
      {!loading && isMessagesArray && messages.length === 0 && <NewChatModal />}
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
    </div>
  );
};
export default Messages;
