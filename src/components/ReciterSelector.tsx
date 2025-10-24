import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Globe, Star } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const ReciterSelector: React.FC = () => {
  const { settings, updateSettings, reciters } = useAppStore();

  const handleReciterChange = (reciterId: string) => {
    updateSettings({ selectedReciter: reciterId });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Выбор чтеца</h3>
          <p className="text-sm text-gray-600">Выберите одного из 5 чтецов</p>
        </div>
      </div>

      <div className="space-y-3">
        {reciters.map((reciter) => (
          <motion.button
            key={reciter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleReciterChange(reciter.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              settings.selectedReciter === reciter.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{reciter.name}</h4>
                  {reciter.id === 'abdul_basit' && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{reciter.nameArabic}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{reciter.country}</span>
                  </div>
                  <div className="text-xs text-gray-500">{reciter.style}</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  settings.selectedReciter === reciter.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {settings.selectedReciter === reciter.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Информация о чтецах:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• <strong>Абдул-Басит</strong> - классический стиль, медленное чтение</p>
          <p>• <strong>Мишари Рашид</strong> - современный стиль, четкое произношение</p>
          <p>• <strong>Саад аль-Гамиди</strong> - эмоциональное чтение, хорошая дикция</p>
          <p>• <strong>Магер аль-Муайкли</strong> - спокойный стиль, размеренное чтение</p>
          <p>• <strong>Судайс и Шурайм</strong> - дуэтное чтение, гармоничное звучание</p>
        </div>
      </div>
    </div>
  );
};
