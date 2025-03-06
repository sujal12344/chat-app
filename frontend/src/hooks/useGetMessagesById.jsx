import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessageById = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedCon } = useConversation();

  useEffect(() => {
    const getMessagesById = async () => {
      if (!selectedCon._id) {
        toast.error("Please provide a id");
        return false;
      }
      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/messages/${selectedCon._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        let data = await res.json();

        if (res.status === 200) {
          const { messages } = data;
          const transformedMessages = messages.map((messageObject) => {
            switch (messageObject.type) {
              case "img":
                messageObject.message = (
                  <img src={messageObject.message} alt="image" />
                );
                return messageObject;
              case "video":
                messageObject.message = (
                  <video src={messageObject.message} controls />
                );
                return messageObject;
              case "audio":
                messageObject.message = (
                  <audio src={messageObject.message} controls />
                );
                return messageObject;
              case "file":
                messageObject.message = (
                  <a href={messageObject.message} download>
                    Download File
                  </a>
                );
                return messageObject;
              case "text":
                return messageObject;
              default:
                return messageObject;
            }
          });
          setMessages(transformedMessages);
          console.log("messages", messages);
          return true;
        } else {
          setMessages([]);
          return false;
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { style: { width: "100%" } });
        return false;
      } finally {
        setLoading(false);
      }
    };
    if (selectedCon?._id) getMessagesById();
  }, [selectedCon?._id, setMessages]);
  return { loading, messages };
};

export default useGetMessageById;
