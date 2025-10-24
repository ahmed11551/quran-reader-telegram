# 🎵 Загрузка аудио файлов Корана

## Быстрый старт

### 1. Запустите скрипт загрузки

**Для Windows (PowerShell):**
```powershell
.\download_audio.ps1
```

**Для Linux/Mac (Bash):**
```bash
chmod +x download_audio.sh
./download_audio.sh
```

### 2. Ручная загрузка

Если скрипт не работает, загрузите файлы вручную:

1. **Создайте папку:** `public/audio/`
2. **Загрузите файлы** с одного из источников:
   - https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/
   - https://server8.mp3quran.net/abd_basit/
   - https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/

3. **Переименуйте файлы** в формат: `surah_001.mp3`, `surah_002.mp3`, и т.д.

### 3. Структура файлов

```
public/
└── audio/
    ├── surah_001.mp3  # Аль-Фатиха
    ├── surah_002.mp3  # Аль-Бакара
    ├── surah_003.mp3  # Али Имран
    └── ...
    └── surah_114.mp3  # Ан-Нас
```

## Источники аудио

### Рекомендуемые источники:

1. **EveryAyah.com** (самый надежный)
   - URL: `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/{номер}.mp3`
   - Качество: 192 kbps
   - Формат: MP3

2. **MP3Quran.net**
   - URL: `https://server8.mp3quran.net/abd_basit/{номер}.mp3`
   - Качество: Высокое
   - Формат: MP3

3. **Islamic.network**
   - URL: `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/{номер}.mp3`
   - Качество: 128 kbps
   - Формат: MP3

## Автоматическая загрузка

### PowerShell скрипт (Windows)

```powershell
# Загружает первые 10 сур
for ($i = 1; $i -le 10; $i++) {
    $surahNum = $i.ToString('000')
    $url = "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/$surahNum.mp3"
    $filename = "public\audio\surah_$surahNum.mp3"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $filename
        Write-Host "✅ Сура $i загружена" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Ошибка загрузки суры $i" -ForegroundColor Red
    }
}
```

### Bash скрипт (Linux/Mac)

```bash
# Загружает первые 10 сур
for i in {1..10}; do
    surah_num=$(printf "%03d" $i)
    url="https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surah_num}.mp3"
    filename="public/audio/surah_${surah_num}.mp3"
    
    if curl -L "$url" -o "$filename"; then
        echo "✅ Сура $i загружена"
    else
        echo "❌ Ошибка загрузки суры $i"
    fi
done
```

## Проверка загрузки

После загрузки проверьте:

1. **Папка создана:** `public/audio/`
2. **Файлы загружены:** `surah_001.mp3`, `surah_002.mp3`, и т.д.
3. **Размер файлов:** обычно 1-5 MB каждый
4. **Формат:** MP3

## Тестирование

1. **Запустите приложение:** `npm run dev`
2. **Откройте:** http://localhost:3000
3. **Проверьте аудио проигрыватель**
4. **Нажмите кнопку воспроизведения**

## Устранение проблем

### Проблема: Файлы не загружаются
- **Решение:** Проверьте интернет-соединение
- **Альтернатива:** Используйте другой источник

### Проблема: Аудио не воспроизводится
- **Решение:** Проверьте формат файлов (должен быть MP3)
- **Проверка:** Откройте файл в медиаплеере

### Проблема: CORS ошибки
- **Решение:** Используйте локальные файлы вместо внешних ссылок
- **Проверка:** Файлы должны быть в папке `public/audio/`

## Полная загрузка всех 114 сур

Для загрузки всех сур измените цикл:

**PowerShell:**
```powershell
for ($i = 1; $i -le 114; $i++) {
    # ... код загрузки
}
```

**Bash:**
```bash
for i in {1..114}; do
    # ... код загрузки
done
```

## Рекомендации

1. **Начните с первых 10 сур** для тестирования
2. **Используйте локальные файлы** для надежности
3. **Проверяйте качество** загруженных файлов
4. **Делайте резервные копии** аудио файлов

---

**Примечание:** Убедитесь, что у вас есть права на использование аудио файлов в вашем приложении.
