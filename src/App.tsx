import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import Category from './pages/Category';
import Challenges from './pages/Challenges';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import VocabularyDetail from './pages/VocabularyDetail';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply saved language preference
    const savedLang = localStorage.getItem('app-language') || 'en';
    i18n.changeLanguage(savedLang);

    // Apply theme
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, [i18n]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="vocabulary/:wordId" element={<VocabularyDetail />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

