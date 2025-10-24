import React, { useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { juzs } from '../data/quranData';

export const JuzNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentSurah, setCurrentAyah } = useAppStore();

  const handleJuzSelect = (juz: any) => {
    setCurrentSurah(juz.startSurah);
    setCurrentAyah(juz.startAyah);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Чтение по джузам</h3>
            <p className="text-sm text-gray-600">
              Выберите джуз (часть Корана) для чтения
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
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {juzs.map(juz => (
            <button
              key={juz.id}
              onClick={() => handleJuzSelect(juz)}
              className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">
                    Джуз {juz.id}: {juz.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    Сура {juz.startSurah}, Аят {juz.startAyah} - Сура {juz.endSurah}, Аят {juz.endAyah}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
