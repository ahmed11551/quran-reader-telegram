# Simple Bot Commands Setup
$BOT_TOKEN = "8273285635:AAH2W47-WkEGqYRWtCxlgdPl2_B8Pwwapz0"

Write-Host "Setting up bot commands..." -ForegroundColor Green

# Set bot commands
$commands = @{
    commands = @(
        @{ command = "start"; description = "Start Quran Reader" },
        @{ command = "help"; description = "Get help" },
        @{ command = "surah"; description = "Select surah" },
        @{ command = "ayah"; description = "Find ayah" },
        @{ command = "progress"; description = "View progress" },
        @{ command = "favorites"; description = "Favorites" },
        @{ command = "settings"; description = "Settings" }
    )
} | ConvertTo-Json -Depth 3

try {
    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands" -Method Post -Body $commands -ContentType "application/json"
    Write-Host "Commands set successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Set menu button
$menuButton = @{
    menu_button = @{
        type = "web_app"
        text = "Quran Reader"
        web_app = @{
            url = "https://quran-reader-telegram-rxsa.vercel.app"
        }
    }
} | ConvertTo-Json -Depth 3

try {
    Invoke-RestMethod -Uri "https://api.telegram.org/bot${BOT_TOKEN}/setMenuButton" -Method Post -Body $menuButton -ContentType "application/json"
    Write-Host "Menu button set successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Bot setup completed!" -ForegroundColor Cyan
