import ListeningChallenge from '@/components/challenges/ListeningChallenge';
import SpeakingChallenge from '@/components/challenges/SpeakingChallenge';
import WritingChallenge from '@/components/challenges/WritingChallenge';
import { Button, Card } from '@/components/common';
import { db } from '@/services/database/db';
import type { Category } from '@/types';
import { Headphones, Mic, PenTool, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ChallengeType = 'speaking' | 'listening' | 'writing' | null;

export const Challenges = () => {
  const { t, i18n } = useTranslation('challenges');
  const [activeChallenge, setActiveChallenge] = useState<ChallengeType>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await db.categories.orderBy('order').toArray();
    setCategories(cats);
  };

  const handleStartChallenge = (type: ChallengeType) => {
    setShowSettings(true);
    setActiveChallenge(type);
  };

  const handleBeginChallenge = () => {
    setShowSettings(false);
  };

  const handleCompleteChallenge = (score: number) => {
    // Save score to database
    db.challengeResults.add({
      id: `challenge-${Date.now()}`,
      challengeType: activeChallenge as 'speaking' | 'listening' | 'writing',
      categoryId: selectedCategory || 'all',
      score,
      totalQuestions: 10,
      correctAnswers: Math.round((score / 100) * 10),
      timeSpent: 0,
      completedAt: Date.now()
    });

    // Reset
    setActiveChallenge(null);
    setSelectedCategory('');
    setSelectedDifficulty('beginner');
  };

  const handleClose = () => {
    setActiveChallenge(null);
    setShowSettings(false);
    setSelectedCategory('');
    setSelectedDifficulty('beginner');
  };

  if (activeChallenge && !showSettings) {
    return (
      <div className="animate-fade-in">
        {/* Challenge Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {activeChallenge === 'writing' && t('writing.name')}
            {activeChallenge === 'speaking' && t('speaking.name')}
            {activeChallenge === 'listening' && t('listening.name')}
          </h2>
          <Button onClick={handleClose} variant="ghost">
            <X className="w-5 h-5 mr-2" />
            {i18n.language === 'zh' ? '关闭' : 'Close'}
          </Button>
        </div>

        {/* Active Challenge Component */}
        {activeChallenge === 'writing' && (
          <WritingChallenge
            category={selectedCategory || undefined}
            difficulty={selectedDifficulty}
            onComplete={handleCompleteChallenge}
          />
        )}
        {activeChallenge === 'speaking' && (
          <SpeakingChallenge
            category={selectedCategory || undefined}
            difficulty={selectedDifficulty}
            onComplete={handleCompleteChallenge}
          />
        )}
        {activeChallenge === 'listening' && (
          <ListeningChallenge
            category={selectedCategory || undefined}
            difficulty={selectedDifficulty}
            onComplete={handleCompleteChallenge}
          />
        )}
      </div>
    );
  }

  if (showSettings && activeChallenge) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {i18n.language === 'zh' ? '挑战设置' : 'Challenge Settings'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {i18n.language === 'zh' ? '选择类别（可选）' : 'Select Category (Optional)'}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">
                  {i18n.language === 'zh' ? '所有类别' : 'All Categories'}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {i18n.language === 'zh' ? cat.nameZh : cat.name} ({cat.itemCount} {i18n.language === 'zh' ? '词' : 'words'})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {i18n.language === 'zh' ? '选择难度' : 'Select Difficulty'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level as any)}
                    className={`px-4 py-3 rounded-lg border-2 transition ${
                      selectedDifficulty === level
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary'
                    }`}
                  >
                    {i18n.language === 'zh'
                      ? level === 'beginner' ? '初级' : level === 'intermediate' ? '中级' : '高级'
                      : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleBeginChallenge}
              variant="primary"
              size="lg"
              fullWidth
            >
              {i18n.language === 'zh' ? '开始挑战' : 'Start Challenge'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {i18n.language === 'zh'
            ? '通过有趣的挑战测试您的词汇技能'
            : 'Test your vocabulary skills with fun challenges'}
        </p>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Writing Challenge */}
        <Card hoverable className="p-6 group">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center group-hover:scale-110 transition">
              <PenTool className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('writing.name')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('writing.description')}
            </p>
            <ul className="text-sm text-left text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ {i18n.language === 'zh' ? '画布绘图' : 'Canvas drawing'}</li>
              <li>✓ {i18n.language === 'zh' ? '触摸/手写笔支持' : 'Touch/stylus support'}</li>
              <li>✓ {i18n.language === 'zh' ? '保存练习' : 'Save practice'}</li>
            </ul>
            <Button
              onClick={() => handleStartChallenge('writing')}
              variant="primary"
              fullWidth
            >
              {t('writing.start')}
            </Button>
          </div>
        </Card>

        {/* Speaking Challenge */}
        <Card hoverable className="p-6 group">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center group-hover:scale-110 transition">
              <Mic className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('speaking.name')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('speaking.description')}
            </p>
            <ul className="text-sm text-left text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ {i18n.language === 'zh' ? '语音识别' : 'Voice recognition'}</li>
              <li>✓ {i18n.language === 'zh' ? '发音检查' : 'Pronunciation check'}</li>
              <li>✓ {i18n.language === 'zh' ? '即时反馈' : 'Instant feedback'}</li>
            </ul>
            <Button
              onClick={() => handleStartChallenge('speaking')}
              variant="primary"
              fullWidth
            >
              {t('speaking.start')}
            </Button>
          </div>
        </Card>

        {/* Listening Challenge */}
        <Card hoverable className="p-6 group">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center group-hover:scale-110 transition">
              <Headphones className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('listening.name')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('listening.description')}
            </p>
            <ul className="text-sm text-left text-gray-600 dark:text-gray-400 space-y-1">
              <li>✓ {i18n.language === 'zh' ? '音频测验' : 'Audio quiz'}</li>
              <li>✓ {i18n.language === 'zh' ? '多项选择' : 'Multiple choice'}</li>
              <li>✓ {i18n.language === 'zh' ? '听力训练' : 'Listening practice'}</li>
            </ul>
            <Button
              onClick={() => handleStartChallenge('listening')}
              variant="primary"
              fullWidth
            >
              {t('listening.start')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {i18n.language === 'zh' ? '💡 提示' : '💡 Tips'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {i18n.language === 'zh'
            ? '每个挑战包含10个单词。您可以选择特定类别和难度级别来自定义您的练习。'
            : 'Each challenge contains 10 words. You can choose specific categories and difficulty levels to customize your practice.'}
        </p>
      </Card>
    </div>
  );
};

export default Challenges;

