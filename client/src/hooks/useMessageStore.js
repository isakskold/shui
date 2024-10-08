// src/store/useMessageStore.js
import { create } from "zustand";
import { fetchMessages } from "../api";

const useMessageStore = create((set) => ({
  messages: [],
  loading: false,

  // Action to fetch messages
  fetchMessages: async () => {
    set({ loading: true });
    const response = await fetchMessages();
    set({ messages: response.messages, loading: false });
  },

  // Action to delete a message
  deleteMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }));
  },

  // Action to update a message
  updateMessage: (id, updatedText) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, text: updatedText } : msg
      ),
    }));
  },

  // Action to add a new message
  addMessage: (newMessage) => {
    set((state) => ({
      messages: [newMessage, ...state.messages],
    }));
  },
}));

export default useMessageStore;
