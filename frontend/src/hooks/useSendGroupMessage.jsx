import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import useGroupGloablState from "../zustand/useGroupGlobalState";

const useSendGroupMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedGroupCon, setSelectedGroupCon, messages, setMessages } =
    useGroupGloablState();

  const sendGroupMessage = async (message, type = "text") => {
    if (!message) {
      toast.error("Type some message, please");
      return false;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/group/send/${
          selectedGroupCon.members
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
      console.log("from the backend data: ", data);
      // if (res.status === 201) {
      //   if (data.data.newMessage.type === "img") {
      //     data.data.newMessage.message = (
      //       <img src={data.data.newMessage.message} alt="image" />
      //     );
      //   }
      //   setMessages([...messages, data.data.newMessage]);
      //   return true;
      // }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { style: { width: "100%" } });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendGroupMessage };
};

export default useSendGroupMessage;
