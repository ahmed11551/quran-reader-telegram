import { useEffect } from 'react';
import { FunctionalQuickActions } from './components/FunctionalQuickActions';
import { AdvancedAudioPlayer } from './components/AdvancedAudioPlayer';
import { ModernHeader, ModernStatsCard } from './components/ModernUI';
import { BeautifulQuranText } from './components/BeautifulQuranText';
import { SurahNavigator } from './components/SurahNavigator';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { SurahList } from './components/SurahList';
import { useAppStore } from './store/appStore';
import { completeQuranData, completeReciters } from './data/completeQuranDatabase';

function App() {
  const { 
    setSurahs, 
    setReciters,
    error 
  } = useAppStore();

  // const { user } = useTelegramWebApp();

        // Load initial data
        useEffect(() => {
          console.log('Loading complete Quran database...');
          try {
            setSurahs(completeQuranData);
            setReciters(completeReciters);
            console.log('Complete Quran database loaded successfully');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header */}
      <ModernHeader />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Quick Actions */}
        <FunctionalQuickActions />
        
        {/* Stats Card */}
        <ModernStatsCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Surah List */}
            <SurahList />

            {/* Surah Navigator */}
            <SurahNavigator />

            {/* Beautiful Quran Text */}
            <BeautifulQuranText />

            {/* Advanced Audio Player */}
            <AdvancedAudioPlayer />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings Panel */}
            <SettingsPanel />
            
            {/* Progress Tracker */}
            <ProgressTracker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
