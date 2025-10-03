import { Card } from '@/components/common';
import type { VocabularyItem } from '@/types';
import { getIconComponent } from '@/utils/getIcon';
import { Heart, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface VocabCardProps {
  item: VocabularyItem;
  onPlay?: (word: string) => void;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export const VocabCard = ({ item, onPlay, onFavorite, isFavorite = false }: VocabCardProps) => {
  const { i18n } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const IconComponent = getIconComponent(item.word, item.category);
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <Card
      hoverable
      className="group cursor-pointer transition-all duration-300"
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        {/* Icon - Show Lucide icon OR emoji */}
        <div className="mr-3 flex-shrink-0">
          {item.icon && item.icon !== '📝' ? (
            <div className="text-3xl">{item.icon}</div>
          ) : (
            <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition">
            {item.word}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {item.wordType}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(item.id);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`w-5 h-5 transition ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Translation */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
        {item.translation}
      </p>

      {/* Difficulty Badge & Audio */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            difficultyColors[item.difficulty]
          }`}
        >
          {item.difficulty}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.(item.word);
          }}
          className="flex items-center space-x-1 px-3 py-1.5 bg-primary hover:bg-primary-700 text-white rounded-lg transition"
          aria-label="Play pronunciation"
        >
          <Volume2 className="w-4 h-4" />
          <span className="text-sm">Play</span>
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
          {/* Definition */}
          {(item.definition || item.definitionZh) && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Definition:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? item.definitionZh : item.definition}
              </p>
            </div>
          )}

          {/* Example Sentence */}
          {(item.exampleSentence || item.exampleSentenceZh) && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Example:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {i18n.language === 'zh' ? item.exampleSentenceZh : item.exampleSentence}
              </p>
            </div>
          )}

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {(i18n.language === 'zh' ? item.tagsZh : item.tags)
                .split(',')
                .filter(Boolean)
                .map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default VocabCard;

