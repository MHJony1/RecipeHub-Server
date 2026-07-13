'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search recipes by title...',
}: SearchBarProps) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onChange]);

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A] group-focus-within:text-[#E07A2F] transition-colors duration-300" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#F4A261]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm placeholder:text-[#7A6B5A]/50"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6B5A] hover:text-[#2D1B0E] transition-colors duration-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
