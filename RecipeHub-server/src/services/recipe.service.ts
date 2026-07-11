import { Recipe } from '../models/Recipe';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import type { CreateRecipeInput } from '../validators/recipe';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ensureUniqueSlug = async (baseSlug: string): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;
  while (await Recipe.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

export const recipeService = {
  async createRecipe(data: CreateRecipeInput, userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const baseSlug = generateSlug(data.title);
    const slug = await ensureUniqueSlug(baseSlug);

    const recipe = new Recipe({
      ...data,
      slug,
      author: {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      createdBy: userId,
    });

    await recipe.save();
    return recipe;
  },

  async getRecipes(query: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    difficulty?: string;
    sort?: string;
  }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(20, query.limit || 8);
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    let sortObj: any = { createdAt: -1 };
    if (query.sort === 'oldest') sortObj = { createdAt: 1 };
    if (query.sort === 'cookingTime') sortObj = { cookingTime: 1 };

    const [recipes, total] = await Promise.all([
      Recipe.find(filter).sort(sortObj).skip(skip).limit(limit),
      Recipe.countDocuments(filter),
    ]);

    return {
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getRecipeBySlug(slug: string) {
    const recipe = await Recipe.findOne({ slug });
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }
    return recipe;
  },

  async getRecipeById(id: string) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }
    return recipe;
  },

  async getUserRecipes(userId: string, page = 1, limit = 8) {
    const skip = (page - 1) * limit;
    const [recipes, total] = await Promise.all([
      Recipe.find({ createdBy: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Recipe.countDocuments({ createdBy: userId }),
    ]);

    return {
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateRecipe(id: string, data: Partial<CreateRecipeInput>, userId: string) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    if (recipe.createdBy.toString() !== userId) {
      throw new AppError('You can only update your own recipes', 403);
    }

    Object.assign(recipe, data);

    if (data.title) {
      const baseSlug = generateSlug(data.title);
      const newSlug = await ensureUniqueSlug(baseSlug);
      if (newSlug !== recipe.slug) {
        recipe.slug = newSlug;
      }
    }

    await recipe.save();
    return recipe;
  },

  async deleteRecipe(id: string, userId: string) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      throw new AppError('Recipe not found', 404);
    }

    if (recipe.createdBy.toString() !== userId) {
      throw new AppError('You can only delete your own recipes', 403);
    }

    await Recipe.findByIdAndDelete(id);
  },
};
