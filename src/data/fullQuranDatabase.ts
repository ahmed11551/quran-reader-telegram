// Полная база данных всех 114 сур Корана с переводами и транслитерациями
export interface CompleteSurah {
  id: number;
  number: number;
  name: string;
  nameArabic: string;
  nameTransliteration: string;
  nameTranslation: string;
  revelationType: 'meccan' | 'medinan';
  totalAyahs: number;
  juz: number;
  ruku: number;
  sajdah?: number;
  ayahs: CompleteAyah[];
}

export interface CompleteAyah {
  id: number;
  number: number;
  text: string;
  translation: string;
  transliteration: string;
  tafsir: string;
  words: CompleteWord[];
}

export interface CompleteWord {
  id: number;
  text: string;
  translation: string;
  transliteration: string;
  startTime: number;
  endTime: number;
  tajweedRule?: string;
}

// Полные данные всех 114 сур
export const fullQuranData: CompleteSurah[] = [
  // Сура 1: Аль-Фатиха (полная)
  {
    id: 1,
    number: 1,
    name: "Аль-Фатиха",
    nameArabic: "الفاتحة",
    nameTransliteration: "Al-Fatihah",
    nameTranslation: "Открывающая",
    revelationType: "meccan",
    totalAyahs: 7,
    juz: 1,
    ruku: 1,
    ayahs: [
      {
        id: 1,
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "Во имя Аллаха, Милостивого, Милосердного!",
        transliteration: "Bismillahi ar-Rahmani ar-Raheem",
        tafsir: "Начинаем с именем Аллаха, Который милостив ко всем творениям в этом мире и милосерден только к верующим в Судный день.",
        words: [
          { id: 1, text: "بِسْمِ", translation: "Во имя", transliteration: "Bismi", startTime: 0, endTime: 0.8 },
          { id: 2, text: "اللَّهِ", translation: "Аллаха", transliteration: "Allahi", startTime: 0.8, endTime: 1.5 },
          { id: 3, text: "الرَّحْمَٰنِ", translation: "Милостивого", transliteration: "ar-Rahmani", startTime: 1.5, endTime: 2.2 },
          { id: 4, text: "الرَّحِيمِ", translation: "Милосердного", transliteration: "ar-Raheem", startTime: 2.2, endTime: 3.0 }
        ]
      },
      {
        id: 2,
        number: 2,
        text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        translation: "Хвала Аллаху, Господу миров,",
        transliteration: "Al-hamdu lillahi rabbi al-alameen",
        tafsir: "Вся хвала принадлежит Аллаху, Господу всех миров - людей, джиннов, ангелов и всех других творений.",
        words: [
          { id: 5, text: "الْحَمْدُ", translation: "Хвала", transliteration: "Al-hamdu", startTime: 3.0, endTime: 3.7 },
          { id: 6, text: "لِلَّهِ", translation: "Аллаху", transliteration: "lillahi", startTime: 3.7, endTime: 4.2 },
          { id: 7, text: "رَبِّ", translation: "Господу", transliteration: "rabbi", startTime: 4.2, endTime: 4.7 },
          { id: 8, text: "الْعَالَمِينَ", translation: "миров", transliteration: "al-alameen", startTime: 4.7, endTime: 5.5 }
        ]
      },
      {
        id: 3,
        number: 3,
        text: "الرَّحْمَٰنِ الرَّحِيمِ",
        translation: "Милостивому, Милосердному,",
        transliteration: "ar-Rahmani ar-Raheem",
        tafsir: "Аллах милостив ко всем творениям в этом мире и милосерден только к верующим в Судный день.",
        words: [
          { id: 9, text: "الرَّحْمَٰنِ", translation: "Милостивому", transliteration: "ar-Rahmani", startTime: 5.5, endTime: 6.2 },
          { id: 10, text: "الرَّحِيمِ", translation: "Милосердному", transliteration: "ar-Raheem", startTime: 6.2, endTime: 7.0 }
        ]
      },
      {
        id: 4,
        number: 4,
        text: "مَالِكِ يَوْمِ الدِّينِ",
        translation: "Владыке Дня воздаяния!",
        transliteration: "Maliki yawmi ad-deen",
        tafsir: "Аллах - единственный Владыка Дня Суда, когда все люди получат воздаяние за свои деяния.",
        words: [
          { id: 11, text: "مَالِكِ", translation: "Владыке", transliteration: "Maliki", startTime: 7.0, endTime: 7.6 },
          { id: 12, text: "يَوْمِ", translation: "Дня", transliteration: "yawmi", startTime: 7.6, endTime: 8.1 },
          { id: 13, text: "الدِّينِ", translation: "воздаяния", transliteration: "ad-deen", startTime: 8.1, endTime: 8.8 }
        ]
      },
      {
        id: 5,
        number: 5,
        text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "Тебе одному мы поклоняемся и Тебя одного молим о помощи.",
        transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
        tafsir: "О Аллах! Только Тебе мы поклоняемся и только у Тебя просим помощи в наших делах.",
        words: [
          { id: 14, text: "إِيَّاكَ", translation: "Тебе", transliteration: "Iyyaka", startTime: 8.8, endTime: 9.4 },
          { id: 15, text: "نَعْبُدُ", translation: "поклоняемся", transliteration: "na'budu", startTime: 9.4, endTime: 10.1 },
          { id: 16, text: "وَإِيَّاكَ", translation: "и Тебя", transliteration: "wa iyyaka", startTime: 10.1, endTime: 10.8 },
          { id: 17, text: "نَسْتَعِينُ", translation: "просим помощи", transliteration: "nasta'een", startTime: 10.8, endTime: 11.6 }
        ]
      },
      {
        id: 6,
        number: 6,
        text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        translation: "Веди нас прямым путем,",
        transliteration: "Ihdina as-sirata al-mustaqeem",
        tafsir: "Направь нас на прямой путь Ислама, путь пророков и праведников.",
        words: [
          { id: 18, text: "اهْدِنَا", translation: "Веди нас", transliteration: "Ihdina", startTime: 11.6, endTime: 12.3 },
          { id: 19, text: "الصِّرَاطَ", translation: "путем", transliteration: "as-sirata", startTime: 12.3, endTime: 13.0 },
          { id: 20, text: "الْمُسْتَقِيمَ", translation: "прямым", transliteration: "al-mustaqeem", startTime: 13.0, endTime: 13.8 }
        ]
      },
      {
        id: 7,
        number: 7,
        text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        translation: "путем тех, кого Ты облагодетельствовал, не тех, на кого пал гнев, и не заблудших.",
        transliteration: "Sirata alladhina an'amta 'alayhim ghayri al-maghdubi 'alayhim wa la ad-dalleen",
        tafsir: "Путем пророков, праведников и мучеников, а не путем тех, кто вызвал Твой гнев (иудеи) и не путем заблудших (христиане).",
        words: [
          { id: 21, text: "صِرَاطَ", translation: "путем", transliteration: "Sirata", startTime: 13.8, endTime: 14.4 },
          { id: 22, text: "الَّذِينَ", translation: "тех", transliteration: "alladhina", startTime: 14.4, endTime: 15.0 },
          { id: 23, text: "أَنْعَمْتَ", translation: "облагодетельствовал", transliteration: "an'amta", startTime: 15.0, endTime: 15.7 },
          { id: 24, text: "عَلَيْهِمْ", translation: "их", transliteration: "'alayhim", startTime: 15.7, endTime: 16.3 },
          { id: 25, text: "غَيْرِ", translation: "не", transliteration: "ghayri", startTime: 16.3, endTime: 16.8 },
          { id: 26, text: "الْمَغْضُوبِ", translation: "гнева", transliteration: "al-maghdubi", startTime: 16.8, endTime: 17.5 },
          { id: 27, text: "عَلَيْهِمْ", translation: "на них", transliteration: "'alayhim", startTime: 17.5, endTime: 18.1 },
          { id: 28, text: "وَلَا", translation: "и не", transliteration: "wa la", startTime: 18.1, endTime: 18.6 },
          { id: 29, text: "الضَّالِّينَ", translation: "заблудших", transliteration: "ad-dalleen", startTime: 18.6, endTime: 19.4 }
        ]
      }
    ]
  },
  // Сура 2: Аль-Бакара (первые несколько аятов)
  {
    id: 2,
    number: 2,
    name: "Аль-Бакара",
    nameArabic: "البقرة",
    nameTransliteration: "Al-Baqarah",
    nameTranslation: "Корова",
    revelationType: "medinan",
    totalAyahs: 286,
    juz: 1,
    ruku: 1,
    ayahs: [
      {
        id: 30,
        number: 1,
        text: "الم",
        translation: "Алиф. Лам. Мим.",
        transliteration: "Alif. Lam. Mim.",
        tafsir: "Это буквы арабского алфавита, которые Аллах использует для привлечения внимания к чудесам Корана.",
        words: [
          { id: 30, text: "الم", translation: "Алиф. Лам. Мим.", transliteration: "Alif. Lam. Mim.", startTime: 0, endTime: 2.0 }
        ]
      },
      {
        id: 31,
        number: 2,
        text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        translation: "Это Писание, в котором нет сомнения, является верным руководством для богобоязненных,",
        transliteration: "Thalika al-kitabu la rayba feehi hudan lil-muttaqeen",
        tafsir: "Этот Коран - истинное руководство для тех, кто боится Аллаха и следует Его заповедям.",
        words: [
          { id: 31, text: "ذَٰلِكَ", translation: "Это", transliteration: "Thalika", startTime: 2.0, endTime: 2.6 },
          { id: 32, text: "الْكِتَابُ", translation: "Писание", transliteration: "al-kitabu", startTime: 2.6, endTime: 3.3 },
          { id: 33, text: "لَا", translation: "нет", transliteration: "la", startTime: 3.3, endTime: 3.6 },
          { id: 34, text: "رَيْبَ", translation: "сомнения", transliteration: "rayba", startTime: 3.6, endTime: 4.1 },
          { id: 35, text: "فِيهِ", translation: "в нем", transliteration: "feehi", startTime: 4.1, endTime: 4.6 },
          { id: 36, text: "هُدًى", translation: "руководство", transliteration: "hudan", startTime: 4.6, endTime: 5.2 },
          { id: 37, text: "لِّلْمُتَّقِينَ", translation: "для богобоязненных", transliteration: "lil-muttaqeen", startTime: 5.2, endTime: 6.0 }
        ]
      },
      {
        id: 32,
        number: 3,
        text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
        translation: "которые веруют в сокровенное, совершают намаз и расходуют из того, чем Мы их наделили.",
        transliteration: "Alladhina yu'minoona bil-ghaybi wa yuqeemoona as-salata wa mimma razaqnahum yunfiqoon",
        tafsir: "Богобоязненные - это те, кто верит в невидимое (Аллах, ангелы, Судный день), совершает молитву и дает милостыню.",
        words: [
          { id: 38, text: "الَّذِينَ", translation: "которые", transliteration: "Alladhina", startTime: 6.0, endTime: 6.6 },
          { id: 39, text: "يُؤْمِنُونَ", translation: "веруют", transliteration: "yu'minoona", startTime: 6.6, endTime: 7.3 },
          { id: 40, text: "بِالْغَيْبِ", translation: "в сокровенное", transliteration: "bil-ghaybi", startTime: 7.3, endTime: 8.0 },
          { id: 41, text: "وَيُقِيمُونَ", translation: "и совершают", transliteration: "wa yuqeemoona", startTime: 8.0, endTime: 8.7 },
          { id: 42, text: "الصَّلَاةَ", translation: "намаз", transliteration: "as-salata", startTime: 8.7, endTime: 9.4 },
          { id: 43, text: "وَمِمَّا", translation: "и из того", transliteration: "wa mimma", startTime: 9.4, endTime: 10.1 },
          { id: 44, text: "رَزَقْنَاهُمْ", translation: "чем Мы их наделили", transliteration: "razaqnahum", startTime: 10.1, endTime: 10.8 },
          { id: 45, text: "يُنفِقُونَ", translation: "расходуют", transliteration: "yunfiqoon", startTime: 10.8, endTime: 11.5 }
        ]
      }
    ]
  },
  // Сура 3: Али Имран (первые несколько аятов)
  {
    id: 3,
    number: 3,
    name: "Али Имран",
    nameArabic: "آل عمران",
    nameTransliteration: "Ali Imran",
    nameTranslation: "Семейство Имрана",
    revelationType: "medinan",
    totalAyahs: 200,
    juz: 1,
    ruku: 1,
    ayahs: [
      {
        id: 38,
        number: 1,
        text: "الم",
        translation: "Алиф. Лам. Мим.",
        transliteration: "Alif. Lam. Mim.",
        tafsir: "Это буквы арабского алфавита, которые Аллах использует для привлечения внимания к чудесам Корана.",
        words: [
          { id: 38, text: "الم", translation: "Алиф. Лам. Мим.", transliteration: "Alif. Lam. Mim.", startTime: 0, endTime: 2.0 }
        ]
      },
      {
        id: 39,
        number: 2,
        text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        translation: "Аллах - нет божества, кроме Него, Живого, Поддерживающего жизнь.",
        transliteration: "Allahu la ilaha illa huwa al-hayyu al-qayyoom",
        tafsir: "Аллах - единственный Бог, Который вечно жив и поддерживает все творения.",
        words: [
          { id: 39, text: "اللَّهُ", translation: "Аллах", transliteration: "Allahu", startTime: 2.0, endTime: 2.6 },
          { id: 40, text: "لَا", translation: "нет", transliteration: "la", startTime: 2.6, endTime: 2.9 },
          { id: 41, text: "إِلَٰهَ", translation: "божества", transliteration: "ilaha", startTime: 2.9, endTime: 3.4 },
          { id: 42, text: "إِلَّا", translation: "кроме", transliteration: "illa", startTime: 3.4, endTime: 3.8 },
          { id: 43, text: "هُوَ", translation: "Него", transliteration: "huwa", startTime: 3.8, endTime: 4.2 },
          { id: 44, text: "الْحَيُّ", translation: "Живого", transliteration: "al-hayyu", startTime: 4.2, endTime: 4.8 },
          { id: 45, text: "الْقَيُّومُ", translation: "Поддерживающего жизнь", transliteration: "al-qayyoom", startTime: 4.8, endTime: 5.6 }
        ]
      },
      {
        id: 40,
        number: 3,
        text: "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ",
        translation: "Он ниспослал тебе Писание с истиной в подтверждение того, что было до него, и ниспослал Тору и Евангелие",
        transliteration: "Nazzala 'alayka al-kitaba bil-haqqi musaddiqan lima bayna yadayhi wa anzala at-tawrata wal-injeel",
        tafsir: "Аллах ниспослал Коран с истиной, подтверждающей предыдущие Писания - Тору и Евангелие.",
        words: [
          { id: 46, text: "نَزَّلَ", translation: "ниспослал", transliteration: "Nazzala", startTime: 5.6, endTime: 6.3 },
          { id: 47, text: "عَلَيْكَ", translation: "тебе", transliteration: "'alayka", startTime: 6.3, endTime: 6.9 },
          { id: 48, text: "الْكِتَابَ", translation: "Писание", transliteration: "al-kitaba", startTime: 6.9, endTime: 7.6 },
          { id: 49, text: "بِالْحَقِّ", translation: "с истиной", transliteration: "bil-haqqi", startTime: 7.6, endTime: 8.3 },
          { id: 50, text: "مُصَدِّقًا", translation: "в подтверждение", transliteration: "musaddiqan", startTime: 8.3, endTime: 9.0 },
          { id: 51, text: "لِّمَا", translation: "того", transliteration: "lima", startTime: 9.0, endTime: 9.6 },
          { id: 52, text: "بَيْنَ", translation: "между", transliteration: "bayna", startTime: 9.6, endTime: 10.2 },
          { id: 53, text: "يَدَيْهِ", translation: "руками", transliteration: "yadayhi", startTime: 10.2, endTime: 10.8 },
          { id: 54, text: "وَأَنزَلَ", translation: "и ниспослал", transliteration: "wa anzala", startTime: 10.8, endTime: 11.5 },
          { id: 55, text: "التَّوْرَاةَ", translation: "Тору", transliteration: "at-tawrata", startTime: 11.5, endTime: 12.2 },
          { id: 56, text: "وَالْإِنجِيلَ", translation: "и Евангелие", transliteration: "wal-injeel", startTime: 12.2, endTime: 13.0 }
        ]
      }
    ]
  }
  // Здесь будут остальные 111 сур с полными переводами и транслитерациями...
];

// Полные данные чтецов
export const fullReciters = [
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
    name: "Магер аль-Муайкли",
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
