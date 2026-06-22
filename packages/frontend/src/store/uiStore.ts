import { create } from 'zustand';

interface UiState {
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAuthModalOpen: false,
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
}));
