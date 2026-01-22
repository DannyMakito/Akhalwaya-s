import { MenuItem, PromoCard, Category, DetailedMenuItem, StoreLocation } from './types';

export const NAV_LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'Menu', href: 'menu' },
  { label: 'Rewards', href: 'rewards' },
  { label: 'About us', href: 'about' },
];

export const HERO_DATA = {
  title: "LEGENDARY FLAVOR",
  subtitle: "INTRODUCING THE MASALA STEAK GATSBY",
  description: "Layers of tender spiced steak, hand-cut chips, and our secret sauce. A tradition reborn.",
  cta: "ORDER NOW",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2550&auto=format&fit=crop"
};

export const FEATURED_ITEMS: MenuItem[] = [
  {
    id: 'gatsby-1',
    title: 'The Great Gatsby',
    description: 'A foot-long roll filled with masala steak, chips, salad, and spicy sauce.',
    price: 'R 145.00',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
    tag: 'SIGNATURE'
  },
  {
    id: 'curry-1',
    title: 'Durban Curry Bowl',
    description: 'Authentic mutton curry served over savory rice with a side of sambals.',
    price: 'R 120.00',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
    isNew: true
  },
  {
    id: 'wrap-1',
    title: 'Spicy Tikka Wrap',
    description: 'Grilled chicken tikka wrapped in a fresh roti with crunchy slaw.',
    price: 'R 95.00',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'side-1',
    title: 'Samosa Box',
    description: '6 crispy golden samosas. Choice of beef, chicken, or potato cheese.',
    price: 'R 60.00',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop'
  }
];

export const PROMO_CARDS: PromoCard[] = [
  {
    title: "FAMILY FEASTS",
    subtitle: "FEED THE CROWD",
    description: "Generous portions designed for sharing. Perfect for 4-6 people starting at R 400.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    ctaText: "VIEW PLATTERS",
    theme: 'light'
  },
  {
    title: "FRESH & SPICY",
    subtitle: "HAND-CRAFTED DAILY",
    description: "We grind our own spices every morning to ensure the boldest flavor in every bite.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200&auto=format&fit=crop",
    ctaText: "LEARN MORE",
    theme: 'dark'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'sandton',
    name: "Akhalwaya's Sandton",
    address: "Shop 12, Nelson Mandela Square, 5th St",
    city: "Sandton",
    phone: "+27 11 555 0101",
    status: 'Open'
  },
  {
    id: 'midrand',
    name: "Akhalwaya's Midrand",
    address: "Mall of Africa, Food Court, Magwa Crescent",
    city: "Midrand",
    phone: "+27 11 555 0102",
    status: 'Open'
  },
  {
    id: 'laudium',
    name: "Akhalwaya's Laudium",
    address: "24 Tangerine Street",
    city: "Laudium",
    phone: "+27 12 555 0103",
    status: 'Open'
  }
];

// --- Menu Page Data ---

export const CATEGORIES: Category[] = [
  { id: 'fav', label: 'Customer Favourites', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=100&auto=format&fit=crop' },
  { id: 'gatsby', label: 'Signature Gatsbys', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=100&auto=format&fit=crop' },
  { id: 'curry', label: 'Curries & Rice', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=100&auto=format&fit=crop' },
  { id: 'burger', label: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop' },
  { id: 'sides', label: 'Sides & Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=100&auto=format&fit=crop' },
  { id: 'drinks', label: 'Drinks', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=100&auto=format&fit=crop' },
];

const INGREDIENTS = {
  roll: { name: 'Fresh Soft Roll', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400&auto=format&fit=crop' },
  steak: { name: 'Masala Steak', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=400&auto=format&fit=crop' },
  chips: { name: 'Hand-Cut Chips', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=400&auto=format&fit=crop' },
  sauce: { name: 'Secret Sauce', image: 'https://images.unsplash.com/photo-1472476443507-c7a392dd6182?q=80&w=400&auto=format&fit=crop' },
  lettuce: { name: 'Shredded Lettuce', image: 'https://images.unsplash.com/photo-1556809754-337ccbd08d59?q=80&w=400&auto=format&fit=crop' },
  onion: { name: 'Red Onion', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=400&auto=format&fit=crop' },
  rice: { name: 'Basmati Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop' },
  mutton: { name: 'Tender Mutton', image: 'https://images.unsplash.com/photo-1544025162-d76690b67f61?q=80&w=400&auto=format&fit=crop' },
  bun: { name: 'Sesame Bun', image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=400&auto=format&fit=crop' },
  patty: { name: 'Beef Patty', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=400&auto=format&fit=crop' },
  cheese: { name: 'Cheddar Slice', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400&auto=format&fit=crop' },
  samosa: { name: 'Crispy Pastry', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop' },
};

export const MENU_ITEMS: DetailedMenuItem[] = [
  {
    id: 'gatsby-1',
    categoryId: 'gatsby',
    title: 'The Great Gatsby',
    description: 'A foot-long roll filled with masala steak, chips, salad, and spicy sauce.',
    longDescription: 'Our signature dish that started it all. A fresh foot-long baguette generously stuffed with tender, masala-spiced steak strips, golden hand-cut fries (slap chips), fresh crisp lettuce, and our legendary secret spicy sauce. It is not just a sandwich; it is an experience.',
    price: 'R 145.00',
    calories: '1250 kCal',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop',
    tag: 'SIGNATURE',
    ingredients: [INGREDIENTS.roll, INGREDIENTS.steak, INGREDIENTS.chips, INGREDIENTS.lettuce, INGREDIENTS.sauce]
  },
  {
    id: 'gatsby-2',
    categoryId: 'gatsby',
    title: 'Full House Chicken',
    description: 'Chargrilled chicken fillet, egg, cheese, chips and salad.',
    longDescription: 'For the chicken lovers. Succulent chargrilled chicken breast fillets topped with a fried egg, slice of cheddar, chips, and fresh salad on a long roll.',
    price: 'R 135.00',
    calories: '1100 kCal',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    ingredients: [INGREDIENTS.roll, INGREDIENTS.cheese, INGREDIENTS.chips, INGREDIENTS.lettuce, INGREDIENTS.sauce]
  },
  {
    id: 'curry-1',
    categoryId: 'curry',
    title: 'Durban Curry Bowl',
    description: 'Authentic mutton curry served over savory rice with a side of sambals.',
    longDescription: 'A taste of Durban. Slow-cooked mutton on the bone in a rich, spicy gravy with potatoes, served over fluffy savory rice and accompanied by carrot salad.',
    price: 'R 120.00',
    calories: '850 kCal',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
    isNew: true,
    ingredients: [INGREDIENTS.rice, INGREDIENTS.mutton, INGREDIENTS.onion, INGREDIENTS.sauce]
  },
  {
    id: 'burger-1',
    categoryId: 'burger',
    title: 'Akhalwaya Classic',
    description: '150g pure beef patty, caramelized onions, pepper sauce.',
    longDescription: 'The burger that defines us. 150g pure beef patty grilled to perfection, topped with sweet caramelized onions and our creamy pepper sauce on a toasted sesame bun.',
    price: 'R 85.00',
    calories: '750 kCal',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    ingredients: [INGREDIENTS.bun, INGREDIENTS.patty, INGREDIENTS.onion, INGREDIENTS.lettuce, INGREDIENTS.sauce]
  },
  {
    id: 'burger-2',
    categoryId: 'burger',
    title: 'Cheese Smash',
    description: 'Double patty, double cheese, pickles and mustard.',
    longDescription: 'Double the flavor. Two smashed beef patties with melted cheddar slices, tangy pickles, chopped onions, ketchup, and mustard.',
    price: 'R 95.00',
    calories: '820 kCal',
    image: 'https://images.unsplash.com/photo-1534790566855-4cf7884971e7?q=80&w=800&auto=format&fit=crop',
    ingredients: [INGREDIENTS.bun, INGREDIENTS.patty, INGREDIENTS.cheese, INGREDIENTS.onion]
  },
  {
    id: 'side-1',
    categoryId: 'sides',
    title: 'Samosa Box',
    description: '6 crispy golden samosas. Choice of beef, chicken, or potato cheese.',
    longDescription: 'Golden triangles of happiness. Hand-folded pastry filled with spiced beef mince, coriander, and onions. Fried until perfectly crisp.',
    price: 'R 60.00',
    calories: '450 kCal',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    ingredients: [INGREDIENTS.samosa, INGREDIENTS.onion, INGREDIENTS.sauce]
  }
];