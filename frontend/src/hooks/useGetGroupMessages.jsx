import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGroupGloablState from "../zustand/useGroupGlobalState";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedGroupCon, messages, setMessages } = useGroupGloablState();

  useEffect(() => {
    const getGroupMessages = async () => {
      if (!selectedGroupCon._id) {
        toast.error("Please provide a id");
        return false;
      }
      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/messages/group/${
            selectedGroupCon._id
          }`,
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
          console.log("from the backend data: ", data);
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
          console.log("messages: ", messages);
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
    if (selectedGroupCon?._id) getGroupMessages();
  }, [selectedGroupCon?._id, setMessages]);
  return { loading, messages };
};

export default useGetGroupMessages;
