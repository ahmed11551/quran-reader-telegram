import { Surah, Reciter } from '../types';

// Sample data for demonstration
export const sampleSurahs: Surah[] = [
  {
    id: 1,
    number: 1,
    name: "الفاتحة",
    nameTransliteration: "Al-Fatihah",
    nameTranslation: "Открывающая",
    revelationType: "meccan",
    totalAyahs: 7,
    ayahs: [
      {
        id: 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        words: [
          { id: 1, text: "بِسْمِ", startTime: 0, endTime: 1.5, transliteration: "bismi", translation: "Во имя" },
          { id: 2, text: "اللَّهِ", startTime: 1.5, endTime: 3, transliteration: "Allahi", translation: "Аллаха" },
          { id: 3, text: "الرَّحْمَٰنِ", startTime: 3, endTime: 5, transliteration: "Ar-Rahmani", translation: "Милостивого" },
          { id: 4, text: "الرَّحِيمِ", startTime: 5, endTime: 7, transliteration: "Ar-Raheemi", translation: "Милосердного" }
        ],
        translation: "Во имя Аллаха, Милостивого, Милосердного",
        tafsir: "Этот аят является началом всех сур Корана, кроме суры \"Покаяние\". Он содержит в себе обращение к Аллаху с просьбой о благословении и милости."
      },
      {
        id: 2,
        number: 2,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        words: [
          { id: 5, text: "الْحَمْدُ", startTime: 7, endTime: 9, transliteration: "Al-hamdu", translation: "Хвала" },
          { id: 6, text: "لِلَّهِ", startTime: 9, endTime: 10.5, transliteration: "lillahi", translation: "Аллаху" },
          { id: 7, text: "رَبِّ", startTime: 10.5, endTime: 12, transliteration: "Rabbi", translation: "Господу" },
          { id: 8, text: "الْعَالَمِينَ", startTime: 12, endTime: 15, transliteration: "Al-alameen", translation: "миров" }
        ],
        translation: "Хвала Аллаху, Господу миров",
        tafsir: "Этот аят выражает благодарность Аллаху за все Его милости и признание Его как единственного Господа всех миров."
      },
      {
        id: 3,
        number: 3,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        words: [
          { id: 9, text: "الرَّحْمَٰنِ", startTime: 15, endTime: 17, transliteration: "Ar-Rahmani", translation: "Милостивого" },
          { id: 10, text: "الرَّحِيمِ", startTime: 17, endTime: 19, transliteration: "Ar-Raheemi", translation: "Милосердного" }
        ],
        translation: "Милостивого, Милосердного",
        tafsir: "Повторение атрибутов милости Аллаха подчеркивает Его бесконечную доброту и милосердие ко всем творениям."
      },
      {
        id: 4,
        number: 4,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        words: [
          { id: 11, text: "مَالِكِ", startTime: 19, endTime: 21, transliteration: "Maliki", translation: "Владыке" },
          { id: 12, text: "يَوْمِ", startTime: 21, endTime: 22.5, transliteration: "Yawmi", translation: "дня" },
          { id: 13, text: "الدِّينِ", startTime: 22.5, endTime: 25, transliteration: "Ad-deen", translation: "Суда" }
        ],
        translation: "Владыке дня Суда",
        tafsir: "Этот аят напоминает о том, что Аллах является единственным судьей в день Страшного суда, когда все люди будут отвечать за свои деяния."
      },
      {
        id: 5,
        number: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        words: [
          { id: 14, text: "إِيَّاكَ", startTime: 25, endTime: 27, transliteration: "Iyyaka", translation: "Тебя" },
          { id: 15, text: "نَعْبُدُ", startTime: 27, endTime: 29, transliteration: "na'budu", translation: "мы поклоняемся" },
          { id: 16, text: "وَإِيَّاكَ", startTime: 29, endTime: 31, transliteration: "wa iyyaka", translation: "и Тебя" },
          { id: 17, text: "نَسْتَعِينُ", startTime: 31, endTime: 34, transliteration: "nasta'een", translation: "мы просим о помощи" }
        ],
        translation: "Тебе мы поклоняемся и Тебя мы просим о помощи",
        tafsir: "Этот аят является основой поклонения, выражая полную преданность Аллаху и признание того, что только Он достоин поклонения."
      },
      {
        id: 6,
        number: 6,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        words: [
          { id: 18, text: "اهْدِنَا", startTime: 34, endTime: 36, transliteration: "Ihdina", translation: "Веди нас" },
          { id: 19, text: "الصِّرَاطَ", startTime: 36, endTime: 38, transliteration: "As-sirata", translation: "по пути" },
          { id: 20, text: "الْمُسْتَقِيمَ", startTime: 38, endTime: 41, transliteration: "Al-mustaqeem", translation: "прямому" }
        ],
        translation: "Веди нас по пути прямому",
        tafsir: "Это мольба о наставлении на правильный путь, который ведет к довольству Аллаха и спасению."
      },
      {
        id: 7,
        number: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        words: [
          { id: 21, text: "صِرَاطَ", startTime: 41, endTime: 43, transliteration: "Sirata", translation: "путем" },
          { id: 22, text: "الَّذِينَ", startTime: 43, endTime: 45, transliteration: "Allazeena", translation: "тех" },
          { id: 23, text: "أَنْعَمْتَ", startTime: 45, endTime: 47, transliteration: "An'amta", translation: "Ты облагодетельствовал" },
          { id: 24, text: "عَلَيْهِمْ", startTime: 47, endTime: 49, transliteration: "alayhim", translation: "их" },
          { id: 25, text: "غَيْرِ", startTime: 49, endTime: 51, transliteration: "Ghairi", translation: "не" },
          { id: 26, text: "الْمَغْضُوبِ", startTime: 51, endTime: 53, transliteration: "Al-maghdubi", translation: "тех, на кого Ты гневаешься" },
          { id: 27, text: "عَلَيْهِمْ", startTime: 53, endTime: 55, transliteration: "alayhim", translation: "на них" },
          { id: 28, text: "وَلَا", startTime: 55, endTime: 57, transliteration: "wa la", translation: "и не" },
          { id: 29, text: "الضَّالِّينَ", startTime: 57, endTime: 60, transliteration: "Ad-dalleen", translation: "заблудших" }
        ],
        translation: "путем тех, кого Ты облагодетельствовал, не тех, на кого Ты гневаешься, и не заблудших",
        tafsir: "Этот аят завершает мольбу, прося вести по пути праведников и уберечь от пути тех, кто вызвал гнев Аллаха или заблудился."
      }
    ]
  }
];

export const sampleReciters: Reciter[] = [
  {
    id: "abdul_basit",
    name: "Абдул-Басит Абдус-Самад",
    nameArabic: "عبد الباسط عبد الصمد",
    country: "Египет",
    style: "Мураталь",
    audioUrls: {
      slow: "https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/{surah}.mp3",
      normal: "https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/{surah}.mp3",
      fast: "https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/{surah}.mp3"
    }
  },
  {
    id: "mishary_rashid",
    name: "Мишари Рашид",
    nameArabic: "مشاري راشد",
    country: "Кувейт",
    style: "Мураталь",
    audioUrls: {
      slow: "https://cdn.islamic.network/quran/audio-surah/128/ar.misharyrashaad/{surah}.mp3",
      normal: "https://cdn.islamic.network/quran/audio-surah/128/ar.misharyrashaad/{surah}.mp3",
      fast: "https://cdn.islamic.network/quran/audio-surah/128/ar.misharyrashaad/{surah}.mp3"
    }
  },
  {
    id: "saad_al_ghamdi",
    name: "Саад аль-Гамиди",
    nameArabic: "سعد الغامدي",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://cdn.islamic.network/quran/audio-surah/128/ar.saadalghamdi/{surah}.mp3",
      normal: "https://cdn.islamic.network/quran/audio-surah/128/ar.saadalghamdi/{surah}.mp3",
      fast: "https://cdn.islamic.network/quran/audio-surah/128/ar.saadalghamdi/{surah}.mp3"
    }
  },
  {
    id: "maher_al_muaiqly",
    name: "Махир аль-Муайкли",
    nameArabic: "ماهر المعيقلي",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://cdn.islamic.network/quran/audio-surah/128/ar.mahermuaiqly/{surah}.mp3",
      normal: "https://cdn.islamic.network/quran/audio-surah/128/ar.mahermuaiqly/{surah}.mp3",
      fast: "https://cdn.islamic.network/quran/audio-surah/128/ar.mahermuaiqly/{surah}.mp3"
    }
  },
  {
    id: "sudais_shuraim",
    name: "Судайс и Шурайм",
    nameArabic: "السديس والشريم",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://cdn.islamic.network/quran/audio-surah/128/ar.sudais/{surah}.mp3",
      normal: "https://cdn.islamic.network/quran/audio-surah/128/ar.sudais/{surah}.mp3",
      fast: "https://cdn.islamic.network/quran/audio-surah/128/ar.sudais/{surah}.mp3"
    }
  }
];
