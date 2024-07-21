import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenUser = () => {
  const { socket } = useSocketContext();
  const { conversations, setConversations, setSelectedCon, selectedCon } =
    useConversation();

  useEffect(() => {
    socket?.on("newUser", (user) => {
      setConversations([...conversations, user]);
    });

    socket?.on("deleteUser", (user) => {
      setConversations(
        conversations.filter((conversation) => conversation._id !== user._id)
      );
      setSelectedCon((prev) => {
        if (prev?._id === user._id) {
          return null;
        }
        return prev;
      });
      console.log(`selectedCon`, selectedCon);
    });

    return () => {
      socket?.off("newUser");
      socket?.off("deleteUser");
    };
  }, [socket, conversations, setConversations]);
};

export default useListenUser;
