import type { Category, ChallengeResult, Settings, UserProgress, VocabularyItem } from '@/types';
import Dexie, { Table } from 'dexie';

export class VocabularyDatabase extends Dexie {
  vocabulary!: Table<VocabularyItem, string>;
  userProgress!: Table<UserProgress, string>;
  challengeResults!: Table<ChallengeResult, string>;
  settings!: Table<Settings, string>;
  categories!: Table<Category, string>;

  constructor() {
    super('VocabularyDB');
    
    this.version(2).stores({
      vocabulary: 'id, word, category, subcategory, difficulty, *tags, isFavorite',
      userProgress: 'id, vocabularyId, status, lastReviewedAt, isFavorite',
      challengeResults: 'id, challengeType, categoryId, completedAt',
      settings: 'id',
      categories: 'id, name, order'
    });
  }
}

export const db = new VocabularyDatabase();

// Initialize database with default settings
export async function initDatabase() {
  try {
    // Check if settings exist, if not create default
    const settingsCount = await db.settings.count();
    if (settingsCount === 0) {
      await db.settings.add({
        id: 'default',
        language: 'en',
        theme: 'light',
        audioEnabled: true,
        autoPlay: false,
        showPinyin: false,
        fontSize: 'medium'
      });
    }

    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    return false;
  }
}

// Database utility functions
export const dbUtils = {
  // Get all vocabulary
  async getAllVocabulary(): Promise<VocabularyItem[]> {
    return await db.vocabulary.toArray();
  },

  // Get vocabulary by category
  async getVocabularyByCategory(category: string): Promise<VocabularyItem[]> {
    return await db.vocabulary.where('category').equals(category).toArray();
  },

  // Get vocabulary by ID
  async getVocabularyById(id: string): Promise<VocabularyItem | undefined> {
    return await db.vocabulary.get(id);
  },

  // Search vocabulary
  async searchVocabulary(query: string): Promise<VocabularyItem[]> {
    const allWords = await db.vocabulary.toArray();
    const searchLower = query.toLowerCase();
    return allWords.filter(item => 
      item.word.toLowerCase().includes(searchLower) ||
      item.translation.toLowerCase().includes(searchLower) ||
      item.definition.toLowerCase().includes(searchLower)
    );
  },

  // Bulk add vocabulary
  async bulkAddVocabulary(items: VocabularyItem[]): Promise<void> {
    await db.vocabulary.bulkAdd(items);
  },

  // Get user progress for a word
  async getProgress(vocabularyId: string): Promise<UserProgress | undefined> {
    return await db.userProgress.get(vocabularyId);
  },

  // Update progress
  async updateProgress(progress: UserProgress): Promise<void> {
    await db.userProgress.put(progress);
  },

  // Get favorites
  async getFavorites(): Promise<VocabularyItem[]> {
    const favoriteIds = await db.userProgress
      .where('isFavorite').equals(1)
      .toArray();
    
    const vocabularyIds = favoriteIds.map(p => p.vocabularyId);
    return await db.vocabulary.where('id').anyOf(vocabularyIds).toArray();
  },

  // Toggle favorite
  async toggleFavorite(vocabularyId: string): Promise<boolean> {
    const progress = await db.userProgress.get(vocabularyId);
    const newFavoriteStatus = !progress?.isFavorite;
    
    if (progress) {
      await db.userProgress.update(vocabularyId, { isFavorite: newFavoriteStatus });
    } else {
      await db.userProgress.add({
        id: vocabularyId,
        vocabularyId,
        status: 'new',
        lastReviewedAt: Date.now(),
        reviewCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        isFavorite: newFavoriteStatus
      });
    }
    
    return newFavoriteStatus;
  },

  // Get settings
  async getSettings(): Promise<Settings | undefined> {
    return await db.settings.get('default');
  },

  // Update settings
  async updateSettings(settings: Partial<Settings>): Promise<void> {
    await db.settings.update('default', settings);
  },

  // Get statistics
  async getStatistics() {
    const totalWords = await db.vocabulary.count();
    const allProgress = await db.userProgress.toArray();
    
    const learnedWords = allProgress.filter(p => p.status === 'learning').length;
    const masteredWords = allProgress.filter(p => p.status === 'mastered').length;
    const favoriteWords = allProgress.filter(p => p.isFavorite).length;
    
    const challenges = await db.challengeResults.toArray();
    const challengesCompleted = challenges.length;
    const averageScore = challenges.length > 0
      ? challenges.reduce((sum, c) => sum + c.score, 0) / challenges.length
      : 0;

    return {
      totalWords,
      learnedWords,
      masteredWords,
      favoriteWords,
      challengesCompleted,
      averageScore: Math.round(averageScore),
      streakDays: 0 // To be implemented
    };
  },

  // Clear all data (for testing)
  async clearAll(): Promise<void> {
    await db.vocabulary.clear();
    await db.userProgress.clear();
    await db.challengeResults.clear();
    await db.categories.clear();
  }
};

export default db;

