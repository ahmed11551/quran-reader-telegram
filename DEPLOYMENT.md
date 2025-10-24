# Инструкции по развертыванию читалки Корана

## Предварительные требования

1. **Node.js** версии 18 или выше
2. **npm** или **yarn** для управления зависимостями
3. **Git** для клонирования репозитория
4. **Telegram Bot Token** для создания мини-приложения

## Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd quran-reader-telegram

# Установите зависимости
npm install
```

### 2. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### 3. Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## Настройка Telegram Bot

### 1. Создание бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните полученный токен

### 2. Настройка Mini App

1. Отправьте команду `/newapp` боту @BotFather
2. Выберите вашего бота
3. Укажите название и описание приложения
4. Загрузите иконку приложения
5. Укажите URL вашего развернутого приложения

### 3. Настройка меню бота

```bash
# Установите команду меню
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "Читалка Корана",
      "web_app": {
        "url": "https://your-domain.com"
      }
    }
  }'
```

## Развертывание

### Вариант 1: Vercel (Рекомендуется)

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в аккаунт:
```bash
vercel login
```

3. Разверните приложение:
```bash
vercel --prod
```

4. Скопируйте полученный URL и используйте его в настройках Telegram Bot

### Вариант 2: Netlify

1. Установите Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Войдите в аккаунт:
```bash
netlify login
```

3. Разверните приложение:
```bash
netlify deploy --prod --dir=dist
```

### Вариант 3: GitHub Pages

1. Установите gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавьте скрипт в package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

3. Разверните:
```bash
npm run build
npm run deploy
```

### Вариант 4: Собственный сервер

1. Соберите приложение:
```bash
npm run build
```

2. Загрузите содержимое папки `dist/` на ваш веб-сервер
3. Настройте веб-сервер для обслуживания SPA (Single Page Application)

## Настройка HTTPS

Telegram Mini Apps требуют HTTPS. Убедитесь, что ваш домен имеет SSL сертификат.

### Let's Encrypt (бесплатно)

```bash
# Установите Certbot
sudo apt install certbot

# Получите сертификат
sudo certbot --nginx -d your-domain.com
```

## Настройка данных

### 1. Подготовка аудио файлов

Для полноценной работы приложения необходимы:

- Аудио файлы чтецов в формате MP3
- Тайм-коды синхронизации для каждого слова
- Различные скорости воспроизведения (0.5x, 0.75x, 1x, 1.25x, 1.5x)

### 2. Структура API

Создайте следующие API endpoints:

```
GET /api/surahs - список всех сур
GET /api/surahs/:id - данные конкретной суры
GET /api/reciters - список чтецов
GET /api/audio/:reciter/:surah - аудио файл
GET /api/timings/:reciter/:surah - тайм-коды синхронизации
```

### 3. Пример API ответа

```json
{
  "surahs": [
    {
      "id": 1,
      "number": 1,
      "name": "الفاتحة",
      "nameTranslation": "Открывающая",
      "totalAyahs": 7
    }
  ],
  "ayahs": [
    {
      "id": 1,
      "number": 1,
      "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "words": [
        {
          "id": 1,
          "text": "بِسْمِ",
          "startTime": 0,
          "endTime": 1.5,
          "transliteration": "bismi",
          "translation": "Во имя"
        }
      ]
    }
  ]
}
```

## Мониторинг и аналитика

### 1. Логирование ошибок

Добавьте сервис для отслеживания ошибок:

```javascript
// Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
});
```

### 2. Аналитика использования

```javascript
// Google Analytics
import { sendEvent } from 'telegram-web-app';

// Отправка события
sendEvent('quran_read', {
  surah: currentSurah,
  ayah: currentAyah,
  reciter: selectedReciter
});
```

## Оптимизация производительности

### 1. Кэширование

- Используйте Service Worker для кэширования аудио файлов
- Реализуйте кэширование API ответов
- Используйте CDN для статических ресурсов

### 2. Сжатие

- Включите gzip/brotli сжатие на сервере
- Оптимизируйте изображения
- Минифицируйте CSS и JavaScript

### 3. Lazy Loading

```javascript
// Загрузка аудио по требованию
const loadAudio = async (reciter, surah) => {
  const audio = new Audio();
  audio.src = `/api/audio/${reciter}/${surah}`;
  return audio;
};
```

## Безопасность

### 1. CORS настройки

```javascript
// Настройте CORS для вашего API
app.use(cors({
  origin: ['https://your-domain.com'],
  credentials: true
}));
```

### 2. Rate Limiting

```javascript
// Ограничьте количество запросов
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов
});

app.use('/api/', limiter);
```

## Тестирование

### 1. Unit тесты

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### 2. E2E тесты

```bash
npm install --save-dev playwright
```

### 3. Запуск тестов

```bash
npm test
```

## Поддержка

Для получения поддержки:

1. Создайте issue в репозитории
2. Опишите проблему подробно
3. Приложите логи и скриншоты
4. Укажите версию браузера и устройства

## Лицензия

MIT License - см. файл LICENSE для подробностей.
