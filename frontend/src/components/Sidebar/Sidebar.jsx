import React, { useState } from "react";
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import useSearch from "../../hooks/useSearch.js";

const Sidebar = () => {
  const { loading, conversations } = useGetConversation();

  const [search, setSearch] = useState("");
  const [matchingConversations, setMatchingConversations] =
    useState(conversations);

  const { loading: searchLoading, searchFunction } = useSearch();

  const takeSearchInfo = async (searchQuery) => {
    const result = await searchFunction(conversations, searchQuery);
    if (result === `No conversation found`)
      setMatchingConversations(conversations);
    else if (result) setMatchingConversations(result);
    setSearch(searchQuery);
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col min-w-24">
      <SearchInput
        conversations={conversations}
        onSubmit={(search) => {
          takeSearchInfo(search);
        }}
      />
      <div className="divider m-0 py-4"></div>
      {searchLoading ? (
        <div className="flex justify-center items-center h-dvh text-white bg-orange-500">
          <span className="loading loading-spinner loading-lg bg-black"></span>
        </div>
      ) : (
        <Conversations
          conversations={search ? matchingConversations : conversations}
          loading={loading}
        />
      )}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
