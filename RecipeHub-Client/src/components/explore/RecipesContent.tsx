'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { RecipeGrid } from '@/components/recipe/RecipeGrid';
import { SearchBar } from '@/components/explore/SearchBar';
import { FilterBar } from '@/components/explore/FilterBar';
import { SortDropdown } from '@/components/explore/SortDropdown';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/ui/Pagination';
import { Sparkles } from 'lucide-react';

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
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    cookingTime: searchParams.get('cookingTime') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: 9,
    sort: searchParams.get('sort') || 'newest',
  });

  useEffect(() => {
    const controller = new AbortController();

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

        const response = await recipeService.getRecipes(params, controller.signal);

        if (!controller.signal.aborted) {
          setRecipes(response.data || []);
          setPagination(
            response.pagination || { page: 1, totalPages: 1, total: 0 }
          );
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch recipes:', err);
          setError('Failed to load recipes. Please try again.');
          setRecipes([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => controller.abort();
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.category,
    filters.difficulty,
    filters.sort,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
    if (filters.page > 1) params.set('page', filters.page.toString());

    const query = params.toString();
    router.push(query ? `/recipes?${query}` : '/recipes');
  }, [filters.page, filters.search, filters.category, filters.difficulty, filters.sort, router]);

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
    setFilters({
      search: '',
      category: '',
      difficulty: '',
      cookingTime: '',
      page: 1,
      limit: 9,
      sort: 'newest',
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-8 sm:py-12 md:py-16 pt-24">
      <Container>
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#E07A2F]" />
            <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
              Discover
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B0E]">
            Explore <span className="text-[#E07A2F]">Recipes</span>
          </h1>
          <p className="text-[#7A6B5A] text-base sm:text-lg mt-1">
            Discover delicious recipes from our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar - Filter */}
          <div className="lg:col-span-1">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search & Sort */}
            <div className="mb-6 space-y-4">
              <SearchBar value={filters.search || ''} onChange={handleSearch} />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-[#7A6B5A] text-sm">
                  {pagination.total > 0 ? (
                    <>
                      <span className="font-medium text-[#2D1B0E]">
                        {recipes.length}
                      </span>{' '}
                      of{' '}
                      <span className="font-medium text-[#2D1B0E]">
                        {pagination.total}
                      </span>{' '}
                      recipes
                    </>
                  ) : (
                    'No recipes found'
                  )}
                </p>
                <SortDropdown
                  value={filters.sort || 'newest'}
                  onChange={handleSortChange}
                />
              </div>
            </div>

            {/* Error State */}
            {error && (
              <ErrorState
                title="Error Loading Recipes"
                description={error}
                onRetry={handleRetry}
              />
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {[...Array(filters.limit)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <div className="bg-white border border-[#F4A261]/10 rounded-3xl p-12 text-center shadow-xl shadow-[#F4A261]/5">
                <div className="w-20 h-20 rounded-full bg-[#F4A261]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🍽️</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-2">
                  No Recipes Found
                </h3>
                <p className="text-[#7A6B5A] text-sm mb-6">
                  Try adjusting your filters or search terms.
                </p>
                {(filters.search ||
                  filters.category ||
                  filters.difficulty ||
                  filters.cookingTime) && (
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#E07A2F]/25 transition-all duration-300"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <RecipeGrid recipes={recipes} />
                {pagination.totalPages > 1 && (
                  <div className="mt-10 md:mt-12">
                    <Pagination
                      currentPage={filters.page}
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
