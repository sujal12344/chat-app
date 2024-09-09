import { create } from "zustand";

const useGroupGloablState = create((set) => ({
  selectGroup: false,
  setSelectGroup: (value) => set({ selectGroup: value }),

  groupMembers: [],
  setGroupMembers: (groupMembers) => set({ groupMembers }),

  groupsCon: [],
  setGroupsCon: (groupsCon) => set({ groupsCon }),

  selectedGroupCon: null,
  setSelectedGroupCon: (value) => set({ selectedGroupCon: value }),

  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useGroupGloablState;
