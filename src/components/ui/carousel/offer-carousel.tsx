import { useState, useRef } from 'react';
import type { Brand } from '../../../types/brand';
import { CarouselControls } from './carousel-controls';
import { OfferCard } from './offer-card';

interface OfferCarouselProps {
  title: string;
  brands: Brand[];
}

export function OfferCarousel({ title, brands }: OfferCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    setScrollPosition(newPosition);
  };

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <CarouselControls 
          onPrevious={() => scroll('left')}
          onNext={() => scroll('right')}
        />
      </div>

      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
      >
        {brands.map((brand) => (
          <OfferCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}