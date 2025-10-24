import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, UserSettings, ReadingProgress, Reciter, Surah } from '../types';

interface AppStore extends AppState {
  // Actions
  setCurrentSurah: (surahId: number) => void;
  setCurrentAyah: (ayahId: number) => void;
  setCurrentWord: (wordId: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  updateProgress: (progress: Partial<ReadingProgress>) => void;
  resetProgress: () => void;
  
  // Data
  surahs: Surah[];
  reciters: Reciter[];
  setSurahs: (surahs: Surah[]) => void;
  setReciters: (reciters: Reciter[]) => void;
}

const defaultSettings: UserSettings = {
  selectedReciter: 'abdul_basit',
  playbackSpeed: 1.0,
  selectedTranslation: 'russian',
  selectedLanguage: 'ru',
  selectedTafsir: 'ibn_kathir',
  scriptVariant: 'uthmani',
  fontSize: 16,
  theme: 'light',
  autoPlay: false,
  showTransliteration: true,
  showTranslation: true,
  showTafsir: false,
};

const defaultProgress: ReadingProgress = {
  surahId: 1,
  ayahId: 1,
  wordId: 1,
  timestamp: Date.now(),
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      currentSurah: 1,
      currentAyah: 1,
      currentWord: 1,
      isPlaying: false,
      isLoading: false,
      error: null,
      settings: defaultSettings,
      progress: defaultProgress,
      surahs: [],
      reciters: [],

      // Actions
      setCurrentSurah: (surahId) => set({ currentSurah: surahId }),
      setCurrentAyah: (ayahId) => set({ currentAyah: ayahId }),
      setCurrentWord: (wordId) => set({ currentWord: wordId }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      updateSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
      updateProgress: (newProgress) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgress }
        })),
      resetProgress: () => set({ progress: defaultProgress }),
      
      // Data setters
      setSurahs: (surahs) => set({ surahs }),
      setReciters: (reciters) => set({ reciters }),
    }),
    {
      name: 'quran-reader-storage',
      partialize: (state) => ({
        settings: state.settings,
        progress: state.progress,
        currentSurah: state.currentSurah,
        currentAyah: state.currentAyah,
      }),
    }
  )
);
