import { useState, useEffect } from 'react';
import { Product } from '@/app/data/products';
import { products } from '@/app/data/products';

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

  const search = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryLower = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(queryLower) ||
        product.description?.toLowerCase().includes(queryLower) ||
        product.brand?.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower)
      ).slice(0, 5);
      
      setResults(filtered);
    } catch (err) {
      setError('Failed to search products');
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
