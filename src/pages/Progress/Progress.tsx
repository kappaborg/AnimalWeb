import { Card } from '@/components/common';
import { dbUtils } from '@/services/database/db';
import { Award, BookOpen, Heart, Star, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Stats {
  totalWords: number;
  learnedWords: number;
  masteredWords: number;
  favoriteWords: number;
  challengesCompleted: number;
  averageScore: number;
  streakDays: number;
}

export const Progress = () => {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<Stats>({
    totalWords: 0,
    learnedWords: 0,
    masteredWords: 0,
    favoriteWords: 0,
    challengesCompleted: 0,
    averageScore: 0,
    streakDays: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const statistics = await dbUtils.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Error loading statistics:', error);
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

  const progressPercentage = stats.totalWords > 0
    ? Math.round(((stats.learnedWords + stats.masteredWords) / stats.totalWords) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t('navigation:progress')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh' ? '跟踪您的学习进度' : 'Track your learning journey'}
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {i18n.language === 'zh' ? '总体进度' : 'Overall Progress'}
          </h2>
          <span className="text-3xl font-bold text-primary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh'
            ? `已学习 ${stats.learnedWords + stats.masteredWords} / ${stats.totalWords} 个单词`
            : `${stats.learnedWords + stats.masteredWords} / ${stats.totalWords} words learned`}
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '词汇总数' : 'Total Words'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalWords.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '学习中' : 'Learning'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.learnedWords}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '已掌握' : 'Mastered'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.masteredWords}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '收藏' : 'Favorites'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.favoriteWords}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '完成挑战' : 'Challenges'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.challengesCompleted}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {i18n.language === 'zh' ? '平均分' : 'Avg Score'}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.averageScore}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Motivation Card */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {i18n.language === 'zh' ? '继续加油！' : 'Keep Going!'}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {i18n.language === 'zh'
              ? '每天学习一点，进步看得见。继续保持！'
              : 'Every day you study brings you closer to your goals. Keep it up!'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Progress;

