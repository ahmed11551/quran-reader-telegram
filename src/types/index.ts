export interface Word {
  id: number;
  text: string;
  transliteration?: string;
  translation?: string;
  startTime: number;
  endTime: number;
}

export interface Ayah {
  id: number;
  number: number;
  text: string;
  words: Word[];
  translation?: string;
  tafsir?: string;
}

export interface Surah {
  id: number;
  number: number;
  name: string;
  nameTransliteration: string;
  nameTranslation: string;
  revelationType: 'meccan' | 'medinan';
  totalAyahs: number;
  ayahs: Ayah[];
}

export interface Reciter {
  id: string;
  name: string;
  nameArabic: string;
  country: string;
  style: string;
  audioUrls: {
    [speed: string]: string; // 'slow', 'normal', 'fast'
  };
}

export interface AudioTiming {
  reciterId: string;
  surahId: number;
  ayahId: number;
  wordId: number;
  startTime: number;
  endTime: number;
}

export interface UserSettings {
  selectedReciter: string;
  playbackSpeed: number;
  selectedTranslation: string;
  selectedLanguage: string;
  selectedTafsir: string;
  scriptVariant: 'indopak' | 'uthmani' | 'custom';
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'dark' | 'sepia' | 'green';
  autoPlay: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  showTafsir: boolean;
  showWordByWord: boolean;
  nightMode: boolean;
}

export interface ReadingProgress {
  surahId: number;
  ayahId: number;
  wordId: number;
  timestamp: number;
}

export interface AppState {
  currentSurah: number;
  currentAyah: number;
  currentWord: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  settings: UserSettings;
  progress: ReadingProgress;
}
