# Internationalization (i18n) Guide for AnimalWeb

**Version:** 1.0  
**Languages:** English (en) & Chinese Simplified (zh)  
**Library:** react-i18next  
**Last Updated:** October 3, 2025

---

## 🌍 Overview

AnimalWeb is a **fully bilingual application** supporting English and Chinese (Mandarin). Every UI element, vocabulary definition, example sentence, and instruction is available in both languages.

---

## 📦 Technology Stack

### **i18n Library: react-i18next**
- **Website:** https://react.i18next.com/
- **Why:** Most popular i18n solution for React
- **Features:**
  - ✅ Full offline support
  - ✅ Lazy loading translations
  - ✅ Interpolation and pluralization
  - ✅ TypeScript support
  - ✅ React hooks integration
  - ✅ Small bundle size (~10KB)

### **Installation**
```bash
npm install react-i18next i18next
npm install i18next-browser-languagedetector  # Auto-detect user language
npm install i18next-http-backend  # Load translation files
```

---

## 🗂️ Translation File Structure

```
src/locales/
├── en/                          # English translations
│   ├── common.json              # Common UI elements
│   ├── navigation.json          # Navigation labels
│   ├── vocabulary.json          # Vocabulary-related text
│   ├── challenges.json          # Challenge instructions
│   ├── errors.json              # Error messages
│   ├── settings.json            # Settings page
│   ├── progress.json            # Progress tracking
│   └── categories.json          # Category names & descriptions
│
└── zh/                          # 中文翻译 (Chinese)
    ├── common.json              # 通用界面元素
    ├── navigation.json          # 导航标签
    ├── vocabulary.json          # 词汇相关文本
    ├── challenges.json          # 挑战说明
    ├── errors.json              # 错误信息
    ├── settings.json            # 设置页面
    ├── progress.json            # 进度跟踪
    └── categories.json          # 类别名称和描述
```

---

## 📝 Translation File Examples

### **1. common.json (English)**
```json
{
  "app": {
    "name": "AnimalWeb",
    "tagline": "Master English Vocabulary Offline"
  },
  "actions": {
    "play": "Play",
    "pause": "Pause",
    "favorite": "Add to Favorites",
    "unfavorite": "Remove from Favorites",
    "share": "Share",
    "download": "Download",
    "close": "Close",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "back": "Back",
    "next": "Next",
    "search": "Search",
    "filter": "Filter",
    "retry": "Retry"
  },
  "states": {
    "loading": "Loading...",
    "error": "An error occurred",
    "empty": "No items found",
    "offline": "You are offline",
    "success": "Success!"
  },
  "time": {
    "today": "Today",
    "yesterday": "Yesterday",
    "thisWeek": "This Week",
    "thisMonth": "This Month"
  }
}
```

### **1. common.json (中文)**
```json
{
  "app": {
    "name": "动物网",
    "tagline": "离线掌握英语词汇"
  },
  "actions": {
    "play": "播放",
    "pause": "暂停",
    "favorite": "添加到收藏",
    "unfavorite": "取消收藏",
    "share": "分享",
    "download": "下载",
    "close": "关闭",
    "cancel": "取消",
    "confirm": "确认",
    "save": "保存",
    "delete": "删除",
    "edit": "编辑",
    "back": "返回",
    "next": "下一个",
    "search": "搜索",
    "filter": "筛选",
    "retry": "重试"
  },
  "states": {
    "loading": "加载中...",
    "error": "发生错误",
    "empty": "未找到项目",
    "offline": "您处于离线状态",
    "success": "成功！"
  },
  "time": {
    "today": "今天",
    "yesterday": "昨天",
    "thisWeek": "本周",
    "thisMonth": "本月"
  }
}
```

### **2. navigation.json (English)**
```json
{
  "home": "Home",
  "categories": "Categories",
  "favorites": "Favorites",
  "progress": "My Progress",
  "challenges": "Challenges",
  "settings": "Settings",
  "about": "About",
  "help": "Help",
  "tabs": {
    "all": "All",
    "animals": "Animals",
    "food": "Food",
    "transportation": "Transportation",
    "nature": "Nature",
    "house": "House"
  },
  "breadcrumbs": {
    "home": "Home",
    "category": "Category",
    "vocabulary": "Vocabulary"
  }
}
```

### **2. navigation.json (中文)**
```json
{
  "home": "首页",
  "categories": "分类",
  "favorites": "收藏",
  "progress": "我的进度",
  "challenges": "挑战",
  "settings": "设置",
  "about": "关于",
  "help": "帮助",
  "tabs": {
    "all": "全部",
    "animals": "动物",
    "food": "食物",
    "transportation": "交通",
    "nature": "自然",
    "house": "房屋"
  },
  "breadcrumbs": {
    "home": "首页",
    "category": "分类",
    "vocabulary": "词汇"
  }
}
```

### **3. vocabulary.json (English)**
```json
{
  "title": "Vocabulary",
  "search": {
    "placeholder": "Search vocabulary...",
    "noResults": "No results found for \"{{query}}\"",
    "resultsCount": "{{count}} results found"
  },
  "card": {
    "playAudio": "Play pronunciation",
    "showDefinition": "Show definition",
    "addToFavorites": "Add to favorites",
    "viewDetails": "View details"
  },
  "details": {
    "word": "Word",
    "pronunciation": "Pronunciation",
    "definition": "Definition",
    "example": "Example",
    "translation": "Translation",
    "difficulty": "Difficulty",
    "category": "Category",
    "relatedWords": "Related Words",
    "tags": "Tags"
  },
  "difficulty": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  },
  "filters": {
    "title": "Filter by",
    "difficulty": "Difficulty Level",
    "category": "Category",
    "status": "Learning Status",
    "clear": "Clear Filters"
  }
}
```

### **3. vocabulary.json (中文)**
```json
{
  "title": "词汇",
  "search": {
    "placeholder": "搜索词汇...",
    "noResults": "未找到 \"{{query}}\" 的结果",
    "resultsCount": "找到 {{count}} 个结果"
  },
  "card": {
    "playAudio": "播放发音",
    "showDefinition": "显示定义",
    "addToFavorites": "添加到收藏",
    "viewDetails": "查看详情"
  },
  "details": {
    "word": "单词",
    "pronunciation": "发音",
    "definition": "定义",
    "example": "例句",
    "translation": "翻译",
    "difficulty": "难度",
    "category": "分类",
    "relatedWords": "相关单词",
    "tags": "标签"
  },
  "difficulty": {
    "beginner": "初级",
    "intermediate": "中级",
    "advanced": "高级"
  },
  "filters": {
    "title": "筛选",
    "difficulty": "难度等级",
    "category": "分类",
    "status": "学习状态",
    "clear": "清除筛选"
  }
}
```

### **4. challenges.json (English)**
```json
{
  "title": "Challenges",
  "speaking": {
    "name": "Speaking Challenge",
    "description": "Practice your pronunciation",
    "instructions": "Click the microphone and repeat the word you hear",
    "allowMicrophone": "Please allow microphone access",
    "listening": "Listening...",
    "correct": "Excellent pronunciation!",
    "incorrect": "Try again",
    "score": "Your score: {{score}}/{{total}}"
  },
  "listening": {
    "name": "Listening Challenge",
    "description": "Test your listening comprehension",
    "instructions": "Listen to the audio and select the correct word",
    "playAgain": "Play again"
  },
  "writing": {
    "name": "Writing Challenge",
    "description": "Practice writing vocabulary",
    "instructions": "Write the word you hear on the canvas",
    "clear": "Clear",
    "submit": "Submit",
    "hint": "Show hint"
  },
  "results": {
    "title": "Challenge Complete!",
    "score": "Score",
    "time": "Time",
    "accuracy": "Accuracy",
    "tryAgain": "Try Again",
    "nextChallenge": "Next Challenge",
    "shareResult": "Share Result"
  }
}
```

### **4. challenges.json (中文)**
```json
{
  "title": "挑战",
  "speaking": {
    "name": "口语挑战",
    "description": "练习您的发音",
    "instructions": "点击麦克风并重复您听到的单词",
    "allowMicrophone": "请允许麦克风访问",
    "listening": "正在听...",
    "correct": "发音很棒！",
    "incorrect": "再试一次",
    "score": "您的分数：{{score}}/{{total}}"
  },
  "listening": {
    "name": "听力挑战",
    "description": "测试您的听力理解能力",
    "instructions": "听音频并选择正确的单词",
    "playAgain": "再次播放"
  },
  "writing": {
    "name": "书写挑战",
    "description": "练习书写词汇",
    "instructions": "在画布上写下您听到的单词",
    "clear": "清除",
    "submit": "提交",
    "hint": "显示提示"
  },
  "results": {
    "title": "挑战完成！",
    "score": "分数",
    "time": "时间",
    "accuracy": "准确率",
    "tryAgain": "再试一次",
    "nextChallenge": "下一个挑战",
    "shareResult": "分享结果"
  }
}
```

### **5. categories.json (English)**
```json
{
  "animals": {
    "name": "Animals",
    "description": "Learn animal vocabulary",
    "subcategories": {
      "mammals": "Mammals",
      "birds": "Birds",
      "reptiles": "Reptiles & Amphibians",
      "seaAnimals": "Sea Animals",
      "insects": "Insects",
      "farmAnimals": "Farm Animals",
      "pets": "Pets"
    }
  },
  "food": {
    "name": "Food",
    "description": "Learn food and drink vocabulary",
    "subcategories": {
      "fruits": "Fruits",
      "vegetables": "Vegetables",
      "meat": "Meat",
      "drinks": "Drinks",
      "sweets": "Sweets"
    }
  },
  "transportation": {
    "name": "Transportation",
    "description": "Learn vehicle and travel vocabulary",
    "subcategories": {
      "carBrands": "Car Brands",
      "vehicles": "Vehicle Types",
      "travel": "Travel"
    }
  },
  "nature": {
    "name": "Nature",
    "description": "Learn nature and weather vocabulary",
    "subcategories": {
      "plants": "Plants",
      "landscape": "Landscape",
      "weather": "Weather"
    }
  }
}
```

### **5. categories.json (中文)**
```json
{
  "animals": {
    "name": "动物",
    "description": "学习动物词汇",
    "subcategories": {
      "mammals": "哺乳动物",
      "birds": "鸟类",
      "reptiles": "爬行动物和两栖动物",
      "seaAnimals": "海洋动物",
      "insects": "昆虫",
      "farmAnimals": "农场动物",
      "pets": "宠物"
    }
  },
  "food": {
    "name": "食物",
    "description": "学习食物和饮料词汇",
    "subcategories": {
      "fruits": "水果",
      "vegetables": "蔬菜",
      "meat": "肉类",
      "drinks": "饮料",
      "sweets": "甜食"
    }
  },
  "transportation": {
    "name": "交通",
    "description": "学习车辆和旅行词汇",
    "subcategories": {
      "carBrands": "汽车品牌",
      "vehicles": "车辆类型",
      "travel": "旅行"
    }
  },
  "nature": {
    "name": "自然",
    "description": "学习自然和天气词汇",
    "subcategories": {
      "plants": "植物",
      "landscape": "景观",
      "weather": "天气"
    }
  }
}
```

---

## ⚙️ i18n Configuration

### **Setup File: src/config/i18n.ts**
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import commonEN from '@/locales/en/common.json';
import navigationEN from '@/locales/en/navigation.json';
import vocabularyEN from '@/locales/en/vocabulary.json';
import challengesEN from '@/locales/en/challenges.json';
import errorsEN from '@/locales/en/errors.json';
import settingsEN from '@/locales/en/settings.json';
import progressEN from '@/locales/en/progress.json';
import categoriesEN from '@/locales/en/categories.json';

import commonZH from '@/locales/zh/common.json';
import navigationZH from '@/locales/zh/navigation.json';
import vocabularyZH from '@/locales/zh/vocabulary.json';
import challengesZH from '@/locales/zh/challenges.json';
import errorsZH from '@/locales/zh/errors.json';
import settingsZH from '@/locales/zh/settings.json';
import progressZH from '@/locales/zh/progress.json';
import categoriesZH from '@/locales/zh/categories.json';

// Configure resources
const resources = {
  en: {
    common: commonEN,
    navigation: navigationEN,
    vocabulary: vocabularyEN,
    challenges: challengesEN,
    errors: errorsEN,
    settings: settingsEN,
    progress: progressEN,
    categories: categoriesEN,
  },
  zh: {
    common: commonZH,
    navigation: navigationZH,
    vocabulary: vocabularyZH,
    challenges: challengesZH,
    errors: errorsZH,
    settings: settingsZH,
    progress: progressZH,
    categories: categoriesZH,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'zh'], // Supported languages
    defaultNS: 'common', // Default namespace
    ns: [
      'common',
      'navigation',
      'vocabulary',
      'challenges',
      'errors',
      'settings',
      'progress',
      'categories',
    ],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // Order of language detection
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Cache user language preference
      caches: ['localStorage'],
      // LocalStorage key
      lookupLocalStorage: 'app-language',
    },
    react: {
      useSuspense: false, // Important for offline app
    },
  });

export default i18n;
```

---

## 🔧 Usage in Components

### **1. Using the useTranslation Hook**
```tsx
import { useTranslation } from 'react-i18next';

const VocabCard = ({ word, definition }: Props) => {
  const { t } = useTranslation('vocabulary');

  return (
    <div className="vocab-card">
      <h3>{word}</h3>
      <p>{definition}</p>
      <button>{t('card.playAudio')}</button>
      <button>{t('card.addToFavorites')}</button>
    </div>
  );
};
```

### **2. Using Multiple Namespaces**
```tsx
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation(['common', 'navigation']);

  return (
    <header>
      <h1>{t('common:app.name')}</h1>
      <nav>
        <a href="/">{t('navigation:home')}</a>
        <a href="/categories">{t('navigation:categories')}</a>
      </nav>
    </header>
  );
};
```

### **3. Interpolation (Dynamic Values)**
```tsx
const SearchResults = ({ count, query }: Props) => {
  const { t } = useTranslation('vocabulary');

  return (
    <div>
      {t('search.resultsCount', { count })}
      {/* English: "5 results found" */}
      {/* Chinese: "找到 5 个结果" */}
      
      {t('search.noResults', { query })}
      {/* English: No results found for "apple" */}
      {/* Chinese: 未找到 "apple" 的结果 */}
    </div>
  );
};
```

### **4. Pluralization**
```json
// en/vocabulary.json
{
  "itemCount": "{{count}} item",
  "itemCount_other": "{{count}} items"
}

// zh/vocabulary.json
{
  "itemCount": "{{count}} 个项目"
}
```

```tsx
const CategoryHeader = ({ count }: Props) => {
  const { t } = useTranslation('vocabulary');

  return <h2>{t('itemCount', { count })}</h2>;
  // count = 1: "1 item" | "1 个项目"
  // count = 5: "5 items" | "5 个项目"
};
```

---

## 🔀 Language Switcher Component

### **LanguageSwitcher.tsx**
```tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('app-language', langCode);
    setCurrentLang(langCode);
  };

  return (
    <div className={styles.switcher}>
      <Globe size={20} />
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className={styles.select}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};
```

### **Alternative: Toggle Button**
```tsx
export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('app-language', newLang);
  };

  return (
    <button onClick={toggleLanguage} className={styles.toggle}>
      {currentLang === 'en' ? '中文' : 'English'}
    </button>
  );
};
```

---

## 📊 Database Schema Updates

### **VocabularyItem with Translations**
```typescript
interface VocabularyItem {
  id: string;
  word: string; // English word
  
  // Pronunciation
  pronunciation: string; // IPA notation
  audioUrl: string; // English audio
  
  // Visual
  imageUrl: string;
  
  // English content
  definition: string;
  exampleSentence: string;
  
  // Chinese translations (required)
  translation: string; // 中文翻译
  definitionZh: string; // 中文定义
  exampleSentenceZh: string; // 中文例句
  
  // Metadata
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  tagsZh: string[]; // 中文标签
  relatedWords: string[];
  
  createdAt: number;
  updatedAt: number;
}
```

---

## 🎯 Translation Workflow

### **Step 1: Extract Text to Translate**
1. Identify all UI text in components
2. Move to appropriate translation file
3. Create unique translation keys

### **Step 2: Translate to Chinese**
1. Professional translation of all English text
2. Maintain consistent terminology
3. Consider cultural context

### **Step 3: Implement in Components**
1. Replace hard-coded text with `t()` function
2. Test in both languages
3. Verify formatting and layout

### **Step 4: Quality Assurance**
1. Native speaker review
2. Context verification
3. UI/UX check in both languages

---

## 📝 Translation Checklist

### **UI Elements**
- [ ] Navigation menus
- [ ] Button labels
- [ ] Form labels and placeholders
- [ ] Error messages
- [ ] Success messages
- [ ] Loading states
- [ ] Empty states
- [ ] Tooltips
- [ ] Modal titles and content

### **Content**
- [ ] Category names
- [ ] Category descriptions
- [ ] Vocabulary definitions
- [ ] Example sentences
- [ ] Challenge instructions
- [ ] Help documentation
- [ ] About page

### **Settings**
- [ ] Language selector
- [ ] Theme options
- [ ] Audio settings
- [ ] Privacy information

---

## 🚀 Implementation Timeline

### **Week 1: Setup**
- [ ] Install i18n packages
- [ ] Configure i18next
- [ ] Create translation file structure
- [ ] Setup TypeScript types

### **Week 2: UI Translation**
- [ ] Extract all UI text
- [ ] Create English translation files
- [ ] Translate to Chinese
- [ ] Implement LanguageSwitcher

### **Week 3: Content Translation**
- [ ] Process vocabulary CSV with Chinese translations
- [ ] Add Chinese definitions
- [ ] Add Chinese example sentences
- [ ] Translate category metadata

### **Week 4: Testing & Polish**
- [ ] Test all screens in both languages
- [ ] Fix layout issues
- [ ] Native speaker review
- [ ] Final adjustments

---

## 💾 Storage Impact

### **Translation Files Size**
- English translations: ~50-100 KB
- Chinese translations: ~80-120 KB (larger due to UTF-8 characters)
- **Total: ~150-220 KB** (minimal impact)

### **Vocabulary with Translations**
- Original: 275 MB
- With Chinese translations: +20-30 MB
- **Total: ~300 MB**

---

## 🎨 Design Considerations

### **Text Length Differences**
Chinese text is typically **30-50% shorter** than English:
- English: "Add to Favorites"
- Chinese: "添加到收藏"

**Solution:** Design flexible layouts with adequate spacing.

### **Font Support**
```css
/* Ensure Chinese font support */
body {
  font-family: 
    -apple-system, 
    BlinkMacSystemFont, 
    "Segoe UI", 
    "PingFang SC",      /* macOS Chinese */
    "Microsoft YaHei",   /* Windows Chinese */
    sans-serif;
}
```

### **Date & Number Formatting**
```typescript
// Locale-aware formatting
const formatDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// English: "October 3, 2025"
// Chinese: "2025年10月3日"
```

---

## ✅ Best Practices

1. **Never hard-code text** - Always use translation keys
2. **Use meaningful keys** - `vocabulary.card.play` not `button1`
3. **Group by feature** - Separate namespaces for organization
4. **Test both languages** - Ensure layouts work for both
5. **Use interpolation** - For dynamic content
6. **Provide context** - Add comments for translators
7. **Maintain consistency** - Use same terms throughout
8. **Keep translations synced** - Update both languages together

---

## 🔍 Testing i18n

### **Manual Testing**
- [ ] Switch between languages
- [ ] Check all screens
- [ ] Verify text fits in UI
- [ ] Test with long/short text
- [ ] Verify special characters display correctly

### **Automated Testing**
```typescript
// Test translation keys exist
describe('i18n', () => {
  it('should have all required translation keys', () => {
    const { t } = useTranslation('vocabulary');
    expect(t('card.playAudio')).not.toBe('card.playAudio');
    expect(t('card.playAudio')).toBeDefined();
  });
  
  it('should support both languages', () => {
    const { i18n } = useTranslation();
    
    i18n.changeLanguage('en');
    expect(i18n.language).toBe('en');
    
    i18n.changeLanguage('zh');
    expect(i18n.language).toBe('zh');
  });
});
```

---

## 📚 Resources

- **react-i18next Docs:** https://react.i18next.com/
- **i18next Docs:** https://www.i18next.com/
- **Translation Tools:** Google Translate (initial), Professional translator (final)
- **Chinese Fonts:** https://fonts.google.com/?subset=chinese-simplified

---

**Status:** ✅ Architecture Complete  
**Next:** Implement during Phase 1 of development  
**Last Updated:** October 3, 2025

