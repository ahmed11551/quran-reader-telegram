import React, { useState } from 'react';
import { Settings, X, Globe, Volume2, Type, Palette } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, reciters } = useAppStore();

  const translations = [
    { id: 'russian', name: 'Русский', flag: '🇷🇺' },
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'arabic', name: 'العربية', flag: '🇸🇦' },
  ];

  // const tafsirs = [
  //   { id: 'ibn_kathir', name: 'Ибн Касир' },
  //   { id: 'tabari', name: 'Табари' },
  //   { id: 'qurtubi', name: 'Куртуби' },
  // ];

  const scriptVariants = [
    { id: 'uthmani', name: 'Усмани', description: 'Стандартный' },
    { id: 'indopak', name: 'Индо-пак', description: 'Индийский стиль' },
    { id: 'custom', name: 'Пользовательский', description: 'Красивый шрифт' },
  ];

  const themes = [
    { id: 'light', name: 'Светлая', icon: '☀️' },
    { id: 'dark', name: 'Темная', icon: '🌙' },
  ];

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Настройки</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-4 space-y-6">
              {/* Reciter Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Volume2 className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-gray-900">Чтец</h3>
                </div>
                <div className="space-y-2">
                  {reciters.map(reciter => (
                    <label key={reciter.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="reciter"
                        value={reciter.id}
                        checked={settings.selectedReciter === reciter.id}
                        onChange={(e) => updateSettings({ selectedReciter: e.target.value })}
                        className="text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-sm">{reciter.name}</div>
                        <div className="text-xs text-gray-600">{reciter.country} • {reciter.style}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Translation Selection */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-gray-900">Перевод</h3>
                </div>
                <div className="space-y-2">
                  {translations.map(translation => (
                    <label key={translation.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="translation"
                        value={translation.id}
                        checked={settings.selectedTranslation === translation.id}
                        onChange={(e) => updateSettings({ selectedTranslation: e.target.value })}
                        className="text-primary-600"
                      />
                      <span className="text-sm">{translation.flag} {translation.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Script Variant */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Type className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-gray-900">Вариант письма</h3>
                </div>
                <div className="space-y-2">
                  {scriptVariants.map(variant => (
                    <label key={variant.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="scriptVariant"
                        value={variant.id}
                        checked={settings.scriptVariant === variant.id}
                        onChange={(e) => updateSettings({ scriptVariant: e.target.value as any })}
                        className="text-primary-600"
                      />
                      <div>
                        <div className="font-medium text-sm">{variant.name}</div>
                        <div className="text-xs text-gray-600">{variant.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Отображение</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Показывать транслитерацию</span>
                    <input
                      type="checkbox"
                      checked={settings.showTransliteration}
                      onChange={(e) => updateSettings({ showTransliteration: e.target.checked })}
                      className="text-primary-600"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Показывать перевод</span>
                    <input
                      type="checkbox"
                      checked={settings.showTranslation}
                      onChange={(e) => updateSettings({ showTranslation: e.target.checked })}
                      className="text-primary-600"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Показывать тафсир</span>
                    <input
                      type="checkbox"
                      checked={settings.showTafsir}
                      onChange={(e) => updateSettings({ showTafsir: e.target.checked })}
                      className="text-primary-600"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">Автовоспроизведение</span>
                    <input
                      type="checkbox"
                      checked={settings.autoPlay}
                      onChange={(e) => updateSettings({ autoPlay: e.target.checked })}
                      className="text-primary-600"
                    />
                  </label>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Размер шрифта</h3>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600 mt-1">
                  {settings.fontSize}px
                </div>
              </div>

              {/* Theme */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Palette className="w-5 h-5 text-primary-600" />
                  <h3 className="font-medium text-gray-900">Тема</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => updateSettings({ theme: theme.id as any })}
                      className={`p-3 rounded-lg border transition-colors ${
                        settings.theme === theme.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-lg mb-1">{theme.icon}</div>
                      <div className="text-sm font-medium">{theme.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
