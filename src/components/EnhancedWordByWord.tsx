import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const EnhancedWordByWord: React.FC = () => {
  const { currentSurah, currentAyah } = useAppStore();
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentSurahData = fullQuranData.find(s => s.id === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);
  const currentWords = currentAyahData?.words || [];

  // Синхронизация слов с аудио
  useEffect(() => {
    if (isPlaying && currentWords.length > 0) {
      const currentWord = currentWords.find(
        (word) => currentTime >= word.startTime && currentTime <= word.endTime
      );
      
      if (currentWord) {
        const wordIndex = currentWords.indexOf(currentWord);
        if (wordIndex !== currentWordIndex) {
          setCurrentWordIndex(wordIndex);
        }
      }
    }
  }, [currentTime, isPlaying, currentWords, currentWordIndex]);

  // Воспроизведение конкретного слова
  const playWord = (wordIndex: number) => {
    if (!audioRef.current || !currentWords[wordIndex]) return;
    
    const word = currentWords[wordIndex];
    audioRef.current.currentTime = word.startTime;
    setCurrentWordIndex(wordIndex);
    
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Форматирование времени
  const formatTime = (time: number) => {
    return `${time.toFixed(1)}s`;
  };

  if (!currentSurahData || !currentAyahData) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-2xl font-bold mb-1 flex items-center">
              <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Слово за словом
            </h2>
            <p className="text-purple-100 text-sm md:text-base">
              {currentSurahData.nameArabic} • Аят {currentAyahData.number}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl md:text-3xl font-bold">{currentWords.length}</div>
            <div className="text-xs md:text-sm text-purple-100">слов</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Синхронизация с аудио</span>
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
            <span>Индивидуальное воспроизведение</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWordByWord(!showWordByWord)}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 rounded-xl transition-colors"
          >
            {showWordByWord ? (
              <EyeOff className="w-5 h-5 text-purple-600" />
            ) : (
              <Eye className="w-5 h-5 text-purple-600" />
            )}
            <span className="text-purple-700 font-medium">
              {showWordByWord ? 'Скрыть слова' : 'Показать слова'}
            </span>
          </motion.button>
        </div>

        {/* Word by Word Display */}
        <AnimatePresence>
          {showWordByWord && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {currentWords.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl p-4 shadow-lg border-2 transition-all ${
                    index === currentWordIndex
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Arabic Text */}
                    <div className="flex-1 text-right">
                      <div className="text-2xl md:text-3xl font-amiri text-gray-900 mb-2" dir="rtl">
                        {word.text}
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => playWord(index)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          index === currentWordIndex
                            ? 'bg-purple-500 text-white'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Translation and Transliteration */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">Перевод:</h4>
                      <p className="text-blue-800">{word.translation}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-green-900 mb-1">Транслитерация:</h4>
                      <p className="text-green-800 italic">{word.transliteration}</p>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-1">
                      {formatTime(word.startTime)} - {formatTime(word.endTime)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Слово {index + 1} из {currentWords.length}
                    </div>
                  </div>

                  {/* Progress Bar for Current Word */}
                  {index === currentWordIndex && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${((currentTime - word.startTime) / (word.endTime - word.startTime)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Информация об аяте:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="text-center">
              <div className="font-bold text-gray-700">{currentWords.length}</div>
              <div className="text-gray-500">Слов</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-700">{formatTime(currentWords[currentWords.length - 1]?.endTime || 0)}</div>
              <div className="text-gray-500">Длительность</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-700">{currentSurahData.nameArabic}</div>
              <div className="text-gray-500">Сура</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-700">{currentAyahData.number}</div>
              <div className="text-gray-500">Аят</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Кликните на кнопку воспроизведения для прослушивания конкретного слова
          </p>
        </div>
      </div>

      {/* Hidden Audio Element for Word Playback */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};
