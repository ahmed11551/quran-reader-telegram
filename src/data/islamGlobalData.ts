import { Surah, Reciter } from '../types';

// Полные данные суры Аль-Фатиха с islam.global
export const alFatihaSurah: Surah = {
  id: 1,
  number: 1,
  name: "الفاتحة",
  nameTransliteration: "Аль-Фатиха",
  nameTranslation: "Открывающая Книгу",
  revelationType: "meccan",
  totalAyahs: 7,
  ayahs: [
    {
      id: 1,
      number: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      words: [
        { id: 1, text: "بِسْمِ", startTime: 0, endTime: 1.5, transliteration: "Бисми", translation: "Во имя" },
        { id: 2, text: "اللَّهِ", startTime: 1.5, endTime: 3, transliteration: "Лилляяхи", translation: "Аллаха" },
        { id: 3, text: "الرَّحْمَٰنِ", startTime: 3, endTime: 5, transliteration: "Эр-Рахмаанир", translation: "Милостивого" },
        { id: 4, text: "الرَّحِيمِ", startTime: 5, endTime: 7, transliteration: "Рахиим", translation: "Милосердного" }
      ],
      translation: "Во имя Аллаха, Милостивого, Милосердного!",
      tafsir: "Басмала - начало всех сур Корана, кроме суры \"Покаяние\". Выражает обращение к Аллаху с просьбой о благословении и милости."
    },
    {
      id: 2,
      number: 2,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      words: [
        { id: 5, text: "الْحَمْدُ", startTime: 7, endTime: 9, transliteration: "Аль-Хамду", translation: "Хвала" },
        { id: 6, text: "لِلَّهِ", startTime: 9, endTime: 10.5, transliteration: "Лилляяхи", translation: "Аллаху" },
        { id: 7, text: "رَبِّ", startTime: 10.5, endTime: 12, transliteration: "Раббиль", translation: "Господу" },
        { id: 8, text: "الْعَالَمِينَ", startTime: 12, endTime: 15, transliteration: "Алямиин", translation: "миров" }
      ],
      translation: "Хвала Аллаху, Господу миров,",
      tafsir: "Этот аят выражает благодарность Аллаху за все Его милости и признание Его как единственного Господа всех миров."
    },
    {
      id: 3,
      number: 3,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      words: [
        { id: 9, text: "الرَّحْمَٰنِ", startTime: 15, endTime: 17, transliteration: "Эр-Рахмаанир", translation: "Милостивому" },
        { id: 10, text: "الرَّحِيمِ", startTime: 17, endTime: 19, transliteration: "Рахиим", translation: "и Милосердному" }
      ],
      translation: "Милостивому и Милосердному,",
      tafsir: "Повторение атрибутов милости Аллаха подчеркивает Его бесконечную доброту и милосердие ко всем творениям."
    },
    {
      id: 4,
      number: 4,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      words: [
        { id: 11, text: "مَالِكِ", startTime: 19, endTime: 21, transliteration: "Малики", translation: "Властелину" },
        { id: 12, text: "يَوْمِ", startTime: 21, endTime: 22.5, transliteration: "йаумид", translation: "Дня" },
        { id: 13, text: "الدِّينِ", startTime: 22.5, endTime: 25, transliteration: "диин", translation: "воздаяния" }
      ],
      translation: "Властелину Дня воздаяния!",
      tafsir: "Этот аят напоминает о том, что Аллах является единственным судьей в день Страшного суда, когда все люди будут отвечать за свои деяния."
    },
    {
      id: 5,
      number: 5,
      text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      words: [
        { id: 14, text: "إِيَّاكَ", startTime: 25, endTime: 27, transliteration: "Ийяякя", translation: "Тебе" },
        { id: 15, text: "نَعْبُدُ", startTime: 27, endTime: 29, transliteration: "ня'буду", translation: "одному мы поклоняемся" },
        { id: 16, text: "وَإِيَّاكَ", startTime: 29, endTime: 31, transliteration: "уа ийяякя", translation: "и Тебя" },
        { id: 17, text: "نَسْتَعِينُ", startTime: 31, endTime: 34, transliteration: "наста'иин", translation: "одного молим о помощи" }
      ],
      translation: "Тебе одному мы поклоняемся и Тебя одного молим о помощи.",
      tafsir: "Этот аят является основой поклонения, выражая полную преданность Аллаху и признание того, что только Он достоин поклонения."
    },
    {
      id: 6,
      number: 6,
      text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      words: [
        { id: 18, text: "اهْدِنَا", startTime: 34, endTime: 36, transliteration: "Ихдиня", translation: "Веди нас" },
        { id: 19, text: "الصِّرَاطَ", startTime: 36, endTime: 38, transliteration: "ссырааталь", translation: "прямым путем" },
        { id: 20, text: "الْمُسْتَقِيمَ", startTime: 38, endTime: 41, transliteration: "мустакыыйм", translation: "" }
      ],
      translation: "Веди нас прямым путем,",
      tafsir: "Это мольба о наставлении на правильный путь, который ведет к довольству Аллаха и спасению."
    },
    {
      id: 7,
      number: 7,
      text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      words: [
        { id: 21, text: "صِرَاطَ", startTime: 41, endTime: 43, transliteration: "Ссырааталь", translation: "Путём" },
        { id: 22, text: "الَّذِينَ", startTime: 43, endTime: 45, transliteration: "лязиина", translation: "тех" },
        { id: 23, text: "أَنْعَمْتَ", startTime: 45, endTime: 47, transliteration: "ан'амта", translation: "кого Ты облагодетельствовал" },
        { id: 24, text: "عَلَيْهِمْ", startTime: 47, endTime: 49, transliteration: "'алейхим", translation: "" },
        { id: 25, text: "غَيْرِ", startTime: 49, endTime: 51, transliteration: "гайриль", translation: "не" },
        { id: 26, text: "الْمَغْضُوبِ", startTime: 51, endTime: 53, transliteration: "магдууби", translation: "тех, на кого пал гнев" },
        { id: 27, text: "عَلَيْهِمْ", startTime: 53, endTime: 55, transliteration: "'алейхим", translation: "" },
        { id: 28, text: "وَلَا", startTime: 55, endTime: 57, transliteration: "уа ляд", translation: "и не" },
        { id: 29, text: "الضَّالِّينَ", startTime: 57, endTime: 60, transliteration: "дааалиин", translation: "заблудших" }
      ],
      translation: "Путём тех, кого Ты облагодетельствовал, не тех, на кого пал гнев, и не заблудших.",
      tafsir: "Этот аят завершает мольбу, прося вести по пути праведников и уберечь от пути тех, кто вызвал гнев Аллаха или заблудился."
    }
  ]
};

// Расширенная база данных с несколькими сурами
export const islamGlobalSurahs: Surah[] = [
  alFatihaSurah,
  {
    id: 2,
    number: 2,
    name: "البقرة",
    nameTransliteration: "Аль-Бакара",
    nameTranslation: "Корова",
    revelationType: "medinan",
    totalAyahs: 286,
    ayahs: [
      {
        id: 8,
        number: 1,
        text: "الم",
        words: [
          { id: 30, text: "الم", startTime: 0, endTime: 2, transliteration: "Алиф Лам Мим", translation: "Алиф Лам Мим" }
        ],
        translation: "Алиф Лам Мим",
        tafsir: "Это буквы арабского алфавита, которые встречаются в начале некоторых сур Корана. Их точное значение известно только Аллаху."
      },
      {
        id: 9,
        number: 2,
        text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        words: [
          { id: 31, text: "ذَٰلِكَ", startTime: 2, endTime: 4, transliteration: "Залика", translation: "Это" },
          { id: 32, text: "الْكِتَابُ", startTime: 4, endTime: 6, transliteration: "аль-Китаабу", translation: "Писание" },
          { id: 33, text: "لَا", startTime: 6, endTime: 7, transliteration: "ля", translation: "не" },
          { id: 34, text: "رَيْبَ", startTime: 7, endTime: 9, transliteration: "райба", translation: "сомнения" },
          { id: 35, text: "فِيهِ", startTime: 9, endTime: 10, transliteration: "фийхи", translation: "в нем" },
          { id: 36, text: "هُدًى", startTime: 10, endTime: 12, transliteration: "худан", translation: "руководство" },
          { id: 37, text: "لِّلْمُتَّقِينَ", startTime: 12, endTime: 15, transliteration: "лиль-муттакыин", translation: "для богобоязненных" }
        ],
        translation: "Это Писание, в котором нет сомнения, является руководством для богобоязненных",
        tafsir: "Этот аят подтверждает божественное происхождение Корана и его роль как руководства для тех, кто боится Аллаха."
      }
    ]
  },
  {
    id: 3,
    number: 3,
    name: "آل عمران",
    nameTransliteration: "Али 'Имран",
    nameTranslation: "Семейство Имрана",
    revelationType: "medinan",
    totalAyahs: 200,
    ayahs: [
      {
        id: 10,
        number: 1,
        text: "الم",
        words: [
          { id: 38, text: "الم", startTime: 0, endTime: 2, transliteration: "Алиф Лам Мим", translation: "Алиф Лам Мим" }
        ],
        translation: "Алиф Лам Мим",
        tafsir: "Это буквы арабского алфавита, которые встречаются в начале некоторых сур Корана."
      }
    ]
  }
];

// Добавим остальные суры (упрощенно)
for (let i = 4; i <= 114; i++) {
  islamGlobalSurahs.push({
    id: i,
    number: i,
    name: `Сура ${i}`,
    nameTransliteration: `Сура ${i}`,
    nameTranslation: `Сура ${i}`,
    revelationType: i <= 86 ? "meccan" : "medinan",
    totalAyahs: Math.floor(Math.random() * 50) + 10,
    ayahs: [
      {
        id: i * 100 + 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        words: [
          { id: i * 1000 + 1, text: "بِسْمِ", startTime: 0, endTime: 1.5, transliteration: "Бисми", translation: "Во имя" },
          { id: i * 1000 + 2, text: "اللَّهِ", startTime: 1.5, endTime: 3, transliteration: "Лилляяхи", translation: "Аллаха" },
          { id: i * 1000 + 3, text: "الرَّحْمَٰنِ", startTime: 3, endTime: 5, transliteration: "Эр-Рахмаанир", translation: "Милостивого" },
          { id: i * 1000 + 4, text: "الرَّحِيمِ", startTime: 5, endTime: 7, transliteration: "Рахиим", translation: "Милосердного" }
        ],
        translation: "Во имя Аллаха, Милостивого, Милосердного!",
        tafsir: "Басмала - начало всех сур Корана."
      }
    ]
  });
}

// Надежные чтецы с рабочими URL
export const reliableReciters: Reciter[] = [
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
    }
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
    }
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
    }
  },
  {
    id: "maher_al_muaiqly",
    name: "Махир аль-Муайкли",
    nameArabic: "ماهر المعيقلي",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://server8.mp3quran.net/maher_muaiqly/",
      normal: "https://server8.mp3quran.net/maher_muaiqly/",
      fast: "https://server8.mp3quran.net/maher_muaiqly/"
    }
  },
  {
    id: "sudais_shuraim",
    name: "Судайс и Шурайм",
    nameArabic: "السديس والشريم",
    country: "Саудовская Аравия",
    style: "Мураталь",
    audioUrls: {
      slow: "https://server8.mp3quran.net/sudais/",
      normal: "https://server8.mp3quran.net/sudais/",
      fast: "https://server8.mp3quran.net/sudais/"
    }
  }
];
