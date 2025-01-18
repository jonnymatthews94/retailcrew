import { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pullThreshold = 80;
  const [pullDistance, setPullDistance] = useState(0);

  useEffect(() => {
    // Only enable on mobile devices
    if (window.innerWidth >= 768) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY);
        setPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling) return;

      const y = e.touches[0].clientY;
      const distance = Math.max(0, y - startY);
      setPullDistance(Math.min(distance * 0.5, pullThreshold));
    };

    const handleTouchEnd = async () => {
      if (!pulling) return;

      if (pullDistance >= pullThreshold) {
        setRefreshing(true);
        setPullDistance(0);
        await onRefresh();
        setRefreshing(false);
      } else {
        setPullDistance(0);
      }
      setPulling(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pulling, pullDistance, startY, onRefresh]);

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-center justify-center transition-transform"
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          opacity: pullDistance / pullThreshold 
        }}
      >
        {refreshing ? (
          <RefreshCw className="h-6 w-6 animate-spin text-primary-600" />
        ) : (
          <ArrowDown 
            className="h-6 w-6 text-primary-600 transition-transform" 
            style={{ 
              transform: `rotate(${Math.min(180, (pullDistance / pullThreshold) * 180)}deg)` 
            }}
          />
        )}
      </div>
      <div
        style={{ 
          transform: `translateY(${pullDistance}px)`,
          transition: pulling ? 'none' : 'transform 0.2s ease-out' 
        }}
      >
        {children}
      </div>
    </div>
  );
}