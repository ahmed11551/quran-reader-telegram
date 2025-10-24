#!/bin/bash

# Скрипт для загрузки аудио файлов Корана
# Создаем папку для аудио файлов
mkdir -p public/audio

echo "🎵 Загружаем аудио файлы Корана..."

# Функция для загрузки файла
download_file() {
    local url=$1
    local filename=$2
    local surah_num=$3
    
    echo "Загружаем суру $surah_num..."
    
    # Пробуем разные источники
    sources=(
        "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surah_num}.mp3"
        "https://server8.mp3quran.net/abd_basit/${surah_num}.mp3"
        "https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surah_num}.mp3"
    )
    
    for source in "${sources[@]}"; do
        echo "Пробуем источник: $source"
        if curl -L --fail --silent --show-error "$source" -o "public/audio/${filename}" --max-time 30; then
            echo "✅ Сура $surah_num загружена успешно"
            return 0
        else
            echo "❌ Ошибка загрузки с $source"
        fi
    done
    
    echo "❌ Не удалось загрузить суру $surah_num"
    return 1
}

# Загружаем первые 10 сур для тестирования
for i in {1..10}; do
    surah_num=$(printf "%03d" $i)
    filename="surah_${surah_num}.mp3"
    
    if [ ! -f "public/audio/${filename}" ]; then
        download_file "" "$filename" "$surah_num"
        sleep 1  # Небольшая пауза между загрузками
    else
        echo "✅ Сура $i уже существует"
    fi
done

echo "🎉 Загрузка завершена!"
echo "📁 Файлы сохранены в: public/audio/"
echo "📊 Проверьте содержимое папки:"
ls -la public/audio/
