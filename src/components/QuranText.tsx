import React from 'react';
import { useAppStore } from '../store/appStore';
import { Word } from '../types';

interface QuranTextProps {
  surahId: number;
  ayahId: number;
  onWordClick?: (word: Word) => void;
}

export const QuranText: React.FC<QuranTextProps> = ({ 
  surahId, 
  ayahId, 
  onWordClick 
}) => {
  const { 
    currentWord, 
    settings, 
    surahs 
  } = useAppStore();

  const surah = surahs.find(s => s.number === surahId);
  const ayah = surah?.ayahs.find(a => a.number === ayahId);

  if (!ayah) {
    return (
      <div className="text-center text-gray-500 py-8">
        Аят не найден
      </div>
    );
  }

  const getWordClassName = (word: Word) => {
    const baseClass = "cursor-pointer transition-all duration-200 hover:bg-yellow-100";
    
    if (word.id === currentWord) {
      return `${baseClass} word-current`;
    }
    
    return `${baseClass} word-highlight`;
  };

  const getScriptVariantClass = () => {
    switch (settings.scriptVariant) {
      case 'indopak':
        return 'font-indopak';
      case 'uthmani':
        return 'font-uthmani';
      case 'custom':
        return 'font-custom';
      default:
        return 'font-uthmani';
    }
  };

  return (
    <div className="space-y-4">
      {/* Ayah Number */}
      <div className="text-center">
        <span className="ayah-number">{ayah.number}</span>
      </div>

      {/* Arabic Text */}
      <div className={`quran-text ${getScriptVariantClass()} text-center leading-relaxed`}>
        {ayah.words.map((word, index) => (
          <span
            key={word.id}
            className={getWordClassName(word)}
            onClick={() => onWordClick?.(word)}
            title={`${word.transliteration || ''} - ${word.translation || ''}`}
          >
            {word.text}
            {index < ayah.words.length - 1 && ' '}
          </span>
        ))}
      </div>

      {/* Transliteration */}
      {settings.showTransliteration && (
        <div className="text-center text-gray-600 italic text-sm leading-relaxed">
          {ayah.words.map((word, index) => (
            <span key={word.id}>
              {word.transliteration || word.text}
              {index < ayah.words.length - 1 && ' '}
            </span>
          ))}
        </div>
      )}

      {/* Translation */}
      {settings.showTranslation && ayah.translation && (
        <div className="text-center text-gray-700 text-sm leading-relaxed">
          {ayah.translation}
        </div>
      )}

      {/* Tafsir */}
      {settings.showTafsir && ayah.tafsir && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 leading-relaxed">
          <div className="font-semibold text-gray-800 mb-2">Толкование:</div>
          {ayah.tafsir}
        </div>
      )}
    </div>
  );
};
