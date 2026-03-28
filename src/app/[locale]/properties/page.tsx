"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { properties } from "@/data/properties";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertyGrid } from "@/components/properties/property-grid";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

const defaultFilters = {
  types: [] as string[],
  priceRange: [200, 2000] as [number, number],
  minRating: 0,
  amenities: [] as string[],
};

export default function PropertiesPage() {
  const t = useTranslations("properties");
  const locale = useLocale();
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("rating");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by type
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type));
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-lg">{t("subtitle")}</p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="gap-2"
        >
          {showMobileFilters ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          {t("filters")}
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-5">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
            />
          </div>
        </aside>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-40 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t("filters")}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
            />
            <Button
              className="w-full mt-6"
              onClick={() => setShowMobileFilters(false)}
            >
              {t("applyFilters")}
            </Button>
          </div>
        )}

        {/* Properties Grid */}
        <div className="flex-1">
          <PropertyGrid
            properties={filteredProperties}
            total={properties.length}
            locale={locale}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>
    </div>
  );
}
