import React, { Component } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component (Class-based)
 * -----------------------------------
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
 * State:
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
class PaginationBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1, // default page
    };
  }

  /**
   * Calculates total number of pages
   * @returns {number}
   */
  getTotalPages = () => {
    const { items, itemsPerPage } = this.props;
    return Math.ceil(items.length / itemsPerPage);
  };

  /**
   * Retrieves items for the current page
   * @returns {Array<any>}
   */
  getCurrentPageItems = () => {
    const { currentPage } = this.state;
    const { items, itemsPerPage } = this.props;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  /**
   * Navigates to a specific page number
   * @param {number} pageNumber - Target page index
   */
  goToPage = (pageNumber) => {
    const totalPages = this.getTotalPages();

    if (pageNumber >= 1 && pageNumber <= totalPages) {
      this.setState({ currentPage: pageNumber });
    }
  };

  /**
   * Navigate to next page
   */
  handleNextPage = () => {
    this.goToPage(this.state.currentPage + 1);
  };

  /**
   * Navigate to previous page
   */
  handlePrevPage = () => {
    this.goToPage(this.state.currentPage - 1);
  };

  /**
   * Renders pagination controls
   * @returns {ReactNode}
   */
  renderControls = () => {
    const { currentPage } = this.state;
    const totalPages = this.getTotalPages();

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {/* Previous button */}
        <button
          onClick={this.handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Page indicators */}
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => this.goToPage(idx + 1)}
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
          onClick={this.handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 flex items-center gap-1"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  /**
   * Renders component
   */
  render() {
    const pageItems = this.getCurrentPageItems();
    const { renderPage } = this.props;

    return (
      <div>
        {/* Render current page's items */}
        {renderPage(pageItems)}

        {/* Render pagination controls */}
        {this.renderControls()}
      </div>
    );
  }
}

export const Pagination = PaginationBase;
