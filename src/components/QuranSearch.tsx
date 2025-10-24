import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Volume2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const QuranSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { setCurrentSurah, setCurrentAyah } = useAppStore();

  // Поиск по тексту
  const searchInQuran = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Имитация задержки поиска
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results: any[] = [];
    const lowerQuery = query.toLowerCase();
    
    fullQuranData.forEach(surah => {
      surah.ayahs.forEach(ayah => {
        // Поиск в арабском тексте
        if (ayah.text.includes(query)) {
          results.push({
            type: 'arabic',
            surah: surah,
            ayah: ayah,
            match: ayah.text,
            context: 'Арабский текст'
          });
        }
        
        // Поиск в переводе
        if (ayah.translation.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'translation',
            surah: surah,
            ayah: ayah,
            match: ayah.translation,
            context: 'Перевод'
          });
        }
        
        // Поиск в транслитерации
        if (ayah.transliteration.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'transliteration',
            surah: surah,
            ayah: ayah,
            match: ayah.transliteration,
            context: 'Транслитерация'
          });
        }
        
        // Поиск в тафсире
        if (ayah.tafsir.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'tafsir',
            surah: surah,
            ayah: ayah,
            match: ayah.tafsir,
            context: 'Тафсир'
          });
        }
      });
    });
    
    setSearchResults(results.slice(0, 20)); // Ограничиваем 20 результатами
    setIsSearching(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchInQuran(searchQuery);
  };

  const goToResult = (result: any) => {
    setCurrentSurah(result.surah.id);
    setCurrentAyah(result.ayah.number);
    setIsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const getMatchTypeColor = (type: string) => {
    const colors = {
      arabic: 'bg-green-100 text-green-800',
      translation: 'bg-blue-100 text-blue-800',
      transliteration: 'bg-purple-100 text-purple-800',
      tafsir: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-all"
      >
        <Search className="w-6 h-6" />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Search className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Поиск в Коране</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Search Form */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по арабскому тексту, переводу, транслитерации или тафсиру..."
                    className="w-full px-4 py-3 pr-12 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all disabled:opacity-50"
                  >
                    {isSearching ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </div>

              {/* Search Results */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Найдено {searchResults.length} результатов
                      </h3>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Очистить
                      </button>
                    </div>
                    
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={`${result.surah.id}-${result.ayah.number}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => goToResult(result)}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-900">
                                {result.surah.nameArabic}
                              </span>
                              <span className="text-sm text-gray-500">
                                Аят {result.ayah.number}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchTypeColor(result.type)}`}>
                                {result.context}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {result.surah.name} ({result.surah.nameTranslation})
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <BookOpen className="w-4 h-4" />
                            <Volume2 className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            {result.type === 'arabic' ? (
                              <div className="text-right font-amiri text-lg" dir="rtl">
                                {result.match}
                              </div>
                            ) : (
                              result.match.length > 200 
                                ? `${result.match.substring(0, 200)}...`
                                : result.match
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Результаты не найдены</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Попробуйте другой поисковый запрос
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Начните поиск</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Введите слово или фразу для поиска в Коране
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>• Арабский текст</span>
                    <span>• Переводы</span>
                    <span>• Транслитерация</span>
                    <span>• Тафсир</span>
                  </div>
                  <div className="text-xs">
                    Нажмите на результат для перехода к аяту
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
