import { Button, Card } from '@/components/common';
import WritingCanvas from '@/components/writing/WritingCanvas';
import { db } from '@/services/database/db';
import type { VocabularyItem } from '@/types';
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, PenTool, RotateCcw, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface WritingChallengeProps {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onComplete?: (score: number) => void;
}

export const WritingChallenge = ({ category, difficulty, onComplete }: WritingChallengeProps) => {
  const { t } = useTranslation();
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showAnswerValidation, setShowAnswerValidation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showWritingPattern, setShowWritingPattern] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const currentWord = words[currentWordIndex];

  const handleNext = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswerValidation(false);
      setIsAnswerCorrect(null);
      setShowWritingPattern(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswerValidation(false);
      setIsAnswerCorrect(null);
      setShowWritingPattern(false);
    }
  };

  const handleCheckAnswer = () => {
    setShowAnswerValidation(true);
    // Simple validation - check if canvas has content
    // In a real app, you'd use handwriting recognition
    const hasContent = true; // This would be determined by canvas content
    const isCorrect = hasContent; // Simplified for demo
    
    setIsAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setShowWritingPattern(true);
    }
  };

  const handleShowPattern = () => {
    setShowWritingPattern(true);
  };

  const handleClear = () => {
    // Clear canvas and reset validation
    setShowAnswerValidation(false);
    setIsAnswerCorrect(null);
    setShowWritingPattern(false);
  };

  const handleFinish = () => {
    const finalScore = Math.round((score / words.length) * 100);
    onComplete?.(finalScore);
    setShowResults(true);
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
          {t('challenges.noWords')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('challenges.tryDifferent')}
        </p>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('challenges.completed')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('challenges.score', { score: Math.round((score / words.length) * 100) })}
          </p>
        </div>
        <Button
          onClick={() => {
            setCurrentWordIndex(0);
            setScore(0);
            setShowResults(false);
            setShowAnswerValidation(false);
            setIsAnswerCorrect(null);
            setShowWritingPattern(false);
          }}
          variant="primary"
          size="lg"
        >
          {t('challenges.tryAgain')}
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('challenges.progress')}
          </span>
          <span className="text-sm font-medium text-primary">
            {currentWordIndex + 1}/{words.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Word Display */}
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('challenges.word')} {currentWordIndex + 1}/{words.length}
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {currentWord.word}
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {currentWord.translation}
          </p>
        </div>

        {/* Writing Canvas */}
        <div className="flex-1 flex flex-col">
          <WritingCanvas
            word={currentWord.word}
            onSave={(dataUrl) => {
              console.log('Drawing saved:', dataUrl);
            }}
            onClear={handleClear}
          />
          
          {/* Answer Validation */}
          {showAnswerValidation && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center mb-3">
                {isAnswerCorrect ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    <span className="font-semibold">{t('challenges.correct')}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-6 h-6 mr-2" />
                    <span className="font-semibold">{t('challenges.incorrect')}</span>
                  </div>
                )}
              </div>
              
              {!isAnswerCorrect && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {t('challenges.tryAgain')}
                  </p>
                  <Button
                    onClick={handleShowPattern}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {t('challenges.showPattern')}
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Writing Pattern */}
          {showWritingPattern && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center mb-3">
                <PenTool className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  {t('challenges.writingPattern')}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {currentWord.word}
                  </div>
                  <div className="text-lg text-blue-700 dark:text-blue-300">
                    {currentWord.translation}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      {t('challenges.strokeOrder')}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-blue-700 dark:text-blue-300">
                      <li>{t('challenges.step1')}</li>
                      <li>{t('challenges.step2')}</li>
                      <li>{t('challenges.step3')}</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      {t('challenges.tips')}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                      <li>{t('challenges.tip1')}</li>
                      <li>{t('challenges.tip2')}</li>
                      <li>{t('challenges.tip3')}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => setShowWritingPattern(false)}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    {t('challenges.hidePattern')}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowWritingPattern(false);
                      setShowAnswerValidation(false);
                      setIsAnswerCorrect(null);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {t('challenges.tryAgain')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentWordIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('challenges.previous')}
        </Button>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleClear}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('challenges.clear')}
          </Button>
          
          {!showAnswerValidation ? (
            <Button
              onClick={handleCheckAnswer}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t('challenges.checkAnswer')}
            </Button>
          ) : (
            <Button
              onClick={currentWordIndex === words.length - 1 ? handleFinish : handleNext}
              className="bg-primary hover:bg-primary-700 text-white"
            >
              {currentWordIndex === words.length - 1 ? t('challenges.finish') : t('challenges.next')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingChallenge;