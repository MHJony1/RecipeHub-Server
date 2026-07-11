'use client';

import { Card } from '@/components/ui/Card';
import { RECIPE_CATEGORIES, DIFFICULTY_LEVELS } from '@/constants';

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

export const FilterBar = ({ filters, onFilterChange, onReset }: FilterBarProps) => {
  const hasActiveFilters = filters.search || filters.category || filters.difficulty || filters.cookingTime;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              {RECIPE_CATEGORIES.map((category) => (
                <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={(e) => onFilterChange({ category: e.target.checked ? category : '' })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Difficulty</h4>
            <div className="space-y-2">
              {DIFFICULTY_LEVELS.map((difficulty) => (
                <label key={difficulty} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.difficulty === difficulty}
                    onChange={(e) => onFilterChange({ difficulty: e.target.checked ? difficulty : '' })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{difficulty}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Cooking Time</h4>
            <div className="space-y-2">
              {COOKING_TIME_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.cookingTime === option.value}
                    onChange={(e) => onFilterChange({ cookingTime: e.target.checked ? option.value : '' })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
