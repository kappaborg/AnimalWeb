import { Card } from '@/components/common';
import { db } from '@/services/database/db';
import { useSettingsStore } from '@/store';
import { Globe, Moon, Sun, Volume2, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const {
    language,
    theme,
    audioEnabled,
    autoPlay,
    fontSize,
    setLanguage,
    setAudioEnabled,
    setAutoPlay,
    setFontSize,
    toggleTheme
  } = useSettingsStore();

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    document.documentElement.classList.toggle('dark');
  };

  const handleClearData = async () => {
    if (window.confirm(i18n.language === 'zh' 
      ? '确定要清除所有数据吗？这将删除您的进度、收藏和设置。' 
      : 'Are you sure you want to clear all data? This will delete your progress, favorites, and settings.')) {
      try {
        await db.userProgress.clear();
        await db.challengeResults.clear();
        alert(i18n.language === 'zh' ? '数据已清除' : 'Data cleared');
        window.location.reload();
      } catch (error) {
        console.error('Error clearing data:', error);
        alert(i18n.language === 'zh' ? '清除失败' : 'Failed to clear data');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {t('navigation:settings')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {i18n.language === 'zh' ? '自定义您的学习体验' : 'Customize your learning experience'}
        </p>
      </div>

      {/* Language Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {i18n.language === 'zh' ? '语言' : 'Language'}
          </h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => handleLanguageChange('en')}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-gray-900 dark:text-white">English</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="zh"
              checked={language === 'zh'}
              onChange={() => handleLanguageChange('zh')}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <span className="text-gray-900 dark:text-white">中文 (Chinese)</span>
          </label>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          {theme === 'light' ? (
            <Sun className="w-6 h-6 text-primary" />
          ) : (
            <Moon className="w-6 h-6 text-primary" />
          )}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {i18n.language === 'zh' ? '外观' : 'Appearance'}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">
              {i18n.language === 'zh' ? '主题' : 'Theme'}
            </span>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {theme === 'light' 
                ? (i18n.language === 'zh' ? '浅色' : 'Light')
                : (i18n.language === 'zh' ? '深色' : 'Dark')}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">
              {i18n.language === 'zh' ? '字体大小' : 'Font Size'}
            </span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="small">{i18n.language === 'zh' ? '小' : 'Small'}</option>
              <option value="medium">{i18n.language === 'zh' ? '中' : 'Medium'}</option>
              <option value="large">{i18n.language === 'zh' ? '大' : 'Large'}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Audio Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Volume2 className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {i18n.language === 'zh' ? '音频' : 'Audio'}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-white">
              {i18n.language === 'zh' ? '启用音频' : 'Enable Audio'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-900 dark:text-white block">
                {i18n.language === 'zh' ? '自动播放' : 'Auto Play'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {i18n.language === 'zh' ? '查看词汇时自动播放发音' : 'Automatically play pronunciation when viewing words'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {i18n.language === 'zh' ? '数据管理' : 'Data Management'}
          </h2>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleClearData}
            className="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition font-medium"
          >
            {i18n.language === 'zh' ? '清除所有数据' : 'Clear All Data'}
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {i18n.language === 'zh'
              ? '这将删除您的进度、收藏和设置。词汇数据将保留。'
              : 'This will delete your progress, favorites, and settings. Vocabulary data will be preserved.'}
          </p>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6 bg-gray-50 dark:bg-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          {i18n.language === 'zh' ? '应用信息' : 'App Info'}
        </h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>{i18n.language === 'zh' ? '版本:' : 'Version:'}</strong> 0.1.0</p>
          <p><strong>{i18n.language === 'zh' ? '词汇:' : 'Vocabulary:'}</strong> 3,498 {i18n.language === 'zh' ? '个词' : 'words'}</p>
          <p><strong>{i18n.language === 'zh' ? '类别:' : 'Categories:'}</strong> 15</p>
          <p><strong>{i18n.language === 'zh' ? '模式:' : 'Mode:'}</strong> {i18n.language === 'zh' ? '离线优先' : 'Offline-First'}</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;

