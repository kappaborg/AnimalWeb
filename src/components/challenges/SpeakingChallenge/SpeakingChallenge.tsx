import { Button, Card } from '@/components/common';
import { ttsService } from '@/services/audio/textToSpeech';
import { db } from '@/services/database/db';
import type { VocabularyItem } from '@/types';
import { ArrowRight, Mic, MicOff, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SpeakingChallengeProps {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onComplete?: (score: number) => void;
}

export const SpeakingChallenge = ({ category, difficulty, onComplete }: SpeakingChallengeProps) => {
  const { i18n } = useTranslation();
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState<Map<number, boolean>>(new Map());
  const [loading, setLoading] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Check if Speech Recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSupported(false);
      setLoading(false);
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(spokenText);
      checkPronunciation(spokenText);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    loadWords();
  }, [category, difficulty]);

  const loadWords = async () => {
    try {
      setLoading(true);
      let query = db.vocabulary.toCollection();

      if (category) {
        query = db.vocabulary.where('category').equals(category);
      }

      let items = await query.toArray();

      if (difficulty) {
        items = items.filter(item => item.difficulty === difficulty);
      }

      // Shuffle and take first 10 words
      const shuffled = items.sort(() => Math.random() - 0.5).slice(0, 10);
      setWords(shuffled);
    } catch (error) {
      console.error('Error loading words:', error);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!recognition) return;
    
    setIsListening(true);
    setTranscript('');
    recognition.start();
  };

  const stopListening = () => {
    if (!recognition) return;
    
    setIsListening(false);
    recognition.stop();
  };

  const checkPronunciation = (spoken: string) => {
    const currentWord = words[currentIndex];
    const targetWord = currentWord.word.toLowerCase().replace(/[^\w\s]/g, '');
    const spokenWord = spoken.replace(/[^\w\s]/g, '');
    
    // Simple matching - could be enhanced with fuzzy matching
    const isCorrect = spokenWord === targetWord || spokenWord.includes(targetWord);
    
    setResults(prev => new Map(prev).set(currentIndex, isCorrect));

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTranscript('');
      }
    }, 2000);
  };

  const handlePlayAudio = () => {
    if (words[currentIndex]) {
      ttsService.speakEnglish(words[currentIndex].word);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTranscript('');
    }
  };

  const handleFinish = () => {
    const correctCount = Array.from(results.values()).filter(Boolean).length;
    const score = Math.round((correctCount / words.length) * 100);
    onComplete?.(score);
    
    alert(
      i18n.language === 'zh'
        ? `挑战完成！正确: ${correctCount}/${words.length} (${score}%)`
        : `Challenge Complete! Correct: ${correctCount}/${words.length} (${score}%)`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!supported) {
    return (
      <Card className="p-8 text-center bg-yellow-50 dark:bg-yellow-900/20">
        <MicOff className="w-16 h-16 mx-auto text-yellow-600 dark:text-yellow-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {i18n.language === 'zh' ? '不支持语音识别' : 'Speech Recognition Not Supported'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh'
            ? '您的浏览器不支持语音识别。请使用 Chrome、Edge 或 Safari。'
            : 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.'}
        </p>
      </Card>
    );
  }

  if (words.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {i18n.language === 'zh' ? '未找到单词' : 'No words found'}
        </h3>
      </Card>
    );
  }

  const currentWord = words[currentIndex];
  const progress = (results.size / words.length) * 100;
  const currentResult = results.get(currentIndex);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {i18n.language === 'zh' ? '进度' : 'Progress'}
          </span>
          <span className="text-sm font-medium text-primary">
            {results.size}/{words.length} {i18n.language === 'zh' ? '尝试' : 'attempted'}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Word Display */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {i18n.language === 'zh' ? '单词' : 'Word'} {currentIndex + 1}/{words.length}
            </span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {currentWord.word}
          </h2>
          
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
            {currentWord.translation}
          </p>

          {/* Listen Button */}
          <Button onClick={handlePlayAudio} variant="outline" size="lg">
            <Volume2 className="w-6 h-6 mr-2" />
            {i18n.language === 'zh' ? '听发音' : 'Listen'}
          </Button>
        </div>

        {/* Microphone Section */}
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-primary hover:bg-primary-700'
            }`}
          >
            <Mic className="w-16 h-16 text-white" />
          </button>

          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {isListening
                ? i18n.language === 'zh' ? '正在听...' : 'Listening...'
                : i18n.language === 'zh' ? '点击麦克风开始说话' : 'Click microphone to speak'}
            </p>
            
            {transcript && (
              <div className={`mt-4 p-4 rounded-lg ${
                currentResult === true
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : currentResult === false
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                <p className="text-sm font-medium mb-1">
                  {i18n.language === 'zh' ? '您说的是:' : 'You said:'}
                </p>
                <p className="text-lg font-bold">{transcript}</p>
                
                {currentResult !== undefined && (
                  <p className="text-sm mt-2">
                    {currentResult
                      ? i18n.language === 'zh' ? '✅ 正确!' : '✅ Correct!'
                      : i18n.language === 'zh' ? '❌ 再试一次' : '❌ Try again'}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh'
            ? '说出显示的单词'
            : 'Say the word shown above'}
        </div>

        {currentIndex === words.length - 1 && results.size === words.length ? (
          <Button onClick={handleFinish} variant="primary" size="lg">
            {i18n.language === 'zh' ? '完成挑战' : 'Finish Challenge'}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            variant="ghost"
          >
            {i18n.language === 'zh' ? '跳过' : 'Skip'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpeakingChallenge;

