'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import { Container } from '@/components/common/Container';
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

        // Calculate statistics
        const allRecipesResponse = await recipeService.getUserRecipes(1, 100);
        const allRecipes = allRecipesResponse.data || [];

        const categories = new Set(allRecipes.map((r) => r.category));
        const avgCookingTime = allRecipes.length
          ? Math.round(allRecipes.reduce((sum, r) => sum + r.cookingTime, 0) / allRecipes.length)
          : 0;
        const latestRecipeDate = allRecipes.length ? allRecipes[0].createdAt : null;

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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 md:p-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Card */}
          <WelcomeCard userName={user.name} />

          {/* Statistics Cards */}
          <StatisticsCards stats={stats} />

          {/* Charts */}
          {stats.totalRecipes > 0 && <DashboardCharts recipes={recipes} />}

          {/* Recent Recipes */}
          {recipes.length > 0 ? (
            <RecentRecipes recipes={recipes} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">You haven't created any recipes yet.</p>
              <QuickActions />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
