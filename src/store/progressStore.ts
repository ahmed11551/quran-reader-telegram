import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ReadingProgress {
  surahId: number;
  ayahId: number;
  completedAyahs: number[];
  totalAyahs: number;
  lastReadTime: number;
  readingTime: number; // в секундах
  streak: number; // дни подряд
}

export interface FavoriteAyah {
  surahId: number;
  ayahId: number;
  addedTime: number;
  note?: string;
}

export interface ReadingStats {
  totalAyahsRead: number;
  totalSurahsRead: number;
  totalReadingTime: number;
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string;
  favoriteSurahs: number[];
  completedJuz: number[];
}

interface ProgressStore {
  // Progress data
  readingProgress: ReadingProgress[];
  favorites: FavoriteAyah[];
  stats: ReadingStats;
  
  // Actions
  markAyahAsRead: (surahId: number, ayahId: number) => void;
  markSurahAsComplete: (surahId: number) => void;
  addToFavorites: (surahId: number, ayahId: number, note?: string) => void;
  removeFromFavorites: (surahId: number, ayahId: number) => void;
  updateReadingTime: (seconds: number) => void;
  getRandomAyah: () => { surahId: number; ayahId: number } | null;
  getProgressForSurah: (surahId: number) => ReadingProgress | null;
  getOverallProgress: () => {
    totalAyahsRead: number;
    totalSurahsRead: number;
    completionPercentage: number;
    currentStreak: number;
  };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      readingProgress: [],
      favorites: [],
      stats: {
        totalAyahsRead: 0,
        totalSurahsRead: 0,
        totalReadingTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastReadDate: '',
        favoriteSurahs: [],
        completedJuz: []
      },

      markAyahAsRead: (surahId: number, ayahId: number) => {
        set((state) => {
          const existingProgress = state.readingProgress.find(p => p.surahId === surahId);
          const now = Date.now();
          
          if (existingProgress) {
            if (!existingProgress.completedAyahs.includes(ayahId)) {
              existingProgress.completedAyahs.push(ayahId);
              existingProgress.lastReadTime = now;
            }
          } else {
            state.readingProgress.push({
              surahId,
              ayahId,
              completedAyahs: [ayahId],
              totalAyahs: 0, // Will be updated when we have surah data
              lastReadTime: now,
              readingTime: 0,
              streak: 1
            });
          }

          // Update stats
          const totalAyahsRead = state.readingProgress.reduce(
            (total, progress) => total + progress.completedAyahs.length, 0
          );
          
          const totalSurahsRead = state.readingProgress.filter(
            progress => progress.completedAyahs.length > 0
          ).length;

          return {
            ...state,
            stats: {
              ...state.stats,
              totalAyahsRead,
              totalSurahsRead,
              lastReadDate: new Date().toISOString().split('T')[0]
            }
          };
        });
      },

      markSurahAsComplete: (surahId: number) => {
        set((state) => {
          const progress = state.readingProgress.find(p => p.surahId === surahId);
          if (progress) {
            // Mark all ayahs as completed (this would need surah data to know total ayahs)
            progress.lastReadTime = Date.now();
          }
          return state;
        });
      },

      addToFavorites: (surahId: number, ayahId: number, note?: string) => {
        set((state) => {
          const exists = state.favorites.some(
            fav => fav.surahId === surahId && fav.ayahId === ayahId
          );
          
          if (!exists) {
            state.favorites.push({
              surahId,
              ayahId,
              addedTime: Date.now(),
              note
            });
          }
          
          return state;
        });
      },

      removeFromFavorites: (surahId: number, ayahId: number) => {
        set((state) => ({
          ...state,
          favorites: state.favorites.filter(
            fav => !(fav.surahId === surahId && fav.ayahId === ayahId)
          )
        }));
      },

      updateReadingTime: (seconds: number) => {
        set((state) => ({
          ...state,
          stats: {
            ...state.stats,
            totalReadingTime: state.stats.totalReadingTime + seconds
          }
        }));
      },

      getRandomAyah: () => {
        const state = get();
        if (state.readingProgress.length === 0) {
          // Return first ayah of first surah if no progress
          return { surahId: 1, ayahId: 1 };
        }
        
        // Get random surah and ayah from progress
        const randomProgress = state.readingProgress[
          Math.floor(Math.random() * state.readingProgress.length)
        ];
        
        if (randomProgress.completedAyahs.length > 0) {
          const randomAyah = randomProgress.completedAyahs[
            Math.floor(Math.random() * randomProgress.completedAyahs.length)
          ];
          return { surahId: randomProgress.surahId, ayahId: randomAyah };
        }
        
        return { surahId: 1, ayahId: 1 };
      },

      getProgressForSurah: (surahId: number) => {
        const state = get();
        return state.readingProgress.find(p => p.surahId === surahId) || null;
      },

      getOverallProgress: () => {
        const state = get();
        const totalAyahsRead = state.readingProgress.reduce(
          (total, progress) => total + progress.completedAyahs.length, 0
        );
        
        const totalSurahsRead = state.readingProgress.filter(
          progress => progress.completedAyahs.length > 0
        ).length;

        // Assuming total of 6236 ayahs in Quran
        const completionPercentage = Math.round((totalAyahsRead / 6236) * 100);

        return {
          totalAyahsRead,
          totalSurahsRead,
          completionPercentage,
          currentStreak: state.stats.currentStreak
        };
      }
    }),
    {
      name: 'quran-progress-storage',
      version: 1
    }
  )
);
