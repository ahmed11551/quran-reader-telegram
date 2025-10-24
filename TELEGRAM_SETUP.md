# 🤖 Настройка Telegram Bot для Читалки Корана

## Ваш Bot Token
```
8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0
```

## 📋 Пошаговая инструкция

### 1. Разверните приложение

**Вариант A: Vercel (рекомендуется)**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Вариант B: Netlify**
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### 2. Получите URL вашего приложения
После развертывания вы получите URL вида:
- `https://your-app-name.vercel.app` (Vercel)
- `https://your-app-name.netlify.app` (Netlify)

### 3. Настройте бота через BotFather

1. **Откройте [@BotFather](https://t.me/BotFather)** в Telegram
2. **Отправьте команду** `/setmenubutton`
3. **Выберите вашего бота** из списка
4. **Введите текст кнопки**: `Читалка Корана`
5. **Введите URL**: `https://YOUR_DOMAIN.com` (замените на ваш реальный URL)

### 4. Альтернативный способ через API

Если предпочитаете использовать API напрямую:

```bash
curl -X POST "https://api.telegram.org/bot8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0/setMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "Читалка Корана",
      "web_app": {
        "url": "https://YOUR_DOMAIN.com"
      }
    }
  }'
```

### 4. Проверьте работу
1. Откройте вашего бота в Telegram
2. Нажмите на кнопку меню (три полоски)
3. Должна появиться кнопка "Читалка Корана"
4. Нажмите на неё - откроется ваше приложение

## 🔧 Дополнительные команды бота

Установите команды для удобства:

```bash
curl -X POST "https://api.telegram.org/bot8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0/setMyCommands" \
  -H "Content-Type: application/json" \
  -d '{
    "commands": [
      {"command": "start", "description": "Запустить читалку Корана"},
      {"command": "help", "description": "Помощь по использованию"},
      {"command": "surah", "description": "Выбрать суру для чтения"},
      {"command": "settings", "description": "Настройки приложения"}
    ]
  }'
```

## 📱 Информация о боте

Получить информацию о боте:
```bash
curl "https://api.telegram.org/bot8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0/getMe"
```

## ⚠️ Важные замечания

1. **Замените `YOUR_DOMAIN.com`** на реальный URL вашего приложения
2. **Убедитесь, что приложение развернуто** перед настройкой бота
3. **Проверьте HTTPS** - Telegram требует безопасное соединение
4. **Сохраните токен** в безопасном месте

## 🎯 Готово!

После выполнения всех шагов у вас будет:
- ✅ Развернутое приложение на хостинге
- ✅ Настроенный Telegram Bot с кнопкой Mini App
- ✅ Команды бота для удобства пользователей

**Удачи с проектом!** 🕌
