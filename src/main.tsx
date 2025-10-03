import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import i18n configuration
import './config/i18n';

// Import database initialization and seeding
import { initDatabase } from './services/database/db';
import { seedDatabase } from './services/database/seedData';

// Initialize database and import vocabulary on app start
(async () => {
  try {
    await initDatabase();
    console.log('✅ Database initialized');
    
    await seedDatabase();
    console.log('✅ Vocabulary data ready');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

