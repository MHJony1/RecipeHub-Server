import axios from 'axios';
import { API_BASE_URL } from '@/constants';
import { authService } from './auth.service';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Recipe {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  difficulty: string;
  cookingTime: number;
  image?: string;
  ingredients: string[];
  instructions: string[];
  author: { name: string; email: string; photoURL?: string };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const recipeService = {
  async createRecipe(data: any) {
    const response = await api.post<{ success: boolean; data: Recipe }>('/recipes', data);
    return response.data.data;
  },

  async getUserRecipes(page = 1, limit = 8) {
    const response = await api.get<{
      success: boolean;
      data: Recipe[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>('/recipes/user/my-recipes', { params: { page, limit } });
    return response.data;
  },

  async getRecipes(params?: any) {
    const response = await api.get<{
      success: boolean;
      data: Recipe[];
      pagination: any;
    }>('/recipes', { params });
    return response.data;
  },

  async getRecipeById(id: string) {
    const response = await api.get<{ success: boolean; data: Recipe }>(`/recipes/${id}`);
    return response.data.data;
  },

  async getRecipeBySlug(slug: string) {
    const response = await api.get<{ success: boolean; data: Recipe }>(`/recipes/slug/${slug}`);
    return response.data.data;
  },

  async deleteRecipe(id: string) {
    await api.delete(`/recipes/${id}`);
  },

  async updateRecipe(id: string, data: any) {
    const response = await api.put<{ success: boolean; data: Recipe }>(`/recipes/${id}`, data);
    return response.data.data;
  },
};
