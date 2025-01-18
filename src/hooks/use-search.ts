import { useState, useEffect } from 'react';
import type { Brand } from '../types/brand';

export function useSearch(query: string) {
  const [results, setResults] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    // TODO: Implement actual search API
    // This is a mock implementation
    setTimeout(() => {
      setResults([
        {
          id: 'techgear-pro',
          name: 'TechGear Pro',
          logo: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=128&h=128&fit=crop',
          category: 'Tech',
          description: 'Premium tech accessories and gadgets for professionals.',
          website: 'https://example.com',
          offers: [],
        },
      ]);
      setLoading(false);
    }, 500);
  }, [query]);

  return { results, loading };
}