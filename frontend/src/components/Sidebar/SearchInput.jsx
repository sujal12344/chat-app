import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation.js";
import useGetConversation from "../../hooks/useGetConversation.js";
import toast from "react-hot-toast";

const SearchInput = ({conversations = null}) => {
  const { setSelectedCon } = useConversation();
  // const { conversations } = useGetConversation();

  const [search, setSearch] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!search) {
      toast.error("Please type something to search");
      return false;
    }

    const matchingConversations = conversations?.filter((con) =>
      con.username.toLowerCase().includes(search.toLowerCase()) ||
      con.fullName.toLowerCase().includes(search.toLowerCase())
    );
    console.log(matchingConversations);

    if (matchingConversations.length > 0) {
      // according to search result, set the first conversation as selected, chats according to search
      setSelectedCon(matchingConversations[0]);
      setSearch("");
    } else toast.error("No conversation found");
  };

  return (
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
  );
};

export default SearchInput;
