import { useRef, useEffect, useState, useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { Word } from '../types';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  
  const {
    isPlaying,
    setIsPlaying,
    setIsLoading,
    setError,
    currentSurah,
    currentAyah,
    currentWord,
    setCurrentWord,
    settings,
    surahs,
    reciters,
  } = useAppStore();

  const currentReciter = reciters.find(r => r.id === settings.selectedReciter);
  const currentSurahData = surahs.find(s => s.number === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  // Get audio URL based on current settings
  const getAudioUrl = useCallback(() => {
    if (!currentReciter || !currentSurahData) return '';
    
    const speedKey = settings.playbackSpeed <= 0.8 ? 'slow' : 
                    settings.playbackSpeed >= 1.2 ? 'fast' : 'normal';
    
    const baseUrl = currentReciter.audioUrls[speedKey];
    if (!baseUrl) return '';
    
    // Заменяем {surah} на номер суры с ведущими нулями
    const surahNumber = currentSurah.toString().padStart(3, '0');
    return baseUrl.replace('{surah}', surahNumber);
  }, [currentReciter, currentSurah, settings.playbackSpeed]);

  // Find current word based on audio time
  const findCurrentWord = useCallback((time: number): number => {
    if (!currentAyahData) return 1;
    
    const word = currentAyahData.words.find(w => 
      time >= w.startTime && time <= w.endTime
    );
    
    return word ? word.id : currentAyahData.words[0]?.id || 1;
  }, [currentAyahData]);

  // Update current word based on audio time
  useEffect(() => {
    if (isPlaying && currentAyahData) {
      const wordId = findCurrentWord(currentTime);
      if (wordId !== currentWord) {
        setCurrentWord(wordId);
      }
    }
  }, [currentTime, isPlaying, currentAyahData, findCurrentWord, currentWord, setCurrentWord]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setIsBuffering(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsBuffering(false);
    };

    const handleError = () => {
      setError('Ошибка загрузки аудио');
      setIsLoading(false);
      setIsBuffering(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next ayah if enabled
      if (settings.autoPlay && currentAyahData && currentSurahData) {
        const nextAyah = currentAyahData.number + 1;
        if (nextAyah <= currentSurahData.totalAyahs) {
          // Move to next ayah
          useAppStore.getState().setCurrentAyah(nextAyah);
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setIsLoading, setError, settings.autoPlay, currentAyahData, currentSurahData]);

  // Update audio source when surah or reciter changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const audioUrl = getAudioUrl();
    if (audioUrl && audio.src !== audioUrl) {
      audio.src = audioUrl;
      audio.load();
    }
  }, [getAudioUrl]);

  // Control playback
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = settings.playbackSpeed;
      audio.play().catch(error => {
        setError('Ошибка воспроизведения аудио');
        console.error('Playback error:', error);
      });
      setIsPlaying(true);
    }
  }, [settings.playbackSpeed, setError, setIsPlaying]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const seekToWord = useCallback((word: Word) => {
    seekTo(word.startTime);
  }, [seekTo]);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = speed;
    }
  }, []);

  return {
    audioRef,
    currentTime,
    duration,
    isBuffering,
    play,
    pause,
    togglePlayPause,
    seekTo,
    seekToWord,
    setVolume,
    setPlaybackSpeed,
    getAudioUrl,
  };
};
