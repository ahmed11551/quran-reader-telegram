import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, List } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SurahNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentSurah, 
    setCurrentSurah, 
    currentAyah, 
    setCurrentAyah,
    surahs 
  } = useAppStore();

  const currentSurahData = surahs.find(s => s.number === currentSurah);

  const goToPreviousSurah = () => {
    if (currentSurah > 1) {
      setCurrentSurah(currentSurah - 1);
      setCurrentAyah(1);
    }
  };

  const goToNextSurah = () => {
    if (currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
      setCurrentAyah(1);
    }
  };

  const goToPreviousAyah = () => {
    if (currentAyah > 1) {
      setCurrentAyah(currentAyah - 1);
    } else if (currentSurah > 1) {
      const prevSurah = surahs.find(s => s.number === currentSurah - 1);
      if (prevSurah) {
        setCurrentSurah(currentSurah - 1);
        setCurrentAyah(prevSurah.totalAyahs);
      }
    }
  };

  const goToNextAyah = () => {
    if (currentSurahData && currentAyah < currentSurahData.totalAyahs) {
      setCurrentAyah(currentAyah + 1);
    } else if (currentSurah < 114) {
      setCurrentSurah(currentSurah + 1);
      setCurrentAyah(1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Current Surah Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <div>
            <h3 className="font-semibold text-gray-900">
              Сура {currentSurah}: {currentSurahData?.nameTranslation}
            </h3>
            <p className="text-sm text-gray-600">
              {currentSurahData?.name} • {currentSurahData?.totalAyahs} аятов
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Surah List */}
      {isOpen && (
        <div className="mb-4 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {surahs.map(surah => (
              <button
                key={surah.number}
                onClick={() => {
                  setCurrentSurah(surah.number);
                  setCurrentAyah(1);
                  setIsOpen(false);
                }}
                className={`p-2 text-left rounded-lg transition-colors ${
                  surah.number === currentSurah
                    ? 'bg-primary-100 text-primary-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">
                  {surah.number}. {surah.nameTranslation}
                </div>
                <div className="text-xs text-gray-600">
                  {surah.totalAyahs} аятов
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        {/* Previous Surah */}
        <button
          onClick={goToPreviousSurah}
          disabled={currentSurah === 1}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Предыдущая сура</span>
        </button>

        {/* Ayah Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousAyah}
            disabled={currentSurah === 1 && currentAyah === 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="text-sm font-medium">
              Аят {currentAyah}
            </div>
            <div className="text-xs text-gray-600">
              из {currentSurahData?.totalAyahs}
            </div>
          </div>
          
          <button
            onClick={goToNextAyah}
            disabled={currentSurah === 114 && currentAyah === (currentSurahData?.totalAyahs || 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Next Surah */}
        <button
          onClick={goToNextSurah}
          disabled={currentSurah === 114}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-sm">Следующая сура</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
