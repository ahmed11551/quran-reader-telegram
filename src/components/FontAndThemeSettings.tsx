import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Palette, Type, Sun, Moon, Monitor, X, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const FontAndThemeSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useAppStore();

  const fontSizes = [
    { value: 14, label: 'Маленький' },
    { value: 16, label: 'Обычный' },
    { value: 18, label: 'Средний' },
    { value: 20, label: 'Большой' },
    { value: 24, label: 'Очень большой' }
  ];

  const fontFamilies = [
    { value: 'amiri', label: 'Amiri (Классический)', preview: 'الفاتحة' },
    { value: 'scheherazade', label: 'Scheherazade (Современный)', preview: 'الفاتحة' },
    { value: 'system', label: 'Системный', preview: 'الفاتحة' }
  ];

  const themes = [
    { 
      id: 'light', 
      name: 'Светлая', 
      icon: Sun, 
      colors: { 
        bg: 'bg-white', 
        text: 'text-gray-900', 
        card: 'bg-gray-50',
        border: 'border-gray-200'
      } 
    },
    { 
      id: 'dark', 
      name: 'Темная', 
      icon: Moon, 
      colors: { 
        bg: 'bg-gray-900', 
        text: 'text-white', 
        card: 'bg-gray-800',
        border: 'border-gray-700'
      } 
    },
    { 
      id: 'sepia', 
      name: 'Сепия', 
      icon: Palette, 
      colors: { 
        bg: 'bg-amber-50', 
        text: 'text-amber-900', 
        card: 'bg-amber-100',
        border: 'border-amber-200'
      } 
    },
    { 
      id: 'green', 
      name: 'Зеленая', 
      icon: Palette, 
      colors: { 
        bg: 'bg-green-50', 
        text: 'text-green-900', 
        card: 'bg-green-100',
        border: 'border-green-200'
      } 
    }
  ];

  const handleFontSizeChange = (size: number) => {
    updateSettings({ fontSize: size });
  };

  const handleFontFamilyChange = (family: string) => {
    updateSettings({ fontFamily: family });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'sepia' | 'green') => {
    updateSettings({ theme });
  };

  const handleDisplaySettingsChange = (key: string, value: boolean) => {
    updateSettings({ [key]: value });
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Настройки отображения</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto space-y-6">
                {/* Font Size */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Type className="w-5 h-5 mr-2 text-purple-600" />
                    Размер шрифта
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {fontSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => handleFontSizeChange(size.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          settings.fontSize === size.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">{size.label}</div>
                          <div className="text-sm text-gray-500">{size.value}px</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Type className="w-5 h-5 mr-2 text-purple-600" />
                    Шрифт арабского текста
                  </h3>
                  <div className="space-y-3">
                    {fontFamilies.map((font) => (
                      <button
                        key={font.value}
                        onClick={() => handleFontFamilyChange(font.value)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          settings.fontFamily === font.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{font.label}</div>
                            <div className="text-sm text-gray-500">Пример текста</div>
                          </div>
                          <div className={`text-2xl font-${font.value}`} dir="rtl">
                            {font.preview}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-purple-600" />
                    Тема оформления
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id as 'light' | 'dark' | 'sepia' | 'green')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          settings.theme === theme.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${theme.colors.bg} ${theme.colors.border} border-2 flex items-center justify-center`}>
                            <theme.icon className={`w-4 h-4 ${theme.colors.text}`} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{theme.name}</div>
                            <div className="text-sm text-gray-500">Цветовая схема</div>
                          </div>
                          {settings.theme === theme.id && (
                            <Check className="w-5 h-5 text-purple-600 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-purple-600" />
                    Настройки отображения
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'showTransliteration', label: 'Показывать транслитерацию', description: 'Отображать произношение арабского текста' },
                      { key: 'showTranslation', label: 'Показывать перевод', description: 'Отображать русский перевод аятов' },
                      { key: 'showTafsir', label: 'Показывать тафсир', description: 'Отображать толкования аятов' },
                      { key: 'showWordByWord', label: 'Слово за словом', description: 'Показывать перевод каждого слова' },
                      { key: 'autoPlay', label: 'Автовоспроизведение', description: 'Автоматически воспроизводить следующий аят' },
                      { key: 'nightMode', label: 'Ночной режим', description: 'Темная тема для чтения в темноте' }
                    ].map((option) => (
                      <div key={option.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                        <button
                          onClick={() => handleDisplaySettingsChange(option.key, !settings[option.key as keyof typeof settings])}
                          className={`w-12 h-6 rounded-full transition-all ${
                            settings[option.key as keyof typeof settings]
                              ? 'bg-purple-500'
                              : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            settings[option.key as keyof typeof settings]
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Предварительный просмотр</h3>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center mb-3">
                      <div className={`text-${settings.fontSize} font-${settings.fontFamily} text-gray-900`} dir="rtl">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Во имя Аллаха, Милостивого, Милосердного!
                      </div>
                      {settings.showTransliteration && (
                        <div className="text-sm text-gray-500 italic mt-1">
                          Bismillahi ar-Rahmani ar-Raheem
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Настройки сохраняются автоматически
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                  >
                    Готово
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
