import React, { useState } from "react";
import SearchInput from "./SearchInput.jsx";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Sidebar = () => {
  const [conversations, setConversations] = useState([])
  const getConversations = (conversations) => setConversations(conversations);

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col min-w-24">
      <SearchInput conversations={conversations} />
      <div className="divider m-0 py-4"></div>
      <Conversations getConversations={getConversations} />  {/*passing a function as prop to child component */}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
