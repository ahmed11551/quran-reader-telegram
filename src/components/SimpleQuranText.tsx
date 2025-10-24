import React from 'react';
import { useAppStore } from '../store/appStore';

export const SimpleQuranText: React.FC = () => {
  const { currentSurah, currentAyah, surahs } = useAppStore();
  
  const currentSurahData = surahs.find(s => s.number === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  if (!currentSurahData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <p>Выберите суру для чтения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentSurahData.nameTransliteration}
        </h2>
        <p className="text-gray-600">
          {currentSurahData.nameTranslation} • {currentSurahData.totalAyahs} аятов
        </p>
        <p className="text-sm text-gray-500">
          {currentSurahData.revelationType === 'meccan' ? 'Мекканская сура' : 'Мединская сура'}
        </p>
      </div>

      {currentAyahData ? (
        <div className="space-y-4">
          <div className="text-right text-2xl leading-relaxed font-arabic">
            {currentAyahData.text}
          </div>
          
          <div className="border-t pt-4">
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Аят {currentAyahData.number}:</span> {currentAyahData.translation}
            </p>
            
            {currentAyahData.tafsir && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Толкование:</span> {currentAyahData.tafsir}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Аят не найден</p>
        </div>
      )}
    </div>
  );
};
