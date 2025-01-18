import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function CarouselControls({ onPrevious, onNext }: CarouselControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full border hover:bg-gray-50"
        aria-label="Previous offers"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="p-2 rounded-full border hover:bg-gray-50"
        aria-label="Next offers"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}