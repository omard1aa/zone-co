"use client";

import { useTranslations, useLocale } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Bed, Bath, Users, Maximize, Check, MapPin } from "lucide-react";
import { Property } from "@/data/types";
import { getReviewsByPropertyId } from "@/data/reviews";
import { getLocalizedProperty } from "@/data/properties";
import { formatDate } from "@/lib/utils";

interface PropertyTabsProps {
  property: Property;
}

const amenityIcons: Record<string, string> = {
  wifi: "📶",
  pool: "🏊",
  parking: "🅿️",
  spa: "💆",
  gym: "🏋️",
  restaurant: "🍽️",
  kitchen: "🍳",
  ac: "❄️",
  bbq: "🔥",
  garden: "🌿",
  "sea-view": "🌊",
  "mountain-view": "⛰️",
};

export function PropertyTabs({ property }: PropertyTabsProps) {
  const t = useTranslations("property");
  const pt = useTranslations("properties");
  const locale = useLocale();
  const localized = getLocalizedProperty(property, locale);
  const reviews = getReviewsByPropertyId(property.id);

  return (
    <Tabs defaultValue="overview">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
        <TabsTrigger value="amenities">{t("amenities")}</TabsTrigger>
        <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
        <TabsTrigger value="location">{t("location")}</TabsTrigger>
      </TabsList>

      {/* Overview */}
      <TabsContent value="overview" className="mt-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("description")}</h3>
          <p className="text-gray-600 leading-relaxed">{localized.description}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-lg mb-4">{t("highlights")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Bed className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-sm text-gray-500">{t("bedrooms")}</div>
                <div className="font-semibold">{property.bedrooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Bath className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-sm text-gray-500">{t("bathrooms")}</div>
                <div className="font-semibold">{property.bathrooms}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-sm text-gray-500">{t("maxGuests")}</div>
                <div className="font-semibold">{property.maxGuests}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Maximize className="h-5 w-5 text-primary-600" />
              <div>
                <div className="text-sm text-gray-500">{t("area")}</div>
                <div className="font-semibold">{property.area} m²</div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-lg mb-2">{t("cancellation")}</h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            {t("freeCancellation")}
          </p>
        </div>
      </TabsContent>

      {/* Amenities */}
      <TabsContent value="amenities" className="mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {property.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-lg">{amenityIcons[amenity] || "✓"}</span>
              <span className="text-sm font-medium">
                {pt(amenity as any)}
              </span>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Reviews */}
      <TabsContent value="reviews" className="mt-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 fill-gold text-gold" />
          <span className="text-lg font-semibold">{property.rating}</span>
          <span className="text-gray-500">
            ({property.reviewCount} {pt("reviews")})
          </span>
        </div>

        {reviews.map((review) => {
          const reviewName = locale === "ar" ? review.nameAr : review.name;
          const reviewText = locale === "ar" ? review.textAr : review.text;

          return (
            <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.avatar}
                  alt={reviewName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{reviewName}</div>
                  <div className="text-xs text-gray-500">
                    {formatDate(new Date(review.date), locale)}
                  </div>
                </div>
                <div className="ms-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-gold text-gold"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{reviewText}</p>
            </div>
          );
        })}
      </TabsContent>

      {/* Location */}
      <TabsContent value="location" className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-primary-600" />
          <span className="text-lg font-medium">{localized.location}</span>
        </div>
        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Map placeholder</p>
            <p className="text-sm">{localized.city}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
