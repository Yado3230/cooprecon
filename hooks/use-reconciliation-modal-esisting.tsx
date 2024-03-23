import { create } from "zustand";

interface useReconciliationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useReconciliationModalExisting =
  create<useReconciliationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
