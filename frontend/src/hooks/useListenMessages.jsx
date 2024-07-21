import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio("/notification.mp3");
      sound.play();

      // if(newMessage.sender !== socket.id) {
      //   newMessage.isRead = false;
      // }

      // if(newMessage.sender === socket.id) {
      //   newMessage.isRead = true;
      // }

      if (newMessage.type === "img") {
        newMessage.message = <img src={newMessage.message} alt="image" />;
      }
      if (newMessage.type === "video") {
        newMessage.message = <video src={newMessage.message} controls />;
      }
      if (newMessage.type === "audio") {
        newMessage.message = <audio src={newMessage.message} controls />;
      }
      if (newMessage.type === "file") {
        newMessage.message = (
          <a href={newMessage.message} download>
            Download File
          </a>
        );
      }

      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
