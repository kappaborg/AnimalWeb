import { Button, Card } from '@/components/common';
import { ttsService } from '@/services/audio/textToSpeech';
import { db } from '@/services/database/db';
import type { VocabularyItem } from '@/types';
import { Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ListeningChallengeProps {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onComplete?: (score: number) => void;
}

export const ListeningChallenge = ({ category, difficulty, onComplete }: ListeningChallengeProps) => {
  const { i18n } = useTranslation();
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<VocabularyItem[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Map<number, boolean>>(new Map());
  const [loading, setLoading] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    loadWords();
  }, [category, difficulty]);

  useEffect(() => {
    if (words.length > 0) {
      generateOptions();
      setHasPlayed(false);
    }
  }, [currentIndex, words]);

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

  const generateOptions = () => {
    if (words.length === 0) return;

    const currentWord = words[currentIndex];
    const allWords = [...words];
    
    // Remove current word from options pool
    const otherWords = allWords.filter(w => w.id !== currentWord.id);
    
    // Shuffle and take 3 wrong answers
    const wrongAnswers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    
    // Combine with correct answer and shuffle
    const allOptions = [currentWord, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);
  };

  const playAudio = () => {
    if (words[currentIndex]) {
      ttsService.speakEnglish(words[currentIndex].word);
      setHasPlayed(true);
    }
  };

  const handleSelectAnswer = (wordId: string) => {
    if (showResult) return;
    
    setSelectedAnswer(wordId);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const currentWord = words[currentIndex];
    const isCorrect = selectedAnswer === currentWord.id;
    
    setShowResult(true);
    setResults(prev => new Map(prev).set(currentIndex, isCorrect));

    // Auto advance after 2 seconds
    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      handleFinish();
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
  const progress = ((currentIndex + (showResult ? 1 : 0)) / words.length) * 100;
  const isCorrect = selectedAnswer === currentWord.id;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {i18n.language === 'zh' ? '进度' : 'Progress'}
          </span>
          <span className="text-sm font-medium text-primary">
            {currentIndex + 1}/{words.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Audio Player Card */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {i18n.language === 'zh' ? '问题' : 'Question'} {currentIndex + 1}/{words.length}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {i18n.language === 'zh' ? '听音频并选择正确的单词' : 'Listen and select the correct word'}
          </h3>

          {/* Play Audio Button */}
          <button
            onClick={playAudio}
            className="w-32 h-32 rounded-full bg-primary hover:bg-primary-700 flex items-center justify-center transition-all duration-300 hover:scale-105 mx-auto"
          >
            <Volume2 className="w-16 h-16 text-white" />
          </button>

          {!hasPlayed && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {i18n.language === 'zh' ? '点击播放音频' : 'Click to play audio'}
            </p>
          )}
        </div>
      </Card>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCurrentWord = option.id === currentWord.id;
          
          let bgColor = 'bg-white dark:bg-gray-800';
          let borderColor = 'border-gray-300 dark:border-gray-600';
          let hoverColor = 'hover:border-primary';
          
          if (showResult && isSelected) {
            if (isCorrect) {
              bgColor = 'bg-green-100 dark:bg-green-900';
              borderColor = 'border-green-500';
            } else {
              bgColor = 'bg-red-100 dark:bg-red-900';
              borderColor = 'border-red-500';
            }
            hoverColor = '';
          } else if (showResult && isCurrentWord) {
            bgColor = 'bg-green-100 dark:bg-green-900';
            borderColor = 'border-green-500';
            hoverColor = '';
          } else if (isSelected) {
            borderColor = 'border-primary';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectAnswer(option.id)}
              disabled={showResult}
              className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${bgColor} ${borderColor} ${hoverColor} ${
                showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {option.word}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {option.translation}
              </div>
              
              {showResult && isCurrentWord && (
                <div className="mt-2 text-green-600 dark:text-green-400 font-medium">
                  ✓ {i18n.language === 'zh' ? '正确答案' : 'Correct answer'}
                </div>
              )}
              
              {showResult && isSelected && !isCorrect && (
                <div className="mt-2 text-red-600 dark:text-red-400 font-medium">
                  ✗ {i18n.language === 'zh' ? '错误' : 'Wrong'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="flex justify-center">
          <Button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer || !hasPlayed}
            variant="primary"
            size="lg"
          >
            {i18n.language === 'zh' ? '检查答案' : 'Check Answer'}
          </Button>
        </div>
      )}

      {/* Results Display */}
      {showResult && (
        <Card className={`p-6 text-center ${
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
            : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
        }`}>
          <h3 className={`text-2xl font-bold mb-2 ${
            isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {isCorrect
              ? i18n.language === 'zh' ? '🎉 正确!' : '🎉 Correct!'
              : i18n.language === 'zh' ? '😔 不正确' : '😔 Incorrect'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {i18n.language === 'zh' ? '正确答案是:' : 'The correct answer was:'}{' '}
            <strong>{currentWord.word}</strong> ({currentWord.translation})
          </p>
        </Card>
      )}
    </div>
  );
};

export default ListeningChallenge;

