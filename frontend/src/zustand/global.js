import { create } from "zustand";

const useGlobalState = create((set) => ({
  view: "Chats",
  setView: (value) => {
    if (value === "Chats" || value === "Groups") {
      set({ view: value });
    } else {
      console.error(
        `Invalid value for view: ${value}. It must be either "Chats" or "Groups".`
      );
    }
  },
}));

export default useGlobalState;
