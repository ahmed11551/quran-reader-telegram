import React from 'react';
import { motion } from 'framer-motion';
import { useProgressStore } from '../store/progressStore';

export const RealStatsCard: React.FC = () => {
  const { getOverallProgress } = useProgressStore();
  const progress = getOverallProgress();

  // Реальная статистика на основе данных пользователя
  const stats = [
    { 
      label: 'Прочитано сур', 
      value: progress.totalSurahsRead, 
      total: 114, 
      color: 'text-blue-600',
      icon: '📚'
    },
    { 
      label: 'Прочитано аятов', 
      value: progress.totalAyahsRead, 
      total: 6236, 
      color: 'text-green-600',
      icon: '📖'
    },
    { 
      label: 'Общий прогресс', 
      value: `${progress.completionPercentage}%`, 
      color: 'text-purple-600',
      icon: '📊'
    },
    { 
      label: 'Текущая серия', 
      value: `${progress.currentStreak} дней`, 
      color: 'text-orange-600',
      icon: '🔥'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Ваша реальная статистика</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 bg-gray-50 rounded-xl"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            {stat.total && (
              <div className="text-xs text-gray-400 mt-1">из {stat.total}</div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Progress Ring */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (progress.completionPercentage / 100) * 251.2}
              className="text-green-500 transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">{progress.completionPercentage}%</span>
          </div>
        </div>
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 text-center">
        {progress.completionPercentage === 0 && (
          <p className="text-sm text-gray-500">Начните читать Коран для отслеживания прогресса</p>
        )}
        {progress.completionPercentage > 0 && progress.completionPercentage < 10 && (
          <p className="text-sm text-green-600">Отличное начало! Продолжайте в том же духе</p>
        )}
        {progress.completionPercentage >= 10 && progress.completionPercentage < 50 && (
          <p className="text-sm text-blue-600">Хороший прогресс! Вы на правильном пути</p>
        )}
        {progress.completionPercentage >= 50 && progress.completionPercentage < 90 && (
          <p className="text-sm text-purple-600">Потрясающе! Вы прошли больше половины</p>
        )}
        {progress.completionPercentage >= 90 && (
          <p className="text-sm text-orange-600">Невероятно! Вы почти закончили весь Коран</p>
        )}
      </div>
    </motion.div>
  );
};
