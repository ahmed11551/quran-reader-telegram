import { useEffect } from 'react';
import { ResponsiveHeader } from './components/ResponsiveUI';
import { WorkingQuickActions } from './components/WorkingQuickActions';
import { RealStatsCard } from './components/RealStatsCard';
import { FullQuranText } from './components/FullQuranText';
import { FixedAudioPlayer } from './components/FixedAudioPlayer';
import { SurahNavigator } from './components/SurahNavigator';
import { SettingsPanel } from './components/SettingsPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { SurahList } from './components/SurahList';
import { useAppStore } from './store/appStore';
import { fullQuranData, fullReciters } from './data/fullQuranDatabase';

function App() {
  const { 
    setSurahs, 
    setReciters,
    error 
  } = useAppStore();

  // const { user } = useTelegramWebApp();

        // Load initial data
        useEffect(() => {
          console.log('Loading full Quran database...');
          try {
            setSurahs(fullQuranData);
            setReciters(fullReciters);
            console.log('Full Quran database loaded successfully');
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
      {/* Responsive Header */}
      <ResponsiveHeader />
      
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-6 max-w-6xl">
        {/* Working Quick Actions */}
        <WorkingQuickActions />
        
        {/* Real Stats Card */}
        <RealStatsCard />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-4 md:space-y-6">
            {/* Surah List */}
            <SurahList />

            {/* Surah Navigator */}
            <SurahNavigator />

            {/* Full Quran Text */}
            <FullQuranText />

            {/* Fixed Audio Player */}
            <FixedAudioPlayer />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
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
