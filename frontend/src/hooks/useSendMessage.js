import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedCon } = useConversation();

  const sendMessage = async (message) => {
    if (!message) {
      toast.error("Type some message, please");
      return false;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/messages/send/${selectedCon._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      console.log(`data`, data);
      if (res.status !== 201) {
        toast.error(data.message);
        return false;
      }
      if (res.status === 201) {
        setMessages([...messages, data.data.newMessage]);
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
