// hooks/useLayoutStore.js
import { create } from "zustand";

const useLayoutStore = create((set) => ({
  isMobile: false,
  setMobile: (isMobile) => set({ isMobile }),
}));

// Example of a subscription (equivalent to useEffect)
useLayoutStore.subscribe((state) => {
  if (state.isLayout) {
    console.log("Layout: Mobile");
  } else {
    console.log("Layout: Desktop");
  }
});

export default useLayoutStore;
