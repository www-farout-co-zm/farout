import { useState, useEffect } from 'react';
import { Product } from '@/app/data/products';

interface SearchResult {
  results: Product[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

export function useSearch(initialQuery = ''): SearchResult {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError('Failed to fetch search results');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timerId = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timerId);
  }, [query]);

  return { results, loading, error, search };
}
