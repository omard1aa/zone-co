"use client";

import { useTranslations } from "next-intl";
import { PropertyCard } from "./property-card";
import { Property } from "@/data/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  total: number;
  locale: string;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function PropertyGrid({
  properties,
  total,
  locale,
  sortBy,
  onSortChange,
}: PropertyGridProps) {
  const t = useTranslations("properties");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {t("showing")} {properties.length} {t("of")} {total} {t("results")}
        </p>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("sortBy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">{t("priceLow")}</SelectItem>
            <SelectItem value="price-high">{t("priceHigh")}</SelectItem>
            <SelectItem value="rating">{t("ratingHigh")}</SelectItem>
            <SelectItem value="newest">{t("newest")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {t("noResults")}
          </h3>
          <p className="text-gray-500">{t("noResultsDesc")}</p>
        </div>
      )}
    </div>
  );
}
