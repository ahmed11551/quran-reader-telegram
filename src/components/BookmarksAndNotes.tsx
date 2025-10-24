import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Edit3, Save, X, Trash2, Star } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useProgressStore } from '../store/progressStore';
import { fullQuranData } from '../data/fullQuranDatabase';

interface BookmarkNote {
  id: string;
  surahId: number;
  ayahId: number;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

export const BookmarksAndNotes: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<BookmarkNote[]>([]);
  
  const { currentSurah, currentAyah } = useAppStore();
  const { favorites, addToFavorites, removeFromFavorites } = useProgressStore();

  const currentSurahData = fullQuranData.find(s => s.id === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);
  const isBookmarked = favorites.some(fav => fav.surahId === currentSurah && fav.ayahId === currentAyah);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeFromFavorites(currentSurah, currentAyah);
    } else {
      addToFavorites(currentSurah, currentAyah);
    }
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    
    const newNote: BookmarkNote = {
      id: Date.now().toString(),
      surahId: currentSurah,
      ayahId: currentAyah,
      note: noteText.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setNotes(prev => [...prev, newNote]);
    setNoteText('');
    setEditingNote(null);
  };

  const updateNote = (noteId: string) => {
    if (!noteText.trim()) return;
    
    setNotes(prev => prev.map(note => 
      note.id === noteId 
        ? { ...note, note: noteText.trim(), updatedAt: new Date() }
        : note
    ));
    setNoteText('');
    setEditingNote(null);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const startEditing = (note: BookmarkNote) => {
    setEditingNote(note.id);
    setNoteText(note.note);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setNoteText('');
  };

  const goToAyah = (surahId: number, ayahId: number) => {
    const { setCurrentSurah, setCurrentAyah } = useAppStore.getState();
    setCurrentSurah(surahId);
    setCurrentAyah(ayahId);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all"
      >
        <Bookmark className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Bookmark className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Закладки и заметки</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white bg-opacity-20 rounded-lg p-1">
                  {[
                    { id: 'bookmarks', label: 'Закладки', icon: BookmarkCheck },
                    { id: 'notes', label: 'Заметки', icon: Edit3 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-green-600 shadow-sm'
                          : 'text-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {activeTab === 'bookmarks' ? (
                  <div className="space-y-4">
                    {/* Current Ayah Bookmark */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Текущий аят</h3>
                        <button
                          onClick={toggleBookmark}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                            isBookmarked
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 fill-current" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {isBookmarked ? 'Удалить из закладок' : 'Добавить в закладки'}
                          </span>
                        </button>
                      </div>
                      
                      {currentSurahData && currentAyahData && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                              {currentSurahData.nameArabic}
                            </span>
                            <span className="text-sm text-gray-500">
                              Аят {currentAyahData.number}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {currentSurahData.name} ({currentSurahData.nameTranslation})
                          </div>
                          <div className="text-right font-amiri text-lg text-gray-900" dir="rtl">
                            {currentAyahData.text}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bookmarks List */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Избранные аяты ({favorites.length})
                      </h3>
                      
                      {favorites.length > 0 ? (
                        <div className="space-y-3">
                          {favorites.map((favorite) => {
                            const surah = fullQuranData.find(s => s.id === favorite.surahId);
                            const ayah = surah?.ayahs.find(a => a.number === favorite.ayahId);
                            
                            return (
                              <motion.div
                                key={`${favorite.surahId}-${favorite.ayahId}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
                                onClick={() => goToAyah(favorite.surahId, favorite.ayahId)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="font-semibold text-gray-900">
                                      {surah?.nameArabic}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      Аят {favorite.ayahId}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <BookmarkCheck className="w-4 h-4 text-green-500" />
                                  </div>
                                </div>
                                
                                <div className="text-sm text-gray-600 mb-2">
                                  {surah?.name} ({surah?.nameTranslation})
                                </div>
                                
                                <div className="text-right font-amiri text-base text-gray-800" dir="rtl">
                                  {ayah?.text}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Нет закладок</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Добавьте аяты в избранное для быстрого доступа
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Add Note */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Добавить заметку</h3>
                      
                      {currentSurahData && currentAyahData && (
                        <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {currentSurahData.nameArabic}
                            </span>
                            <span className="text-sm text-gray-500">
                              Аят {currentAyahData.number}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {currentSurahData.name}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Добавьте заметку к этому аяту..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={addNote}
                            disabled={!noteText.trim()}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="w-4 h-4" />
                            <span className="text-sm font-medium">Сохранить</span>
                          </button>
                          
                          {editingNote && (
                            <button
                              onClick={cancelEditing}
                              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                              <span className="text-sm font-medium">Отмена</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Notes List */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Мои заметки ({notes.length})
                      </h3>
                      
                      {notes.length > 0 ? (
                        <div className="space-y-3">
                          {notes.map((note) => {
                            const surah = fullQuranData.find(s => s.id === note.surahId);
                            
                            return (
                              <motion.div
                                key={note.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <Edit3 className="w-4 h-4 text-green-500" />
                                    <span className="font-semibold text-gray-900">
                                      {surah?.nameArabic}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      Аят {note.ayahId}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => startEditing(note)}
                                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteNote(note.id)}
                                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-gray-600 mb-2">
                                  {surah?.name} ({surah?.nameTranslation})
                                </div>
                                
                                {editingNote === note.id ? (
                                  <div className="space-y-2">
                                    <textarea
                                      value={noteText}
                                      onChange={(e) => setNoteText(e.target.value)}
                                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                      rows={3}
                                    />
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => updateNote(note.id)}
                                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                                      >
                                        Сохранить
                                      </button>
                                      <button
                                        onClick={cancelEditing}
                                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                                      >
                                        Отмена
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="text-gray-800 leading-relaxed">
                                      {note.note}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      Создано: {formatDate(note.createdAt)}
                                      {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                                        <span> • Обновлено: {formatDate(note.updatedAt)}</span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => goToAyah(note.surahId, note.ayahId)}
                                  className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                  Перейти к аяту →
                                </button>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Edit3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">Нет заметок</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Добавьте заметки к аятам для лучшего понимания
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
