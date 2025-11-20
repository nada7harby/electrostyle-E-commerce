import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

/**
 * Custom hook for managing product filters with URL params
 * Supports multi-select brand filtering and syncs with URL
 */
export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get selected brands from URL params
   * @returns Array of selected brand names
   */
  const selectedBrands = useMemo(() => {
    const brandsParam = searchParams.get("brand");
    if (!brandsParam) return [];
    return brandsParam.split(",").filter(Boolean);
  }, [searchParams]);

  /**
   * Get search query from URL params
   * @returns Search query string or empty string
   */
  const searchQuery = useMemo(() => {
    return searchParams.get("q") || "";
  }, [searchParams]);

  /**
   * Get category filter from URL params
   * @returns Category string or empty string
   */
  const category = useMemo(() => {
    return searchParams.get("category") || "";
  }, [searchParams]);

  /**
   * Toggle a brand filter on/off
   * @param brand - Brand name to toggle
   */
  const toggleBrand = (brand: string) => {
    const currentBrands = selectedBrands;
    let newBrands: string[];

    if (currentBrands.includes(brand)) {
      // Remove brand from selection
      newBrands = currentBrands.filter((b) => b !== brand);
    } else {
      // Add brand to selection
      newBrands = [...currentBrands, brand];
    }

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    
    if (newBrands.length > 0) {
      newParams.set("brand", newBrands.join(","));
    } else {
      newParams.delete("brand");
    }

    setSearchParams(newParams);
  };

  /**
   * Check if a brand is currently selected
   * @param brand - Brand name to check
   * @returns true if brand is selected, false otherwise
   */
  const isBrandSelected = (brand: string): boolean => {
    return selectedBrands.includes(brand);
  };

  /**
   * Clear all brand filters
   */
  const clearBrandFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("brand");
    setSearchParams(newParams);
  };

  /**
   * Clear all filters (brand, search, category)
   */
  const clearAllFilters = () => {
    setSearchParams({});
  };

  /**
   * Set search query
   * @param query - Search query string
   */
  const setSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }

    setSearchParams(newParams);
  };

  /**
   * Set category filter
   * @param categoryName - Category name
   */
  const setCategory = (categoryName: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (categoryName) {
      newParams.set("category", categoryName);
    } else {
      newParams.delete("category");
    }

    setSearchParams(newParams);
  };

  /**
   * Check if any filters are active
   * @returns true if any filters are active, false otherwise
   */
  const hasActiveFilters = useMemo(() => {
    return selectedBrands.length > 0 || searchQuery !== "" || category !== "";
  }, [selectedBrands, searchQuery, category]);

  return {
    // Current filter states
    selectedBrands,
    searchQuery,
    category,
    hasActiveFilters,

    // Brand filter actions
    toggleBrand,
    isBrandSelected,
    clearBrandFilters,

    // Other filter actions
    setSearch,
    setCategory,
    clearAllFilters,
  };
};
