// import create from "zustand";

// const useStore = create((set) => ({
//   profile: {
//     name: "John Doe",
//     score: 85,
//     rewards: 1200,
//   },
//   feed: [],
//   wishlist: [],
//   balance: 2500,
//   spending: 500,
//   assets: 10000,
//   liabilities: 3000,
//   chartData: { daily: [], weekly: [], yearly: [] },
//   setProfile: (profile) => set({ profile }),
//   setFeed: (feed) => set({ feed }),
//   setChartData: (chartData) => set({ chartData }),
// }));

// store.js
import create from "zustand";
import { dummyData } from "./dummydata";

const useStore = create((set) => ({
  userData: dummyData, // Initially set to dummy data
  setUserData: (data) => set({ userData: data }),
}));

export default useStore;
