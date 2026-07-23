import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserData {
  [key: string]: any;
}

interface UserStore {
  userData: UserData | null;
  userId: string;
  setUserData: (user: UserData) => void;
  logout: () => void;
  setUserId: (data: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      userId: "user_1003",
      setUserData: (user: UserData) => set({ userData: user }),
      logout: () => set({ userData: null, userId: "" }),
      setUserId: (data: string) => set({ userId: data }),
    }),
    {
      name: "user-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
