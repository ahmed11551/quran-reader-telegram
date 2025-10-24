import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Clock, Star, Target, TrendingUp } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const ReadingStatistics: React.FC = () => {
  const { 
    favorites
  } = useProgressStore();

  const streakDays = 7; // Mock data
  const totalReadingTime = 120; // Mock data

  // Статистика по сурам
  const completedSurahs = 3; // Mock data
  const totalSurahs = fullQuranData.length;
  const completionPercentage = Math.round((completedSurahs / totalSurahs) * 100);

  // Статистика по аятам
  const totalCompletedAyahs = 25; // Mock data
  const totalAyahs = fullQuranData.reduce((sum, surah) => sum + surah.totalAyahs, 0);
  const ayahCompletionPercentage = Math.round((totalCompletedAyahs / totalAyahs) * 100);

  // Статистика по джузам
  const completedJuzs = 1; // Mock data

  const stats = [
    {
      title: 'Общий прогресс',
      value: `${completionPercentage}%`,
      description: `${completedSurahs} из ${totalSurahs} сур`,
      icon: Target,
      color: 'blue',
      progress: completionPercentage
    },
    {
      title: 'Прочитано аятов',
      value: `${ayahCompletionPercentage}%`,
      description: `${totalCompletedAyahs} из ${totalAyahs} аятов`,
      icon: BookOpen,
      color: 'green',
      progress: ayahCompletionPercentage
    },
    {
      title: 'Джузы',
      value: `${completedJuzs}`,
      description: `из 30 джузов`,
      icon: BarChart3,
      color: 'purple',
      progress: Math.round((completedJuzs / 30) * 100)
    },
    {
      title: 'Серия дней',
      value: `${streakDays}`,
      description: 'дней подряд',
      icon: TrendingUp,
      color: 'orange',
      progress: Math.min(streakDays * 10, 100)
    },
    {
      title: 'Время чтения',
      value: `${totalReadingTime}`,
      description: 'минут всего',
      icon: Clock,
      color: 'red',
      progress: Math.min(totalReadingTime * 2, 100)
    },
    {
      title: 'Избранное',
      value: `${favorites.length}`,
      description: 'аятов в избранном',
      icon: Star,
      color: 'yellow',
      progress: Math.min(favorites.length * 5, 100)
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600',
      green: 'bg-green-500 text-green-600',
      purple: 'bg-purple-500 text-purple-600',
      orange: 'bg-orange-500 text-orange-600',
      red: 'bg-red-500 text-red-600',
      yellow: 'bg-yellow-500 text-yellow-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500 text-gray-600';
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      purple: 'bg-purple-50 border-purple-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200',
      yellow: 'bg-yellow-50 border-yellow-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Статистика чтения</h3>
          <p className="text-sm text-gray-600">Ваш прогресс изучения Корана</p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">Общий прогресс</h4>
          <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{completedSurahs} сур прочитано</span>
          <span>{totalSurahs - completedSurahs} осталось</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${getBgColorClasses(stat.color)}`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{stat.title}</h4>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getColorClasses(stat.color).split(' ')[0]}`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-3">Последняя активность</h4>
        <div className="space-y-2">
          {fullQuranData.slice(0, 3).map((surah) => {
            const completionPercentage = Math.round((Math.random() * 100)); // Mock data
            
            return (
              <div key={surah.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{surah.nameArabic}</div>
                  <div className="text-sm text-gray-600">{surah.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{completionPercentage}%</div>
                  <div className="text-xs text-gray-500">{Math.floor(surah.totalAyahs * completionPercentage / 100)}/{surah.totalAyahs}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Продолжайте в том же духе!</h4>
          <p className="text-sm text-gray-600">
            {completionPercentage > 50 
              ? 'Отличный прогресс! Вы уже прошли больше половины пути.'
              : completionPercentage > 25
              ? 'Хороший старт! Продолжайте регулярное чтение.'
              : 'Начните с малого. Каждый аят приближает вас к цели.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};
