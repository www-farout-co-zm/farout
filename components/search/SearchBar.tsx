'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { Search as SearchIcon, X } from 'lucide-react';
import { Product } from '@/app/data/products';
import Link from 'next/link';
import { routes } from '@/app/utils/navigation';

interface SearchBarProps {
  className?: string;
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ className = '', onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const { results, loading, search } = useSearch('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      setInputValue('');
      setIsFocused(false);
      onSearch?.(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update search when input changes
  useEffect(() => {
    if (inputValue !== '') {
      search(inputValue);
    } else {
      search('');
    }
  }, [inputValue, search]);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search products..."
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-8 text-sm text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            aria-label="Search products"
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search results dropdown */}
      {isFocused && (inputValue || results.length > 0) && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-96 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-1">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={routes.product(product.id.toString())}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setInputValue('');
                    setIsFocused(false);
                  }}
                >
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{product.name}</div>
                    <div className="text-gray-500">${product.price.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-gray-100 px-4 py-2">
                <Link
                  href={`/search?q=${encodeURIComponent(inputValue)}`}
                  className="block text-center text-sm font-medium text-gray-900 hover:text-gray-600"
                  onClick={() => setIsFocused(false)}
                >
                  View all results for "{inputValue}"
                </Link>
              </div>
            </div>
          ) : inputValue ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found for "{inputValue}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
