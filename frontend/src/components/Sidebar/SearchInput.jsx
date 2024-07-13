import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const SearchInput = ({ conversations = null, onSubmit }) => {
  const [search, setSearch] = useState("");

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search);
      }}
    >
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
