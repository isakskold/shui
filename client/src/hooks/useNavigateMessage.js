// State for storing a message when user navigates to a message by clicking on the preview of the message

import { create } from "zustand";

const useNavigateMessageStore = create((set) => ({
  message: {}, // Initial state

  // Function to set the message state
  setMessage: (storedMessage) => {
    set(() => ({
      message: storedMessage,
    }));
  },

  // Function to clear the message state
  clearMessage: () => {
    set(() => ({
      message: {}, // Reset to an empty object
    }));
  },
}));

export default useNavigateMessageStore;
