import { useEffect, useRef } from "react";
import useGetMessageById from "../../hooks/useGetMessagesById.js";
import { getRandomEmoji } from "../../util/emojis.js";
import LoadingSkeleton from "../ui/LoadingSkeleton.jsx";
import NewChatModal from "../ui/NewChatModal.jsx";
import Message from "./Message.jsx";

const Messages = () => {
  const { loading, messages } = useGetMessageById();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    });
  }, [messages]);

  return (
    <div className="md:p-4 p-1 flex-1 overflow-auto">
      {!loading && messages.length === 0 && <NewChatModal />}
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div className="" key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && <LoadingSkeleton />}
    </div>
  );
};
export default Messages;
