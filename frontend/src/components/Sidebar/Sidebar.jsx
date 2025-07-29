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

const Sidebar = ({ onChatSelect }) => {
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
    <div className="p-2 min-[480px]:p-3 sm:p-4 md:p-5 flex flex-col w-full h-full bg-opacity-10">
      <div className="flex-shrink-0">
        <form
          className="flex items-center gap-1 min-[480px]:gap-1.5 sm:gap-2"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            placeholder="Search here"
            className="w-full input input-bordered h-7 min-[480px]:h-8 sm:h-9 md:h-10 text-xs min-[480px]:text-sm sm:text-base bg-[#cce1f9] text-violet-950 placeholder:text-gray-700 rounded-3xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-circle btn-xs min-[480px]:btn-sm sm:btn-md bg-sky-600 hover:bg-sky-500 text-white"
          >
            <IoSearchSharp className="h-3 w-3 min-[480px]:h-4 min-[480px]:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ouline-none" />
          </button>
        </form>

        <div className="divider m-0 py-1 min-[480px]:py-2 sm:py-3 md:py-4"></div>
      </div>

      {searchLoading ? (
        <div className="flex justify-center items-center flex-1 text-white">
          <span className="loading loading-spinner loading-sm min-[480px]:loading-md sm:loading-lg"></span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0">
            <div role="tablist" className="tabs tabs-bordered font-bold pb-1">
              <input
                type="radio"
                name="tabs"
                role="tab"
                className="tab text-xs min-[480px]:text-sm sm:text-base md:text-lg"
                aria-label="Chats"
                defaultChecked
                onClick={() => setView("Chats")}
              />

              <input
                type="radio"
                name="tabs"
                role="tab"
                className="tab text-xs min-[480px]:text-sm sm:text-base md:text-lg"
                aria-label="Groups"
                onClick={() => setView("Groups")}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {view === "Chats" ? (
              <Conversations
                conversations={search ? matchConversations : conversations}
                loading={loading}
                onChatSelect={onChatSelect}
              />
            ) : (
              view === "Groups" && (
                <GrpCon
                  conversations={search ? matchConversations : groupsCon}
                  loading={loading}
                  onChatSelect={onChatSelect}
                />
              )
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-auto flex-shrink-0">
        <LogoutButton />
        <RedialMenu />
      </div>
    </div>
  );
};

export default Sidebar;
