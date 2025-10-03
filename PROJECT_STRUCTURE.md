# AnimalWeb - Project Structure

**Version:** 1.0  
**Architecture:** Modular Component-Based (React + TypeScript)

---

## 📁 Complete Directory Structure

```
AnimalWeb/
│
├── 📄 README.md
├── 📄 MVP.md
├── 📄 PROJECT_STRUCTURE.md
├── 📄 roadmap.md
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 tailwind.config.js
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 .eslintrc.json
├── 📄 .prettierrc
│
├── 📂 public/
│   ├── 📄 manifest.json          # PWA manifest
│   ├── 📄 robots.txt
│   ├── 📄 favicon.ico
│   ├── 🖼️ icons/
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── 📄 service-worker.js      # PWA service worker
│
├── 📂 src/
│   │
│   ├── 📄 main.tsx               # Application entry point
│   ├── 📄 App.tsx                # Root component
│   ├── 📄 index.css              # Global styles
│   ├── 📄 vite-env.d.ts          # Vite types
│   │
│   ├── 📂 assets/
│   │   │
│   │   ├── 📂 audio/             # Audio files organized by category
│   │   │   ├── 📂 animals/
│   │   │   │   ├── 📂 mammals/
│   │   │   │   │   ├── 🔊 mouse.mp3
│   │   │   │   │   ├── 🔊 wolf.mp3
│   │   │   │   │   └── ...
│   │   │   │   ├── 📂 birds/
│   │   │   │   ├── 📂 reptiles/
│   │   │   │   └── 📂 sea-animals/
│   │   │   ├── 📂 food/
│   │   │   │   ├── 📂 fruits/
│   │   │   │   ├── 📂 vegetables/
│   │   │   │   └── ...
│   │   │   ├── 📂 body/
│   │   │   ├── 📂 clothing/
│   │   │   ├── 📂 transportation/
│   │   │   │   ├── 📂 car-brands/
│   │   │   │   └── ...
│   │   │   ├── 📂 nature/
│   │   │   ├── 📂 house/
│   │   │   ├── 📂 various/
│   │   │   │   ├── 📂 country-flags/
│   │   │   │   └── ...
│   │   │   └── 📂 geography/
│   │   │
│   │   ├── 📂 images/            # Images organized same as audio
│   │   │   ├── 📂 animals/
│   │   │   │   ├── 📂 mammals/
│   │   │   │   │   ├── 🖼️ mouse.webp
│   │   │   │   │   ├── 🖼️ wolf.webp
│   │   │   │   │   └── ...
│   │   │   │   └── ...
│   │   │   ├── 📂 food/
│   │   │   ├── 📂 body/
│   │   │   ├── 📂 clothing/
│   │   │   ├── 📂 transportation/
│   │   │   ├── 📂 nature/
│   │   │   ├── 📂 house/
│   │   │   ├── 📂 various/
│   │   │   └── 📂 geography/
│   │   │
│   │   ├── 📂 fonts/             # Custom fonts
│   │   │   ├── Inter-Regular.woff2
│   │   │   ├── Inter-Bold.woff2
│   │   │   └── ...
│   │   │
│   │   └── 📂 icons/             # UI icons (SVG)
│   │       ├── chevron-right.svg
│   │       ├── play-circle.svg
│   │       ├── heart.svg
│   │       └── ...
│   │
│   ├── 📂 components/
│   │   │
│   │   ├── 📂 common/            # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   ├── Dropdown/
│   │   │   ├── Badge/
│   │   │   ├── Toast/
│   │   │   ├── Spinner/
│   │   │   ├── Icon/
│   │   │   ├── Switch/
│   │   │   ├── Tabs/
│   │   │   ├── Tooltip/
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── 📂 vocabulary/        # Vocabulary-specific components
│   │   │   ├── VocabCard/
│   │   │   │   ├── VocabCard.tsx
│   │   │   │   ├── VocabCard.module.css
│   │   │   │   ├── VocabCard.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── VocabGrid/
│   │   │   ├── VocabList/
│   │   │   ├── VocabDetail/
│   │   │   ├── AudioPlayer/
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   ├── AudioPlayer.module.css
│   │   │   │   └── index.ts
│   │   │   ├── FavoriteButton/
│   │   │   ├── ProgressIndicator/
│   │   │   ├── SearchBar/
│   │   │   ├── FilterPanel/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 challenges/        # Challenge components
│   │   │   ├── SpeakingChallenge/
│   │   │   │   ├── SpeakingChallenge.tsx
│   │   │   │   ├── SpeakingChallenge.module.css
│   │   │   │   ├── MicrophoneInput.tsx
│   │   │   │   ├── SpeechRecognition.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ListeningChallenge/
│   │   │   │   ├── ListeningChallenge.tsx
│   │   │   │   ├── AudioQuestion.tsx
│   │   │   │   ├── AnswerOptions.tsx
│   │   │   │   └── index.ts
│   │   │   ├── WritingChallenge/
│   │   │   │   ├── WritingChallenge.tsx
│   │   │   │   ├── WritingCanvas.tsx
│   │   │   │   ├── ToolBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ChallengeCard/
│   │   │   ├── ScoreBoard/
│   │   │   ├── Timer/
│   │   │   ├── ResultModal/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 writing/           # Writing feature (tablet)
│   │   │   ├── WritingCanvas/
│   │   │   │   ├── WritingCanvas.tsx
│   │   │   │   ├── Canvas.tsx
│   │   │   │   ├── DrawingTools.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ToolBar/
│   │   │   ├── StrokeGuide/
│   │   │   ├── WritingFeedback/
│   │   │   ├── WritingHistory/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 navigation/        # Navigation components
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   ├── CategoryMenu/
│   │   │   ├── SearchBar/
│   │   │   ├── Breadcrumbs/
│   │   │   ├── NavLink/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 layout/            # Layout components
│   │   │   ├── MainLayout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── MainLayout.module.css
│   │   │   │   └── index.ts
│   │   │   ├── CategoryLayout/
│   │   │   ├── ChallengeLayout/
│   │   │   ├── Container/
│   │   │   ├── Grid/
│   │   │   └── index.ts
│   │   │
│   │   └── 📂 features/          # Feature-specific components
│   │       ├── ProgressTracker/
│   │       ├── Statistics/
│   │       ├── Achievements/
│   │       ├── Settings/
│   │       └── index.ts
│   │
│   ├── 📂 pages/                 # Page components
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.module.css
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   └── index.ts
│   │   ├── Category/
│   │   │   ├── Category.tsx
│   │   │   ├── Category.module.css
│   │   │   └── index.ts
│   │   ├── VocabularyDetail/
│   │   │   ├── VocabularyDetail.tsx
│   │   │   └── index.ts
│   │   ├── Challenges/
│   │   │   ├── Challenges.tsx
│   │   │   └── index.ts
│   │   ├── Progress/
│   │   │   ├── Progress.tsx
│   │   │   └── index.ts
│   │   ├── Settings/
│   │   │   ├── Settings.tsx
│   │   │   └── index.ts
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── index.ts
│   │   └── NotFound/
│   │       ├── NotFound.tsx
│   │       └── index.ts
│   │
│   ├── 📂 hooks/                 # Custom React hooks
│   │   ├── useAudio.ts
│   │   ├── useVocabulary.ts
│   │   ├── useProgress.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useKeyboard.ts
│   │   ├── useOffline.ts
│   │   ├── useSpeechRecognition.ts
│   │   ├── useCanvas.ts
│   │   ├── useDebounce.ts
│   │   ├── useThrottle.ts
│   │   ├── useTranslation.ts     # i18n hook wrapper
│   │   └── index.ts
│   │
│   ├── 📂 store/                 # State management (Zustand)
│   │   ├── index.ts
│   │   ├── vocabularyStore.ts
│   │   ├── userStore.ts
│   │   ├── progressStore.ts
│   │   ├── settingsStore.ts
│   │   ├── languageStore.ts      # Language preference
│   │   ├── challengeStore.ts
│   │   └── types.ts
│   │
│   ├── 📂 services/              # Business logic & API
│   │   ├── database/
│   │   │   ├── db.ts             # IndexedDB setup (Dexie)
│   │   │   ├── vocabularyService.ts
│   │   │   ├── progressService.ts
│   │   │   ├── challengeService.ts
│   │   │   └── migrations.ts
│   │   ├── audio/
│   │   │   ├── audioService.ts
│   │   │   ├── audioCache.ts
│   │   │   └── speechRecognition.ts
│   │   ├── storage/
│   │   │   ├── storageService.ts
│   │   │   └── cacheService.ts
│   │   └── index.ts
│   │
│   ├── 📂 utils/                 # Utility functions
│   │   ├── formatters.ts         # Date, number formatters
│   │   ├── validators.ts         # Input validation
│   │   ├── helpers.ts            # General helpers
│   │   ├── constants.ts          # App constants
│   │   ├── logger.ts             # Logging utility
│   │   ├── performance.ts        # Performance monitoring
│   │   └── index.ts
│   │
│   ├── 📂 types/                 # TypeScript type definitions
│   │   ├── vocabulary.ts
│   │   ├── category.ts
│   │   ├── user.ts
│   │   ├── progress.ts
│   │   ├── challenge.ts
│   │   ├── common.ts
│   │   └── index.ts
│   │
│   ├── 📂 styles/                # Global styles
│   │   ├── variables.css         # CSS variables
│   │   ├── reset.css             # CSS reset
│   │   ├── typography.css        # Typography styles
│   │   ├── animations.css        # Animations
│   │   ├── utilities.css         # Utility classes
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   │
│   ├── 📂 config/                # Configuration files
│   │   ├── routes.ts             # Route definitions
│   │   ├── categories.ts         # Category configuration
│   │   ├── theme.ts              # Theme configuration
│   │   ├── i18n.ts               # i18n configuration
│   │   └── app.ts                # App configuration
│   │
│   ├── 📂 locales/               # Translation files
│   │   ├── en/
│   │   │   ├── common.json       # Common UI text
│   │   │   ├── navigation.json   # Navigation labels
│   │   │   ├── vocabulary.json   # Vocabulary-related text
│   │   │   ├── challenges.json   # Challenge instructions
│   │   │   ├── errors.json       # Error messages
│   │   │   └── settings.json     # Settings labels
│   │   └── zh/                   # 中文翻译
│   │       ├── common.json       # 通用界面文本
│   │       ├── navigation.json   # 导航标签
│   │       ├── vocabulary.json   # 词汇相关文本
│   │       ├── challenges.json   # 挑战说明
│   │       ├── errors.json       # 错误信息
│   │       └── settings.json     # 设置标签
│   │
│   └── 📂 data/                  # Static data
│       ├── categories.json
│       ├── vocabulary.json       # Generated from CSV
│       └── schema.json
│
├── 📂 scripts/                   # Build & utility scripts
│   ├── process-audio.js          # Audio processing
│   ├── process-images.js         # Image optimization
│   ├── generate-manifest.js      # PWA manifest generator
│   ├── csv-to-json.js            # Convert CSV to JSON
│   ├── validate-data.js          # Data validation
│   └── seed-database.js          # Initial database seeding
│
├── 📂 tests/                     # Test files
│   ├── 📂 unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── 📂 integration/
│   │   ├── vocabulary-flow.test.ts
│   │   ├── challenge-flow.test.ts
│   │   └── offline-sync.test.ts
│   ├── 📂 e2e/
│   │   ├── user-journey.spec.ts
│   │   ├── offline.spec.ts
│   │   └── performance.spec.ts
│   ├── setup.ts
│   └── helpers.ts
│
├── 📂 docs/                      # Documentation
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── USER_GUIDE.md
│
└── 📂 tools/                     # Development tools
    ├── storybook/                # Component showcase
    ├── design-tokens/            # Design system tokens
    └── generators/               # Code generators

```

---

## 🏗️ Architecture Patterns

### **1. Component Organization**

Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx           # Main component logic
├── ComponentName.module.css    # Component styles
├── ComponentName.test.tsx      # Component tests
├── types.ts                    # Component-specific types
├── hooks.ts                    # Component-specific hooks
└── index.ts                    # Public exports
```

### **2. Modular Design Principles**

#### **A. Separation of Concerns**
- **Components**: UI rendering only
- **Hooks**: Reusable logic
- **Services**: Business logic & data access
- **Store**: Global state management
- **Utils**: Pure functions

#### **B. Reusability Strategy**
```typescript
// ✅ Good: Reusable, configurable
<VocabCard 
  word="wolf"
  category="mammals"
  audioUrl="/audio/animals/mammals/wolf.mp3"
  imageUrl="/images/animals/mammals/wolf.webp"
  onPlay={handlePlay}
  onFavorite={handleFavorite}
/>

// ❌ Bad: Hard-coded, not reusable
<MammalCard word="wolf" />
```

#### **C. Props Interface Pattern**
```typescript
// Base props that all vocab cards share
interface BaseVocabCardProps {
  word: string;
  category: string;
  audioUrl: string;
  imageUrl: string;
}

// Extended props for specific variants
interface InteractiveVocabCardProps extends BaseVocabCardProps {
  onPlay: () => void;
  onFavorite: () => void;
  onDetail: () => void;
}
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────┐
│                   User Action                    │
│            (Click, Hover, Voice Input)           │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              Component Event Handler             │
│            (e.g., handleVocabClick)              │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              Custom Hook (if needed)             │
│          (e.g., useVocabulary, useAudio)         │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│                 Store (Zustand)                  │
│         Update global state if needed            │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│                   Service Layer                  │
│      (Database, Audio, Storage Services)         │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              IndexedDB / LocalStorage            │
│                  Cache / Files                   │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│              Update Component State              │
│                   Re-render UI                   │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Styling Architecture

### **Tailwind CSS + CSS Modules Hybrid**

```typescript
// Component using both Tailwind and CSS Modules
import styles from './VocabCard.module.css';

export const VocabCard = ({ word, imageUrl }: Props) => {
  return (
    <div className={`${styles.card} rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
      <img src={imageUrl} alt={word} className={styles.image} />
      <h3 className="text-xl font-bold text-gray-800">{word}</h3>
    </div>
  );
};
```

**Strategy:**
- Use **Tailwind** for: spacing, colors, responsive design, utilities
- Use **CSS Modules** for: complex animations, component-specific styles

---

## 🗄️ Database Schema (IndexedDB)

```typescript
// Using Dexie.js for IndexedDB

class VocabularyDatabase extends Dexie {
  vocabulary!: Table<VocabularyItem>;
  categories!: Table<Category>;
  userProgress!: Table<UserProgress>;
  challengeResults!: Table<ChallengeResult>;
  settings!: Table<Settings>;

  constructor() {
    super('VocabularyDB');
    this.version(1).stores({
      vocabulary: 'id, word, category, *tags, difficulty',
      categories: 'id, name, order',
      userProgress: 'id, vocabularyId, status, lastReviewedAt',
      challengeResults: 'id, challengeType, categoryId, completedAt',
      settings: 'key'
    });
  }
}

export const db = new VocabularyDatabase();
```

---

## 🚀 Build & Deployment

### **Development**
```bash
npm run dev              # Start dev server
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run lint             # Lint code
npm run format           # Format code
npm run storybook        # Run Storybook
```

### **Production Build**
```bash
npm run build            # Build for production
npm run preview          # Preview production build
npm run analyze          # Analyze bundle size
```

### **Data Processing**
```bash
npm run process:csv      # Convert CSV to JSON
npm run process:audio    # Optimize audio files
npm run process:images   # Optimize images
npm run validate:data    # Validate data integrity
npm run seed:db          # Seed database
```

---

## 📦 Technology Stack

### **Core**
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **react-i18next** - Internationalization (i18n)

### **State & Data**
- **Zustand** - State management
- **Dexie.js** - IndexedDB wrapper
- **React Query** - Data fetching (if needed)

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS
- **CSS Modules** - Component styles
- **Lucide React** - Icons
- **Framer Motion** - Animations

### **Audio & Canvas**
- **Howler.js** - Audio management
- **Web Audio API** - Audio processing
- **Fabric.js** - Canvas manipulation
- **Web Speech API** - Speech recognition

### **PWA & Offline**
- **Workbox** - Service worker
- **Vite PWA Plugin** - PWA setup

### **Testing**
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing

### **Development**
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Storybook** - Component showcase

---

## 🔐 Security Considerations

- No sensitive data stored locally
- Content Security Policy (CSP) headers
- Input sanitization for user-generated content
- HTTPS only (when deployed)
- No external CDN dependencies (fully offline)

---

## 📱 Responsive Breakpoints

```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large screens
};
```

---

## 🎯 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 500KB (initial)
- **Image Size**: < 50KB average
- **Audio Size**: < 30KB average

---

## 📚 Naming Conventions

### **Files**
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `ComponentName.module.css`
- Tests: `ComponentName.test.tsx`

### **Variables**
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`
- Components: `PascalCase`
- Types/Interfaces: `PascalCase`

### **CSS Classes**
- BEM for CSS Modules: `block__element--modifier`
- Tailwind utilities: as provided by framework

---

**Document Status:** ✅ Complete  
**Last Updated:** October 3, 2025

