import type { Statistics, UserProgress } from '@/types';
import { create } from 'zustand';

interface ProgressState {
  progress: Map<string, UserProgress>;
  favorites: Set<string>;
  statistics: Statistics | null;
  
  setProgress: (vocabularyId: string, progress: UserProgress) => void;
  toggleFavorite: (vocabularyId: string) => void;
  setStatistics: (statistics: Statistics) => void;
  updateStats: (updates: Partial<Statistics>) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: new Map(),
  favorites: new Set(),
  statistics: null,
  
  setProgress: (vocabularyId, progress) => set((state) => {
    const newProgress = new Map(state.progress);
    newProgress.set(vocabularyId, progress);
    return { progress: newProgress };
  }),
  
  toggleFavorite: (vocabularyId) => set((state) => {
    const newFavorites = new Set(state.favorites);
    if (newFavorites.has(vocabularyId)) {
      newFavorites.delete(vocabularyId);
    } else {
      newFavorites.add(vocabularyId);
    }
    return { favorites: newFavorites };
  }),
  
  setStatistics: (statistics) => set({ statistics }),
  
  updateStats: (updates) => set((state) => ({
    statistics: state.statistics ? { ...state.statistics, ...updates } : null
  })),
}));

