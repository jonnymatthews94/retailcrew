import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollProps<T> {
  items: T[];
  itemsPerPage?: number;
  threshold?: number;
}

export function useInfiniteScroll<T>({ 
  items, 
  itemsPerPage = 12,
  threshold = 100 
}: UseInfiniteScrollProps<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use refs to avoid dependency issues
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(page);

  // Update refs when state changes
  useEffect(() => {
    isLoadingRef.current = isLoading;
    hasMoreRef.current = hasMore;
    pageRef.current = page;
  }, [isLoading, hasMore, page]);

  // Load initial items
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage));
    setHasMore(items.length > itemsPerPage);
    setPage(1); // Reset page when items change
  }, [items, itemsPerPage]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!hasMoreRef.current || isLoadingRef.current) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      setIsLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        const nextItems = items.slice(0, (pageRef.current + 1) * itemsPerPage);
        setDisplayedItems(nextItems);
        setHasMore(nextItems.length < items.length);
        setPage(prev => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  }, [items, itemsPerPage, threshold]); // Removed state dependencies

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    displayedItems,
    isLoading,
    hasMore
  };
}