import { create } from "zustand";
import { getCurrentUser, signOut } from "aws-amplify/auth";

const useAuthStore = create((set) => ({
  user: null, // Initial state
  setUser: (user) => set({ user }), // Function to set user
  clearUser: () => set({ user: null }), // Function to clear user

  // Function to check if the user is authenticated
  checkAuthStatus: async () => {
    try {
      const user = await getCurrentUser(); // Call Amplify's method
      set({ user }); // Update Zustand state
      return user; // Return the user object
    } catch (error) {
      console.log("No user is logged in.");
      set({ user: null }); // Clear state if no user is found
      return null;
    }
  },

  // Function to sign out
  signOutUser: async () => {
    try {
      await signOut(); // Sign out using Amplify
      set({ user: null }); // Clear Zustand state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));

export default useAuthStore;
