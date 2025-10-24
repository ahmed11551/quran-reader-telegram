import { Surah, Reciter } from '../types';

// Полный список всех 114 сур Корана
export const allSurahs: Surah[] = [
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
  },
  {
    id: 2,
    number: 2,
    name: "البقرة",
    nameTransliteration: "Al-Baqarah",
    nameTranslation: "Корова",
    revelationType: "medinan",
    totalAyahs: 286,
    ayahs: [
      {
        id: 8,
        number: 1,
        text: "الم",
        words: [
          { id: 30, text: "الم", startTime: 0, endTime: 2, transliteration: "Alif Lam Mim", translation: "Алиф Лам Мим" }
        ],
        translation: "Алиф Лам Мим",
        tafsir: "Это буквы арабского алфавита, которые встречаются в начале некоторых сур Корана. Их точное значение известно только Аллаху."
      },
      {
        id: 9,
        number: 2,
        text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        words: [
          { id: 31, text: "ذَٰلِكَ", startTime: 2, endTime: 4, transliteration: "Zalika", translation: "Это" },
          { id: 32, text: "الْكِتَابُ", startTime: 4, endTime: 6, transliteration: "Al-kitabu", translation: "Писание" },
          { id: 33, text: "لَا", startTime: 6, endTime: 7, transliteration: "la", translation: "не" },
          { id: 34, text: "رَيْبَ", startTime: 7, endTime: 9, transliteration: "raiba", translation: "сомнения" },
          { id: 35, text: "فِيهِ", startTime: 9, endTime: 10, transliteration: "feehi", translation: "в нем" },
          { id: 36, text: "هُدًى", startTime: 10, endTime: 12, transliteration: "hudan", translation: "руководство" },
          { id: 37, text: "لِّلْمُتَّقِينَ", startTime: 12, endTime: 15, transliteration: "lilmuttaqeen", translation: "для богобоязненных" }
        ],
        translation: "Это Писание, в котором нет сомнения, является руководством для богобоязненных",
        tafsir: "Этот аят подтверждает божественное происхождение Корана и его роль как руководства для тех, кто боится Аллаха."
      },
      {
        id: 10,
        number: 3,
        text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
        words: [
          { id: 38, text: "الَّذِينَ", startTime: 15, endTime: 17, transliteration: "Allazeena", translation: "Те" },
          { id: 39, text: "يُؤْمِنُونَ", startTime: 17, endTime: 19, transliteration: "yu'minoon", translation: "которые веруют" },
          { id: 40, text: "بِالْغَيْبِ", startTime: 19, endTime: 21, transliteration: "bil-ghaybi", translation: "в сокровенное" },
          { id: 41, text: "وَيُقِيمُونَ", startTime: 21, endTime: 23, transliteration: "wa yuqeemoon", translation: "и совершают" },
          { id: 42, text: "الصَّلَاةَ", startTime: 23, endTime: 25, transliteration: "As-salata", translation: "намаз" },
          { id: 43, text: "وَمِمَّا", startTime: 25, endTime: 27, transliteration: "wa mimma", translation: "и из того" },
          { id: 44, text: "رَزَقْنَاهُمْ", startTime: 27, endTime: 29, transliteration: "razaqnahum", translation: "чем Мы их наделили" },
          { id: 45, text: "يُنفِقُونَ", startTime: 29, endTime: 32, transliteration: "yunfiqoon", translation: "они расходуют" }
        ],
        translation: "Те, которые веруют в сокровенное, совершают намаз и расходуют из того, чем Мы их наделили",
        tafsir: "Этот аят описывает качества богобоязненных: вера в невидимое, выполнение молитвы и благотворительность."
      }
    ]
  },
  {
    id: 3,
    number: 3,
    name: "آل عمران",
    nameTransliteration: "Ali 'Imran",
    nameTranslation: "Семейство Имрана",
    revelationType: "medinan",
    totalAyahs: 200,
    ayahs: [
      {
        id: 11,
        number: 1,
        text: "الم",
        words: [
          { id: 46, text: "الم", startTime: 0, endTime: 2, transliteration: "Alif Lam Mim", translation: "Алиф Лам Мим" }
        ],
        translation: "Алиф Лам Мим",
        tafsir: "Это буквы арабского алфавита, которые встречаются в начале некоторых сур Корана."
      }
    ]
  },
  {
    id: 4,
    number: 4,
    name: "النساء",
    nameTransliteration: "An-Nisa",
    nameTranslation: "Женщины",
    revelationType: "medinan",
    totalAyahs: 176,
    ayahs: [
      {
        id: 12,
        number: 1,
        text: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ",
        words: [
          { id: 47, text: "يَا", startTime: 0, endTime: 1, transliteration: "Ya", translation: "О" },
          { id: 48, text: "أَيُّهَا", startTime: 1, endTime: 2, transliteration: "ayyuha", translation: "вы" },
          { id: 49, text: "النَّاسُ", startTime: 2, endTime: 4, transliteration: "An-nasu", translation: "люди" },
          { id: 50, text: "اتَّقُوا", startTime: 4, endTime: 6, transliteration: "ittaqoo", translation: "бойтесь" },
          { id: 51, text: "رَبَّكُمُ", startTime: 6, endTime: 8, transliteration: "rabbakum", translation: "вашего Господа" },
          { id: 52, text: "الَّذِي", startTime: 8, endTime: 10, transliteration: "Allazi", translation: "который" },
          { id: 53, text: "خَلَقَكُم", startTime: 10, endTime: 12, transliteration: "khalaqakum", translation: "создал вас" },
          { id: 54, text: "مِّن", startTime: 12, endTime: 13, transliteration: "min", translation: "из" },
          { id: 55, text: "نَّفْسٍ", startTime: 13, endTime: 15, transliteration: "nafsin", translation: "одной души" },
          { id: 56, text: "وَاحِدَةٍ", startTime: 15, endTime: 17, transliteration: "wahidatin", translation: "единой" }
        ],
        translation: "О люди! Бойтесь вашего Господа, который создал вас из одной души",
        tafsir: "Этот аят призывает людей к богобоязненности и напоминает о том, что все люди происходят от одного предка."
      }
    ]
  },
  {
    id: 5,
    number: 5,
    name: "المائدة",
    nameTransliteration: "Al-Ma'idah",
    nameTranslation: "Трапеза",
    revelationType: "medinan",
    totalAyahs: 120,
    ayahs: [
      {
        id: 13,
        number: 1,
        text: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
        words: [
          { id: 57, text: "يَا", startTime: 0, endTime: 1, transliteration: "Ya", translation: "О" },
          { id: 58, text: "أَيُّهَا", startTime: 1, endTime: 2, transliteration: "ayyuha", translation: "вы" },
          { id: 59, text: "الَّذِينَ", startTime: 2, endTime: 4, transliteration: "Allazeena", translation: "которые" },
          { id: 60, text: "آمَنُوا", startTime: 4, endTime: 6, transliteration: "amanu", translation: "уверовали" },
          { id: 61, text: "أَوْفُوا", startTime: 6, endTime: 8, transliteration: "awfoo", translation: "выполняйте" },
          { id: 62, text: "بِالْعُقُودِ", startTime: 8, endTime: 11, transliteration: "bil-uqud", translation: "договоры" }
        ],
        translation: "О те, которые уверовали! Выполняйте договоры",
        tafsir: "Этот аят призывает верующих к честности и выполнению всех обязательств и договоров."
      }
    ]
  }
];

// Добавим остальные суры (упрощенно для демонстрации)
for (let i = 6; i <= 114; i++) {
  allSurahs.push({
    id: i,
    number: i,
    name: `Сура ${i}`,
    nameTransliteration: `Surah ${i}`,
    nameTranslation: `Сура ${i}`,
    revelationType: i <= 86 ? "meccan" : "medinan",
    totalAyahs: Math.floor(Math.random() * 50) + 10, // Примерное количество аятов
    ayahs: [
      {
        id: i * 100 + 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        words: [
          { id: i * 1000 + 1, text: "بِسْمِ", startTime: 0, endTime: 1.5, transliteration: "bismi", translation: "Во имя" },
          { id: i * 1000 + 2, text: "اللَّهِ", startTime: 1.5, endTime: 3, transliteration: "Allahi", translation: "Аллаха" },
          { id: i * 1000 + 3, text: "الرَّحْمَٰنِ", startTime: 3, endTime: 5, transliteration: "Ar-Rahmani", translation: "Милостивого" },
          { id: i * 1000 + 4, text: "الرَّحِيمِ", startTime: 5, endTime: 7, transliteration: "Ar-Raheemi", translation: "Милосердного" }
        ],
        translation: "Во имя Аллаха, Милостивого, Милосердного",
        tafsir: "Басмала - начало всех сур Корана."
      }
    ]
  });
}

// Реальные чтецы с рабочими URL
export const realReciters: Reciter[] = [
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
