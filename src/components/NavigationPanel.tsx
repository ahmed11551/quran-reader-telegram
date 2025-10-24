import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Hash, List, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const NavigationPanel: React.FC = () => {
  const { currentSurah, currentAyah, setCurrentSurah, setCurrentAyah } = useAppStore();
  const [activeTab, setActiveTab] = useState<'surah' | 'ayah' | 'juz'>('surah');
  const [expandedSurahs, setExpandedSurahs] = useState<number[]>([]);

  const currentSurahData = fullQuranData.find(s => s.id === currentSurah);

  const toggleSurahExpansion = (surahId: number) => {
    setExpandedSurahs(prev => 
      prev.includes(surahId) 
        ? prev.filter(id => id !== surahId)
        : [...prev, surahId]
    );
  };

  const goToSurah = (surahId: number) => {
    setCurrentSurah(surahId);
    setCurrentAyah(1);
  };

  const goToAyah = (surahId: number, ayahId: number) => {
    setCurrentSurah(surahId);
    setCurrentAyah(ayahId);
  };

  const goToJuz = (juz: number) => {
    const surahsInJuz = fullQuranData.filter(s => s.juz === juz);
    if (surahsInJuz.length > 0) {
      const firstSurah = surahsInJuz[0];
      setCurrentSurah(firstSurah.id);
      setCurrentAyah(1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Навигация</h3>
          <p className="text-sm text-gray-600">Переход по сурам, аятам и джузам</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'surah', label: 'Суры', icon: BookOpen },
          { id: 'ayah', label: 'Аяты', icon: Hash },
          { id: 'juz', label: 'Джузы', icon: List }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Current Position */}
      <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <h4 className="text-sm font-semibold text-green-900 mb-2">Текущая позиция:</h4>
        <div className="text-sm text-green-800">
          <p><strong>Сура:</strong> {currentSurahData?.nameArabic} ({currentSurahData?.name})</p>
          <p><strong>Аят:</strong> {currentAyah} из {currentSurahData?.totalAyahs}</p>
          <p><strong>Джуз:</strong> {currentSurahData?.juz}</p>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'surah' && (
            <motion.div
              key="surah"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              {fullQuranData.map((surah) => (
                <div key={surah.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => goToSurah(surah.id)}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      currentSurah === surah.id
                        ? 'bg-green-100 text-green-900'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{surah.nameArabic}</div>
                        <div className="text-sm text-gray-600">{surah.name} ({surah.nameTranslation})</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {surah.totalAyahs} аятов • Джуз {surah.juz} • {surah.revelationType === 'meccan' ? 'Мекканская' : 'Мединская'}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-400">{surah.number}</div>
                    </div>
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'ayah' && (
            <motion.div
              key="ayah"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              {fullQuranData.map((surah) => (
                <div key={surah.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleSurahExpansion(surah.id)}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{surah.nameArabic}</div>
                        <div className="text-sm text-gray-600">{surah.name}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">{surah.totalAyahs} аятов</div>
                        {expandedSurahs.includes(surah.id) ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedSurahs.includes(surah.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-3 space-y-1">
                          {surah.ayahs.map((ayah) => (
                            <button
                              key={ayah.id}
                              onClick={() => goToAyah(surah.id, ayah.number)}
                              className={`w-full p-2 text-left rounded hover:bg-gray-50 transition-colors ${
                                currentSurah === surah.id && currentAyah === ayah.number
                                  ? 'bg-green-100 text-green-900'
                                  : ''
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-sm">
                                  <span className="font-medium">Аят {ayah.number}:</span>
                                  <span className="text-gray-600 ml-2">{ayah.text.substring(0, 50)}...</span>
                                </div>
                                <div className="text-xs text-gray-400">{ayah.number}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'juz' && (
            <motion.div
              key="juz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
                const surahsInJuz = fullQuranData.filter(s => s.juz === juz);
                const totalAyahs = surahsInJuz.reduce((sum, s) => sum + s.totalAyahs, 0);
                
                return (
                  <button
                    key={juz}
                    onClick={() => goToJuz(juz)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      currentSurahData?.juz === juz
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Джуз {juz}</div>
                        <div className="text-sm text-gray-600">
                          {surahsInJuz.length} сур • {totalAyahs} аятов
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {surahsInJuz.map(s => s.nameArabic).join(', ')}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-400">{juz}</div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
