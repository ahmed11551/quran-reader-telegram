import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw, RotateCw } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SimpleAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    currentSurah, 
    settings, 
    updateSettings,
    reciters 
  } = useAppStore();

  const currentReciter = reciters.find(r => r.id === settings.selectedReciter);

  // Простые URL для тестирования с несколькими источниками
  const getAudioUrl = () => {
    const surahNumber = currentSurah.toString().padStart(3, '0');
    
    // Используем несколько источников для надежности
    const sources = [
      `https://server8.mp3quran.net/abd_basit/${surahNumber}.mp3`,
      `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahNumber}.mp3`,
      `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surahNumber}.mp3`
    ];
    
    return sources[0]; // Возвращаем основной источник
  };

  const getAlternativeUrl = (currentUrl: string) => {
    const surahNumber = currentSurah.toString().padStart(3, '0');
    
    if (currentUrl.includes('server8.mp3quran.net')) {
      return `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahNumber}.mp3`;
    } else if (currentUrl.includes('everyayah.com')) {
      return `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surahNumber}.mp3`;
    } else {
      return `https://server8.mp3quran.net/abd_basit/${surahNumber}.mp3`;
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        // Устанавливаем новый URL если нужно
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

  const handleSpeedChange = (speed: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    updateSettings({ playbackSpeed: speed });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Аудио проигрыватель</h3>
          <p className="text-sm text-gray-600">
            {currentReciter?.name} • Сура {currentSurah}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSpeedChange(0.5)}
            className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
          >
            0.5x
          </button>
          <button
            onClick={() => handleSpeedChange(1.0)}
            className="px-2 py-1 text-xs bg-primary-100 text-primary-600 rounded"
          >
            1.0x
          </button>
          <button
            onClick={() => handleSpeedChange(1.5)}
            className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
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
                // Переключиться на другой источник
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
