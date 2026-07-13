'use client';

import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (sort: string) => void;
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Cooking Time (Low → High)', value: 'cookingTime-asc' },
  { label: 'Cooking Time (High → Low)', value: 'cookingTime-desc' },
  { label: 'Alphabetical (A → Z)', value: 'title' },
];

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-[#F4A261]/20 rounded-xl px-4 py-2.5 pr-10 cursor-pointer hover:border-[#E07A2F]/40 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm text-[#2D1B0E]"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A6B5A] pointer-events-none w-4 h-4" />
    </div>
  );
};
