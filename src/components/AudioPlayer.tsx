import React from 'react';
import { Play, Pause, Volume2, RotateCcw, RotateCw } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useAppStore } from '../store/appStore';

export const AudioPlayer: React.FC = () => {
  const { 
    audioRef,
    currentTime,
    duration,
    isBuffering,
    togglePlayPause,
    seekTo,
    setVolume,
    setPlaybackSpeed,
  } = useAudioPlayer();

  const { 
    isPlaying, 
    settings, 
    updateSettings,
    currentSurah,
    currentAyah,
    surahs 
  } = useAppStore();

  const currentSurahData = surahs.find(s => s.number === currentSurah);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    updateSettings({ playbackSpeed: speed });
  };

  const skipBackward = () => {
    seekTo(Math.max(0, currentTime - 10));
  };

  const skipForward = () => {
    seekTo(Math.min(duration, currentTime + 10));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
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

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={skipBackward}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Назад на 10 сек"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={isBuffering}
          className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        <button
          onClick={skipForward}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Вперед на 10 сек"
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      {/* Volume and Speed Controls */}
      <div className="flex items-center justify-between space-x-4">
        {/* Volume */}
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-gray-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.8"
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Speed Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Скорость:</span>
          <div className="flex space-x-1">
            {[0.5, 0.75, 1.0, 1.25, 1.5].map(speed => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-1 text-xs rounded ${
                  settings.playbackSpeed === speed
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Surah/Ayah Info */}
      {currentSurahData && (
        <div className="text-center text-sm text-gray-600">
          Сура {currentSurahData.number}: {currentSurahData.nameTranslation} - Аят {currentAyah}
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};
