# PowerShell скрипт для загрузки аудио файлов Корана
# Создаем папку для аудио файлов
if (!(Test-Path "public\audio")) {
    New-Item -ItemType Directory -Path "public\audio" -Force
}

Write-Host "🎵 Загружаем аудио файлы Корана..." -ForegroundColor Green

# Функция для загрузки файла
function Download-File {
    param(
        [string]$Url,
        [string]$Filename,
        [int]$SurahNum
    )
    
    Write-Host "Загружаем суру $SurahNum..." -ForegroundColor Yellow
    
    # Пробуем разные источники
    $sources = @(
        "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/$($SurahNum.ToString('000')).mp3",
        "https://server8.mp3quran.net/abd_basit/$($SurahNum.ToString('000')).mp3",
        "https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/$($SurahNum.ToString('000')).mp3"
    )
    
    foreach ($source in $sources) {
        Write-Host "Пробуем источник: $source" -ForegroundColor Cyan
        try {
            Invoke-WebRequest -Uri $source -OutFile "public\audio\$Filename" -TimeoutSec 30
            Write-Host "✅ Сура $SurahNum загружена успешно" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "❌ Ошибка загрузки с $source" -ForegroundColor Red
        }
    }
    
    Write-Host "❌ Не удалось загрузить суру $SurahNum" -ForegroundColor Red
    return $false
}

# Загружаем первые 10 сур для тестирования
for ($i = 1; $i -le 10; $i++) {
    $surahNum = $i.ToString('000')
    $filename = "surah_$surahNum.mp3"
    
    if (!(Test-Path "public\audio\$filename")) {
        Download-File -Url "" -Filename $filename -SurahNum $i
        Start-Sleep -Seconds 1  # Небольшая пауза между загрузками
    }
    else {
        Write-Host "✅ Сура $i уже существует" -ForegroundColor Green
    }
}

Write-Host "🎉 Загрузка завершена!" -ForegroundColor Green
Write-Host "📁 Файлы сохранены в: public\audio\" -ForegroundColor Cyan
Write-Host "📊 Проверьте содержимое папки:" -ForegroundColor Cyan
Get-ChildItem "public\audio\" | Format-Table Name, Length, LastWriteTime
