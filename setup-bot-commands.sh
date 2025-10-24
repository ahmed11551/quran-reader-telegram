#!/bin/bash

# Скрипт для настройки всех команд Telegram Bot
# Запустите этот скрипт после развертывания бота

BOT_TOKEN="8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0"

echo "🤖 Настройка Telegram Bot..."

# 1. Установка команд
echo "📋 Установка команд бота..."
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands" \
  -H "Content-Type: application/json" \
  -d '{
    "commands": [
      {"command": "start", "description": "🕌 Запустить читалку Корана"},
      {"command": "help", "description": "❓ Помощь по использованию"},
      {"command": "surah", "description": "📖 Выбрать суру для чтения"},
      {"command": "ayah", "description": "📝 Найти аят по номеру"},
      {"command": "juz", "description": "📚 Чтение по джузам"},
      {"command": "settings", "description": "⚙️ Настройки приложения"},
      {"command": "progress", "description": "📊 Ваш прогресс чтения"},
      {"command": "favorites", "description": "⭐ Избранные аяты"},
      {"command": "random", "description": "🎲 Случайный аят"},
      {"command": "tafsir", "description": "📚 Толкование аята"},
      {"command": "prayer", "description": "🕌 Время намаза"},
      {"command": "share", "description": "📤 Поделиться прогрессом"}
    ]
  }'

echo "✅ Команды установлены"

# 2. Установка кнопки меню
echo "🔘 Установка кнопки меню..."
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "Читалка Корана",
      "web_app": {
        "url": "https://quran-reader-telegram-rxsa.vercel.app"
      }
    }
  }'

echo "✅ Кнопка меню установлена"

# 3. Установка описания
echo "📝 Установка описания бота..."
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "🕌 Читалка Корана с синхронизацией аудио и текста. Выберите суру, аят и наслаждайтесь чтением с подсветкой слов. Поддержка множественных чтецов, переводов и толкований."
  }'

echo "✅ Описание установлено"

# 4. Установка краткого описания
echo "📄 Установка краткого описания..."
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setMyShortDescription" \
  -H "Content-Type: application/json" \
  -d '{
    "short_description": "🕌 Читалка Корана с аудио синхронизацией"
  }'

echo "✅ Краткое описание установлено"

# 5. Получение информации о боте
echo "📋 Информация о боте:"
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getMe" | jq '.'

echo ""
echo "🎉 Настройка бота завершена!"
echo "🔗 Ссылка на бота: https://t.me/$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getMe" | jq -r '.result.username')"
echo ""
echo "📱 Теперь пользователи могут:"
echo "• Использовать команды для навигации"
echo "• Открывать читалку через кнопку меню"
echo "• Получать уведомления и напоминания"
echo "• Отслеживать прогресс чтения"
echo "• Добавлять аяты в избранное"
echo "• Получать толкования и переводы"
echo "• Узнавать время намаза"
echo "• Делиться прогрессом с друзьями"
