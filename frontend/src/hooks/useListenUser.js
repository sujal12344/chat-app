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

    socket?.on("deleteUser", (user) => {
      setConversations(
        conversations.filter((conversation) => conversation._id !== user._id)
      );
      console.log(
        conversations.filter((conversation) => conversation._id !== user._id)
      );
    });

    return () => {
      socket?.off("newUser");
      socket?.off("deleteUser");
    };
  }, [socket, conversations, setConversations]);
};

export default useListenUser;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
