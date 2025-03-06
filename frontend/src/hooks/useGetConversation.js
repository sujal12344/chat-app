import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useGlobalState from "../zustand/global";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversation();
  const { view } = useGlobalState();

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await JSON.parse(await res.text());
        if (res.status === 200) {
          const { filteredUser, message } = result;
          toast.success(message);
          setConversations(filteredUser);
          return true;
        } else {
          toast.error(result.message);
          return false;
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { style: { width: "100%" } });
      } finally {
        setLoading(false);
      }
    };
    if (view === "Chats") getConversation();
  }, [view]);
  return { loading, conversations };
};

export default useGetConversation;
