export const ROUTES = {
  HOME: '/',
  RECIPES: '/recipes',
  RECIPE_DETAILS: (id: string) => `/recipes/${id}`,
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADD_RECIPE: '/dashboard/add-recipe',
  MANAGE_RECIPES: '/dashboard/manage-recipes',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

export const RECIPE_CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Fast Food',
  'Healthy',
  'Seafood',
  'Vegetarian',
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest Rating', value: 'rating' },
  { label: 'Cooking Time', value: 'cookingTime' },
];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 8,
  MAX_LIMIT: 20,
};

export const NAVIGATION_MENU = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Recipes', href: ROUTES.RECIPES },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Contact', href: ROUTES.CONTACT },
];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
