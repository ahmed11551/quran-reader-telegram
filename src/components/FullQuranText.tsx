import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Volume2, Eye, EyeOff, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const FullQuranText: React.FC = () => {
  const { currentSurah, currentAyah } = useAppStore();
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [expandedTafsir, setExpandedTafsir] = useState(false);
  
  const currentSurahData = fullQuranData.find(s => s.id === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  if (!currentSurahData || !currentAyahData) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center"
      >
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Аят не найден</h3>
        <p className="text-gray-600 text-sm md:text-base">Выберите другую суру или аят</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-2xl font-bold mb-1 truncate">{currentSurahData.nameArabic}</h2>
            <p className="text-green-100 text-sm md:text-base truncate">{currentSurahData.name} ({currentSurahData.nameTranslation})</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl md:text-3xl font-bold">{currentAyahData.number}</div>
            <div className="text-xs md:text-sm text-green-100">из {currentSurahData.totalAyahs}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>{currentSurahData.revelationType === 'meccan' ? 'Мекканская' : 'Мединская'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
            <span>{currentSurahData.totalAyahs} аятов</span>
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
            <span>Джуз {currentSurahData.juz}</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Arabic Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 md:mb-8"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
            <div className="text-2xl md:text-4xl leading-relaxed font-amiri text-gray-900 mb-3 md:mb-4" dir="rtl">
              {currentAyahData.text}
            </div>
            <div className="text-xs md:text-sm text-gray-500">Аят {currentAyahData.number}</div>
          </div>
        </motion.div>

        {/* Translation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 md:mb-6"
        >
          <div className="bg-blue-50 rounded-xl md:rounded-xl p-4 md:p-6 border-l-4 border-blue-500">
            <h3 className="text-base md:text-lg font-semibold text-blue-900 mb-2 md:mb-3 flex items-center">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Перевод
            </h3>
            <p className="text-blue-800 leading-relaxed text-sm md:text-lg">
              {currentAyahData.translation}
            </p>
          </div>
        </motion.div>

        {/* Transliteration */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 md:mb-6"
        >
          <div className="bg-green-50 rounded-xl md:rounded-xl p-4 md:p-6 border-l-4 border-green-500">
            <h3 className="text-base md:text-lg font-semibold text-green-900 mb-2 md:mb-3 flex items-center">
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Транслитерация
            </h3>
            <p className="text-green-800 leading-relaxed italic text-sm md:text-lg">
              {currentAyahData.transliteration}
            </p>
          </div>
        </motion.div>

        {/* Tafsir */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 md:mb-6"
        >
          <div className="bg-purple-50 rounded-xl md:rounded-xl p-4 md:p-6 border-l-4 border-purple-500">
            <button
              onClick={() => setExpandedTafsir(!expandedTafsir)}
              className="w-full text-left"
            >
              <h3 className="text-base md:text-lg font-semibold text-purple-900 mb-2 md:mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Толкование (Тафсир)
                </div>
                {expandedTafsir ? (
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </h3>
            </button>
            
            <AnimatePresence>
              {expandedTafsir && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="text-purple-800 leading-relaxed text-sm md:text-base">
                    {currentAyahData.tafsir}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Word by Word */}
        <AnimatePresence>
          {showWordByWord && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 md:mt-6"
            >
              <div className="bg-gray-50 rounded-xl md:rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Слово за словом
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {currentAyahData.words.map((word, index) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg md:rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-right text-lg md:text-xl font-amiri text-gray-900 mb-2" dir="rtl">
                        {word.text}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 mb-1">
                        <strong>Перевод:</strong> {word.translation}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 mb-2">
                        <strong>Транслитерация:</strong> {word.transliteration}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-1">
                          {word.startTime.toFixed(1)}s - {word.endTime.toFixed(1)}s
                        </div>
                        <button
                          onClick={() => {
                            // Здесь можно добавить воспроизведение конкретного слова
                            console.log(`Playing word: ${word.text}`);
                          }}
                          className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Word by Word */}
        <div className="flex justify-center mt-4 md:mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWordByWord(!showWordByWord)}
            className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            {showWordByWord ? (
              <EyeOff className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            ) : (
              <Eye className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            )}
            <span className="text-gray-700 font-medium text-sm md:text-base">
              {showWordByWord ? 'Скрыть слова' : 'Показать слова'}
            </span>
          </motion.button>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            Полная база данных Корана с переводами и транслитерациями
          </p>
        </div>
      </div>
    </motion.div>
  );
};
