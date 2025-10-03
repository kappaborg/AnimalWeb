import { useSettingsStore } from '@/store';
import { BookOpen, Globe, Home, Settings, TrendingUp, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, setLanguage } = useSettingsStore();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };
  
  const handleThemeToggle = () => {
    toggleTheme();
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {t('common:app.name')}
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition">
              <Home className="w-5 h-5" />
              <span>{t('navigation:home')}</span>
            </Link>
            <Link to="/challenges" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition">
              <Trophy className="w-5 h-5" />
              <span>{t('navigation:challenges')}</span>
            </Link>
            <Link to="/progress" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition">
              <TrendingUp className="w-5 h-5" />
              <span>{t('navigation:progress')}</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary transition">
              <Settings className="w-5 h-5" />
              <span>{t('navigation:settings')}</span>
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {i18n.language === 'en' ? '中文' : 'English'}
              </span>
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

