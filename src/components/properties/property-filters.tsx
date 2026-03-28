"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";

interface Filters {
  types: string[];
  priceRange: [number, number];
  minRating: number;
  amenities: string[];
}

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClear: () => void;
}

export function PropertyFilters({
  filters,
  onFiltersChange,
  onClear,
}: PropertyFiltersProps) {
  const t = useTranslations("properties");

  const toggleType = (type: string) => {
    const types = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types });
  };

  const toggleAmenity = (amenity: string) => {
    const amenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ ...filters, amenities });
  };

  const amenityKeys = ["wifi", "pool", "parking", "spa", "gym", "restaurant"] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <SlidersHorizontal className="h-5 w-5" />
        {t("filters")}
      </div>

      {/* Property Type */}
      <div>
        <h4 className="font-medium mb-3">{t("type")}</h4>
        <div className="space-y-2">
          {["hotel", "chalet"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <Label htmlFor={`type-${type}`} className="cursor-pointer">
                {t(type as "hotel" | "chalet")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">{t("priceRange")}</h4>
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          min={200}
          max={2000}
          step={50}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              priceRange: [value[0], value[1]] as [number, number],
            })
          }
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>EGP {filters.priceRange[0]}</span>
          <span>EGP {filters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">{t("rating")}</h4>
        <div className="space-y-2">
          {[4.5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={() =>
                  onFiltersChange({
                    ...filters,
                    minRating: filters.minRating === rating ? 0 : rating,
                  })
                }
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                {rating}+ ★
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h4 className="font-medium mb-3">{t("amenities")}</h4>
        <div className="space-y-2">
          {amenityKeys.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
                {t(amenity)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" className="w-full" onClick={onClear}>
        {t("clearFilters")}
      </Button>
    </div>
  );
}
