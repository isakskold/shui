import { create } from "zustand";
// Create the store
const useBurgerStore = create((set) => ({
  isBurger: false,
  setBurger: (isBurger) => set({ isBurger }),
}));

// Example of a subscription (equivalent to useEffect)
useBurgerStore.subscribe((state) => {
  if (state.isBurger) {
    console.log("Burger menu is open");
  } else {
    console.log("Burger menu is closed");
  }
});

export default useBurgerStore;
