import { Button, Card } from '@/components/common';
import { ttsService } from '@/services/audio/textToSpeech';
import { db, dbUtils } from '@/services/database/db';
import type { VocabularyItem } from '@/types';
import { ArrowLeft, Heart, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const VocabularyDetail = () => {
  const { wordId } = useParams<{ wordId: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [word, setWord] = useState<VocabularyItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wordId) {
      loadWord();
    }
  }, [wordId]);

  const loadWord = async () => {
    if (!wordId) return;

    try {
      setLoading(true);
      const vocabulary = await db.vocabulary.get(wordId);
      setWord(vocabulary || null);

      // Check if it's a favorite
      const progress = await db.userProgress.get(wordId);
      setIsFavorite(progress?.isFavorite || false);
    } catch (error) {
      console.error('Error loading word:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!wordId) return;
    try {
      const newFavoriteStatus = await dbUtils.toggleFavorite(wordId);
      setIsFavorite(newFavoriteStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handlePlayEnglish = () => {
    if (word) ttsService.speakEnglish(word.word);
  };

  const handlePlayChinese = () => {
    if (word) ttsService.speakChinese(word.translation);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!word) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {i18n.language === 'zh' ? '未找到词汇' : 'Word not found'}
        </h2>
        <Button onClick={() => navigate(-1)}>
          {i18n.language === 'zh' ? '返回' : 'Go Back'}
        </Button>
      </div>
    );
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{i18n.language === 'zh' ? '返回' : 'Back'}</span>
        </button>

        <button
          onClick={handleToggleFavorite}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400'
            }`}
          />
          <span className="text-sm">
            {isFavorite
              ? i18n.language === 'zh' ? '已收藏' : 'Favorited'
              : i18n.language === 'zh' ? '收藏' : 'Favorite'}
          </span>
        </button>
      </div>

      {/* Main Word Card */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {word.word}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            {word.wordType}
          </p>
          <span
            className={`inline-block text-sm px-4 py-1.5 rounded-full font-medium ${
              difficultyColors[word.difficulty]
            }`}
          >
            {word.difficulty}
          </span>
        </div>

        {/* Audio Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button onClick={handlePlayEnglish} variant="primary" size="lg">
            <Volume2 className="w-5 h-5 mr-2" />
            {i18n.language === 'zh' ? '英文发音' : 'English'}
          </Button>
          <Button onClick={handlePlayChinese} variant="secondary" size="lg">
            <Volume2 className="w-5 h-5 mr-2" />
            {i18n.language === 'zh' ? '中文发音' : 'Chinese'}
          </Button>
        </div>

        {/* Translation */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
            {i18n.language === 'zh' ? '翻译' : 'Translation'}
          </h3>
          <p className="text-2xl text-gray-900 dark:text-white">
            {word.translation}
          </p>
        </div>

        {/* Definition */}
        {(word.definition || word.definitionZh) && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
              {i18n.language === 'zh' ? '定义' : 'Definition'}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {i18n.language === 'zh' ? word.definitionZh : word.definition}
            </p>
          </div>
        )}

        {/* Example Sentence */}
        {(word.exampleSentence || word.exampleSentenceZh) && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
              {i18n.language === 'zh' ? '例句' : 'Example'}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              "{i18n.language === 'zh' ? word.exampleSentenceZh : word.exampleSentence}"
            </p>
          </div>
        )}

        {/* Tags */}
        {word.tags && (
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">
              {i18n.language === 'zh' ? '标签' : 'Tags'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(i18n.language === 'zh' ? word.tagsZh : word.tags)
                .split(',')
                .filter(Boolean)
                .map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}
      </Card>

      {/* Category Link */}
      <Link to={`/category/${word.category}`}>
        <Card hoverable className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {i18n.language === 'zh' ? '更多来自此类别' : 'More from this category'}
            </span>
            <span className="text-primary font-medium capitalize">
              {word.category} →
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default VocabularyDetail;

