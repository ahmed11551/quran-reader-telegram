import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, BarChart3, Star, Dice6, Clock, Share2, Menu } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export const ModernHeader: React.FC = () => {
  const { currentSurah, currentAyah, surahs } = useAppStore();
  const currentSurahData = surahs.find(s => s.id === currentSurah);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-b-3xl shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Читалка Корана</h1>
            <p className="text-green-100 text-sm">
              {currentSurahData?.name} • Сура {currentSurah} • Аят {currentAyah}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export const QuickActions: React.FC = () => {
  const actions = [
    { icon: BookOpen, label: 'Суры', color: 'bg-blue-500' },
    { icon: BarChart3, label: 'Прогресс', color: 'bg-green-500' },
    { icon: Star, label: 'Избранное', color: 'bg-yellow-500' },
    { icon: Dice6, label: 'Случайный', color: 'bg-purple-500' },
    { icon: Clock, label: 'Намаз', color: 'bg-orange-500' },
    { icon: Share2, label: 'Поделиться', color: 'bg-pink-500' }
  ];

  return (
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
          className={`${action.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
        >
          <action.icon className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export const ModernSurahCard: React.FC<{ surah: any; onClick: () => void }> = ({ surah, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {surah.number}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{surah.nameArabic}</h3>
            <p className="text-gray-600">{surah.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{surah.totalAyahs} аятов</p>
          <p className="text-xs text-gray-400 capitalize">{surah.revelationType}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Готово к чтению</span>
        </div>
        <div className="text-green-600 font-medium">
          {surah.nameTranslation}
        </div>
      </div>
    </motion.div>
  );
};

export const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 60 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-green-500 transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export const ModernStatsCard: React.FC = () => {
  const stats = [
    { label: 'Прочитано сур', value: '3', total: '114', color: 'text-blue-600' },
    { label: 'Прочитано аятов', value: '29', total: '6236', color: 'text-green-600' },
    { label: 'Время чтения', value: '2ч 15м', color: 'text-purple-600' },
    { label: 'Текущая серия', value: '7 дней', color: 'text-orange-600' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Ваша статистика</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 bg-gray-50 rounded-xl"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            {stat.total && (
              <div className="text-xs text-gray-400">из {stat.total}</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
