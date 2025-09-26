import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component (Functional)
 * ---------------------------------
 * A reusable pagination wrapper that slices a list of items into
 * pages and provides navigation controls.
 *
 * Props:
 * - items: Array<any>
 *      The full dataset (e.g., list of projects).
 *
 * - itemsPerPage: number (default: 10)
 *      Number of items to display per page.
 *
 * - renderPage: function(pageItems: Array<any>) => ReactNode
 *      A render-prop style function used to render the current page's items.
 *
 * Example:
 * <Pagination
 *   items={projects}
 *   itemsPerPage={6}
 *   renderPage={(pageItems) => (
 *     <div className="grid grid-cols-3 gap-6">
 *       {pageItems.map((proj) => <ProjectCard key={proj.id} {...proj} />)}
 *     </div>
 *   )}
 * />
 */
export const Pagination = ({ items, itemsPerPage = 10, renderPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  const handleNextPage = useCallback(
    () => goToPage(currentPage + 1),
    [goToPage, currentPage]
  );

  const handlePrevPage = useCallback(
    () => goToPage(currentPage - 1),
    [goToPage, currentPage]
  );

  const Controls = () => (
    <nav
      className="flex justify-center items-center gap-2 mb-6"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border bg-secondary transition-colors cursor-pointer 
          disabled:cursor-not-allowed text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
        aria-label="Previous Page">
        <ChevronLeft size={16} /> Prev
      </button>

      {Array.from({ length: totalPages }, (_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            aria-current={currentPage === pageNum ? "page" : undefined}
            aria-label={`Go to page ${pageNum}`}
            className={`w-8 h-8 flex items-center justify-center rounded-md border 
              transition-colors cursor-pointer disabled:cursor-not-allowed  
              ${ currentPage === pageNum ? "bg-primary text-white": "bg-background hover:bg-muted"}`}>
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border bg-secondary transition-colors cursor-pointer disabled:cursor-not-allowed 
         text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
        aria-label="Next Page">
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );

  return (
    <div>
      {/* Controls on top */}
      <Controls />

      {/* Render current page's items */}
      {renderPage(currentPageItems)}
    </div>
  );
};
