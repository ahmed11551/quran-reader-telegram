import React from 'react';
import { Bookmark, Clock, PlayCircle } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const ProgressTracker: React.FC = () => {
  const { progress, surahs } = useAppStore();
  
  const currentSurah = surahs.find(s => s.number === progress.surahId);
  
  const totalWords = surahs.reduce((total, surah) => 
    total + surah.ayahs.reduce((ayahTotal, ayah) => 
      ayahTotal + ayah.words.length, 0), 0
  );
  
  const completedWords = surahs.reduce((total, surah) => {
    if (surah.number < progress.surahId) {
      return total + surah.ayahs.reduce((ayahTotal, ayah) => 
        ayahTotal + ayah.words.length, 0);
    } else if (surah.number === progress.surahId) {
      return total + surah.ayahs.reduce((ayahTotal, ayah) => {
        if (ayah.number < progress.ayahId) {
          return ayahTotal + ayah.words.length;
        } else if (ayah.number === progress.ayahId) {
          return ayahTotal + progress.wordId - 1;
        }
        return ayahTotal;
      }, 0);
    }
    return total;
  }, 0);
  
  const progressPercentage = totalWords > 0 ? (completedWords / totalWords) * 100 : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Bookmark className="w-5 h-5 mr-2 text-primary-600" />
          Прогресс чтения
        </h3>
        <span className="text-sm text-gray-600">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Current Position */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <PlayCircle className="w-4 h-4 mr-1" />
            <span>
              Сура {progress.surahId}, Аят {progress.ayahId}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {completedWords} из {totalWords} слов
            </span>
          </div>
        </div>
        
        {/* Surah Progress */}
        {currentSurah && (
          <div className="text-xs text-gray-500">
            {currentSurah.nameTranslation}: {progress.ayahId} из {currentSurah.totalAyahs} аятов
          </div>
        )}
      </div>
    </div>
  );
};
