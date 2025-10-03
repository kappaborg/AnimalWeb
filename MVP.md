# AnimalWeb - Minimum Viable Product (MVP) Document

**Version:** 1.0  
**Date:** October 3, 2025  
**Project Type:** Offline Vocabulary Learning Application

---

## 🎯 Project Vision

Create a professional, offline-first vocabulary learning application featuring 3,500+ English words with interactive audio, visual learning, and writing practice capabilities. The app will provide an immersive learning experience across multiple categories with a focus on modular, reusable components.

---

## 📋 Core Requirements

### 1. **Offline-First Architecture**
- ✅ 100% offline functionality
- ✅ No internet connection required after installation
- ✅ All assets (audio, images, data) stored locally
- ✅ Progressive Web App (PWA) for easy installation
- ✅ Local storage for user progress and settings

### 2. **Content Scope**
- ✅ 3,500+ vocabulary words from Chinese Gaokao English syllabus
- ✅ Multiple categories (Animals, Food, Body, Transportation, etc.)
- ✅ Custom high-quality images for each vocabulary item
- ✅ Professional audio pronunciations
- ✅ Additional categories: Car Brands, Country Flags

### 3. **User Interface & Experience**
- ✅ Modern, professional UI design
- ✅ Responsive layout (Mobile, Tablet, Desktop)
- ✅ Intuitive navigation
- ✅ Smooth animations and transitions
- ✅ Dark/Light mode support
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ **Bilingual Support:** English & Chinese (Mandarin) for all UI elements

### 3.5. **Internationalization (i18n)**
- ✅ Full Chinese (Mandarin) translations for all UI elements
- ✅ Chinese translations for vocabulary definitions and examples
- ✅ Language switcher (English/Chinese)
- ✅ Locale-aware formatting (dates, numbers)
- ✅ RTL support ready (future expansion)
- ✅ Translation files stored locally (offline support)
- ✅ Persistent language preference

### 4. **Interactive Learning Features**

#### A. Vocabulary Display (All Devices)
- Clickable/Hoverable vocabulary items
- Instant audio pronunciation playback
- Visual feedback on interaction
- Word definitions and examples
- Progress tracking

#### B. Writing Practice (Tablet Optimized)
- Canvas-based writing area
- Stroke-by-stroke guidance
- Real-time feedback
- Practice mode and test mode
- Save and review written work

#### C. Challenges (From Roadmap)
- Speaking Challenge (voice recognition)
- Listening Challenge (audio comprehension)
- Writing Challenge (tablet users)
- Progress badges and achievements

### 5. **Modular Architecture**
- Reusable components across all pages
- Consistent design system
- Shared state management
- Component library for:
  - Vocabulary cards
  - Audio player
  - Writing canvas
  - Navigation
  - Challenges
  - Progress tracking

---

## 🏗️ Technical Specifications

### **Frontend Framework**
- **Primary:** React 18+ with TypeScript
- **State Management:** Zustand (lightweight, simple)
- **Styling:** Tailwind CSS + CSS Modules
- **PWA:** Workbox for service workers
- **Audio:** Web Audio API + Howler.js
- **Canvas:** Fabric.js for writing functionality
- **Icons:** Lucide Icons / Heroicons / Phosphor Icons
- **i18n:** react-i18next (internationalization)

### **Local Storage**
- **Database:** IndexedDB (via Dexie.js)
- **Cache:** Service Worker Cache API
- **User Data:** LocalStorage + IndexedDB

### **Build & Optimization**
- **Bundler:** Vite
- **Image Optimization:** Sharp, WebP format
- **Audio Compression:** MP3 (32kbps) or Opus codec
- **Code Splitting:** Dynamic imports for categories
- **Minification:** Terser for JS, cssnano for CSS

---

## 📦 Feature Breakdown (MVP)

### **Phase 1: Core Features (Weeks 1-4)**

#### Week 1-2: Foundation
- [ ] Project setup and configuration
- [ ] Design system and component library
- [ ] Database schema design
- [ ] Asset processing pipeline (images, audio)
- [ ] PWA configuration
- [ ] i18n setup (react-i18next)
- [ ] Chinese translation files structure

#### Week 3-4: Core Functionality
- [ ] Vocabulary display component (bilingual)
- [ ] Audio playback system
- [ ] Category navigation (translated)
- [ ] Search and filter functionality
- [ ] Offline caching mechanism
- [ ] Language switcher component
- [ ] Translate all UI text

### **Phase 2: Enhanced Features (Weeks 5-8)**

#### Week 5-6: Interactive Learning
- [ ] Hover/Click interactions
- [ ] Speaking challenge with voice recognition
- [ ] Listening challenge with audio tests
- [ ] Progress tracking system
- [ ] Favorites and bookmarks

#### Week 7-8: Writing Feature (Tablet)
- [ ] Canvas-based writing interface
- [ ] Stroke recognition
- [ ] Practice and test modes
- [ ] Writing progress tracking
- [ ] Feedback and correction system

### **Phase 3: Polish & Testing (Weeks 9-10)**

#### Week 9: UI/UX Polish
- [ ] Animations and transitions
- [ ] Dark mode implementation
- [ ] Responsive design refinement
- [ ] Performance optimization
- [ ] Accessibility improvements

#### Week 10: Testing & Launch
- [ ] Cross-browser testing
- [ ] Device compatibility testing
- [ ] User acceptance testing
- [ ] Bug fixes and refinements
- [ ] Documentation and deployment

---

## 🎨 Design System Requirements

### **Color Palette**
```
Primary Colors:
- Primary: #2563EB (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)

Neutral Colors:
- Dark: #1F2937
- Medium: #6B7280
- Light: #F3F4F6
- White: #FFFFFF

Semantic Colors:
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Info: #3B82F6
```

### **Typography**
```
Primary Font: Inter (Sans-serif)
Secondary Font: Merriweather (Serif for definitions)
Monospace: JetBrains Mono (for code/technical terms)

Sizes:
- Heading 1: 2.5rem (40px)
- Heading 2: 2rem (32px)
- Heading 3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
```

### **Spacing System**
```
Base unit: 4px
Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
```

### **Border Radius**
```
Small: 4px
Medium: 8px
Large: 12px
XLarge: 16px
Round: 9999px
```

---

## 📱 Screen Specifications

### **Mobile (320px - 767px)**
- Single column layout
- Bottom navigation bar
- Compact vocabulary cards
- Simplified interactions
- Touch-optimized controls

### **Tablet (768px - 1023px)**
- Two-column layout
- Side navigation panel
- Writing canvas enabled
- Enhanced vocabulary cards
- Split-screen for practice

### **Desktop (1024px+)**
- Three-column layout
- Persistent sidebar navigation
- Expanded vocabulary details
- Keyboard shortcuts
- Multi-panel workspace

---

## 🔧 Component Architecture

### **Shared Components**
```
/components
  /common
    - Button.tsx
    - Card.tsx
    - Modal.tsx
    - Input.tsx
    - Dropdown.tsx
    - Badge.tsx
    - Toast.tsx
    - Spinner.tsx
    - Icon.tsx
  
  /vocabulary
    - VocabCard.tsx (Main reusable card)
    - VocabGrid.tsx (Grid layout)
    - VocabList.tsx (List layout)
    - VocabDetail.tsx (Detail view)
    - AudioPlayer.tsx (Pronunciation player)
    - FavoriteButton.tsx
    - ProgressIndicator.tsx
  
  /challenges
    - SpeakingChallenge.tsx
    - ListeningChallenge.tsx
    - WritingChallenge.tsx (tablet)
    - ChallengeCard.tsx
    - ScoreBoard.tsx
  
  /writing
    - WritingCanvas.tsx
    - ToolBar.tsx
    - StrokeGuide.tsx
    - WritingFeedback.tsx
  
  /navigation
    - Header.tsx
    - Sidebar.tsx
    - CategoryMenu.tsx
    - SearchBar.tsx
    - Breadcrumbs.tsx
  
  /layout
    - MainLayout.tsx
    - CategoryLayout.tsx
    - ChallengeLayout.tsx
```

### **Page Components**
```
/pages
  - Home.tsx
  - Category.tsx (Dynamic, reused for all categories)
  - VocabularyDetail.tsx
  - Challenges.tsx
  - Progress.tsx
  - Settings.tsx
  - About.tsx
```

---

## 📊 Data Structure

### **Vocabulary Item Schema**
```typescript
interface VocabularyItem {
  id: string;
  word: string;
  category: string;
  subcategory?: string;
  pronunciation: string; // IPA notation
  audioUrl: string;
  imageUrl: string;
  definition: string;
  definitionZh: string; // Chinese definition
  exampleSentence: string;
  exampleSentenceZh: string; // Chinese translation of example
  translation: string; // Chinese translation (required)
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  tagsZh: string[]; // Chinese tags
  relatedWords: string[];
  createdAt: number;
  updatedAt: number;
}
```

### **Category Schema**
```typescript
interface Category {
  id: string;
  name: string;
  nameZh: string; // Chinese category name
  icon: string;
  description: string;
  descriptionZh: string; // Chinese description
  color: string;
  subcategories: Subcategory[];
  itemCount: number;
  order: number;
}

interface Subcategory {
  id: string;
  name: string;
  nameZh: string; // Chinese subcategory name
  description?: string;
  descriptionZh?: string; // Chinese description
}
```

### **User Progress Schema**
```typescript
interface UserProgress {
  userId: string;
  vocabularyId: string;
  status: 'new' | 'learning' | 'mastered';
  lastReviewedAt: number;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  isFavorite: boolean;
  notes?: string;
  writingSamples?: string[]; // For tablet writing practice
}
```

### **Challenge Result Schema**
```typescript
interface ChallengeResult {
  id: string;
  userId: string;
  challengeType: 'speaking' | 'listening' | 'writing';
  categoryId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // seconds
  completedAt: number;
}
```

---

## 🎯 Key Performance Indicators (KPIs)

### **Technical KPIs**
- Initial load time: < 3 seconds
- Time to Interactive: < 5 seconds
- Audio playback latency: < 200ms
- Smooth animations: 60 FPS
- App size: < 300 MB (optimized)
- Offline functionality: 100%

### **User Experience KPIs**
- User session duration: > 10 minutes
- Daily active users retention: > 40%
- Feature adoption rate: > 60%
- User satisfaction score: > 4.5/5
- Task completion rate: > 80%

---

## 🚀 Success Metrics

### **Learning Outcomes**
- Average words learned per session: 15-20
- Retention rate (7-day): > 70%
- Challenge completion rate: > 60%
- Writing practice engagement (tablet): > 40%

### **Engagement Metrics**
- Daily active usage: > 15 minutes
- Weekly vocabulary practice: > 5 sessions
- Category completion rate: > 50%
- Return user rate (30-day): > 60%

---

## 🔐 Quality Assurance

### **Testing Requirements**
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests for core features
- [ ] E2E tests for critical user flows
- [ ] Performance testing (Lighthouse score >90)
- [ ] Accessibility testing (WAVE, axe)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Device testing (iOS, Android, various screen sizes)
- [ ] Offline functionality testing

### **Browser Support**
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Android (latest 2 versions)

---

## 📝 Documentation Requirements

- [ ] User guide
- [ ] Developer documentation
- [ ] Component documentation (Storybook)
- [ ] API documentation (if applicable)
- [ ] Installation guide
- [ ] Troubleshooting guide
- [ ] Contribution guidelines

---

## 🎓 User Stories

### **As a Student:**
1. I want to browse vocabulary by category so I can focus on specific topics
2. I want to hear pronunciations so I can learn correct pronunciation
3. I want to practice writing (tablet) so I can improve my writing skills
4. I want to track my progress so I can see my improvement
5. I want to use the app offline so I can study anywhere

### **As a Teacher:**
1. I want comprehensive vocabulary coverage so I can recommend it to students
2. I want progress tracking so I can monitor student learning
3. I want multiple practice modes so students can learn in different ways

### **As a Self-Learner:**
1. I want engaging challenges so learning stays fun
2. I want to favorite words so I can review difficult ones
3. I want a clean interface so I can focus on learning

---

## 🚧 Out of Scope (MVP)

Features to consider for future versions:

- ❌ User accounts and cloud sync
- ❌ Social features and leaderboards
- ❌ Custom vocabulary lists
- ❌ Advanced analytics dashboard
- ❌ AI-powered study recommendations
- ❌ Multi-language support (beyond English-Chinese)
- ❌ Additional language pairs (Spanish, French, etc.)
- ❌ Video content
- ❌ Gamification elements (beyond basic badges)
- ❌ Export/Import functionality

**Note:** English-Chinese bilingual support IS included in MVP.

---

## 💰 Budget Considerations

### **One-Time Costs**
- Professional audio recordings: $500-1,000
- Custom illustrations/images: $1,000-2,000
- UI/UX design: $1,500-3,000
- Icon licensing (if needed): $0-200
- Total: ~$3,000-6,200

### **Development Time Estimate**
- Solo developer: 10-12 weeks
- Small team (2-3): 6-8 weeks
- Total hours: ~400-500 hours

---

## 📅 Milestones

### **Milestone 1: Foundation (Week 4)**
- Project setup complete
- Design system implemented
- Database schema finalized
- Basic navigation working

### **Milestone 2: Core Features (Week 6)**
- Vocabulary display working
- Audio playback functional
- Search and filter complete
- Offline mode enabled

### **Milestone 3: Enhanced Features (Week 8)**
- All challenges implemented
- Writing feature complete (tablet)
- Progress tracking working
- All categories populated

### **Milestone 4: Launch Ready (Week 10)**
- All testing complete
- Performance optimized
- Documentation finished
- PWA installable

---

## 🎯 Definition of Done

A feature is "done" when:
- ✅ Code is written and reviewed
- ✅ Unit tests pass (>80% coverage)
- ✅ Integration tests pass
- ✅ UI matches design specifications
- ✅ Works offline
- ✅ Responsive on all breakpoints
- ✅ Accessible (keyboard navigation, screen readers)
- ✅ Performance benchmarks met
- ✅ Documentation updated
- ✅ Approved by stakeholders

---

## 📞 Stakeholders

- **Product Owner:** [To be defined]
- **Lead Developer:** [To be defined]
- **UI/UX Designer:** [To be defined]
- **QA Lead:** [To be defined]
- **Content Creator:** [To be defined]

---

## 🔄 Next Steps

1. ✅ Review and approve MVP document
2. ⏳ Upload CSV vocabulary file
3. ⏳ Categorize vocabulary into groups
4. ⏳ Setup project structure
5. ⏳ Source/create images and audio
6. ⏳ Begin Phase 1 development

---

**Document Status:** ✅ Ready for Review  
**Last Updated:** October 3, 2025

