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
        const res = await fetch(`http://localhost:8000/api/users`, {
          // Accept: "application/json",
          // getSetCookie: "true",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: true,
        });
        const result = await JSON.parse(await res.text());
        console.log(result);
        if (res.status === 200) {
          toast.success(result.message);
          loggedInUser = result.data.loggedInUser;
          filteredUser = result.data.filteredUser;
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
    getConversation();
  }, [filteredUser]);
  return { loading, conversations };
};

export default useGetConversation;
