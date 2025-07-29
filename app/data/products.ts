export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrls?: string[];
  category: string;
  isNew?: boolean;
  description?: string;
  brand?: string;
  inStock?: boolean;
  sizes?: string[];
  colors?: string[];
  status?: 'Out of Stock' | 'Coming Soon';
}

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Decks', slug: 'decks' },
  { name: 'Trucks', slug: 'trucks' },
  { name: 'Wheels', slug: 'wheels' },
  { name: 'Hardware', slug: 'hardware' },
  { name: 'Apparel', slug: 'apparel' },
  { name: 'Footwear', slug: 'footwear' },
  { name: 'Accessories', slug: 'accessories' },
];

// Product images array for easier management
const productImages = [
  '/ngosa-skull.jpg',
  '/psilocybin.jpg',
  '/sakura.jpg',
  '/stashman-blue-nobutton.jpg',
  '/stashman-pink-nobutton.jpg',
  '/stashman-purple-nobuttons.jpg'
];

export const products: Product[] = [
  // Decks
  {
    id: 1,
    name: 'Ngosa Skull Deck',
    price: 0, // Price removed as per user request
    imageUrls: ['/ngosa-skull-front.jpg', '/ngosa-skull.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Limited edition deck featuring the iconic Ngosa Skull design',
    brand: 'FAR OUT',
    inStock: false,
    status: 'Out of Stock',
    sizes: ['8.0"', '8.25"', '8.5"']
  },
  {
    id: 2,
    name: 'Psilocybin Deck',
    price: 0,
    imageUrls: ['/psilocybin.jpg', '/psylocibin-front.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Psychedelic inspired design for the true visionary',
    brand: 'FAR OUT',
    inStock: false,
    status: 'Out of Stock',
    sizes: ['8.0"', '8.25"', '8.5"']
  },
  {
    id: 3,
    name: 'Sakura Deck',
    price: 0,
    imageUrls: ['/sakura.jpg', '/sakura-coming-soon.jpg', '/sakura-back.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Cherry blossom design with Japanese inspiration',
    brand: 'FAR OUT',
    inStock: false,
    status: 'Coming Soon',
    sizes: ['8.0"', '8.25"', '8.5"']
  },
  {
    id: 4,
    name: 'Stashman Blue Deck',
    price: 0,
    imageUrls: ['/stashman-front.jpg', '/stashman-blue-nobutton.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Classic Stashman design in cool blue',
    brand: 'FAR OUT',
    inStock: false,
    sizes: ['8.0"', '8.25"', '8.5"'],
    colors: ['blue', 'pink', 'purple']
  },
  {
    id: 5,
    name: 'Stashman Pink Deck',
    price: 0,
    imageUrls: ['/stashman-pink-nobutton.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Vibrant pink Stashman design',
    brand: 'FAR OUT',
    inStock: false,
    sizes: ['8.0"', '8.25"', '8.5"'],
    colors: ['blue', 'pink', 'purple']
  },
  {
    id: 6,
    name: 'Stashman Purple Deck',
    price: 0,
    imageUrls: ['/stashman-purple-nobuttons.jpg'],
    category: 'Decks',
    isNew: true,
    description: 'Deep purple Stashman design',
    brand: 'FAR OUT',
    inStock: false,
    sizes: ['8.0"', '8.25"', '8.5"'],
    colors: ['blue', 'pink', 'purple']
  },

  
  // Trucks
  {
    id: 5,
    name: 'Pro Skateboard Trucks',
    price: 49.99,
    imageUrls: ['/placeholder-trucks.jpg'],
    category: 'Trucks',
    isNew: true,
    description: 'High-quality aluminum trucks for smooth rides',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['139mm', '149mm', '159mm']
  },
  {
    id: 10,
    name: 'Street Trucks - Silver',
    price: 44.99,
    imageUrls: ['/placeholder-trucks-silver.jpg'],
    category: 'Trucks',
    isNew: false,
    description: 'Durable street trucks with silver finish',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['139mm', '149mm']
  },

  // Wheels
  {
    id: 17,
    name: 'Skate Wheels - 54mm',
    price: 39.99,
    imageUrls: ['/placeholder-wheels.jpg'],
    category: 'Wheels',
    isNew: false,
    description: 'Premium urethane wheels for street skating',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['52mm', '54mm', '56mm']
  },
  {
    id: 11,
    name: 'Soft Wheels - 60mm',
    price: 44.99,
    imageUrls: ['/placeholder-wheels-soft.jpg'],
    category: 'Wheels',
    isNew: true,
    description: 'Soft wheels perfect for cruising',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['58mm', '60mm', '62mm']
  },

  // Hardware
  {
    id: 8,
    name: 'Skate Tool',
    price: 19.99,
    imageUrls: ['/placeholder-tool.jpg'],
    category: 'Hardware',
    isNew: false,
    description: 'Essential multi-tool for skateboard maintenance',
    brand: 'FAR OUT',
    inStock: true
  },
  {
    id: 12,
    name: 'Bearing Set',
    price: 29.99,
    imageUrls: ['/placeholder-bearings.jpg'],
    category: 'Hardware',
    isNew: true,
    description: 'High-speed ABEC 7 bearings',
    brand: 'FAR OUT',
    inStock: true
  },

  // Apparel
  {
    id: 2,
    name: 'Graphic Tee - White',
    price: 29.99,
    imageUrls: ['/placeholder-tee.jpg'],
    category: 'Apparel',
    isNew: true,
    description: 'Comfortable cotton tee with FAR OUT graphics',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray']
  },
  {
    id: 13,
    name: 'Hoodie - Black',
    price: 59.99,
    imageUrls: ['/placeholder-hoodie.jpg'],
    category: 'Apparel',
    isNew: true,
    description: 'Premium cotton blend hoodie',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy']
  },

  // Footwear
  {
    id: 7,
    name: 'Skate Shoes - Black/White',
    price: 79.99,
    imageUrls: ['/placeholder-shoes.jpg'],
    category: 'Footwear',
    isNew: true,
    description: 'Durable skate shoes with reinforced toe',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/White', 'All Black', 'Navy/White']
  },
  {
    id: 14,
    name: 'High-Top Skate Shoes',
    price: 89.99,
    imageUrls: ['/placeholder-shoes-high.jpg'],
    category: 'Footwear',
    isNew: false,
    description: 'Classic high-top design for ankle support',
    brand: 'FAR OUT',
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12']
  },

  // Accessories
  {
    id: 18,
    name: 'Skate Tools',
    price: 0,
    imageUrls: ['/skate-tools.jpg'],
    category: 'Accessories',
    isNew: true,
    description: 'Essential tools for skateboard maintenance.',
    inStock: false,
    status: 'Out of Stock',
  },
  {
    id: 19,
    name: 'Bearings',
    price: 0,
    imageUrls: ['/bearings.jpg'],
    category: 'Accessories',
    isNew: true,
    description: 'High-performance bearings for a smooth ride.',
    inStock: false,
    status: 'Coming Soon',
  },
  {
    id: 20,
    name: 'Grip Tape',
    price: 0,
    imageUrls: ['/griptape.jpg'],
    category: 'Accessories',
    isNew: true,
    description: 'Premium grip tape for ultimate board control.',
    inStock: false,
    status: 'Coming Soon',
  },
  {
    id: 21,
    name: 'Nuts and Bolts',
    price: 0,
    imageUrls: ['/nuts-and-bolts.jpg'],
    category: 'Accessories',
    isNew: true,
    description: 'Durable hardware for assembling your skateboard.',
    inStock: false,
    status: 'Out of Stock',
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 8);
};
