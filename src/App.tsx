import { useEffect } from 'react';
import { SimpleAudioPlayer } from './components/SimpleAudioPlayer';
import { IslamGlobalQuranText } from './components/IslamGlobalQuranText';
import { SurahNavigator } from './components/SurahNavigator';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { TestAudioPlayer } from './components/TestAudioPlayer';
import { SurahList } from './components/SurahList';
import { useAppStore } from './store/appStore';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { islamGlobalSurahs, reliableReciters } from './data/islamGlobalData';

function App() {
  const { 
    setSurahs, 
    setReciters,
    error 
  } = useAppStore();

  const { user } = useTelegramWebApp();

  // Load initial data
  useEffect(() => {
    console.log('Loading Quran data from islam.global...');
    try {
      setSurahs(islamGlobalSurahs);
      setReciters(reliableReciters);
      console.log('Quran data loaded successfully from islam.global');
    } catch (err) {
      console.error('Error loading Quran data:', err);
    }
  }, [setSurahs, setReciters]);

  // Показываем ошибку если есть
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Читалка Корана
          </h1>
          <p className="text-gray-600">
            Синхронизированное чтение с подсветкой слов
          </p>
          {user && (
            <p className="text-sm text-gray-500 mt-2">
              Добро пожаловать, {user.first_name}!
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Progress Tracker */}
          <ProgressTracker />
          
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium">
                Суры
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Джузы
              </button>
            </div>
          </div>
          
          {/* Surah List */}
          <SurahList />

          {/* Surah Navigator */}
          <SurahNavigator />

          {/* Quran Text */}
          <IslamGlobalQuranText />

          {/* Test Audio Player */}
          <TestAudioPlayer />

          {/* Simple Audio Player */}
          <SimpleAudioPlayer />
        </div>

        {/* Settings Panel */}
        <SettingsPanel />
      </div>
    </div>
  );
}

export default App;
