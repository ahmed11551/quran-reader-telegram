# Скрипт для настройки всех команд Telegram Bot (PowerShell)
# Запустите этот скрипт после развертывания бота

$BOT_TOKEN = "8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0"

Write-Host "🤖 Настройка Telegram Bot..." -ForegroundColor Green

# 1. Установка команд
Write-Host "📋 Установка команд бота..." -ForegroundColor Yellow
try {
    $commands = @{
        commands = @(
            @{ command = "start"; description = "🕌 Запустить читалку Корана" },
            @{ command = "help"; description = "❓ Помощь по использованию" },
            @{ command = "surah"; description = "📖 Выбрать суру для чтения" },
            @{ command = "ayah"; description = "📝 Найти аят по номеру" },
            @{ command = "juz"; description = "📚 Чтение по джузам" },
            @{ command = "settings"; description = "⚙️ Настройки приложения" },
            @{ command = "progress"; description = "📊 Ваш прогресс чтения" },
            @{ command = "favorites"; description = "⭐ Избранные аяты" },
            @{ command = "random"; description = "🎲 Случайный аят" },
            @{ command = "tafsir"; description = "📚 Толкование аята" },
            @{ command = "prayer"; description = "🕌 Время намаза" },
            @{ command = "share"; description = "📤 Поделиться прогрессом" }
        )
    } | ConvertTo-Json -Depth 3

    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands" -Method Post -Body $commands -ContentType "application/json"
    Write-Host "✅ Команды установлены" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка установки команд: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Установка кнопки меню
Write-Host "🔘 Установка кнопки меню..." -ForegroundColor Yellow
try {
    $menuButton = @{
        menu_button = @{
            type = "web_app"
            text = "Читалка Корана"
            web_app = @{
                url = "https://quran-reader-telegram-rxsa.vercel.app"
            }
        }
    } | ConvertTo-Json -Depth 3

    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMenuButton" -Method Post -Body $menuButton -ContentType "application/json"
    Write-Host "✅ Кнопка меню установлена" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка установки кнопки меню: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Установка описания
Write-Host "📝 Установка описания бота..." -ForegroundColor Yellow
try {
    $description = @{
        description = "🕌 Читалка Корана с синхронизацией аудио и текста. Выберите суру, аят и наслаждайтесь чтением с подсветкой слов. Поддержка множественных чтецов, переводов и толкований."
    } | ConvertTo-Json

    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription" -Method Post -Body $description -ContentType "application/json"
    Write-Host "✅ Описание установлено" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка установки описания: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Установка краткого описания
Write-Host "📄 Установка краткого описания..." -ForegroundColor Yellow
try {
    $shortDescription = @{
        short_description = "🕌 Читалка Корана с аудио синхронизацией"
    } | ConvertTo-Json

    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMyShortDescription" -Method Post -Body $shortDescription -ContentType "application/json"
    Write-Host "✅ Краткое описание установлено" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка установки краткого описания: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Получение информации о боте
Write-Host "📋 Информация о боте:" -ForegroundColor Yellow
try {
    $botInfo = Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/getMe" -Method Get
    Write-Host "Имя бота: $($botInfo.result.first_name)" -ForegroundColor Cyan
    Write-Host "Username: @$($botInfo.result.username)" -ForegroundColor Cyan
    Write-Host "ID: $($botInfo.result.id)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Ошибка получения информации о боте: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Настройка бота завершена!" -ForegroundColor Green
Write-Host "🔗 Ссылка на бота: https://t.me/$($botInfo.result.username)" -ForegroundColor Cyan
Write-Host "`n📱 Теперь пользователи могут:" -ForegroundColor Yellow
Write-Host "• Использовать команды для навигации" -ForegroundColor White
Write-Host "• Открывать читалку через кнопку меню" -ForegroundColor White
Write-Host "• Получать уведомления и напоминания" -ForegroundColor White
Write-Host "• Отслеживать прогресс чтения" -ForegroundColor White
Write-Host "• Добавлять аяты в избранное" -ForegroundColor White
Write-Host "• Получать толкования и переводы" -ForegroundColor White
Write-Host "• Узнавать время намаза" -ForegroundColor White
Write-Host "• Делиться прогрессом с друзьями" -ForegroundColor White
