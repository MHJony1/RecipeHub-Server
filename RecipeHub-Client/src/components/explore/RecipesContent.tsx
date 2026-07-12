'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { SearchBar } from '@/components/explore/SearchBar';
import { FilterBar } from '@/components/explore/FilterBar';
import { SortDropdown } from '@/components/explore/SortDropdown';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/ui/Pagination';

interface Filters {
  search?: string;
  category?: string;
  difficulty?: string;
  cookingTime?: string;
  page: number;
  limit: number;
  sort?: string;
}

export const RecipesContent = () => {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    cookingTime: searchParams.get('cookingTime') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 8,
    sort: searchParams.get('sort') || 'newest',
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params: Record<string, string | number> = {
          page: filters.page,
          limit: filters.limit,
        };

        if (filters.search) params.search = filters.search;
        if (filters.category) params.category = filters.category;
        if (filters.difficulty) params.difficulty = filters.difficulty;
        if (filters.sort) params.sort = filters.sort;

        const response = await recipeService.getRecipes(params);
        setRecipes(response.data || []);
        setPagination(response.pagination || { page: 1, totalPages: 1, total: 0 });
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load recipes. Please try again.');
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [filters.page, filters.limit, filters.search, filters.category, filters.difficulty, filters.cookingTime, filters.sort]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setFilters((prev) => ({ ...prev }));
  };

  const handleResetFilters = () => {
    setFilters({ search: '', category: '', difficulty: '', cookingTime: '', page: 1, limit: 8, sort: 'newest' });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <Container>
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">Explore Recipes</h1>
          <p className="font-body text-lg text-text-secondary">Discover delicious recipes from our community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />

          <div className="lg:col-span-3">
            <div className="mb-8 space-y-4">
              <SearchBar value={filters.search || ''} onChange={handleSearch} />
              <div className="flex justify-between items-center">
                <p className="font-body text-sm text-text-secondary">
                  {pagination.total > 0 ? `Showing ${recipes.length} of ${pagination.total} recipes` : ''}
                </p>
                <SortDropdown value={filters.sort || 'newest'} onChange={handleSortChange} />
              </div>
            </div>

            {error && (
              <ErrorState
                title="Error Loading Recipes"
                description={error}
                onRetry={handleRetry}
              />
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(filters.limit)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <EmptyState
                title="No Recipes Found"
                description="Try adjusting your filters or search terms."
                action={
                  (filters.search || filters.category || filters.difficulty || filters.cookingTime) && (
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-body font-semibold"
                    >
                      Reset Filters
                    </button>
                  )
                }
              />
            ) : (
              <>
                <RecipeGrid recipes={recipes} />
                {pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
