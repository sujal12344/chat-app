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
          `https://chat-app-fyek.onrender.com/api/messages/${selectedCon._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        let data = await res.json();

        if (res.status !== 200) {
          setMessages([]);
          return false;
        }
        if (res.status === 200) {
          const transformedMessages = data.messages.map((message) => {
            switch (message.type) {
              case "img":
                message.message = <img src={message.message} alt="image" />;
                return message;
              case "video":
                message.message = <video src={message.message} controls />;
                return message;
              case "audio":
                message.message = <audio src={message.message} controls />;
                return message;
              case "file":
                message.message = (
                  <a href={message.message} download>
                    Download File
                  </a>
                );
                return message;
              default:
                return message;
            }
          });
          setMessages(transformedMessages);
          return true;
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
