// Vocabulary Item
export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  category: string;
  subcategory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordType: string;
  definition: string;
  definitionZh: string;
  exampleSentence: string;
  exampleSentenceZh: string;
  tags: string;
  tagsZh: string;
  audioUrl?: string;
  imageUrl?: string;
  createdAt?: number;
  updatedAt?: number;
  isFavorite?: number;
  icon?: string;
}

// Category
export interface Category {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh: string;
  color: string;
  itemCount: number;
  order: number;
}

// User Progress
export interface UserProgress {
  id: string;
  vocabularyId: string;
  status: 'new' | 'learning' | 'mastered';
  lastReviewedAt: number;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  isFavorite: boolean;
  notes?: string;
}

// Challenge Result
export interface ChallengeResult {
  id: string;
  challengeType: 'speaking' | 'listening' | 'writing';
  categoryId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: number;
}

// Settings
export interface Settings {
  id: string;
  language: 'en' | 'zh';
  theme: 'light' | 'dark';
  audioEnabled: boolean;
  autoPlay: boolean;
  showPinyin: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Statistics
export interface Statistics {
  totalWords: number;
  learnedWords: number;
  masteredWords: number;
  favoriteWords: number;
  challengesCompleted: number;
  averageScore: number;
  streakDays: number;
}

export type { VocabularyItem as Vocabulary };

