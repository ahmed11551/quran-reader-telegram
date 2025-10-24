import { Reciter } from '../types';

// Интерфейс для таймкодов с учетом таджвида
export interface TajweedTiming {
  wordId: number;
  startTime: number;
  endTime: number;
  tajweedRule?: string; // Правило таджвида (идгам, икхфа и т.д.)
  pronunciation?: string; // Особенности произношения
}

// Интерфейс для чтеца с детальными таймкодами
export interface DetailedReciter extends Reciter {
  timings: {
    [surahId: number]: {
      [ayahId: number]: TajweedTiming[];
    };
  };
  tajweedStyle: 'murattal' | 'muallim' | 'mujawwad';
  averageSpeed: number; // слов в минуту
}

// API для получения таймкодов
export class QuranTimingAPI {
  private baseUrl = 'https://api.alquran.cloud/v1';
  
  // Получение таймкодов для конкретной суры и чтеца
  async getSurahTimings(surahId: number, reciterId: string): Promise<TajweedTiming[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/surah/${surahId}/editions/quran-wordbyword,ar.${reciterId}`
      );
      const data = await response.json();
      
      return this.parseTimings(data.data);
    } catch (error) {
      console.error('Error fetching timings:', error);
      return this.getFallbackTimings(surahId);
    }
  }
  
  // Парсинг таймкодов из API
  private parseTimings(data: any): TajweedTiming[] {
    const timings: TajweedTiming[] = [];
    
    data.forEach((ayah: any) => {
      ayah.words.forEach((word: any, wordIndex: number) => {
        timings.push({
          wordId: wordIndex + 1,
          startTime: word.startTime || 0,
          endTime: word.endTime || 0,
          tajweedRule: word.tajweedRule,
          pronunciation: word.pronunciation
        });
      });
    });
    
    return timings;
  }
  
  // Резервные таймкоды если API недоступен
  private getFallbackTimings(_surahId: number): TajweedTiming[] {
    // Простые таймкоды для демонстрации
    const wordsPerSecond = 2; // Средняя скорость чтения
    const timings: TajweedTiming[] = [];
    
    for (let i = 0; i < 50; i++) { // Примерно 50 слов
      timings.push({
        wordId: i + 1,
        startTime: i * (1 / wordsPerSecond),
        endTime: (i + 1) * (1 / wordsPerSecond),
        tajweedRule: 'normal',
        pronunciation: 'standard'
      });
    }
    
    return timings;
  }
}

// Сервис для управления таймкодами
export class TimingService {
  private api = new QuranTimingAPI();
  private cache = new Map<string, TajweedTiming[]>();
  
  // Получение таймкодов с кэшированием
  async getTimings(surahId: number, reciterId: string, speed: number = 1.0): Promise<TajweedTiming[]> {
    const cacheKey = `${surahId}-${reciterId}-${speed}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const timings = await this.api.getSurahTimings(surahId, reciterId);
    const adjustedTimings = this.adjustForSpeed(timings, speed);
    
    this.cache.set(cacheKey, adjustedTimings);
    return adjustedTimings;
  }
  
  // Корректировка таймкодов под скорость воспроизведения
  private adjustForSpeed(timings: TajweedTiming[], speed: number): TajweedTiming[] {
    return timings.map(timing => ({
      ...timing,
      startTime: timing.startTime / speed,
      endTime: timing.endTime / speed
    }));
  }
  
  // Получение текущего слова по времени
  getCurrentWord(timings: TajweedTiming[], currentTime: number): number {
    const word = timings.find(t => 
      currentTime >= t.startTime && currentTime <= t.endTime
    );
    return word ? word.wordId : 1;
  }
}

// Детальные чтецы с таймкодами
export const detailedReciters: DetailedReciter[] = [
  {
    id: "abdul_basit",
    name: "Абдул-Басит Абдус-Самад",
    nameArabic: "عبد الباسط عبد الصمد",
    country: "Египет",
    style: "Мураталь",
    audioUrls: {
      slow: "https://server8.mp3quran.net/abd_basit/",
      normal: "https://server8.mp3quran.net/abd_basit/",
      fast: "https://server8.mp3quran.net/abd_basit/"
    },
    timings: {},
    tajweedStyle: 'murattal',
    averageSpeed: 120 // слов в минуту
  },
  {
    id: "mishary_rashid",
    name: "Мишари Рашид",
    nameArabic: "مشاري راشد",
    country: "Кувейт",
    style: "Мураталь",
    audioUrls: {
      slow: "https://server8.mp3quran.net/mishary_rashid/",
      normal: "https://server8.mp3quran.net/mishary_rashid/",
      fast: "https://server8.mp3quran.net/mishary_rashid/"
    },
    timings: {},
    tajweedStyle: 'murattal',
    averageSpeed: 110
  },
  {
    id: "saad_al_ghamdi",
    name: "Саад аль-Гамиди",
    nameArabic: "سعد الغامدي",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://server8.mp3quran.net/saad_ghamdi/",
      normal: "https://server8.mp3quran.net/saad_ghamdi/",
      fast: "https://server8.mp3quran.net/saad_ghamdi/"
    },
    timings: {},
    tajweedStyle: 'murattal',
    averageSpeed: 115
  }
];

// Хук для работы с таймкодами
export const useTimingService = () => {
  const timingService = new TimingService();
  
  const getWordTimings = async (surahId: number, reciterId: string, speed: number) => {
    return await timingService.getTimings(surahId, reciterId, speed);
  };
  
  const getCurrentWord = (timings: TajweedTiming[], currentTime: number) => {
    return timingService.getCurrentWord(timings, currentTime);
  };
  
  return {
    getWordTimings,
    getCurrentWord
  };
};
