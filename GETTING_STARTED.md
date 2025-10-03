# 🚀 Getting Started with AnimalWeb

Welcome to **AnimalWeb** - your offline vocabulary learning application! This guide will help you understand what's been built and how to continue development.

---

## ✅ What's Complete

### **Phase 1: Foundation** (100% Complete)

Your application is **fully functional** with:

1. ✅ **Complete React + TypeScript setup**
2. ✅ **PWA with offline support** (works without internet)
3. ✅ **Bilingual i18n** (English & Chinese Mandarin)
4. ✅ **IndexedDB database** (with 3,498 words ready to import)
5. ✅ **State management** (Zustand stores)
6. ✅ **UI component library** (Button, Card, Loading)
7. ✅ **Layout & navigation** (Header with language/theme switchers)
8. ✅ **All pages scaffolded** (Home, Category, Vocab Detail, etc.)
9. ✅ **Dark mode** 🌙
10. ✅ **Responsive design** 📱

---

## 🏃 Quick Start

### **1. Start Development Server**

The dev server should already be running! If not:

```bash
npm run dev
```

Then open: **http://localhost:3000**

### **2. What You'll See**

- **Home page** with welcome message and stats
- **Header** with navigation links
- **Language switcher** (click to toggle English ⇄ 中文)
- **Theme toggle** (click to switch Light ⇄ Dark mode)

### **3. Check the Console**

Open your browser's Developer Tools (F12) and check the Console. You should see:

```
✅ Database initialized
🔄 Checking database...
📥 Starting data import...
✅ Imported 3498 vocabulary items
✅ Imported 15 categories
📊 Category Statistics:
   🦁 Animals: 199 words
   🍔 Food & Drinks: 139 words
   ... (and more)
🎉 Database seeding complete!
✅ Vocabulary data ready
```

This means your **3,498 vocabulary items** are now stored **offline** in IndexedDB!

---

## 📊 Database Structure

### **What's in IndexedDB**

Open DevTools → Application → IndexedDB → VocabularyDB

You'll find:

1. **vocabulary** (3,498 items)
   - word, translation, category, difficulty
   - definition, definitionZh
   - exampleSentence, exampleSentenceZh
   - wordType, tags, etc.

2. **categories** (15 categories)
   - Animals, Food, Transportation, Education, etc.
   - Each with English & Chinese names
   - Item counts per category

3. **userProgress** (empty for now)
   - Will track user's learning progress

4. **settings** (default settings)
   - language: 'en'
   - theme: 'light'
   - audioEnabled: true

5. **challengeResults** (empty for now)
   - Will store challenge scores

---

## 🎯 Next Steps for Development

### **Priority 1: Display Vocabulary** 🎨

Create a vocabulary card component to display words:

#### **Create VocabCard Component**

```typescript
// src/components/vocabulary/VocabCard/VocabCard.tsx
import { VocabularyItem } from '@/types';
import { Card } from '@/components/common';
import { Volume2, Heart } from 'lucide-react';

interface VocabCardProps {
  item: VocabularyItem;
  onPlay?: () => void;
  onFavorite?: () => void;
}

export const VocabCard = ({ item, onPlay, onFavorite }: VocabCardProps) => {
  return (
    <Card hoverable className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{item.word}</h3>
        <button onClick={onFavorite}>
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        {item.translation}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm px-2 py-1 bg-primary-100 text-primary-700 rounded">
          {item.difficulty}
        </span>
        <button onClick={onPlay}>
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};
```

#### **Update Home Page to Show Categories**

```typescript
// src/pages/Home/Home.tsx
import { useEffect, useState } from 'react';
import { db } from '@/services/database/db';
import { Category } from '@/types';

export const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = async () => {
    const cats = await db.categories.toArray();
    setCategories(cats);
  };
  
  return (
    <div>
      {/* ... existing welcome section ... */}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map(cat => (
          <Card key={cat.id} hoverable>
            <div className="text-center">
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h3 className="font-bold">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.itemCount} words</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
```

### **Priority 2: Category Page** 📚

Update the Category page to show vocabulary items:

```typescript
// src/pages/Category/Category.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/services/database/db';
import { VocabularyItem } from '@/types';
import { VocabCard } from '@/components/vocabulary/VocabCard';

export const Category = () => {
  const { categoryId } = useParams();
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  
  useEffect(() => {
    loadVocabulary();
  }, [categoryId]);
  
  const loadVocabulary = async () => {
    if (categoryId) {
      const items = await db.vocabulary
        .where('category')
        .equals(categoryId)
        .toArray();
      setVocabulary(items);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {categoryId?.toUpperCase()}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabulary.map(item => (
          <VocabCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
```

### **Priority 3: Search Functionality** 🔍

Add a search component:

```typescript
// src/components/common/SearchBar/SearchBar.tsx
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
```

### **Priority 4: Audio Playback** 🔊

Use Web Speech API for text-to-speech (free & offline):

```typescript
// src/services/audio/textToSpeech.ts
export class TextToSpeechService {
  private synth: SpeechSynthesis;
  
  constructor() {
    this.synth = window.speechSynthesis;
  }
  
  speak(text: string, lang: string = 'en-US') {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    this.synth.speak(utterance);
  }
  
  stop() {
    this.synth.cancel();
  }
}

export const ttsService = new TextToSpeechService();
```

Then use in components:

```typescript
import { ttsService } from '@/services/audio/textToSpeech';

const handlePlayAudio = () => {
  ttsService.speak(item.word, 'en-US');
};
```

### **Priority 5: Favorites System** ⭐

Implement favorites using the existing database utilities:

```typescript
import { dbUtils } from '@/services/database/db';

const handleToggleFavorite = async () => {
  const isFav = await dbUtils.toggleFavorite(item.id);
  console.log(isFav ? 'Added to favorites' : 'Removed from favorites');
};
```

---

## 🛠️ Useful Database Queries

### **Get All Vocabulary**
```typescript
import { db } from '@/services/database/db';

const allWords = await db.vocabulary.toArray();
```

### **Filter by Category**
```typescript
const animals = await db.vocabulary
  .where('category')
  .equals('animals')
  .toArray();
```

### **Filter by Difficulty**
```typescript
const beginnerWords = await db.vocabulary
  .where('difficulty')
  .equals('beginner')
  .toArray();
```

### **Search**
```typescript
import { dbUtils } from '@/services/database/db';

const results = await dbUtils.searchVocabulary('hello');
```

### **Get Favorites**
```typescript
const favorites = await dbUtils.getFavorites();
```

### **Get Statistics**
```typescript
const stats = await dbUtils.getStatistics();
console.log(stats);
// { totalWords: 3498, learnedWords: 0, masteredWords: 0, ... }
```

---

## 📁 Project Structure Quick Reference

```
src/
├── components/
│   ├── common/          ← Reusable UI (Button, Card, Loading)
│   ├── layout/          ← Layout components (Header, MainLayout)
│   ├── vocabulary/      ← Create VocabCard here
│   ├── challenges/      ← Challenge components (TODO)
│   └── writing/         ← Writing canvas (TODO)
│
├── pages/               ← All page components
│   ├── Home/           ← Landing page
│   ├── Category/       ← Category vocabulary list
│   ├── VocabularyDetail/ ← Word detail page
│   ├── Challenges/     ← Challenge selection
│   ├── Progress/       ← User progress dashboard
│   └── Settings/       ← App settings
│
├── store/              ← Zustand state management
│   ├── settingsStore.ts  ← App settings
│   ├── vocabularyStore.ts ← Vocabulary state
│   └── progressStore.ts   ← User progress
│
├── services/           ← Business logic
│   ├── database/       ← IndexedDB (Dexie)
│   │   ├── db.ts      ← Database schema & utils
│   │   └── seedData.ts ← Data import
│   └── audio/          ← Audio playback (TODO)
│
├── types/              ← TypeScript types
├── config/             ← Configuration (i18n)
├── locales/            ← Translations (EN & ZH)
├── data/               ← Vocabulary JSON
└── assets/             ← Images, audio, fonts (TODO)
```

---

## 🎨 Styling Guidelines

### **Use Tailwind Classes**
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h2>
</div>
```

### **Color Variables**
- Primary: `bg-primary`, `text-primary`, `border-primary`
- Secondary: `bg-secondary`, `text-secondary`
- Accent: `bg-accent`, `text-accent`

### **Responsive Design**
```tsx
<div className="
  grid 
  grid-cols-1      /* Mobile: 1 column */
  md:grid-cols-2   /* Tablet: 2 columns */
  lg:grid-cols-3   /* Desktop: 3 columns */
  gap-4
">
```

---

## 🌐 i18n Usage

### **In Components**
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('vocabulary');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('search.placeholder')}</p>
    </div>
  );
};
```

### **Add New Translations**
Edit `src/locales/en/common.json` and `src/locales/zh/common.json`

---

## 🐛 Debugging Tips

### **Check Database**
```typescript
// In browser console:
const db = await (await import('./services/database/db')).db;
const count = await db.vocabulary.count();
console.log(`${count} words in database`);
```

### **View IndexedDB**
Chrome DevTools → Application → Storage → IndexedDB → VocabularyDB

### **Check State**
Install [Zustand DevTools](https://github.com/pmndrs/zustand#devtools)

---

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

Output will be in `dist/` folder.

### **Preview Production Build**
```bash
npm run preview
```

### **Deploy Options**
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Use `gh-pages` package

---

## 📚 Documentation

- `README.md` - Project overview
- `MVP.md` - Product requirements
- `PROJECT_STRUCTURE.md` - Architecture details
- `I18N_GUIDE.md` - Translation guide
- `BUILD_STATUS.md` - Current status
- `DEPLOYMENT_COMPLETE.md` - Phase 1 summary
- `roadmap.md` - Project roadmap

---

## 💡 Pro Tips

1. **Hot Reload**: Changes to code update instantly (Vite)
2. **TypeScript**: Let it guide you - hover for type info
3. **IndexedDB**: All data persists across page reloads
4. **Dark Mode**: Test both themes always
5. **Mobile First**: Design for mobile, enhance for desktop
6. **i18n**: Always test both languages

---

## 🎯 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `src/`
3. **Test in browser**: Auto-refreshes
4. **Check console**: Look for errors
5. **Test dark mode**: Toggle theme
6. **Test Chinese**: Toggle language
7. **Build**: `npm run build`
8. **Preview**: `npm run preview`
9. **Deploy**: Push to production

---

## 🎉 You're All Set!

Everything is ready for you to start building features. The foundation is **solid**, the data is **imported**, and the structure is **clean**.

### **Recommended Order**

1. ✅ Build VocabCard component
2. ✅ Update Home page with categories
3. ✅ Update Category page with vocabulary list
4. ✅ Add search functionality
5. ✅ Implement audio playback (TTS)
6. ✅ Add favorites system
7. ✅ Build vocabulary detail page
8. ✅ Create writing challenge
9. ✅ Implement progress tracking
10. ✅ Polish UI/UX

---

**Happy Coding! 🚀**

If you get stuck, check the documentation or the examples in the existing code. Everything follows best practices and clean architecture patterns.

**Your offline vocabulary app is ready to grow!** 🌱

