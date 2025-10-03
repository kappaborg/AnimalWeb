/**
 * Vocabulary Processing Script
 * Automatically categorizes, tags, and enriches vocabulary data
 */

const fs = require('fs');
const path = require('path');

// Read the raw vocabulary file
const inputFile = path.join(__dirname, '..', 'deepseek_csv_20251003_839978.txt');
const rawData = fs.readFileSync(inputFile, 'utf-8');

// Parse CSV data
const lines = rawData.split('\n').slice(1); // Skip header
const vocabulary = [];

// Category definitions with keywords
const categories = {
  'animals': {
    keywords: ['animal', 'dog', 'cat', 'bird', 'fish', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'deer', 'elephant', 
               'monkey', 'rabbit', 'mouse', 'rat', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 
               'goose', 'eagle', 'owl', 'hawk', 'snake', 'frog', 'turtle', 'crocodile', 'whale', 'dolphin', 
               'shark', 'bee', 'ant', 'butterfly', 'spider', 'mosquito', 'fly', 'worm', 'kangaroo', 'giraffe',
               'zebra', 'panda', 'squirrel', 'bat', 'seal', 'camel', 'dragon', 'dinosaur', 'insect', 'pet',
               'beast', 'creature', 'puppy', 'kitten', 'calf', 'lamb', 'hen', 'rooster', 'parrot', 'seagull'],
    subcategories: {
      'mammals': ['dog', 'cat', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'deer', 'elephant', 'monkey', 'rabbit', 'mouse', 'rat', 'horse', 'cow', 'pig', 'sheep', 'goat', 'squirrel', 'bat', 'seal', 'camel', 'kangaroo', 'giraffe', 'zebra', 'panda'],
      'birds': ['bird', 'chicken', 'duck', 'goose', 'eagle', 'owl', 'hawk', 'parrot', 'seagull', 'sparrow'],
      'reptiles-amphibians': ['snake', 'frog', 'turtle', 'crocodile', 'lizard'],
      'sea-animals': ['whale', 'dolphin', 'shark', 'fish', 'seal'],
      'insects': ['bee', 'ant', 'butterfly', 'spider', 'mosquito', 'fly', 'worm'],
      'pets': ['dog', 'cat', 'rabbit', 'hamster'],
      'farm-animals': ['cow', 'pig', 'sheep', 'goat', 'chicken', 'horse']
    }
  },
  'food': {
    keywords: ['food', 'eat', 'fruit', 'vegetable', 'meat', 'bread', 'rice', 'noodle', 'apple', 'banana', 
               'orange', 'grape', 'strawberry', 'watermelon', 'pear', 'peach', 'lemon', 'tomato', 'potato',
               'carrot', 'cabbage', 'onion', 'garlic', 'beef', 'pork', 'chicken', 'fish', 'egg', 'milk',
               'cheese', 'butter', 'sugar', 'salt', 'pepper', 'sauce', 'soup', 'salad', 'sandwich', 'pizza',
               'burger', 'cake', 'cookie', 'candy', 'chocolate', 'ice cream', 'tea', 'coffee', 'juice',
               'wine', 'beer', 'water', 'meal', 'breakfast', 'lunch', 'dinner', 'supper', 'snack', 'dish',
               'dumpling', 'noodles', 'pasta', 'sausage', 'ham', 'bacon'],
    subcategories: {
      'fruits': ['apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pear', 'peach', 'lemon', 'pineapple'],
      'vegetables': ['tomato', 'potato', 'carrot', 'cabbage', 'onion', 'garlic', 'eggplant'],
      'meat': ['beef', 'pork', 'chicken', 'fish', 'sausage', 'ham', 'bacon', 'mutton'],
      'drinks': ['tea', 'coffee', 'juice', 'wine', 'beer', 'water', 'milk', 'lemonade'],
      'sweets': ['cake', 'cookie', 'candy', 'chocolate', 'ice cream', 'sugar']
    }
  },
  'body': {
    keywords: ['body', 'head', 'face', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'tongue', 'lip', 'hair',
               'neck', 'shoulder', 'arm', 'hand', 'finger', 'leg', 'foot', 'toe', 'knee', 'back', 'chest',
               'heart', 'brain', 'stomach', 'blood', 'bone', 'skin', 'muscle', 'nerve', 'throat', 'lung',
               'liver', 'kidney', 'organ', 'wrist', 'ankle', 'elbow', 'waist', 'hip', 'breast'],
    subcategories: {
      'face': ['face', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'tongue', 'lip', 'cheek', 'chin'],
      'organs': ['heart', 'brain', 'stomach', 'lung', 'liver', 'kidney'],
      'skeleton': ['bone', 'skull', 'rib', 'spine']
    }
  },
  'clothing': {
    keywords: ['clothes', 'shirt', 'pants', 'dress', 'skirt', 'coat', 'jacket', 'sweater', 'suit', 'tie',
               'shoe', 'boot', 'sock', 'hat', 'cap', 'glove', 'scarf', 'belt', 'button', 'pocket',
               'jeans', 'shorts', 'underwear', 'uniform', 'costume', 'vest', 'blouse'],
    subcategories: {
      'mens-clothing': ['suit', 'tie', 'shirt', 'pants'],
      'womens-clothing': ['dress', 'skirt', 'blouse'],
      'accessories': ['hat', 'cap', 'glove', 'scarf', 'belt', 'tie']
    }
  },
  'transportation': {
    keywords: ['car', 'bus', 'train', 'plane', 'ship', 'boat', 'bicycle', 'bike', 'taxi', 'truck', 'van',
               'motorcycle', 'subway', 'ferry', 'helicopter', 'rocket', 'vehicle', 'wheel', 'engine',
               'traffic', 'road', 'street', 'highway', 'airport', 'station', 'port', 'driver', 'pilot'],
    subcategories: {
      'land-travel': ['car', 'bus', 'train', 'bicycle', 'taxi', 'truck', 'motorcycle'],
      'sea-travel': ['ship', 'boat', 'ferry'],
      'air-travel': ['plane', 'helicopter', 'rocket']
    }
  },
  'nature': {
    keywords: ['nature', 'tree', 'flower', 'plant', 'grass', 'forest', 'mountain', 'river', 'lake', 'sea',
               'ocean', 'sky', 'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'weather', 'season',
               'spring', 'summer', 'autumn', 'winter', 'earth', 'stone', 'rock', 'sand', 'soil', 'island',
               'beach', 'hill', 'valley', 'desert', 'jungle', 'ice', 'fire', 'water', 'air', 'leaf', 'root',
               'branch', 'seed', 'fruit', 'wood', 'bamboo', 'rose', 'pine'],
    subcategories: {
      'plants': ['tree', 'flower', 'plant', 'grass', 'leaf', 'root', 'seed', 'bamboo', 'rose'],
      'landscape': ['mountain', 'river', 'lake', 'forest', 'hill', 'valley', 'desert'],
      'weather': ['rain', 'snow', 'wind', 'cloud', 'sun', 'storm', 'thunder']
    }
  },
  'house': {
    keywords: ['house', 'home', 'room', 'bedroom', 'kitchen', 'bathroom', 'living room', 'door', 'window',
               'wall', 'floor', 'ceiling', 'roof', 'stairs', 'furniture', 'table', 'chair', 'bed', 'sofa',
               'desk', 'lamp', 'television', 'radio', 'phone', 'computer', 'book', 'pen', 'pencil', 'paper',
               'clock', 'picture', 'mirror', 'curtain', 'carpet', 'cupboard', 'shelf', 'drawer', 'garden'],
    subcategories: {
      'rooms': ['bedroom', 'kitchen', 'bathroom', 'living room', 'dining room'],
      'furniture': ['table', 'chair', 'bed', 'sofa', 'desk', 'cupboard', 'shelf']
    }
  },
  'education': {
    keywords: ['school', 'student', 'teacher', 'class', 'lesson', 'study', 'learn', 'teach', 'exam', 'test',
               'homework', 'book', 'pen', 'pencil', 'paper', 'notebook', 'dictionary', 'library', 'university',
               'college', 'degree', 'graduate', 'subject', 'math', 'science', 'history', 'geography', 'art',
               'music', 'language', 'English', 'Chinese', 'read', 'write', 'spell', 'count', 'draw'],
    subcategories: {
      'school': ['school', 'class', 'teacher', 'student', 'classroom'],
      'subjects': ['math', 'science', 'history', 'geography', 'art', 'music']
    }
  },
  'time': {
    keywords: ['time', 'hour', 'minute', 'second', 'day', 'week', 'month', 'year', 'today', 'yesterday',
               'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May',
               'June', 'July', 'August', 'September', 'October', 'November', 'December', 'clock', 'watch'],
    subcategories: {
      'days': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  'numbers': {
    keywords: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
               'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
               'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred',
               'thousand', 'million', 'first', 'second', 'third', 'number', 'count'],
    subcategories: {}
  },
  'colors': {
    keywords: ['color', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'grey', 'gray', 'brown', 'pink',
               'purple', 'orange', 'golden', 'silver'],
    subcategories: {}
  },
  'family': {
    keywords: ['family', 'father', 'mother', 'parent', 'son', 'daughter', 'brother', 'sister', 'grandfather',
               'grandmother', 'uncle', 'aunt', 'cousin', 'husband', 'wife', 'child', 'baby', 'kid'],
    subcategories: {}
  },
  'actions-verbs': {
    keywords: ['go', 'come', 'run', 'walk', 'jump', 'swim', 'fly', 'eat', 'drink', 'sleep', 'wake', 'stand',
               'sit', 'lie', 'open', 'close', 'read', 'write', 'speak', 'listen', 'see', 'look', 'watch',
               'hear', 'think', 'know', 'understand', 'believe', 'want', 'like', 'love', 'hate', 'need',
               'give', 'take', 'bring', 'buy', 'sell', 'make', 'break', 'fix', 'build', 'destroy', 'create',
               'start', 'stop', 'begin', 'end', 'continue', 'finish', 'try', 'help', 'work', 'play', 'learn'],
    subcategories: {}
  },
  'geography': {
    keywords: ['country', 'city', 'town', 'village', 'capital', 'nation', 'state', 'province', 'continent',
               'Asia', 'Europe', 'Africa', 'America', 'China', 'Japan', 'England', 'France', 'Germany',
               'map', 'globe', 'north', 'south', 'east', 'west', 'border', 'coast', 'bay'],
    subcategories: {
      'continents': ['Asia', 'Europe', 'Africa', 'America', 'Australia'],
      'countries': ['China', 'Japan', 'England', 'France', 'Germany', 'America']
    }
  }
};

// Common word types patterns
const wordTypePatterns = {
  verb: ['go', 'run', 'eat', 'drink', 'sleep', 'think', 'work', 'play', 'learn', 'teach', 'speak', 'listen'],
  noun: ['car', 'house', 'book', 'table', 'chair', 'dog', 'cat', 'tree', 'flower', 'student', 'teacher'],
  adjective: ['big', 'small', 'good', 'bad', 'beautiful', 'ugly', 'happy', 'sad', 'hot', 'cold', 'new', 'old'],
  adverb: ['quickly', 'slowly', 'carefully', 'happily', 'sadly', 'well', 'badly']
};

// Function to determine category
function categorizeWord(word, translation) {
  const wordLower = word.toLowerCase();
  const translationLower = translation.toLowerCase();
  
  let bestCategory = 'various';
  let bestSubcategory = null;
  let maxMatches = 0;
  
  for (const [category, data] of Object.entries(categories)) {
    let matches = 0;
    
    // Check if word or translation contains category keywords
    for (const keyword of data.keywords) {
      if (wordLower.includes(keyword) || translationLower.includes(keyword) || 
          keyword.includes(wordLower) || wordLower === keyword) {
        matches++;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
      
      // Try to find subcategory
      for (const [subcat, keywords] of Object.entries(data.subcategories)) {
        if (keywords.some(k => wordLower === k || wordLower.includes(k))) {
          bestSubcategory = subcat;
          break;
        }
      }
    }
  }
  
  return { category: bestCategory, subcategory: bestSubcategory };
}

// Function to determine difficulty
function determineDifficulty(word, translation) {
  const length = word.replace(/[^a-zA-Z]/g, '').length;
  const hasSpecialChars = /[^a-zA-Z\s]/.test(word);
  
  // Common basic words
  const basicWords = ['a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'have', 'has', 'had',
                      'do', 'does', 'did', 'go', 'come', 'get', 'make', 'take', 'see', 'look', 'use',
                      'find', 'give', 'tell', 'work', 'call', 'try', 'ask', 'need', 'feel', 'become',
                      'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help', 'talk', 'turn',
                      'start', 'show', 'hear', 'play', 'run', 'move', 'like', 'live', 'believe', 'bring',
                      'happen', 'write', 'sit', 'stand', 'lose', 'pay', 'meet', 'include', 'continue',
                      'set', 'learn', 'change', 'lead', 'understand', 'watch', 'follow', 'stop', 'create'];
  
  if (basicWords.includes(word.toLowerCase())) {
    return 'beginner';
  }
  
  if (length <= 5) {
    return 'beginner';
  } else if (length <= 8) {
    return hasSpecialChars ? 'advanced' : 'intermediate';
  } else {
    return 'advanced';
  }
}

// Function to determine word type
function determineWordType(word, translation) {
  const wordLower = word.toLowerCase();
  const tags = [];
  
  // Check endings for adjectives
  if (wordLower.endsWith('able') || wordLower.endsWith('ible') || wordLower.endsWith('ful') || 
      wordLower.endsWith('less') || wordLower.endsWith('ous') || wordLower.endsWith('ive') ||
      wordLower.endsWith('al') || wordLower.endsWith('ic')) {
    tags.push('adjective');
  }
  
  // Check endings for adverbs
  if (wordLower.endsWith('ly')) {
    tags.push('adverb');
  }
  
  // Check endings for verbs
  if (wordLower.endsWith('ate') || wordLower.endsWith('ify') || wordLower.endsWith('ize') ||
      wordLower.endsWith('ise') || wordLower.endsWith('en')) {
    tags.push('verb');
  }
  
  // Check endings for nouns
  if (wordLower.endsWith('tion') || wordLower.endsWith('sion') || wordLower.endsWith('ment') ||
      wordLower.endsWith('ness') || wordLower.endsWith('er') || wordLower.endsWith('or') ||
      wordLower.endsWith('ist') || wordLower.endsWith('ism') || wordLower.endsWith('ity')) {
    tags.push('noun');
  }
  
  // Check Chinese translation patterns
  if (translation.includes('的')) {
    if (!tags.includes('adjective')) tags.push('adjective');
  }
  if (translation.includes('地')) {
    if (!tags.includes('adverb')) tags.push('adverb');
  }
  
  // Default to noun if nothing found
  if (tags.length === 0) {
    tags.push('noun');
  }
  
  return tags;
}

// Generate basic English definition
function generateDefinition(word, translation, category) {
  // This is a simplified definition generator
  // In a real scenario, you'd use a dictionary API or pre-defined definitions
  const cleaned = translation.split(/[,;，；]/)[0].trim();
  return `A word meaning: ${cleaned}`;
}

// Process each line
console.log('Processing vocabulary...');
let processed = 0;

for (const line of lines) {
  if (!line.trim()) continue;
  
  const [word, translation] = line.split(',');
  if (!word || !translation) continue;
  
  const { category, subcategory } = categorizeWord(word, translation);
  const difficulty = determineDifficulty(word, translation);
  const wordTypes = determineWordType(word, translation);
  const definition = generateDefinition(word, translation, category);
  
  vocabulary.push({
    word: word.trim(),
    translation: translation.trim(),
    category,
    subcategory: subcategory || '',
    difficulty,
    wordType: wordTypes.join(';'),
    definition,
    definitionZh: translation.split(/[,;，；]/)[0].trim(),
    exampleSentence: '',
    exampleSentenceZh: '',
    tags: wordTypes.join(';'),
    tagsZh: wordTypes.map(t => {
      if (t === 'noun') return '名词';
      if (t === 'verb') return '动词';
      if (t === 'adjective') return '形容词';
      if (t === 'adverb') return '副词';
      return t;
    }).join(';')
  });
  
  processed++;
  if (processed % 500 === 0) {
    console.log(`Processed ${processed} words...`);
  }
}

console.log(`\nTotal words processed: ${processed}`);

// Generate statistics
const stats = {
  total: vocabulary.length,
  byCategory: {},
  byDifficulty: { beginner: 0, intermediate: 0, advanced: 0 },
  byWordType: {}
};

vocabulary.forEach(item => {
  // Category stats
  stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;
  
  // Difficulty stats
  stats.byDifficulty[item.difficulty]++;
  
  // Word type stats
  item.wordType.split(';').forEach(type => {
    stats.byWordType[type] = (stats.byWordType[type] || 0) + 1;
  });
});

// Create CSV output
const csvHeader = 'word,translation,category,subcategory,difficulty,wordType,definition,definitionZh,exampleSentence,exampleSentenceZh,tags,tagsZh\n';
const csvRows = vocabulary.map(item => 
  `"${item.word}","${item.translation}","${item.category}","${item.subcategory}","${item.difficulty}","${item.wordType}","${item.definition}","${item.definitionZh}","${item.exampleSentence}","${item.exampleSentenceZh}","${item.tags}","${item.tagsZh}"`
).join('\n');

// Save enhanced CSV
const outputCsv = path.join(__dirname, '..', 'vocabulary-enhanced.csv');
fs.writeFileSync(outputCsv, csvHeader + csvRows, 'utf-8');
console.log(`\n✅ Enhanced CSV saved to: vocabulary-enhanced.csv`);

// Save as JSON for easier processing
const outputJson = path.join(__dirname, '..', 'vocabulary-enhanced.json');
fs.writeFileSync(outputJson, JSON.stringify(vocabulary, null, 2), 'utf-8');
console.log(`✅ JSON version saved to: vocabulary-enhanced.json`);

// Save statistics
const statsOutput = path.join(__dirname, '..', 'vocabulary-stats.json');
fs.writeFileSync(statsOutput, JSON.stringify(stats, null, 2), 'utf-8');
console.log(`✅ Statistics saved to: vocabulary-stats.json`);

// Display summary
console.log('\n📊 CATEGORIZATION SUMMARY:');
console.log('===========================');
console.log(`Total Words: ${stats.total}`);
console.log('\nBy Category:');
Object.entries(stats.byCategory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat.padEnd(20)} ${count.toString().padStart(5)} words`);
  });

console.log('\nBy Difficulty:');
Object.entries(stats.byDifficulty).forEach(([diff, count]) => {
  const percentage = ((count / stats.total) * 100).toFixed(1);
  console.log(`  ${diff.padEnd(20)} ${count.toString().padStart(5)} words (${percentage}%)`);
});

console.log('\nBy Word Type:');
Object.entries(stats.byWordType)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    console.log(`  ${type.padEnd(20)} ${count.toString().padStart(5)} words`);
  });

console.log('\n✨ Processing complete!');

