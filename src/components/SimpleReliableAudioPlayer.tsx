import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SimpleReliableAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  const { 
    currentSurah, 
    currentAyah,
    settings, 
    updateSettings,
    reciters
  } = useAppStore();

  const currentReciter = reciters.find(r => r.id === settings.selectedReciter);

  // Получение всех источников аудио для текущего чтеца
  const getAudioSources = useCallback(() => {
    const surahNumber = currentSurah.toString().padStart(3, '0');
    
    const reciterSources: { [key: string]: string[] } = {
      abdul_basit: [
        `https://server8.mp3quran.net/abd_basit/${surahNumber}.mp3`,
        `https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/${surahNumber}.mp3`,
        `https://verses.quran.com/Abdul_Basit_Murattal/mp3/${surahNumber}.mp3`
      ],
      mishary_rashid: [
        `https://server8.mp3quran.net/mishary_rashid/${surahNumber}.mp3`,
        `https://everyayah.com/data/Mishary_Rashid_Alafasy_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.misharyrashaad/${surahNumber}.mp3`,
        `https://verses.quran.com/Mishary_Rashid_Alafasy/mp3/${surahNumber}.mp3`
      ],
      saad_al_ghamdi: [
        `https://server8.mp3quran.net/saad_ghamdi/${surahNumber}.mp3`,
        `https://everyayah.com/data/Saad_Al_Ghamdi_192kbps/${surahNumber}.mp3`,
        `https://cdn.islamic.network/quran/audio-surah/128/ar.saadalghamdi/${surahNumber}.mp3`,
        `https://verses.quran.com/Saad_Al_Ghamdi/mp3/${surahNumber}.mp3`
      ]
    };
    
    return reciterSources[currentReciter?.id || 'abdul_basit'] || reciterSources.abdul_basit;
  }, [currentSurah, currentReciter]);

  // Попробовать следующий источник
  const tryNextSource = useCallback(() => {
    const sources = getAudioSources();
    const nextIndex = (currentSourceIndex + 1) % sources.length;
    
    if (nextIndex !== currentSourceIndex) {
      setCurrentSourceIndex(nextIndex);
      setError(null);
      setIsLoading(true);
      
      if (audioRef.current) {
        audioRef.current.src = sources[nextIndex];
        audioRef.current.load();
      }
    } else {
      setError('Все источники аудио недоступны');
    }
  }, [getAudioSources, currentSourceIndex]);

  // Воспроизведение/пауза
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const sources = getAudioSources();
        const currentSource = sources[currentSourceIndex];
        
        if (audioRef.current.src !== currentSource) {
          audioRef.current.src = currentSource;
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Audio error:', err);
      setError('Ошибка воспроизведения');
      setIsLoading(false);
      setIsPlaying(false);
      tryNextSource();
    }
  };

  // Перемотка
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Громкость
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Скорость
  const handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      updateSettings({ playbackSpeed: speed });
    }
  };

  // Переход к предыдущему/следующему аяту
  const goToPreviousAyah = () => {
    // Логика перехода к предыдущему аяту
    console.log('Previous ayah');
  };

  const goToNextAyah = () => {
    // Логика перехода к следующему аяту
    console.log('Next ayah');
  };

  // Форматирование времени
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Обработчики событий аудио
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
      tryNextSource();
    };
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [tryNextSource]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            🎵 Аудио проигрыватель
          </h3>
          <p className="text-sm text-gray-600">
            {currentReciter?.name} • Сура {currentSurah} • Аят {currentAyah}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">
              Источник {currentSourceIndex + 1} из {getAudioSources().length}
            </span>
          </div>
        </div>
        
        {/* Speed Controls */}
        <div className="flex items-center space-x-2">
          {[0.5, 0.75, 1.0, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              onClick={() => handleSpeedChange(speed)}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-all ${
                settings.playbackSpeed === speed 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <VolumeX className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-red-800 font-medium">Ошибка воспроизведения</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button
              onClick={tryNextSource}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Попробовать другой источник
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-medium">{formatTime(currentTime)}</span>
          <span className="font-medium">{formatTime(duration)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Previous Ayah */}
          <button
            onClick={goToPreviousAyah}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <SkipBack className="w-5 h-5 text-gray-600" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7 ml-1" />
            )}
          </button>

          {/* Next Ayah */}
          <button
            onClick={goToNextAyah}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <SkipForward className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-gray-500 w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Источники аудио: {getAudioSources().length}</span>
          <span>Скорость: {settings.playbackSpeed}x</span>
          <span>Громкость: {Math.round(volume * 100)}%</span>
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
