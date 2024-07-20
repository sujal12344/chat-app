import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenUser = () => {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    socket?.on("newUser", (user) => {
      setConversations([...conversations, user]);
    });

    return () => socket?.off("newUser");
  }, [socket, conversations, setConversations]);
};

export default useListenUser;
