'use client';

import { Card } from '@/components/ui/Card';
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from '@/constants';
import { Filter, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface Filters {
  search?: string;
  category?: string;
  difficulty?: string;
  cookingTime?: string;
  page: number;
  limit: number;
  sort?: string;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onReset: () => void;
}

const COOKING_TIME_OPTIONS = [
  { label: 'Under 15 Minutes', value: '0-15' },
  { label: '15 - 30 Minutes', value: '15-30' },
  { label: '30 - 60 Minutes', value: '30-60' },
  { label: '60+ Minutes', value: '60+' },
];

export const FilterBar = ({
  filters,
  onFilterChange,
  onReset,
}: FilterBarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.difficulty ||
    filters.cookingTime;

  const filterCount = [
    filters.category,
    filters.difficulty,
    filters.cookingTime,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#F4A261]/20 bg-white text-[#2D1B0E] text-sm font-medium w-full justify-center hover:bg-[#F4A261]/5 transition-colors duration-300"
      >
        <Filter className="w-4 h-4" />
        Filters
        {filterCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#E07A2F] text-white text-xs flex items-center justify-center">
            {filterCount}
          </span>
        )}
      </button>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block`}>
        <Card className="p-5 md:p-6 bg-white border border-[#F4A261]/10 rounded-2xl shadow-xl shadow-[#F4A261]/5 sticky top-28">
          {/* Header */}
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-[#F4A261]/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E07A2F]" />
              <h3 className="font-display font-bold text-[#2D1B0E] text-base">
                Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-[#E07A2F] hover:text-[#E07A2F]/80 font-medium transition-colors duration-300"
              >
                <X className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>

          <div className="space-y-5">
            {/* Category */}
            <div>
              <h4 className="font-medium text-[#2D1B0E] text-sm mb-2.5">
                Category
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {RECIPE_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      filters.category === category
                        ? 'bg-[#F4A261]/10'
                        : 'hover:bg-[#F4A261]/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.category === category}
                      onChange={(e) =>
                        onFilterChange({
                          category: e.target.checked ? category : '',
                        })
                      }
                      className="w-4 h-4 rounded border-[#F4A261]/30 text-[#E07A2F] focus:ring-[#E07A2F]/20 focus:ring-2 transition-all duration-200"
                    />
                    <span
                      className={`ml-3 text-sm ${
                        filters.category === category
                          ? 'text-[#E07A2F] font-medium'
                          : 'text-[#7A6B5A]'
                      }`}
                    >
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h4 className="font-medium text-[#2D1B0E] text-sm mb-2.5">
                Difficulty
              </h4>
              <div className="space-y-1.5">
                {DIFFICULTY_LEVELS.map((difficulty) => (
                  <label
                    key={difficulty}
                    className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      filters.difficulty === difficulty
                        ? 'bg-[#F4A261]/10'
                        : 'hover:bg-[#F4A261]/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.difficulty === difficulty}
                      onChange={(e) =>
                        onFilterChange({
                          difficulty: e.target.checked ? difficulty : '',
                        })
                      }
                      className="w-4 h-4 rounded border-[#F4A261]/30 text-[#E07A2F] focus:ring-[#E07A2F]/20 focus:ring-2 transition-all duration-200"
                    />
                    <span
                      className={`ml-3 text-sm ${
                        filters.difficulty === difficulty
                          ? 'text-[#E07A2F] font-medium'
                          : 'text-[#7A6B5A]'
                      }`}
                    >
                      {difficulty}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cooking Time */}
            <div>
              <h4 className="font-medium text-[#2D1B0E] text-sm mb-2.5">
                Cooking Time
              </h4>
              <div className="space-y-1.5">
                {COOKING_TIME_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center cursor-pointer p-2 rounded-lg transition-all duration-200 ${
                      filters.cookingTime === option.value
                        ? 'bg-[#F4A261]/10'
                        : 'hover:bg-[#F4A261]/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.cookingTime === option.value}
                      onChange={(e) =>
                        onFilterChange({
                          cookingTime: e.target.checked ? option.value : '',
                        })
                      }
                      className="w-4 h-4 rounded border-[#F4A261]/30 text-[#E07A2F] focus:ring-[#E07A2F]/20 focus:ring-2 transition-all duration-200"
                    />
                    <span
                      className={`ml-3 text-sm ${
                        filters.cookingTime === option.value
                          ? 'text-[#E07A2F] font-medium'
                          : 'text-[#7A6B5A]'
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
