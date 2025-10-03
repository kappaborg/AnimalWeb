import type { VocabularyItem } from '@/types';
import { create } from 'zustand';

interface VocabularyState {
  vocabulary: VocabularyItem[];
  currentWord: VocabularyItem | null;
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
  isLoading: boolean;
  
  setVocabulary: (vocabulary: VocabularyItem[]) => void;
  setCurrentWord: (word: VocabularyItem | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setIsLoading: (loading: boolean) => void;
  clearFilters: () => void;
}

export const useVocabularyStore = create<VocabularyState>((set) => ({
  vocabulary: [],
  currentWord: null,
  searchQuery: '',
  selectedCategory: '',
  selectedDifficulty: '',
  isLoading: false,
  
  setVocabulary: (vocabulary) => set({ vocabulary }),
  setCurrentWord: (currentWord) => set({ currentWord }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedDifficulty: (selectedDifficulty) => set({ selectedDifficulty }),
  setIsLoading: (isLoading) => set({ isLoading }),
  clearFilters: () => set({
    searchQuery: '',
    selectedCategory: '',
    selectedDifficulty: ''
  }),
}));

