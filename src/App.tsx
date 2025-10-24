import { useEffect } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { QuranText } from './components/QuranText';
import { SurahNavigator } from './components/SurahNavigator';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { useAppStore } from './store/appStore';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { sampleSurahs, sampleReciters } from './data/sampleData';

function App() {
  const { 
    currentSurah, 
    currentAyah, 
    setSurahs, 
    setReciters,
    isLoading,
    error 
  } = useAppStore();

  const { seekToWord } = useAudioPlayer();
  const { hapticFeedback, user } = useTelegramWebApp();

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle word click with haptic feedback
  const handleWordClick = (word: any) => {
    hapticFeedback('light');
    seekToWord(word);
  };

  const loadInitialData = async () => {
    try {
      // Load sample data - in real app, this would come from API
      setSurahs(sampleSurahs);
      setReciters(sampleReciters);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadInitialData}
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
          
          {/* Surah Navigator */}
          <SurahNavigator />

          {/* Quran Text */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <QuranText 
              surahId={currentSurah}
              ayahId={currentAyah}
              onWordClick={handleWordClick}
            />
          </div>

          {/* Audio Player */}
          <AudioPlayer />
        </div>

        {/* Settings Panel */}
        <SettingsPanel />
      </div>
    </div>
  );
}

export default App;
