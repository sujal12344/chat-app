import { create } from "zustand";

const useGroupGloablState = create((set) => ({
  selectGroup: false,
  setSelectGroup: (value) => set({ selectGroup: value }),

  groupMembers: [],
  setGroupMembers: (groupMembers) => set({ groupMembers }),
}));

export default useGroupGloablState;
