import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Download, MessageCircle, Twitter, Facebook, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { fullQuranData } from '../data/fullQuranDatabase';

export const ShareAyah: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareFormat, setShareFormat] = useState<'text' | 'image' | 'link'>('text');
  const [copied, setCopied] = useState(false);
  
  const { currentSurah, currentAyah } = useAppStore();
  
  const currentSurahData = fullQuranData.find(s => s.id === currentSurah);
  const currentAyahData = currentSurahData?.ayahs.find(a => a.number === currentAyah);

  const shareText = `"${currentAyahData?.text}"\n\n${currentAyahData?.translation}\n\n${currentSurahData?.nameArabic} • Аят ${currentAyah}\n\nЧитаю Коран в Telegram Mini App`;

  const shareUrl = `${window.location.origin}?surah=${currentSurah}&ayah=${currentAyah}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const downloadAsImage = () => {
    // Создаем canvas для генерации изображения
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Фон
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Заголовок
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentSurahData?.nameArabic} • Аят ${currentAyah}`, canvas.width / 2, 60);
    
    // Арабский текст
    ctx.font = '32px Arial';
    ctx.fillStyle = '#374151';
    ctx.fillText(currentAyahData?.text || '', canvas.width / 2, 200);
    
    // Перевод
    ctx.font = '18px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(currentAyahData?.translation || '', canvas.width / 2, 300);
    
    // Транслитерация
    ctx.font = '16px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(currentAyahData?.transliteration || '', canvas.width / 2, 350);
    
    // Подпись
    ctx.font = '14px Arial';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText('Читаю Коран в Telegram Mini App', canvas.width / 2, 550);
    
    // Скачиваем изображение
    const link = document.createElement('a');
    link.download = `quran-${currentSurah}-${currentAyah}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!currentSurahData || !currentAyahData) {
    return null;
  }

  return (
    <>
      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all"
      >
        <Share2 className="w-6 h-6" />
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Поделиться аятом</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Format Selection */}
                <div className="flex space-x-1 bg-white bg-opacity-20 rounded-lg p-1">
                  {[
                    { id: 'text', label: 'Текст', icon: MessageCircle },
                    { id: 'image', label: 'Изображение', icon: Download },
                    { id: 'link', label: 'Ссылка', icon: Share2 }
                  ].map((format) => (
                    <button
                      key={format.id}
                      onClick={() => setShareFormat(format.id as any)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        shareFormat === format.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-white hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <format.icon className="w-4 h-4" />
                      <span>{format.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Preview */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">
                      {currentSurahData.nameArabic} • Аят {currentAyah}
                    </div>
                    <div className="text-right font-amiri text-xl text-gray-900 mb-3" dir="rtl">
                      {currentAyahData.text}
                    </div>
                    <div className="text-gray-700 mb-2">
                      {currentAyahData.translation}
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      {currentAyahData.transliteration}
                    </div>
                  </div>
                </div>

                {/* Share Options */}
                {shareFormat === 'text' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Поделиться текстом</h3>
                    
                    <div className="space-y-3">
                      <textarea
                        value={shareText}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm resize-none"
                        rows={6}
                      />
                      
                      <button
                        onClick={() => copyToClipboard(shareText)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copied ? 'Скопировано!' : 'Копировать текст'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {shareFormat === 'image' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Скачать как изображение</h3>
                    
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <Download className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Создать красивое изображение с аятом для социальных сетей
                      </p>
                      
                      <button
                        onClick={downloadAsImage}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Скачать изображение</span>
                      </button>
                    </div>
                  </div>
                )}

                {shareFormat === 'link' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Поделиться ссылкой</h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Ссылка на аят:</div>
                        <div className="text-sm text-blue-600 break-all">{shareUrl}</div>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(shareUrl)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copied ? 'Скопировано!' : 'Копировать ссылку'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Media */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Поделиться в социальных сетях</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'bg-blue-500' },
                      { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
                      { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-sky-500' },
                      { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' }
                    ].map((social) => (
                      <button
                        key={social.id}
                        onClick={() => shareToSocial(social.id)}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 ${social.color} text-white rounded-lg hover:opacity-90 transition-all`}
                      >
                        <social.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{social.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  Поделитесь мудростью Корана с друзьями и близкими
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
