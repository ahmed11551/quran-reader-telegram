import { Telegraf, Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/types';

const bot = new Telegraf('8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0');

// Интерфейсы для данных
interface User {
  id: number;
  username?: string;
  firstName: string;
  lastName?: string;
  currentSurah: number;
  currentAyah: number;
  progress: number;
  favorites: number[];
  settings: UserSettings;
  readingTime: number;
  notes: { [key: string]: string };
}

interface UserSettings {
  selectedReciter: string;
  playbackSpeed: number;
  selectedTranslation: string;
  selectedLanguage: string;
  notifications: boolean;
  reminderTime: string;
}

// Хранилище пользователей (в реальном проекте используйте базу данных)
const users: Map<number, User> = new Map();

// Данные Корана (упрощенная версия)
const surahs = [
  { id: 1, name: "Al-Fatihah", nameArabic: "الفاتحة", totalAyahs: 7 },
  { id: 2, name: "Al-Baqarah", nameArabic: "البقرة", totalAyahs: 286 },
  { id: 3, name: "Ali 'Imran", nameArabic: "آل عمران", totalAyahs: 200 },
  // ... остальные суры
];

const reciters = [
  { id: "abdul_basit", name: "Абдул-Басит Абдус-Самад" },
  { id: "mishary_rashid", name: "Мишари Рашид" },
  { id: "saad_al_ghamdi", name: "Саад аль-Гамиди" },
];

// 1. Команды бота
bot.command('start', async (ctx) => {
  const userId = ctx.from.id;
  const user = users.get(userId) || {
    id: userId,
    firstName: ctx.from.first_name,
    lastName: ctx.from.last_name,
    currentSurah: 1,
    currentAyah: 1,
    progress: 0,
    favorites: [],
    settings: {
      selectedReciter: 'abdul_basit',
      playbackSpeed: 1.0,
      selectedTranslation: 'russian',
      selectedLanguage: 'ru',
      notifications: false,
      reminderTime: '20:00'
    },
    readingTime: 0,
    notes: {}
  };
  users.set(userId, user);

  await ctx.reply(
    `🕌 Добро пожаловать в читалку Корана, ${user.firstName}!\n\n` +
    `Выберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 Открыть читалку', 'open_reader')],
      [Markup.button.callback('📚 Выбрать суру', 'select_surah'), Markup.button.callback('📝 Найти аят', 'find_ayah')],
      [Markup.button.callback('📊 Прогресс', 'progress'), Markup.button.callback('⭐ Избранное', 'favorites')],
      [Markup.button.callback('⚙️ Настройки', 'settings'), Markup.button.callback('❓ Помощь', 'help')]
    ])
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    `❓ **Помощь по использованию бота**\n\n` +
    `**Основные команды:**\n` +
    `• /start - Главное меню\n` +
    `• /surah - Выбрать суру\n` +
    `• /ayah - Найти аят\n` +
    `• /juz - Чтение по джузам\n` +
    `• /settings - Настройки\n` +
    `• /progress - Ваш прогресс\n` +
    `• /favorites - Избранные аяты\n` +
    `• /random - Случайный аят\n\n` +
    `**Как использовать:**\n` +
    `1. Нажмите "📖 Открыть читалку" для запуска приложения\n` +
    `2. Используйте кнопки для навигации\n` +
    `3. Настройте параметры в разделе "⚙️ Настройки"\n\n` +
    `**Поддержка:** @your_support_username`
  );
});

// 2. Inline клавиатуры
bot.action('open_reader', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    '📖 Открываю читалку Корана...',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🕌 Открыть читалку', 'https://quran-reader-telegram-rxsa.vercel.app')]
    ])
  );
});

bot.action('select_surah', async (ctx) => {
  const keyboard = [];
  for (let i = 0; i < surahs.length; i += 2) {
    const row = [];
    row.push(Markup.button.callback(`${surahs[i].id}. ${surahs[i].name}`, `surah_${surahs[i].id}`));
    if (surahs[i + 1]) {
      row.push(Markup.button.callback(`${surahs[i + 1].id}. ${surahs[i + 1].name}`, `surah_${surahs[i + 1].id}`));
    }
    keyboard.push(row);
  }
  keyboard.push([Markup.button.callback('🔙 Назад', 'back_to_main')]);

  await ctx.editMessageText(
    '📚 **Выберите суру:**\n\n' +
    'Нажмите на суру для перехода к чтению:',
    Markup.inlineKeyboard(keyboard)
  );
});

bot.action('find_ayah', async (ctx) => {
  await ctx.editMessageText(
    '📝 **Поиск аята**\n\n' +
    'Введите номер аята в формате:\n' +
    '• `2:255` - для аята Аль-Курси\n' +
    '• `1:1` - для первого аята Аль-Фатихи\n' +
    '• `18:109` - для аята из суры Аль-Кахф\n\n' +
    'Или используйте команду: /ayah 2:255',
    Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 3. Уведомления
bot.command('reminder', async (ctx) => {
  const user = users.get(ctx.from.id);
  if (!user) return;

  await ctx.reply(
    `🔔 **Настройка напоминаний**\n\n` +
    `Текущее время напоминания: ${user.settings.reminderTime}\n\n` +
    `Выберите время для ежедневного напоминания:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🌅 06:00', 'reminder_06:00'), Markup.button.callback('🌞 08:00', 'reminder_08:00')],
      [Markup.button.callback('☀️ 12:00', 'reminder_12:00'), Markup.button.callback('🌆 18:00', 'reminder_18:00')],
      [Markup.button.callback('🌙 20:00', 'reminder_20:00'), Markup.button.callback('🌃 22:00', 'reminder_22:00')],
      [Markup.button.callback('❌ Отключить', 'reminder_off'), Markup.button.callback('🔙 Назад', 'settings')]
    ])
  );
});

// 4. Поиск
bot.command('ayah', async (ctx) => {
  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply('Использование: /ayah <номер_суры>:<номер_аята>\nПример: /ayah 2:255');
    return;
  }

  const [surahNum, ayahNum] = args[1].split(':').map(Number);
  if (!surahNum || !ayahNum) {
    await ctx.reply('Неверный формат. Используйте: /ayah 2:255');
    return;
  }

  const surah = surahs.find(s => s.id === surahNum);
  if (!surah) {
    await ctx.reply(`Сура ${surahNum} не найдена`);
    return;
  }

  if (ayahNum > surah.totalAyahs) {
    await ctx.reply(`В суре ${surah.name} только ${surah.totalAyahs} аятов`);
    return;
  }

  await ctx.reply(
    `📖 **${surah.name} (${surah.nameArabic})**\n` +
    `Аят ${ayahNum} из ${surah.totalAyahs}\n\n` +
    `[Открыть в читалке](https://quran-reader-telegram-rxsa.vercel.app?surah=${surahNum}&ayah=${ayahNum})`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('📖 Открыть в читалке', `https://quran-reader-telegram-rxsa.vercel.app?surah=${surahNum}&ayah=${ayahNum}`)],
      [Markup.button.callback('⭐ Добавить в избранное', `favorite_${surahNum}_${ayahNum}`)]
    ])
  );
});

// 5. Статистика
bot.action('progress', async (ctx) => {
  const user = users.get(ctx.from.id);
  if (!user) return;

  const totalAyahs = surahs.reduce((sum, s) => sum + s.totalAyahs, 0);
  const progressPercent = Math.round((user.progress / totalAyahs) * 100);

  await ctx.editMessageText(
    `📊 **Ваш прогресс чтения**\n\n` +
    `👤 Пользователь: ${user.firstName}\n` +
    `📖 Прочитано аятов: ${user.progress} из ${totalAyahs}\n` +
    `📈 Прогресс: ${progressPercent}%\n` +
    `⏱️ Время чтения: ${Math.round(user.readingTime / 60)} минут\n` +
    `⭐ Избранных аятов: ${user.favorites.length}\n\n` +
    `🎯 Текущая позиция: Сура ${user.currentSurah}, Аят ${user.currentAyah}`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 Продолжить чтение', 'continue_reading')],
      [Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 6. Социальные функции
bot.command('share', async (ctx) => {
  const user = users.get(ctx.from.id);
  if (!user) return;

  await ctx.reply(
    `📤 **Поделиться прогрессом**\n\n` +
    `Ваш прогресс: ${Math.round((user.progress / surahs.reduce((sum, s) => sum + s.totalAyahs, 0)) * 100)}%\n\n` +
    `Поделитесь своим достижением с друзьями!`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📱 Поделиться', 'share_progress')],
      [Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 7. Персонализация
bot.action('favorites', async (ctx) => {
  const user = users.get(ctx.from.id);
  if (!user) return;

  if (user.favorites.length === 0) {
    await ctx.editMessageText(
      `⭐ **Избранные аяты**\n\n` +
      `У вас пока нет избранных аятов.\n\n` +
      `Добавляйте аяты в избранное, нажимая на ⭐ при просмотре.`,
      Markup.inlineKeyboard([
        [Markup.button.callback('🔙 Назад', 'back_to_main')]
      ])
    );
    return;
  }

  let favoritesText = `⭐ **Избранные аяты**\n\n`;
  user.favorites.forEach((ayahId, index) => {
    const surahId = Math.floor(ayahId / 1000);
    const ayahNum = ayahId % 1000;
    const surah = surahs.find(s => s.id === surahId);
    if (surah) {
      favoritesText += `${index + 1}. ${surah.name} ${ayahNum}\n`;
    }
  });

  await ctx.editMessageText(
    favoritesText,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 Открыть все', 'open_favorites')],
      [Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 8. Образовательные функции
bot.command('tafsir', async (ctx) => {
  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply('Использование: /tafsir <номер_суры>:<номер_аята>\nПример: /tafsir 2:255');
    return;
  }

  const [surahNum, ayahNum] = args[1].split(':').map(Number);
  
  await ctx.reply(
    `📚 **Толкование аята**\n\n` +
    `Сура ${surahNum}, Аят ${ayahNum}\n\n` +
    `🔍 Выберите толкование:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 Ибн Касир', `tafsir_ibn_kathir_${surahNum}_${ayahNum}`)],
      [Markup.button.callback('📚 Табари', `tafsir_tabari_${surahNum}_${ayahNum}`)],
      [Markup.button.callback('📖 Куртуби', `tafsir_qurtubi_${surahNum}_${ayahNum}`)],
      [Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 9. Интеграция с календарем
bot.command('prayer', async (ctx) => {
  await ctx.reply(
    `🕌 **Время намаза**\n\n` +
    `Выберите город для получения времени намаза:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🏙️ Москва', 'prayer_moscow'), Markup.button.callback('🏙️ СПб', 'prayer_spb')],
      [Markup.button.callback('🏙️ Казань', 'prayer_kazan'), Markup.button.callback('🏙️ Уфа', 'prayer_ufa')],
      [Markup.button.callback('🌍 Другой город', 'prayer_other'), Markup.button.callback('🔙 Назад', 'back_to_main')]
    ])
  );
});

// 10. Голосовые сообщения
bot.on('voice', async (ctx) => {
  await ctx.reply(
    `🎤 **Голосовое сообщение получено**\n\n` +
    `К сожалению, голосовые команды пока не поддерживаются.\n` +
    `Используйте текстовые команды или кнопки для навигации.`,
    Markup.inlineKeyboard([
      [Markup.button.callback('❓ Помощь', 'help')],
      [Markup.button.callback('🔙 Главное меню', 'back_to_main')]
    ])
  );
});

// Обработчики действий
bot.action(/^surah_(\d+)$/, async (ctx) => {
  const surahId = parseInt(ctx.match[1]);
  const surah = surahs.find(s => s.id === surahId);
  if (!surah) return;

  await ctx.editMessageText(
    `📖 **${surah.name} (${surah.nameArabic})**\n` +
    `Всего аятов: ${surah.totalAyahs}\n\n` +
    `Выберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('📖 Открыть в читалке', `https://quran-reader-telegram-rxsa.vercel.app?surah=${surahId}`)],
      [Markup.button.callback('📝 Найти аят', `find_ayah_surah_${surahId}`)],
      [Markup.button.callback('🔙 Назад', 'select_surah')]
    ])
  );
});

bot.action('back_to_main', async (ctx) => {
  await ctx.editMessageText(
    `🕌 **Главное меню**\n\n` +
    `Выберите действие:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 Открыть читалку', 'open_reader')],
      [Markup.button.callback('📚 Выбрать суру', 'select_surah'), Markup.button.callback('📝 Найти аят', 'find_ayah')],
      [Markup.button.callback('📊 Прогресс', 'progress'), Markup.button.callback('⭐ Избранное', 'favorites')],
      [Markup.button.callback('⚙️ Настройки', 'settings'), Markup.button.callback('❓ Помощь', 'help')]
    ])
  );
});

// Запуск бота
bot.launch();

console.log('🤖 Telegram Bot запущен!');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
