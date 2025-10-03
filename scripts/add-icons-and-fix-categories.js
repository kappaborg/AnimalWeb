import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load vocabulary data
const vocabPath = path.join(__dirname, '../src/data/vocabulary-data.json');
const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

console.log(`Processing ${vocabulary.length} words...`);

// Category keywords for better classification
const categoryKeywords = {
  food: ['food', 'eat', 'drink', 'fruit', 'vegetable', 'meat', 'bread', 'rice', 'tea', 'coffee', 'milk', 'juice', 'pizza', 'burger', 'sandwich', 'salad', 'soup', 'cake', 'cookie', 'candy', 'chocolate', 'sugar', 'salt', 'pepper', 'spice', 'dish', 'meal', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'restaurant', 'kitchen', 'cook', 'chef', 'recipe', 'taste', 'flavor', 'delicious', 'hungry', 'thirsty', 'apple', 'banana', 'orange', 'grape', 'lemon', 'strawberry', 'watermelon', 'peach', 'pear', 'cherry', 'tomato', 'potato', 'carrot', 'onion', 'garlic', 'lettuce', 'cabbage', 'broccoli', 'spinach', 'egg', 'ham', 'bacon', 'sausage', 'beef', 'pork', 'chicken', 'fish', 'shrimp', 'crab', 'lobster', 'cheese', 'butter', 'yogurt', 'cream', 'ice', 'wine', 'beer', 'soda', 'water'],
  animals: ['animal', 'dog', 'cat', 'bird', 'fish', 'lion', 'tiger', 'bear', 'elephant', 'monkey', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'goose', 'turkey', 'rabbit', 'mouse', 'rat', 'hamster', 'guinea', 'snake', 'lizard', 'turtle', 'frog', 'fish', 'shark', 'whale', 'dolphin', 'octopus', 'crab', 'lobster', 'shrimp', 'insect', 'bee', 'butterfly', 'ant', 'spider', 'mosquito', 'fly', 'beetle', 'ladybug', 'dragonfly', 'grasshopper', 'cricket', 'cockroach', 'worm', 'snail', 'slug', 'feather', 'fur', 'tail', 'wing', 'beak', 'claw', 'paw', 'hoof', 'horn', 'antler', 'scale', 'shell', 'pet', 'zoo', 'wildlife', 'beast', 'creature'],
  body: ['head', 'face', 'eye', 'ear', 'nose', 'mouth', 'tooth', 'tongue', 'lip', 'cheek', 'chin', 'jaw', 'forehead', 'eyebrow', 'eyelash', 'neck', 'shoulder', 'arm', 'elbow', 'hand', 'finger', 'thumb', 'wrist', 'palm', 'fist', 'nail', 'chest', 'breast', 'stomach', 'belly', 'abdomen', 'back', 'spine', 'waist', 'hip', 'buttock', 'leg', 'thigh', 'knee', 'calf', 'ankle', 'foot', 'toe', 'heel', 'sole', 'skin', 'hair', 'beard', 'mustache', 'bone', 'muscle', 'blood', 'heart', 'lung', 'liver', 'kidney', 'brain', 'nerve', 'vein', 'artery', 'organ', 'body'],
  clothing: ['clothes', 'shirt', 'pants', 'dress', 'skirt', 'coat', 'jacket', 'sweater', 'hoodie', 'vest', 'suit', 'tie', 'scarf', 'glove', 'hat', 'cap', 'beanie', 'helmet', 'shoe', 'boot', 'sandal', 'slipper', 'sock', 'stocking', 'belt', 'button', 'zipper', 'pocket', 'sleeve', 'collar', 'hood', 'uniform', 'costume', 'underwear', 'bra', 'panties', 'boxer', 'brief', 'pajamas', 'robe', 'swimsuit', 'bikini', 'shorts', 'jeans', 'tshirt', 'blouse', 'cardigan', 'poncho', 'raincoat', 'windbreaker', 'parka', 'trench', 'tuxedo', 'gown', 'apron', 'smock'],
  house: ['house', 'home', 'room', 'bedroom', 'bathroom', 'kitchen', 'living', 'dining', 'garage', 'basement', 'attic', 'roof', 'floor', 'wall', 'ceiling', 'door', 'window', 'stairs', 'fence', 'gate', 'yard', 'garden', 'furniture', 'table', 'chair', 'sofa', 'couch', 'bed', 'mattress', 'pillow', 'blanket', 'sheet', 'curtain', 'carpet', 'rug', 'lamp', 'light', 'bulb', 'switch', 'plug', 'socket', 'mirror', 'picture', 'frame', 'clock', 'shelf', 'cabinet', 'drawer', 'closet', 'wardrobe', 'desk', 'bookcase', 'cupboard', 'counter', 'sink', 'faucet', 'toilet', 'shower', 'bathtub', 'stove', 'oven', 'refrigerator', 'freezer', 'microwave', 'dishwasher', 'washer', 'dryer', 'iron', 'vacuum', 'broom', 'mop', 'bucket', 'trash', 'garbage', 'hammer', 'nail', 'screw', 'drill', 'saw', 'tool', 'ladder', 'paint', 'brush'],
  transportation: ['car', 'bus', 'train', 'subway', 'taxi', 'truck', 'van', 'motorcycle', 'bike', 'bicycle', 'scooter', 'skateboard', 'boat', 'ship', 'yacht', 'ferry', 'canoe', 'kayak', 'sailboat', 'airplane', 'jet', 'helicopter', 'rocket', 'spacecraft', 'vehicle', 'wheel', 'tire', 'engine', 'motor', 'brake', 'steering', 'pedal', 'seat', 'belt', 'airbag', 'windshield', 'mirror', 'headlight', 'taillight', 'signal', 'horn', 'gas', 'fuel', 'oil', 'battery', 'traffic', 'road', 'street', 'highway', 'bridge', 'tunnel', 'intersection', 'crosswalk', 'sidewalk', 'pavement', 'parking', 'garage', 'station', 'airport', 'port', 'harbor', 'dock', 'terminal', 'ticket', 'passenger', 'driver', 'pilot', 'captain'],
  education: ['school', 'class', 'student', 'teacher', 'professor', 'principal', 'dean', 'education', 'learn', 'study', 'teach', 'lesson', 'course', 'subject', 'math', 'science', 'history', 'geography', 'literature', 'language', 'english', 'chinese', 'spanish', 'french', 'german', 'biology', 'chemistry', 'physics', 'art', 'music', 'pe', 'physical', 'homework', 'test', 'exam', 'quiz', 'grade', 'score', 'mark', 'report', 'diploma', 'degree', 'certificate', 'book', 'textbook', 'notebook', 'paper', 'pen', 'pencil', 'eraser', 'ruler', 'calculator', 'computer', 'laptop', 'tablet', 'keyboard', 'mouse', 'screen', 'monitor', 'printer', 'desk', 'chair', 'board', 'chalk', 'marker', 'crayon', 'paint', 'brush', 'scissors', 'glue', 'tape', 'stapler', 'clip', 'folder', 'binder', 'backpack', 'bag', 'library', 'lab', 'laboratory', 'experiment', 'research', 'project', 'essay', 'paragraph', 'sentence', 'word', 'letter', 'alphabet', 'number', 'count', 'add', 'subtract', 'multiply', 'divide', 'equation', 'formula', 'problem', 'solution', 'answer', 'question', 'dictionary', 'encyclopedia', 'atlas', 'map', 'globe', 'chart', 'graph', 'diagram', 'picture', 'photo', 'image', 'drawing', 'sketch', 'painting']
};

// Icon mapping for common words
const iconMap = {
  // Food & Drinks
  'apple': '🍎', 'banana': '🍌', 'orange': '🍊', 'lemon': '🍋', 'watermelon': '🍉',
  'grape': '🍇', 'strawberry': '🍓', 'cherry': '🍒', 'peach': '🍑', 'pear': '🍐',
  'pineapple': '🍍', 'kiwi': '🥝', 'mango': '🥭', 'avocado': '🥑', 'coconut': '🥥',
  'tomato': '🍅', 'eggplant': '🍆', 'potato': '🥔', 'carrot': '🥕', 'corn': '🌽',
  'pepper': '🌶️', 'cucumber': '🥒', 'broccoli': '🥦', 'mushroom': '🍄', 'garlic': '🧄',
  'onion': '🧅', 'bread': '🍞', 'cheese': '🧀', 'meat': '🍖', 'poultry': '🍗',
  'bacon': '🥓', 'hamburger': '🍔', 'pizza': '🍕', 'hotdog': '🌭', 'sandwich': '🥪',
  'taco': '🌮', 'burrito': '🌯', 'salad': '🥗', 'soup': '🍲', 'stew': '🍛',
  'rice': '🍚', 'pasta': '🍝', 'spaghetti': '🍝', 'noodle': '🍜', 'dumpling': '🥟',
  'egg': '🥚', 'cake': '🍰', 'pie': '🥧', 'cookie': '🍪', 'chocolate': '🍫',
  'candy': '🍬', 'lollipop': '🍭', 'icecream': '🍦', 'donut': '🍩', 'cupcake': '🧁',
  'milk': '🥛', 'coffee': '☕', 'tea': '🍵', 'juice': '🧃', 'soda': '🥤',
  'beer': '🍺', 'wine': '🍷', 'champagne': '🍾', 'cocktail': '🍸', 'water': '💧',
  
  // Animals
  'dog': '🐕', 'cat': '🐈', 'mouse': '🐁', 'hamster': '🐹', 'rabbit': '🐰',
  'fox': '🦊', 'bear': '🐻', 'panda': '🐼', 'koala': '🐨', 'tiger': '🐅',
  'lion': '🦁', 'cow': '🐄', 'pig': '🐷', 'frog': '🐸', 'monkey': '🐵',
  'chicken': '🐔', 'bird': '🐦', 'penguin': '🐧', 'eagle': '🦅', 'duck': '🦆',
  'bat': '🦇', 'wolf': '🐺', 'horse': '🐴', 'unicorn': '🦄', 'zebra': '🦓',
  'deer': '🦌', 'elephant': '🐘', 'rhinoceros': '🦏', 'hippopotamus': '🦛', 'giraffe': '🦒',
  'snake': '🐍', 'lizard': '🦎', 'dinosaur': '🦕', 'crocodile': '🐊', 'turtle': '🐢',
  'fish': '🐟', 'whale': '🐋', 'dolphin': '🐬', 'shark': '🦈', 'octopus': '🐙',
  'snail': '🐌', 'butterfly': '🦋', 'bug': '🐛', 'ant': '🐜', 'bee': '🐝',
  'ladybug': '🐞', 'spider': '🕷️', 'scorpion': '🦂', 'crab': '🦀', 'lobster': '🦞',
  
  // Body Parts
  'body': '🧍', 'head': '👤', 'face': '😊', 'eye': '👁️', 'ear': '👂',
  'nose': '👃', 'mouth': '👄', 'tongue': '👅', 'tooth': '🦷', 'hand': '✋',
  'finger': '👆', 'thumb': '👍', 'foot': '🦶', 'leg': '🦵', 'arm': '💪',
  'brain': '🧠', 'heart': '❤️', 'bone': '🦴', 'blood': '🩸',
  
  // Clothing
  'tshirt': '👕', 'shirt': '👔', 'jeans': '👖', 'dress': '👗', 'coat': '🧥',
  'sock': '🧦', 'glove': '🧤', 'scarf': '🧣', 'hat': '🎩', 'cap': '🧢',
  'shoe': '👞', 'boot': '👢', 'sandal': '👡', 'slipper': '🥿', 'crown': '👑',
  
  // Transportation
  'car': '🚗', 'taxi': '🚕', 'bus': '🚌', 'train': '🚆', 'airplane': '✈️',
  'helicopter': '🚁', 'rocket': '🚀', 'bike': '🚲', 'motorcycle': '🏍️', 'scooter': '🛴',
  'boat': '⛵', 'ship': '🚢', 'truck': '🚚', 'ambulance': '🚑', 'police': '🚓',
  
  // House & Home
  'house': '🏠', 'door': '🚪', 'window': '🪟', 'bed': '🛏️', 'couch': '🛋️',
  'toilet': '🚽', 'shower': '🚿', 'bathtub': '🛁', 'lamp': '💡', 'candle': '🕯️',
  'key': '🔑', 'tool': '🔧', 'hammer': '🔨', 'wrench': '🔧', 'saw': '🪚',
  
  // Education
  'book': '📖', 'notebook': '📓', 'pen': '🖊️', 'pencil': '✏️', 'scissors': '✂️',
  'ruler': '📏', 'calculator': '🧮', 'backpack': '🎒', 'globe': '🌐', 'computer': '💻',
  
  // Nature
  'tree': '🌳', 'flower': '🌸', 'rose': '🌹', 'sunflower': '🌻', 'plant': '🌱',
  'leaf': '🍃', 'maple': '🍁', 'sun': '☀️', 'moon': '🌙', 'star': '⭐',
  'cloud': '☁️', 'rain': '🌧️', 'snow': '❄️', 'wind': '💨', 'fire': '🔥',
  'water': '💧', 'earth': '🌍', 'mountain': '⛰️', 'volcano': '🌋', 'beach': '🏖️',
  
  // Sports
  'soccer': '⚽', 'basketball': '🏀', 'football': '🏈', 'baseball': '⚾', 'tennis': '🎾',
  'volleyball': '🏐', 'golf': '⛳', 'swimming': '🏊', 'running': '🏃', 'cycling': '🚴',
  
  // Time
  'clock': '🕐', 'watch': '⌚', 'alarm': '⏰', 'calendar': '📅', 'hourglass': '⏳',
  
  // Emotions
  'happy': '😊', 'sad': '😢', 'angry': '😠', 'love': '❤️', 'laugh': '😂',
  
  // Weather
  'sunny': '☀️', 'cloudy': '☁️', 'rainy': '🌧️', 'snowy': '❄️', 'thunder': '⛈️',
  
  // Numbers
  'one': '1️⃣', 'two': '2️⃣', 'three': '3️⃣', 'four': '4️⃣', 'five': '5️⃣',
  'zero': '0️⃣',
  
  // Colors
  'red': '🔴', 'blue': '🔵', 'green': '🟢', 'yellow': '🟡', 'orange': '🟠',
  'purple': '🟣', 'black': '⚫', 'white': '⚪', 'brown': '🟤',
  
  // Family
  'family': '👨‍👩‍👧‍👦', 'baby': '👶', 'child': '🧒', 'boy': '👦', 'girl': '👧',
  'man': '👨', 'woman': '👩', 'father': '👨', 'mother': '👩', 'grandparent': '👴'
};

// Function to determine category based on word
function determineCategory(word, translation) {
  const lowerWord = word.toLowerCase();
  const lowerTranslation = translation.toLowerCase();
  
  // Check each category's keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerWord.includes(keyword) || lowerTranslation.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'various'; // default category
}

// Function to get icon for word
function getIcon(word) {
  const lowerWord = word.toLowerCase().trim();
  
  // Exact match
  if (iconMap[lowerWord]) {
    return iconMap[lowerWord];
  }
  
  // Partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerWord.includes(key) || key.includes(lowerWord)) {
      return icon;
    }
  }
  
  // Default icon based on first letter
  return '📝';
}

// Process vocabulary
let fixed = 0;
let iconsAdded = 0;

vocabulary.forEach(item => {
  // Fix category if needed
  const newCategory = determineCategory(item.word, item.translation);
  if (item.category !== newCategory && newCategory !== 'various') {
    console.log(`Fixing: "${item.word}" from ${item.category} -> ${newCategory}`);
    item.category = newCategory;
    fixed++;
  }
  
  // Add icon if not present
  if (!item.icon) {
    item.icon = getIcon(item.word);
    iconsAdded++;
  }
});

// Save updated data
fs.writeFileSync(vocabPath, JSON.stringify(vocabulary, null, 2));

console.log(`\nDone!`);
console.log(`- Fixed categories: ${fixed} words`);
console.log(`- Added icons: ${iconsAdded} words`);
console.log(`- Total words: ${vocabulary.length}`);
