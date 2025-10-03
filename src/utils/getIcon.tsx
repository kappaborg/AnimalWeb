import { Apple, Banana, Bird, Book, BookOpen, Brain, Bus, Car, Cat, Cloud, Coffee, Dog, Eye, Fish, Flower2, Hand, Heart, Home, Moon, Pencil, Plane, Shirt, Star, Sun, TreePine, Trophy } from 'lucide-react';

// Map words to Lucide React icons
export const getIconComponent = (word: string, category: string) => {
  const lowerWord = word.toLowerCase();
  
  // Food & Drinks
  if (category === 'food') {
    if (lowerWord.includes('apple')) return Apple;
    if (lowerWord.includes('banana')) return Banana;
    if (lowerWord.includes('coffee') || lowerWord.includes('tea')) return Coffee;
    return Apple; // default food icon
  }
  
  // Animals
  if (category === 'animals') {
    if (lowerWord.includes('dog')) return Dog;
    if (lowerWord.includes('cat')) return Cat;
    if (lowerWord.includes('bird')) return Bird;
    if (lowerWord.includes('fish')) return Fish;
    return Dog; // default animal icon
  }
  
  // Transportation
  if (category === 'transportation') {
    if (lowerWord.includes('car')) return Car;
    if (lowerWord.includes('bus')) return Bus;
    if (lowerWord.includes('plane') || lowerWord.includes('airplane')) return Plane;
    return Car; // default transport icon
  }
  
  // Education
  if (category === 'education') {
    if (lowerWord.includes('book')) return Book;
    if (lowerWord.includes('pen') || lowerWord.includes('pencil')) return Pencil;
    return BookOpen; // default education icon
  }
  
  // House
  if (category === 'house') {
    return Home;
  }
  
  // Clothing
  if (category === 'clothing') {
    return Shirt;
  }
  
  // Body
  if (category === 'body') {
    if (lowerWord.includes('heart')) return Heart;
    if (lowerWord.includes('brain')) return Brain;
    if (lowerWord.includes('eye')) return Eye;
    if (lowerWord.includes('hand')) return Hand;
    return Eye; // default body icon
  }
  
  // Nature
  if (category === 'nature') {
    if (lowerWord.includes('tree')) return TreePine;
    if (lowerWord.includes('sun')) return Sun;
    if (lowerWord.includes('moon')) return Moon;
    if (lowerWord.includes('star')) return Star;
    if (lowerWord.includes('cloud')) return Cloud;
    if (lowerWord.includes('flower')) return Flower2;
    return TreePine; // default nature icon
  }
  
  // Sports
  if (category === 'sports') {
    return Trophy;
  }
  
  // Default
  return BookOpen;
};
