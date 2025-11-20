import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { BrandFilter } from "@/components/BrandFilter";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { useFilter } from "@/hooks/useFilter";
import { Badge } from "@/components/ui/badge";

const ProductList = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Get filter state from URL params
  const { selectedBrands, clearAllFilters, hasActiveFilters } = useFilter();

  const categories = ["TVs", "Refrigerators", "Washers", "Small Appliances"];
  
  // Extract unique brands dynamically from products
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    return uniqueBrands.sort();
  }, []);

  // Apply all filters to products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Brand filter (from URL params)
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Clear all local and URL filters
  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 3000]);
    clearAllFilters();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          Home / <span className="text-foreground">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllFilters}
                      className="text-[#006A67] hover:text-[#005552]"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="ml-2 text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                <Slider
                  min={0}
                  max={3000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="ml-2 text-sm cursor-pointer">
                        {rating}★ & above
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              </div>

              {/* Brand Filter Component - Separate Card */}
              <BrandFilter brands={brands} />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">All Products</h1>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                
                {/* Active Filters Display */}
                {(selectedBrands.length > 0 || selectedCategories.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="bg-[#006A67]/10 text-[#006A67]"
                      >
                        Brand: {brand}
                      </Badge>
                    ))}
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-600"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearAllFilters}
                  className="bg-[#006A67] text-white hover:bg-[#005552]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
