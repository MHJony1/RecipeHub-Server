'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search recipes by title...' }: SearchBarProps) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-accent/30 bg-white text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition font-body"
      />
    </div>
  );
};
