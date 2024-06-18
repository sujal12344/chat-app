import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  let loggedInUser;
  let filteredUser;

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`,
          {
            // Accept: "application/json",
            // getSetCookie: "true",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // credentials: "include",
          },
        );
        const result = await JSON.parse(await res.text());
        if (res.status === 200) {
          toast.success(result.message);
          loggedInUser = result.data.loggedInUser;
          filteredUser = result.data.filteredUser;
          setConversations(filteredUser);
          return true;
        } else if (res.status !== 200) {
          toast.error(result.message);
          return false;
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [filteredUser]);
  return { loading, conversations };
};

export default useGetConversation;
