import { Card } from '@/components/common';
import { db } from '@/services/database/db';
import type { Category } from '@/types';
import { BookOpen, TrendingUp, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const cats = await db.categories.orderBy('order').toArray();
      const count = await db.vocabulary.count();
      setCategories(cats);
      setTotalWords(count);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t('common:app.name')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('common:app.tagline')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable className="text-center p-6">
          <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {totalWords.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {i18n.language === 'zh' ? '词汇总数' : 'Total Words'}
          </p>
        </Card>

        <Card hoverable className="text-center p-6">
          <Trophy className="w-12 h-12 mx-auto text-secondary mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">0</h3>
          <p className="text-gray-600 dark:text-gray-300">{t('navigation:challenges')}</p>
        </Card>

        <Card hoverable className="text-center p-6">
          <TrendingUp className="w-12 h-12 mx-auto text-accent mb-4" />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">0%</h3>
          <p className="text-gray-600 dark:text-gray-300">{t('navigation:progress')}</p>
        </Card>
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('navigation:categories')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card
                hoverable
                className="text-center p-6 h-full transition-all duration-200 hover:scale-105"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {i18n.language === 'zh' ? category.nameZh : category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.itemCount} {i18n.language === 'zh' ? '个词' : 'words'}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Start Tip */}
      <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">💡</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {i18n.language === 'zh' ? '开始学习' : 'Get Started'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {i18n.language === 'zh'
                ? '选择一个类别开始学习词汇。点击任何类别查看单词列表。'
                : 'Select a category above to start learning vocabulary. Click any category to see the word list.'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

