import { create } from "zustand";

const useConversation = create((set) => ({
  selectedCon: null,
  setSelectedCon: (value) => set({ selectedCon: value }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

/*
create(() => {});  direct curly brasces se ye samajhata hai, ki ye object na samajhakar, samajhata hai ki ye function ko define kar raha hai
create(() => ({})); ye samajhata hai ki ye object ko return kar raha hai

const useStore = create((set) => ({
  counter: 0,
  increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
  decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
}));

export default useStore;
*/
