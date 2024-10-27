import { create } from "zustand";

const useMenuStore = create((set) => ({
  isMenu: false,
  setMenu: (newState) => set({ isMenu: newState }),
}));

// Example of a subscription (equivalent to useEffect)
useMenuStore.subscribe((state) => {
  if (state.isMenu) {
    console.log("Menu menu is open");
  } else {
    console.log("Menu menu is closed");
  }
});

export default useMenuStore;
