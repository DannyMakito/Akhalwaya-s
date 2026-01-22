export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
  isNew?: boolean;
}

export interface Ingredient {
  name: string;
  image: string;
}

export interface DetailedMenuItem extends MenuItem {
  categoryId: string;
  calories: string;
  longDescription: string;
  ingredients: Ingredient[];
}

export interface Category {
  id: string;
  label: string;
  image: string; // Using string for image URL or icon name reference
}

export interface NavLink {
  label: string;
  href: string;
}

export interface PromoCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  theme: 'light' | 'dark';
}

export interface CartItem extends DetailedMenuItem {
  quantity: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  status: 'Open' | 'Closed';
}