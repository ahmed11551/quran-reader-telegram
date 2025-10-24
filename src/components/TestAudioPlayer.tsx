// Простой тестовый аудио компонент для проверки работы
import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export const TestAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Audio error:', err);
          setError('Ошибка воспроизведения аудио');
        });
    }
  };

  const handleError = () => {
    setError('Не удалось загрузить аудио');
    setIsPlaying(false);
  };

  const handleCanPlay = () => {
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Тест аудио</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              if (audioRef.current) {
                audioRef.current.load();
              }
            }}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Попробовать снова
          </button>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <div className="flex-1">
          <p className="text-sm text-gray-600">Тестовое аудио</p>
          <p className="text-xs text-gray-500">Проверка работы проигрывателя</p>
        </div>

        <Volume2 className="w-5 h-5 text-gray-400" />
      </div>

      <audio
        ref={audioRef}
        onError={handleError}
        onCanPlay={handleCanPlay}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      >
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио элемент.
      </audio>
    </div>
  );
};
