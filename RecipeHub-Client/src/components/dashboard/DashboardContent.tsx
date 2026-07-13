'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { StatisticsCards } from '@/components/dashboard/StatisticsCards';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { RecentRecipes } from '@/components/dashboard/RecentRecipes';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface DashboardStats {
  totalRecipes: number;
  categoriesUsed: number;
  avgCookingTime: number;
  latestRecipeDate: string | null;
}

export const DashboardContent = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRecipes: 0,
    categoriesUsed: 0,
    avgCookingTime: 0,
    latestRecipeDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await recipeService.getUserRecipes(1, 5);
        const userRecipes = response.data || [];
        setRecipes(userRecipes);

        const allRecipesResponse = await recipeService.getUserRecipes(1, 100);
        const allRecipes = allRecipesResponse.data || [];

        const categories = new Set(allRecipes.map((r) => r.category));
        const avgCookingTime = allRecipes.length
          ? Math.round(
              allRecipes.reduce((sum, r) => sum + r.cookingTime, 0) /
                allRecipes.length
            )
          : 0;
        const latestRecipeDate = allRecipes.length
          ? allRecipes[0].createdAt
          : null;

        setStats({
          totalRecipes: allRecipes.length,
          categoriesUsed: categories.size,
          avgCookingTime,
          latestRecipeDate,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7] pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFBF7] pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <WelcomeCard userName={user.name} />
            <StatisticsCards stats={stats} />

            {stats.totalRecipes > 0 && <DashboardCharts recipes={recipes} />}

            {recipes.length > 0 ? (
              <RecentRecipes recipes={recipes} />
            ) : (
              <div className="bg-white border border-[#F4A261]/10 rounded-3xl p-12 text-center shadow-xl shadow-[#F4A261]/5">
                <div className="w-20 h-20 rounded-full bg-[#F4A261]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🍽️</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-2">
                  No Recipes Yet
                </h3>
                <p className="text-[#7A6B5A] text-sm mb-6">
                  Start your culinary journey by creating your first recipe!
                </p>
                <QuickActions />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
