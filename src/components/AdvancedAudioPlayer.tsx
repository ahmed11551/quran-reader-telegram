import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, RotateCcw, RotateCw } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useRealTimingService, TajweedTiming } from '../services/realTimingService';

export const AdvancedAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(1);
  const [wordTimings, setWordTimings] = useState<TajweedTiming[]>([]);

  const { 
    currentSurah, 
    currentAyah,
    settings, 
    updateSettings,
    reciters,
    setCurrentWord: setGlobalCurrentWord
  } = useAppStore();

  const { getWordTimings, getCurrentWord } = useRealTimingService();
  const currentReciter = reciters.find(r => r.id === settings.selectedReciter);

  // Загрузка таймкодов при смене суры или чтеца
  useEffect(() => {
    const loadTimings = async () => {
      if (!currentReciter) return;
      
      try {
        const timings = await getWordTimings(
          currentSurah, 
          currentReciter.id, 
          settings.playbackSpeed
        );
        setWordTimings(timings);
      } catch (error) {
        console.error('Error loading timings:', error);
      }
    };

    loadTimings();
  }, [currentSurah, currentReciter, settings.playbackSpeed, getWordTimings]);

  // Обновление текущего слова при воспроизведении
  useEffect(() => {
    if (isPlaying && wordTimings.length > 0) {
      const wordId = getCurrentWord(wordTimings, currentTime);
      if (wordId !== currentWord) {
        setCurrentWord(wordId);
        setGlobalCurrentWord(wordId);
      }
    }
  }, [currentTime, isPlaying, wordTimings, currentWord, getCurrentWord, setGlobalCurrentWord]);

  // Получение URL аудио с несколькими источниками
  const getAudioUrl = useCallback(() => {
    const surahNumber = currentSurah.toString().padStart(3, '0');
    
    // Используем разные источники для разных чтецов
    const reciterSources: { [key: string]: string[] } = {
      abdul_basit: [
        `https://server8.mp3quran.net/abd_basit/${surahNumber}.mp3`,
        `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surahNumber}.mp3`
      ],
      mishary_rashid: [
        `https://server8.mp3quran.net/mishary_rashid/${surahNumber}.mp3`,
        `https://everyayah.com/data/Mishary_Rashid_Alafasy_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.misharyrashaad/${surahNumber}.mp3`
      ],
      saad_al_ghamdi: [
        `https://server8.mp3quran.net/saad_ghamdi/${surahNumber}.mp3`,
        `https://everyayah.com/data/Saad_Al_Ghamdi_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.saadalghamdi/${surahNumber}.mp3`
      ]
    };
    
    const sources = reciterSources[currentReciter?.id || 'abdul_basit'] || reciterSources.abdul_basit;
    return sources[0];
  }, [currentSurah, currentReciter]);

  const getAlternativeUrl = useCallback((currentUrl: string) => {
    const surahNumber = currentSurah.toString().padStart(3, '0');
    
    if (currentUrl.includes('server8.mp3quran.net')) {
      return `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahNumber}.mp3`;
    } else if (currentUrl.includes('everyayah.com')) {
      return `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surahNumber}.mp3`;
    } else if (currentUrl.includes('islamic.network')) {
      return `https://verses.quran.com/Abdul_Basit_Murattal/mp3/${surahNumber}.mp3`;
    } else {
      return `https://server8.mp3quran.net/abd_basit/${surahNumber}.mp3`;
    }
  }, [currentSurah]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const newUrl = getAudioUrl();
        if (audioRef.current.src !== newUrl) {
          audioRef.current.src = newUrl;
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Audio error:', err);
      setError('Ошибка воспроизведения аудио');
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const volume = parseFloat(e.target.value);
    audioRef.current.volume = volume;
  };

  const handleSpeedChange = async (speed: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.playbackRate = speed;
    updateSettings({ playbackSpeed: speed });
    
    // Перезагружаем таймкоды для новой скорости
    if (currentReciter) {
      try {
        const timings = await getWordTimings(currentSurah, currentReciter.id, speed);
        setWordTimings(timings);
      } catch (error) {
        console.error('Error reloading timings:', error);
      }
    }
  };

  const seekToWord = (wordId: number) => {
    if (!audioRef.current || wordTimings.length === 0) return;
    
    const wordTiming = wordTimings.find(t => t.wordId === wordId);
    if (wordTiming) {
      audioRef.current.currentTime = wordTiming.startTime;
      setCurrentTime(wordTiming.startTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };
    const handleError = () => {
      console.error('Audio error occurred');
      const currentUrl = audio.src;
      const alternativeUrl = getAlternativeUrl(currentUrl);
      
      if (alternativeUrl !== currentUrl) {
        console.log('Trying alternative URL:', alternativeUrl);
        audio.src = alternativeUrl;
        audio.load();
        setError(null);
      } else {
        setError('Ошибка загрузки аудио');
        setIsLoading(false);
        setIsPlaying(false);
      }
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [getAlternativeUrl]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Аудио проигрыватель</h3>
          <p className="text-sm text-gray-600">
            {currentReciter?.name} • Сура {currentSurah} • Аят {currentAyah}
          </p>
          {wordTimings.length > 0 && (
            <p className="text-xs text-green-600">
              ✓ Таймкоды проанализированы автоматически ({wordTimings.length} слов)
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSpeedChange(0.5)}
            className={`px-2 py-1 text-xs rounded ${
              settings.playbackSpeed === 0.5 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            0.5x
          </button>
          <button
            onClick={() => handleSpeedChange(1.0)}
            className={`px-2 py-1 text-xs rounded ${
              settings.playbackSpeed === 1.0 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            1.0x
          </button>
          <button
            onClick={() => handleSpeedChange(1.5)}
            className={`px-2 py-1 text-xs rounded ${
              settings.playbackSpeed === 1.5 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            1.5x
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
          <div className="mt-3 space-x-2">
            <button
              onClick={() => {
                setError(null);
                if (audioRef.current) {
                  audioRef.current.load();
                }
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Попробовать снова
            </button>
            <button
              onClick={() => {
                if (audioRef.current) {
                  const currentUrl = audioRef.current.src;
                  const alternativeUrl = getAlternativeUrl(currentUrl);
                  audioRef.current.src = alternativeUrl;
                  audioRef.current.load();
                  setError(null);
                }
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Другой источник
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <div className="flex items-center space-x-2">
            <RotateCcw className="w-4 h-4 text-gray-400" />
            <RotateCw className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Word Navigation */}
      {wordTimings.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Текущее слово: {currentWord} из {wordTimings.length}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => seekToWord(Math.max(1, currentWord - 1))}
              className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            >
              ← Предыдущее
            </button>
            <button
              onClick={() => seekToWord(Math.min(wordTimings.length, currentWord + 1))}
              className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
            >
              Следующее →
            </button>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
      >
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
};
