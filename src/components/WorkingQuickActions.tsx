import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BarChart3, Star, Dice6, Clock, Share2, X, HeartOff } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useProgressStore } from '../store/progressStore';
import { localSurahs } from '../data/localQuranData';

export const WorkingQuickActions: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setCurrentSurah, setCurrentAyah } = useAppStore();
  const { 
    getRandomAyah
  } = useProgressStore();

  const actions = [
    { 
      icon: BookOpen, 
      label: 'Суры', 
      color: 'bg-blue-500',
      onClick: () => setActiveModal('surahs')
    },
    { 
      icon: BarChart3, 
      label: 'Прогресс', 
      color: 'bg-green-500',
      onClick: () => setActiveModal('progress')
    },
    { 
      icon: Star, 
      label: 'Избранное', 
      color: 'bg-yellow-500',
      onClick: () => setActiveModal('favorites')
    },
    { 
      icon: Dice6, 
      label: 'Случайный', 
      color: 'bg-purple-500',
      onClick: () => {
        const randomAyah = getRandomAyah();
        if (randomAyah) {
          setCurrentSurah(randomAyah.surahId);
          setCurrentAyah(randomAyah.ayahId);
        }
      }
    },
    { 
      icon: Clock, 
      label: 'Намаз', 
      color: 'bg-orange-500',
      onClick: () => setActiveModal('prayer')
    },
    { 
      icon: Share2, 
      label: 'Поделиться', 
      color: 'bg-pink-500',
      onClick: () => setActiveModal('share')
    }
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
          >
            <action.icon className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'surahs' && (
          <SurahsModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'progress' && (
          <ProgressModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'favorites' && (
          <FavoritesModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'prayer' && (
          <PrayerTimesModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === 'share' && (
          <ShareModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Surahs Modal
const SurahsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setCurrentSurah, setCurrentAyah } = useAppStore();
  const { getProgressForSurah } = useProgressStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Выберите суру</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localSurahs.map((surah) => {
            const progress = getProgressForSurah(surah.id);
            const completionPercentage = progress 
              ? Math.round((progress.completedAyahs.length / surah.totalAyahs) * 100)
              : 0;

            return (
              <motion.button
                key={surah.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSurah(surah.id);
                  setCurrentAyah(1);
                  onClose();
                }}
                className="text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{surah.nameArabic}</h3>
                      <p className="text-sm text-gray-600">{surah.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{surah.totalAyahs} аятов</p>
                    <p className="text-xs text-gray-400">{surah.revelationType}</p>
                  </div>
                </div>
                
                {progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Прогресс</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Progress Modal
const ProgressModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { getOverallProgress } = useProgressStore();
  const progress = getOverallProgress();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Ваш прогресс</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {progress.completionPercentage}%
            </div>
            <p className="text-gray-600">Общий прогресс</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{progress.totalAyahsRead}</div>
              <div className="text-sm text-gray-600">Прочитано аятов</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{progress.totalSurahsRead}</div>
              <div className="text-sm text-gray-600">Прочитано сур</div>
            </div>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{progress.currentStreak}</div>
            <div className="text-sm text-gray-600">Дней подряд</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Favorites Modal
const FavoritesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { favorites, removeFromFavorites } = useProgressStore();
  const { setCurrentSurah, setCurrentAyah } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Избранные аяты</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Нет избранных аятов</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite) => {
              const surah = localSurahs.find(s => s.id === favorite.surahId);
              const ayah = surah?.ayahs.find(a => a.number === favorite.ayahId);
              
              return (
                <div key={`${favorite.surahId}-${favorite.ayahId}`} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {surah?.nameArabic} - Аят {favorite.ayahId}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {ayah?.text.substring(0, 50)}...
                      </p>
                      {favorite.note && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          "{favorite.note}"
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setCurrentSurah(favorite.surahId);
                          setCurrentAyah(favorite.ayahId);
                          onClose();
                        }}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Читать
                      </button>
                      <button
                        onClick={() => removeFromFavorites(favorite.surahId, favorite.ayahId)}
                        className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <HeartOff className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Prayer Times Modal
const PrayerTimesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const prayerTimes = [
    { name: 'Фаджр', time: '05:30', icon: '🌅' },
    { name: 'Зухр', time: '12:15', icon: '☀️' },
    { name: 'Аср', time: '15:45', icon: '🌤️' },
    { name: 'Магриб', time: '18:20', icon: '🌇' },
    { name: 'Иша', time: '19:45', icon: '🌙' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Время намаза</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {prayerTimes.map((prayer) => (
            <div key={prayer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{prayer.icon}</span>
                <span className="font-medium text-gray-900">{prayer.name}</span>
              </div>
              <span className="text-lg font-bold text-gray-700">{prayer.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800 text-center">
            Времена указаны для Москвы
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Share Modal
const ShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentSurah, currentAyah } = useAppStore();
  const surah = localSurahs.find(s => s.id === currentSurah);
  const ayah = surah?.ayahs.find(a => a.number === currentAyah);

  const shareText = `Читаю "${surah?.nameArabic}" - Аят ${currentAyah}: ${ayah?.text}`;
  const shareUrl = window.location.href;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      alert('Ссылка скопирована в буфер обмена!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Поделиться</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-2">Текст для публикации:</p>
            <p className="text-gray-900">{shareText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={copyToClipboard}
              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              Копировать ссылку
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Читалка Корана',
                    text: shareText,
                    url: shareUrl
                  });
                } else {
                  copyToClipboard();
                }
              }}
              className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
            >
              Поделиться
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
