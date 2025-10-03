import vocabularyData from '@/data/vocabulary-data.json';
import type { Category, VocabularyItem } from '@/types';
import { db } from './db';

// Category definitions with Chinese names
const categories: Category[] = [
  { id: 'animals', name: 'Animals', nameZh: '动物', icon: '🦁', description: 'All animal vocabulary', descriptionZh: '所有动物词汇', color: '#F59E0B', itemCount: 0, order: 1 },
  { id: 'food', name: 'Food & Drinks', nameZh: '食物和饮料', icon: '🍔', description: 'Food and beverage items', descriptionZh: '食物和饮料项目', color: '#EF4444', itemCount: 0, order: 2 },
  { id: 'transportation', name: 'Transportation', nameZh: '交通', icon: '🚗', description: 'Vehicles and transport', descriptionZh: '车辆和交通', color: '#3B82F6', itemCount: 0, order: 3 },
  { id: 'education', name: 'Education', nameZh: '教育', icon: '📚', description: 'School and learning', descriptionZh: '学校和学习', color: '#8B5CF6', itemCount: 0, order: 4 },
  { id: 'nature', name: 'Nature', nameZh: '自然', icon: '🌳', description: 'Natural world', descriptionZh: '自然世界', color: '#10B981', itemCount: 0, order: 5 },
  { id: 'body', name: 'Body Parts', nameZh: '身体部位', icon: '👤', description: 'Human body', descriptionZh: '人体', color: '#EC4899', itemCount: 0, order: 6 },
  { id: 'house', name: 'House & Home', nameZh: '房屋和家', icon: '🏠', description: 'Home items', descriptionZh: '家居用品', color: '#F97316', itemCount: 0, order: 7 },
  { id: 'clothing', name: 'Clothing', nameZh: '服装', icon: '👕', description: 'Clothes and accessories', descriptionZh: '服装和配饰', color: '#06B6D4', itemCount: 0, order: 8 },
  { id: 'numbers', name: 'Numbers', nameZh: '数字', icon: '🔢', description: 'Numbers and counting', descriptionZh: '数字和计数', color: '#84CC16', itemCount: 0, order: 9 },
  { id: 'time', name: 'Time', nameZh: '时间', icon: '⏰', description: 'Time-related words', descriptionZh: '与时间相关的词', color: '#6366F1', itemCount: 0, order: 10 },
  { id: 'family', name: 'Family', nameZh: '家庭', icon: '👨‍👩‍👧‍👦', description: 'Family members', descriptionZh: '家庭成员', color: '#A855F7', itemCount: 0, order: 11 },
  { id: 'geography', name: 'Geography', nameZh: '地理', icon: '🌍', description: 'Places and locations', descriptionZh: '地点和位置', color: '#14B8A6', itemCount: 0, order: 12 },
  { id: 'colors', name: 'Colors', nameZh: '颜色', icon: '🎨', description: 'All colors', descriptionZh: '所有颜色', color: '#F43F5E', itemCount: 0, order: 13 },
  { id: 'actions-verbs', name: 'Actions & Verbs', nameZh: '动作和动词', icon: '🏃', description: 'Action words', descriptionZh: '动作词', color: '#0EA5E9', itemCount: 0, order: 14 },
  { id: 'various', name: 'Various', nameZh: '其他', icon: '📦', description: 'Other vocabulary', descriptionZh: '其他词汇', color: '#64748B', itemCount: 0, order: 15 }
];

export async function seedDatabase(): Promise<boolean> {
  try {
    console.log('🔄 Checking database...');
    
    // Check if vocabulary already exists
    const vocabCount = await db.vocabulary.count();
    if (vocabCount > 0) {
      console.log(`✅ Database already seeded with ${vocabCount} words`);
      return true;
    }

    console.log('📥 Starting data import...');
    
    // Import vocabulary
    const vocabularyItems: VocabularyItem[] = vocabularyData.map((item: any, index: number) => ({
      id: `word-${index + 1}`,
      word: item.word || '',
      translation: item.translation || '',
      category: item.category || 'various',
      subcategory: item.subcategory || '',
      difficulty: item.difficulty || 'beginner',
      wordType: item.wordType || 'noun',
      definition: item.definition || '',
      definitionZh: item.definitionZh || item.translation || '',
      exampleSentence: item.exampleSentence || '',
      exampleSentenceZh: item.exampleSentenceZh || '',
      tags: item.tags || '',
      tagsZh: item.tagsZh || '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }));

    // Bulk add vocabulary
    await db.vocabulary.bulkAdd(vocabularyItems);
    console.log(`✅ Imported ${vocabularyItems.length} vocabulary items`);

    // Count items per category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await db.vocabulary.where('category').equals(category.id).count();
        return { ...category, itemCount: count };
      })
    );

    // Import categories
    await db.categories.bulkAdd(categoriesWithCounts);
    console.log(`✅ Imported ${categoriesWithCounts.length} categories`);

    // Log category statistics
    console.log('📊 Category Statistics:');
    categoriesWithCounts.forEach(cat => {
      console.log(`   ${cat.icon} ${cat.name}: ${cat.itemCount} words`);
    });

    console.log('🎉 Database seeding complete!');
    return true;
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    return false;
  }
}

// Function to clear and reseed (for development)
export async function reseedDatabase(): Promise<boolean> {
  try {
    console.log('🔄 Clearing existing data...');
    await db.vocabulary.clear();
    await db.categories.clear();
    await db.userProgress.clear();
    console.log('✅ Data cleared');
    
    return await seedDatabase();
  } catch (error) {
    console.error('❌ Reseed failed:', error);
    return false;
  }
}

export default seedDatabase;

