import { create } from "zustand";

interface CreateStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateStoreModalStore = create<CreateStoreModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => {
      set({ isOpen: true });
    },
    onClose: () => {
      set({ isOpen: false });
    },
  }),
);
