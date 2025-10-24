import { Surah, Word, Reciter } from '../types';

// Utility functions for Quran data processing

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const parseAudioTiming = (timingData: any[]): Word[] => {
  return timingData.map((item, index) => ({
    id: index + 1,
    text: item.text,
    transliteration: item.transliteration,
    translation: item.translation,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
};

export const generateAudioUrl = (
  reciter: Reciter, 
  surahNumber: number, 
  speed: 'slow' | 'normal' | 'fast' = 'normal'
): string => {
  const baseUrl = reciter.audioUrls[speed];
  return baseUrl.replace('{surah}', surahNumber.toString());
};

export const findWordByTime = (words: Word[], currentTime: number): Word | null => {
  return words.find(word => 
    currentTime >= word.startTime && currentTime <= word.endTime
  ) || null;
};

export const getNextAyah = (surahs: Surah[], currentSurah: number, currentAyah: number): { surah: number; ayah: number } | null => {
  const surah = surahs.find(s => s.number === currentSurah);
  if (!surah) return null;

  if (currentAyah < surah.totalAyahs) {
    return { surah: currentSurah, ayah: currentAyah + 1 };
  } else if (currentSurah < 114) {
    const nextSurah = surahs.find(s => s.number === currentSurah + 1);
    if (nextSurah) {
      return { surah: currentSurah + 1, ayah: 1 };
    }
  }
  
  return null;
};

export const getPreviousAyah = (surahs: Surah[], currentSurah: number, currentAyah: number): { surah: number; ayah: number } | null => {
  if (currentAyah > 1) {
    return { surah: currentSurah, ayah: currentAyah - 1 };
  } else if (currentSurah > 1) {
    const prevSurah = surahs.find(s => s.number === currentSurah - 1);
    if (prevSurah) {
      return { surah: currentSurah - 1, ayah: prevSurah.totalAyahs };
    }
  }
  
  return null;
};

export const calculateReadingProgress = (
  surahs: Surah[], 
  currentSurah: number, 
  currentAyah: number, 
  currentWord: number
): number => {
  let totalWords = 0;
  let completedWords = 0;

  for (const surah of surahs) {
    for (const ayah of surah.ayahs) {
      const ayahWords = ayah.words.length;
      totalWords += ayahWords;

      if (surah.number < currentSurah) {
        completedWords += ayahWords;
      } else if (surah.number === currentSurah) {
        if (ayah.number < currentAyah) {
          completedWords += ayahWords;
        } else if (ayah.number === currentAyah) {
          completedWords += currentWord - 1;
        }
      }
    }
  }

  return totalWords > 0 ? (completedWords / totalWords) * 100 : 0;
};

export const getSurahInfo = (surah: Surah) => {
  return {
    name: surah.nameTranslation,
    nameArabic: surah.name,
    totalAyahs: surah.totalAyahs,
    revelationType: surah.revelationType === 'meccan' ? 'Мекканская' : 'Мединская',
    juz: getJuzBySurah(surah.number),
  };
};

export const getJuzBySurah = (surahNumber: number): number => {
  // Simplified Juz calculation - in real app, this should be more precise
  if (surahNumber <= 2) return 1;
  if (surahNumber <= 4) return 2;
  if (surahNumber <= 6) return 3;
  if (surahNumber <= 8) return 4;
  if (surahNumber <= 10) return 5;
  if (surahNumber <= 12) return 6;
  if (surahNumber <= 15) return 7;
  if (surahNumber <= 16) return 8;
  if (surahNumber <= 18) return 9;
  if (surahNumber <= 20) return 10;
  if (surahNumber <= 22) return 11;
  if (surahNumber <= 25) return 12;
  if (surahNumber <= 27) return 13;
  if (surahNumber <= 29) return 14;
  if (surahNumber <= 32) return 15;
  if (surahNumber <= 34) return 16;
  if (surahNumber <= 36) return 17;
  if (surahNumber <= 38) return 18;
  if (surahNumber <= 40) return 19;
  if (surahNumber <= 42) return 20;
  if (surahNumber <= 45) return 21;
  if (surahNumber <= 48) return 22;
  if (surahNumber <= 51) return 23;
  if (surahNumber <= 55) return 24;
  if (surahNumber <= 58) return 25;
  if (surahNumber <= 61) return 26;
  if (surahNumber <= 64) return 27;
  if (surahNumber <= 67) return 28;
  if (surahNumber <= 71) return 29;
  if (surahNumber <= 78) return 30;
  return 30;
};

export const validateAudioTiming = (timing: any): boolean => {
  return (
    timing &&
    typeof timing.startTime === 'number' &&
    typeof timing.endTime === 'number' &&
    timing.startTime >= 0 &&
    timing.endTime > timing.startTime
  );
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};
