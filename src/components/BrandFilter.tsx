import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { useFilter } from "@/hooks/useFilter";

interface BrandFilterProps {
  brands: string[]; // Array of unique brand names
}

/**
 * BrandFilter Component
 * Displays a list of brands with checkboxes for multi-select filtering
 * Syncs with URL params for shareable filter states
 */
export const BrandFilter = ({ brands }: BrandFilterProps) => {
  const {
    selectedBrands,
    toggleBrand,
    isBrandSelected,
    clearBrandFilters,
    hasActiveFilters,
  } = useFilter();

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#006A67]" />
            <h3 className="text-lg font-bold text-foreground">Filter by Brand</h3>
          </div>
          {selectedBrands.length > 0 && (
            <Badge
              variant="secondary"
              className="bg-[#006A67] text-white hover:bg-[#005552]"
            >
              {selectedBrands.length}
            </Badge>
          )}
        </div>

        {/* Brand List */}
        <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
          {brands.map((brand) => {
            const isSelected = isBrandSelected(brand);
            
            return (
              <div
                key={brand}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#006A67]/10 border border-[#006A67]"
                    : "hover:bg-muted border border-transparent"
                }`}
                onClick={() => toggleBrand(brand)}
              >
                <Checkbox
                  id={`brand-${brand}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleBrand(brand)}
                  className="data-[state=checked]:bg-[#006A67] data-[state=checked]:border-[#006A67]"
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="flex-1 cursor-pointer font-medium text-foreground"
                >
                  {brand}
                </Label>
              </div>
            );
          })}
        </div>

        {/* Clear Filters Button */}
        {selectedBrands.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={clearBrandFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Clear Brand Filters
          </Button>
        )}

        {/* Active Filters Display */}
        {selectedBrands.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Selected brands:</p>
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brand) => (
                <Badge
                  key={brand}
                  variant="secondary"
                  className="bg-[#006A67]/10 text-[#006A67] hover:bg-[#006A67]/20 cursor-pointer"
                  onClick={() => toggleBrand(brand)}
                >
                  {brand}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
