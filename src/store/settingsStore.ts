import type { Settings } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState extends Settings {
  setLanguage: (language: 'en' | 'zh') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAutoPlay: (autoPlay: boolean) => void;
  setShowPinyin: (show: boolean) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      id: 'default',
      language: 'en',
      theme: 'light',
      audioEnabled: true,
      autoPlay: false,
      showPinyin: false,
      fontSize: 'medium',
      
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setAutoPlay: (autoPlay) => set({ autoPlay }),
      setShowPinyin: (showPinyin) => set({ showPinyin }),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
    }),
    {
      name: 'settings-storage',
    }
  )
);

