import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show max 5 page numbers
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border hover:border-primary-600"
          >
            1
          </button>
          <span className="flex h-10 w-10 items-center justify-center">...</span>
        </>
      )}

      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border",
            currentPage === page 
              ? "border-primary-600 bg-primary-50 text-primary-600" 
              : "hover:border-primary-600"
          )}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="flex h-10 w-10 items-center justify-center">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border hover:border-primary-600"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}