import { create } from "zustand";

interface CreateStoreModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateStoreModalStore = create<CreateStoreModalStore>((set) => ({
  isOpen: true,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useCreateStoreModalStore;
