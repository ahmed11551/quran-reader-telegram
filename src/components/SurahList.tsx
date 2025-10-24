import React, { useState } from 'react';
import { BookOpen, ChevronRight, Play } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SurahList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentSurah, setCurrentAyah, surahs } = useAppStore();

  const handleSurahSelect = (surahNumber: number) => {
    setCurrentSurah(surahNumber);
    setCurrentAyah(1);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Все суры Корана</h3>
            <p className="text-sm text-gray-600">
              Выберите суру для чтения ({surahs.length} сур)
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {surahs.map(surah => (
            <button
              key={surah.id}
              onClick={() => handleSurahSelect(surah.number)}
              className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {surah.number}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {surah.nameTransliteration}
                    </div>
                    <div className="text-xs text-gray-600">
                      {surah.nameTranslation} • {surah.totalAyahs} аятов
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {surah.revelationType === 'meccan' ? 'Мекканская' : 'Мединская'}
                  </span>
                  <Play className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
