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
 * - itemsPerPage: number
 *      Number of items to display per page.
 *
 * - renderPage: function(pageItems: Array<any>) => ReactNode
 *      A render-prop style function used to render the current page's items.
 *
 * State (internal):
 * - currentPage: number
 *      The currently active page index (1-based).
 *
 * Features:
 * - Handles page switching (next, previous, direct page selection)
 * - Disables navigation when at the start or end
 * - Fully controlled internally, but flexible via props
 *
 * Example Usage:
 * --------------
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
export const Pagination = ({ items, itemsPerPage, renderPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calculates total number of pages
   */
  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  /**
   * Retrieves items for the current page
   */
  const currentPageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  /**
   * Navigates to a specific page number
   */
  const goToPage = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  /**
   * Navigate to next page
   */
  const handleNextPage = useCallback(
    () => goToPage(currentPage + 1),
    [goToPage, currentPage]
  );

  /**
   * Navigate to previous page
   */
  const handlePrevPage = useCallback(
    () => goToPage(currentPage - 1),
    [goToPage, currentPage]
  );

  /**
   * Render pagination controls
   */
  const renderControls = () => (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {/* Page indicators */}
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => goToPage(idx + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-md border ${
            currentPage === idx + 1
              ? "bg-primary text-white"
              : "bg-background hover:bg-muted"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div>
      {/* Render current page's items */}
      {renderPage(currentPageItems)}

      {/* Render pagination controls */}
      {renderControls()}
    </div>
  );
};
