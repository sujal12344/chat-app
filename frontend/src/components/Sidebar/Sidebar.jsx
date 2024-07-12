import React, { useState } from "react";
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";

const Sidebar = () => {
  const { loading, conversations } = useGetConversation();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col min-w-24">
      <SearchInput conversations={conversations} />
      <div className="divider m-0 py-4"></div>
      <Conversations conversations={conversations} loading={loading} />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
