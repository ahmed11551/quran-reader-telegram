# Читалка Корана - Telegram Mini App

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/quran-reader-telegram?style=social)](https://github.com/YOUR_USERNAME/quran-reader-telegram)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/quran-reader-telegram?style=social)](https://github.com/YOUR_USERNAME/quran-reader-telegram)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/quran-reader-telegram)](https://github.com/YOUR_USERNAME/quran-reader-telegram/issues)
[![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/quran-reader-telegram)](https://github.com/YOUR_USERNAME/quran-reader-telegram/blob/main/LICENSE)
[![Build Status](https://github.com/YOUR_USERNAME/quran-reader-telegram/workflows/Build%20and%20Test/badge.svg)](https://github.com/YOUR_USERNAME/quran-reader-telegram/actions)

Полнофункциональная читалка Корана с синхронизацией аудио и текста для Telegram Mini App на React.

🌐 **[Демо версия](https://YOUR_USERNAME.github.io/quran-reader-telegram)** | 📱 **[Telegram Bot](https://t.me/YOUR_BOT_USERNAME)**

## Особенности

- 🎵 **Синхронизированное воспроизведение** - подсветка слов в соответствии с аудио
- 🎚️ **Регулировка скорости** - воспроизведение на разных скоростях (0.5x - 1.5x)
- 📖 **Множественные чтецы** - выбор из различных чтецов Корана
- 🌍 **Переводы** - поддержка различных языков и переводов
- 📝 **Тафсир** - толкования аятов
- 🎨 **Варианты письма** - индо-пак, усмани, пользовательский шрифт
- ⚙️ **Настройки** - сохранение пользовательских предпочтений
- 📱 **Telegram интеграция** - оптимизировано для Telegram Mini App

## Технологии

- **React 18** с TypeScript
- **Zustand** для управления состоянием
- **Tailwind CSS** для стилизации
- **Framer Motion** для анимаций
- **Lucide React** для иконок
- **Vite** для сборки

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm или yarn
- Telegram Bot Token

### Установка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/YOUR_USERNAME/quran-reader-telegram.git
cd quran-reader-telegram
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Запустите проект в режиме разработки:**
```bash
npm run dev
```

4. **Откройте браузер:**
Перейдите по адресу `http://localhost:3000`

5. **Соберите для продакшена:**
```bash
npm run build
```

### 📱 Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Установите команду `/setmenubutton`
3. Укажите URL вашего развернутого приложения

Подробные инструкции в [DEPLOYMENT.md](DEPLOYMENT.md)

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── AudioPlayer.tsx   # Аудио проигрыватель
│   ├── QuranText.tsx     # Отображение текста Корана
│   ├── SurahNavigator.tsx # Навигация по сурам/аятам
│   └── SettingsPanel.tsx # Панель настроек
├── hooks/               # Пользовательские хуки
│   └── useAudioPlayer.ts # Хук для работы с аудио
├── store/               # Управление состоянием
│   └── appStore.ts      # Zustand store
├── types/               # TypeScript типы
│   └── index.ts         # Интерфейсы и типы
├── App.tsx              # Главный компонент
├── main.tsx             # Точка входа
└── index.css            # Глобальные стили
```

## Основные компоненты

### AudioPlayer
- Полнофункциональный аудио проигрыватель
- Контролы воспроизведения (play/pause, перемотка)
- Регулировка громкости и скорости
- Прогресс-бар с возможностью перемотки

### QuranText
- Отображение арабского текста с подсветкой слов
- Поддержка различных вариантов письма
- Отображение транслитерации и переводов
- Интерактивные слова с возможностью перехода к аудио

### SurahNavigator
- Навигация между сурами и аятами
- Список всех сур Корана
- Быстрый переход к нужному аяту

### SettingsPanel
- Выбор чтеца и скорости воспроизведения
- Настройки отображения (перевод, транслитерация, тафсир)
- Выбор варианта письма
- Настройки темы и размера шрифта

## Интеграция с Telegram

Приложение использует Telegram WebApp SDK для интеграции с Telegram:

```javascript
// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
```

## Данные

Для полноценной работы приложения необходимо:

1. **Аудио файлы** - записи чтецов Корана в различных форматах качества
2. **Тайм-коды** - синхронизация слов с аудио для каждого чтеца
3. **Тексты** - арабский текст Корана в различных вариантах письма
4. **Переводы** - переводы на различные языки
5. **Тафсир** - толкования аятов

## API Endpoints

Приложение ожидает следующие API endpoints:

- `GET /api/surahs` - список сур
- `GET /api/surahs/:id` - данные суры
- `GET /api/reciters` - список чтецов
- `GET /api/audio/:reciter/:surah` - аудио файл
- `GET /api/timings/:reciter/:surah` - тайм-коды синхронизации

## Развертывание

1. Соберите проект:
```bash
npm run build
```

2. Загрузите файлы из папки `dist/` на ваш хостинг

3. Настройте Telegram Bot для Mini App:
   - Создайте бота через @BotFather
   - Установите команду `/setmenubutton`
   - Укажите URL вашего приложения

## 📚 Документация

- **[USER_GUIDE.md](USER_GUIDE.md)** - Подробное руководство пользователя
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Инструкции по развертыванию
- **[PROJECT_INFO.md](PROJECT_INFO.md)** - Информация о проекте
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - Настройка GitHub репозитория

## 🤝 Вклад в проект

Приветствуются любые вклады в развитие проекта! 

### Как помочь:
1. **Сообщите об ошибках** - создайте [issue](https://github.com/YOUR_USERNAME/quran-reader-telegram/issues)
2. **Предложите улучшения** - создайте [pull request](https://github.com/YOUR_USERNAME/quran-reader-telegram/pulls)
3. **Добавьте переводы** - помогите с локализацией
4. **Улучшите дизайн** - предложите UI/UX изменения

### Стандарты кода:
- Используйте TypeScript
- Следуйте ESLint правилам
- Пишите тесты для новой функциональности
- Документируйте изменения

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для подробностей.

## 🙏 Благодарности

- **Quran.com** - за API и данные
- **Islamic Network** - за аудио файлы
- **Telegram** - за платформу Mini Apps
- **React Team** - за отличную библиотеку
- **Tailwind CSS** - за стили

---

**⭐ Поставьте звезду, если проект вам понравился!**
