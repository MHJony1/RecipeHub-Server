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
        className="appearance-none bg-white border border-accent/30 rounded-lg px-4 py-2 pr-10 cursor-pointer hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-primary transition font-body text-text"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" size={16} />
    </div>
  );
};
