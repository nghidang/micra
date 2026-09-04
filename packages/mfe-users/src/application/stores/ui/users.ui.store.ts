import { create } from 'zustand';

import type { ErrorCode } from '../../../domain/errors/app.error';

interface UsersUiState {
  filterOpen: boolean;
  toggleFilter: () => void;
  notification: { code: ErrorCode } | null;
  notify: (code: ErrorCode) => void;
  clearNotification: () => void;
}

export const useUsersUiStore = create<UsersUiState>((set) => ({
  filterOpen: false,
  toggleFilter: () => set((s) => ({ filterOpen: !s.filterOpen })),
  notification: null,
  notify: (code) => set({ notification: { code } }),
  clearNotification: () => set({ notification: null }),
}));
