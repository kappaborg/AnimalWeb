import { SearchBar } from '@/components/common';
import { VisualVocabulary, VocabCard } from '@/components/vocabulary';
import { ttsService } from '@/services/audio/textToSpeech';
import { db, dbUtils } from '@/services/database/db';
import type { Category as CategoryType, VocabularyItem } from '@/types';
import { ArrowLeft, Filter, Grid3X3, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

export const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { i18n } = useTranslation();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [filteredVocabulary, setFilteredVocabulary] = useState<VocabularyItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  useEffect(() => {
    if (categoryId) {
      loadData();
    }
  }, [categoryId]);

  useEffect(() => {
    filterVocabulary();
  }, [searchQuery, difficultyFilter, vocabulary]);

  const loadData = async () => {
    if (!categoryId) return;
    
    try {
      setLoading(true);
      
      // Load category info
      const cat = await db.categories.get(categoryId);
      setCategory(cat || null);
      
      // Load vocabulary for this category
      const vocab = await db.vocabulary.where('category').equals(categoryId).toArray();
      setVocabulary(vocab);
      setFilteredVocabulary(vocab);
      
      // Load user's favorites
      const favs = await db.userProgress.where('isFavorite').equals(1).toArray();
      setFavorites(new Set(favs.map(f => f.vocabularyId)));
    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVocabulary = () => {
    let filtered = [...vocabulary];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.word.toLowerCase().includes(query) ||
          item.translation.toLowerCase().includes(query) ||
          item.definition.toLowerCase().includes(query)
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((item) => item.difficulty === difficultyFilter);
    }

    setFilteredVocabulary(filtered);
  };

  const handlePlayAudio = (word: string) => {
    ttsService.speakEnglish(word);
  };

  const handleToggleFavorite = async (vocabularyId: string) => {
    try {
      const isFavorite = await dbUtils.toggleFavorite(vocabularyId);
      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (isFavorite) {
          newFavorites.add(vocabularyId);
        } else {
          newFavorites.delete(vocabularyId);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {i18n.language === 'zh' ? '未找到类别' : 'Category not found'}
        </h2>
        <Link to="/" className="text-primary hover:underline">
          {i18n.language === 'zh' ? '返回首页' : 'Back to home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {i18n.language === 'zh' ? category.nameZh : category.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {vocabulary.length} {i18n.language === 'zh' ? '个词' : 'words'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              i18n.language === 'zh' ? '搜索词汇...' : 'Search vocabulary...'
            }
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <List size={16} />
              {i18n.language === 'zh' ? '列表' : 'List'}
            </button>
            <button
              onClick={() => setViewMode('visual')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                viewMode === 'visual' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3X3 size={16} />
              {i18n.language === 'zh' ? '视觉' : 'Visual'}
            </button>
          </div>
          
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">
              {i18n.language === 'zh' ? '所有难度' : 'All Levels'}
            </option>
            <option value="beginner">
              {i18n.language === 'zh' ? '初级' : 'Beginner'}
            </option>
            <option value="intermediate">
              {i18n.language === 'zh' ? '中级' : 'Intermediate'}
            </option>
            <option value="advanced">
              {i18n.language === 'zh' ? '高级' : 'Advanced'}
            </option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh'
            ? `找到 ${filteredVocabulary.length} 个结果`
            : `Found ${filteredVocabulary.length} results`}
        </p>
      )}

      {/* Vocabulary Display */}
      {filteredVocabulary.length > 0 ? (
        viewMode === 'visual' ? (
          <VisualVocabulary
            categoryId={categoryId || ''}
            onWordClick={(word) => {
              // Navigate to word detail or handle click
              console.log('Word clicked:', word);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVocabulary.map((item) => (
              <VocabCard
                key={item.id}
                item={item}
                onPlay={handlePlayAudio}
                onFavorite={handleToggleFavorite}
                isFavorite={favorites.has(item.id)}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {i18n.language === 'zh' ? '未找到词汇' : 'No vocabulary found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;

