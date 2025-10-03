import { Card } from '@/components/common';
import { ttsService } from '@/services/audio/textToSpeech';
import { db } from '@/services/database/db';
import type { VocabularyItem } from '@/types';
import { getIconComponent } from '@/utils/getIcon';
import { Heart, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface VisualVocabularyProps {
  categoryId: string;
  onWordClick?: (word: VocabularyItem) => void;
}

export const VisualVocabulary: React.FC<VisualVocabularyProps> = ({
  categoryId,
  onWordClick
}) => {
  const { t, i18n } = useTranslation();
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  useEffect(() => {
    loadVocabulary();
    loadFavorites();
  }, [categoryId]);

  const loadVocabulary = async () => {
    try {
      const words = await db.vocabulary
        .where('category')
        .equals(categoryId)
        .toArray();
      setVocabulary(words);
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const favWords = await db.vocabulary
        .where('isFavorite')
        .equals(1)
        .toArray();
      setFavorites(new Set(favWords.map(w => w.id)));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const handlePlayAudio = async (word: VocabularyItem) => {
    if (playingWord === word.id) return;

    setPlayingWord(word.id);
    
    try {
      if (i18n.language === 'zh') {
        await ttsService.speakChinese(word.translation);
      } else {
        await ttsService.speakEnglish(word.word);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setPlayingWord(null);
    }
  };

  const toggleFavorite = async (word: VocabularyItem) => {
    try {
      const newFavoriteStatus = (word.isFavorite || 0) ? 0 : 1;
      await db.vocabulary.update(word.id, {
        isFavorite: newFavoriteStatus
      });
      
      setFavorites(prev => {
        const newSet = new Set(prev);
        if (word.isFavorite) {
          newSet.delete(word.id);
        } else {
          newSet.add(word.id);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {vocabulary.map((word) => (
          <Card
            key={word.id}
            className={`
              group relative cursor-pointer transition-all duration-200
              hover:shadow-lg hover:scale-105 hover:bg-blue-50
              border-2 border-transparent hover:border-blue-200
              ${playingWord === word.id ? 'ring-2 ring-blue-400' : ''}
            `}
            onClick={() => onWordClick?.(word)}
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(word);
              }}
              className={`
                absolute top-2 right-2 p-1 rounded-full transition-colors
                ${favorites.has(word.id) 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-300 hover:text-red-400'
                }
              `}
            >
              <Heart 
                size={16} 
                fill={favorites.has(word.id) ? 'currentColor' : 'none'}
              />
            </button>

            {/* Audio Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayAudio(word);
              }}
              className={`
                absolute top-2 left-2 p-1 rounded-full transition-colors
                ${playingWord === word.id 
                  ? 'text-blue-500 bg-blue-100' 
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                }
              `}
            >
              <Volume2 size={16} />
            </button>

            {/* Word Content */}
            <div className="pt-8 pb-4 px-2 text-center">
              {/* Icon - Show Lucide icon OR emoji */}
              {(() => {
                const IconComponent = getIconComponent(word.word, word.category);
                return word.icon && word.icon !== '📝' ? (
                  <div className="text-4xl mb-2">{word.icon}</div>
                ) : (
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-full">
                      <IconComponent className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                );
              })()}
              
              {/* English Word */}
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {word.word}
              </div>
              
              {/* Chinese Translation */}
              <div className="text-sm text-gray-600 mb-2">
                {word.translation}
              </div>

              {/* Difficulty Badge */}
              <div className={`
                inline-block px-2 py-1 rounded-full text-xs font-medium
                ${getDifficultyColor(word.difficulty)}
              `}>
                {t(`difficulty.${word.difficulty}`)}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-200 rounded-lg" />
          </Card>
        ))}
      </div>

      {vocabulary.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {t('vocabulary.noWordsFound')}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualVocabulary;
