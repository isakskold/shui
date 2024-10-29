// hooks/useLayoutStore.js
import { create } from "zustand";

const useLayoutStore = create((set) => ({
  isMobile: false,
  setMobile: (isMobile) => set({ isMobile }),
}));

export default useLayoutStore;
