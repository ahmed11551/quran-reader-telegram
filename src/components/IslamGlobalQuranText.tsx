import React from 'react';
import { useAppStore } from '../store/appStore';

export const IslamGlobalQuranText: React.FC = () => {
  const { currentSurah, currentAyah, surahs } = useAppStore();
  
  const currentSurahData = surahs.find(s => s.number === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  if (!currentSurahData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <p>Выберите суру для чтения</p>
          <p className="text-sm mt-2">Данные предоставлены islam.global</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentSurahData.nameTransliteration}
          </h2>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Сура {currentSurah}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-lg text-gray-700 font-medium">
            {currentSurahData.nameTranslation}
          </p>
          <p className="text-sm text-gray-600">
            {currentSurahData.totalAyahs} аятов • 
            {currentSurahData.revelationType === 'meccan' ? ' Мекканская сура' : ' Мединская сура'}
          </p>
        </div>
      </div>

      {currentAyahData ? (
        <div className="space-y-6">
          {/* Арабский текст */}
          <div className="text-right text-3xl leading-relaxed font-arabic bg-gray-50 p-6 rounded-lg">
            {currentAyahData.text}
          </div>
          
          {/* Перевод */}
          <div className="border-l-4 border-primary-500 pl-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              <span className="font-semibold text-primary-600">Аят {currentAyahData.number}:</span> {currentAyahData.translation}
            </p>
          </div>
          
          {/* Транскрипция */}
          {currentAyahData.words && currentAyahData.words.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Транскрипция:</h4>
              <p className="text-blue-700 leading-relaxed">
                {currentAyahData.words.map(word => word.transliteration).join(' ')}
              </p>
            </div>
          )}
          
          {/* Толкование */}
          {currentAyahData.tafsir && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Толкование:</h4>
              <p className="text-green-700 leading-relaxed">
                {currentAyahData.tafsir}
              </p>
            </div>
          )}

          {/* Слова с переводами */}
          {currentAyahData.words && currentAyahData.words.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Слово за словом:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentAyahData.words.map((word) => (
                  <div key={word.id} className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="font-arabic text-lg">{word.text}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{word.transliteration}</div>
                      <div className="text-xs text-gray-500">{word.translation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Аят не найден</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Перевод и толкование предоставлены сайтом 
          <a href="https://islam.global" target="_blank" rel="noopener noreferrer" 
             className="text-primary-600 hover:text-primary-700 ml-1">
            islam.global
          </a>
        </p>
      </div>
    </div>
  );
};
