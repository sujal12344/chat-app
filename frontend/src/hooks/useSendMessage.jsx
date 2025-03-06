import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedCon } = useConversation();

  const sendMessage = async (message, type = "text") => {
    if (!message) {
      toast.error("Type some message, please");
      return false;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/send/${
          selectedCon._id
        }?type=${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ message }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.status !== 201) {
        toast.error(data.message);
        return false;
      }
      if (res.status === 201) {
        if (data.newMessage.type === "img") {
          data.newMessage.message = (
            <img src={data.newMessage.message} alt="image" />
          );
        }
        setMessages([...messages, data.newMessage]);
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
  return { loading, sendMessage };
};

export default useSendMessage;
