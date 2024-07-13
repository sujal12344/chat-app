import React, { useState } from "react";
import toast from "react-hot-toast";

const useSearch = () => {
  const [loading, setLoading] = useState(false);

  const searchFunction = async (conversations = null, searchQuery) => {
    if (!searchQuery) {
      toast.error("Please type something to search");
      return false;
    }

    if (searchQuery.length < 2) {
      toast.error("Please type atleast 2 characters to search");
      return false;
    }

    setLoading(true);

    const matchingConversations = conversations?.filter(
      (con) =>
        con.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        con.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setLoading(false);

    if (!(matchingConversations.length > 0)) {
      toast.error("No conversation found");
      return `No conversation found`;
    }

    return matchingConversations;
  };

  return { loading, searchFunction };
};

export default useSearch;
