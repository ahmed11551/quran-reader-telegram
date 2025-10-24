import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const AudioDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testAudioSources = [
    {
      name: 'Локальный файл',
      url: '/audio/test.mp3',
      type: 'local'
    },
    {
      name: 'EveryAyah.com',
      url: 'https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/001.mp3',
      type: 'external'
    },
    {
      name: 'MP3Quran.net',
      url: 'https://server8.mp3quran.net/abd_basit/001.mp3',
      type: 'external'
    },
    {
      name: 'Islamic.network',
      url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/001.mp3',
      type: 'external'
    },
    {
      name: 'Тестовый звук',
      url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      type: 'test'
    }
  ];

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);

    for (const source of testAudioSources) {
      const result = await testAudioSource(source);
      setDiagnostics(prev => [...prev, result]);
    }

    setIsRunning(false);
  };

  const testAudioSource = async (source: any): Promise<any> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      const startTime = Date.now();
      
      const timeout = setTimeout(() => {
        resolve({
          ...source,
          status: 'timeout',
          message: 'Таймаут загрузки',
          duration: Date.now() - startTime,
          icon: AlertCircle,
          color: 'text-yellow-600'
        });
      }, 10000);

      audio.addEventListener('loadstart', () => {
        resolve({
          ...source,
          status: 'loading',
          message: 'Загрузка...',
          duration: Date.now() - startTime,
          icon: RefreshCw,
          color: 'text-blue-600'
        });
      });

      audio.addEventListener('canplay', () => {
        clearTimeout(timeout);
        resolve({
          ...source,
          status: 'success',
          message: 'Аудио доступно',
          duration: Date.now() - startTime,
          icon: CheckCircle,
          color: 'text-green-600'
        });
      });

      audio.addEventListener('error', (e) => {
        clearTimeout(timeout);
        resolve({
          ...source,
          status: 'error',
          message: `Ошибка: ${e.message || 'Неизвестная ошибка'}`,
          duration: Date.now() - startTime,
          icon: XCircle,
          color: 'text-red-600'
        });
      });

      audio.src = source.url;
      audio.load();
    });
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'timeout':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'loading':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Диагностика аудио</h3>
            <p className="text-sm text-gray-600">Проверка доступности аудио источников</p>
          </div>
        </div>
        
        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Проверка...' : 'Проверить'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {diagnostics.map((diagnostic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(diagnostic.status)}
                <div>
                  <h4 className="font-semibold text-gray-900">{diagnostic.name}</h4>
                  <p className="text-sm text-gray-600">{diagnostic.url}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{diagnostic.message}</div>
                <div className="text-xs text-gray-500">{diagnostic.duration}ms</div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs text-gray-500">
                Тип: {diagnostic.type === 'local' ? 'Локальный' : 
                      diagnostic.type === 'external' ? 'Внешний' : 
                      'Тестовый'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {diagnostics.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Рекомендации:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {diagnostics.some(d => d.status === 'success') ? (
              <p>✅ Найдены рабочие аудио источники. Воспроизведение должно работать.</p>
            ) : (
              <p>❌ Все аудио источники недоступны. Проверьте интернет-соединение.</p>
            )}
            
            {diagnostics.some(d => d.type === 'local' && d.status === 'success') ? (
              <p>✅ Локальные файлы доступны. Это самый надежный способ.</p>
            ) : (
              <p>⚠️ Локальные файлы недоступны. Используются внешние источники.</p>
            )}
            
            <p>💡 Для лучшей работы добавьте аудио файлы в папку /public/audio/</p>
          </div>
        </div>
      )}
    </div>
  );
};
