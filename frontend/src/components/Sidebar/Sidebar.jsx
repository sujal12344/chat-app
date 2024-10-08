import React, { useState } from "react";
import Conversations from "./Conversations.jsx";
import LogoutButton from "./LogoutButton.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useListenUser from "../../hooks/useListenUser.js";
import RedialMenu from "./RedialMenu.jsx";
import GrpCon from "./Groups.jsx";
import useGetGroupsCon from "../../hooks/useGetGroupsCon.js";
import useGlobalState from "../../zustand/global.js";

const Sidebar = () => {
  const { loading: searchLoading, conversations } = useGetConversation();
  const { loading: groupsConLoading, groupsCon } = useGetGroupsCon();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [matchConversations, setMatchConversations] = useState(conversations);
  const { view, setView } = useGlobalState();

  useListenUser();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.error("Please type something to search");
      return false;
    }

    setLoading(true);

    const matchConversations = conversations?.filter(
      (con) =>
        con.username.toLowerCase().includes(search.toLowerCase()) ||
        con.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (matchConversations.length > 0) {
      console.log("matchConversations", matchConversations);
      setMatchConversations(matchConversations);
      setSearch(search);
    } else {
      toast.error("No conversation found");
      setMatchConversations([]);
    }

    setLoading(false);
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col min-w-24">
      <form className="flex items-center gap-2" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search here"
          className="w-full input input-bordered h-10 bg-[#cce1f9] text-violet-950 placeholder:text-gray-700 rounded-3xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle bg-sky-600 hover:bg-sky-500 text-white"
        >
          <IoSearchSharp className="h-6 w-6 ouline-none" />
        </button>
      </form>

      <div className="divider m-0 py-4"></div>
      {searchLoading ? (
        <div className="flex justify-center items-center h-dvh text-white">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="">
          <div role="tablist" className="tabs tabs-bordered font-bold pb-1">
            <input
              type="radio"
              name="tabs"
              role="tab"
              className="tab text-lg"
              aria-label="Chats"
              defaultChecked
              onClick={() => setView("Chats")}
            />

            <input
              type="radio"
              name="tabs"
              role="tab"
              className="tab text-lg"
              aria-label="Groups"
              onClick={() => setView("Groups")}
            />
          </div>
          {view === "Chats" ? (
            <Conversations
              conversations={search ? matchConversations : conversations}
              loading={loading}
            />
          ) : (
            view === "Groups" && (
              <GrpCon
                conversations={search ? matchConversations : groupsCon}
                loading={loading}
              />
            )
          )}
        </div>
      )}
      <div className="flex justify-between items-center mt-auto">
        <LogoutButton />
        <RedialMenu />
      </div>
    </div>
  );
};

export default Sidebar;
