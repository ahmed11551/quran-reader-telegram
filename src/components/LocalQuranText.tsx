import React from 'react';
import { useAppStore } from '../store/appStore';
import { localSurahs } from '../data/localQuranData';

export const LocalQuranText: React.FC = () => {
  const { currentSurah, currentAyah, settings } = useAppStore();
  
  const currentSurahData = localSurahs.find(s => s.id === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  if (!currentSurahData || !currentAyahData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <p>Аят не найден</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Surah Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentSurahData.nameArabic}
        </h2>
        <p className="text-lg text-gray-700 mb-1">
          {currentSurahData.name} ({currentSurahData.translation})
        </p>
        <p className="text-sm text-gray-500">
          {currentSurahData.revelationType === 'meccan' ? 'Мекканская' : 'Мединская'} сура • 
          Аят {currentAyahData.number} из {currentSurahData.totalAyahs}
        </p>
      </div>

      {/* Arabic Text */}
      <div className="mb-6">
        <div className="text-right text-3xl leading-relaxed font-amiri text-gray-900 mb-4">
          {currentAyahData.text}
        </div>
      </div>

      {/* Translation */}
      {settings.showTranslation && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Перевод:</h3>
          <p className="text-gray-700 leading-relaxed">
            {currentAyahData.translation}
          </p>
        </div>
      )}

      {/* Transliteration */}
      {settings.showTransliteration && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Транслитерация:</h3>
          <p className="text-gray-600 italic leading-relaxed">
            {currentAyahData.transliteration}
          </p>
        </div>
      )}

      {/* Tafsir */}
      {settings.showTafsir && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Толкование:</h3>
          <p className="text-gray-700 leading-relaxed">
            {currentAyahData.tafsir}
          </p>
        </div>
      )}

      {/* Word by Word */}
      {settings.showTransliteration && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Слово за словом:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentAyahData.words.map((word) => (
              <div key={word.id} className="bg-gray-50 rounded-lg p-4">
                <div className="text-right text-xl font-amiri text-gray-900 mb-2">
                  {word.text}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <strong>Перевод:</strong> {word.translation}
                </div>
                <div className="text-sm text-gray-500">
                  <strong>Транслитерация:</strong> {word.transliteration}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {word.startTime.toFixed(1)}s - {word.endTime.toFixed(1)}s
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Data Notice */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Данные предоставлены локальной базой Корана
        </p>
      </div>
    </div>
  );
};
