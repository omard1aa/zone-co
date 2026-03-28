"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { Property } from "@/data/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export function PropertyCard({ property, locale }: PropertyCardProps) {
  const t = useTranslations("featured");
  const pt = useTranslations("properties");

  const name = locale === "ar" ? property.nameAr : property.name;
  const location = locale === "ar" ? property.locationAr : property.location;
  const typeLabel = property.type === "hotel" ? t("hotel") : t("chalet");

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:card-shadow-hover cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 start-3">
            <Badge variant={property.type === "hotel" ? "default" : "gold"}>
              {typeLabel}
            </Badge>
          </div>
          {property.featured && (
            <div className="absolute top-3 end-3">
              <Badge variant="gold">Featured</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-sm text-gray-400">
                ({property.reviewCount} {pt("reviews")})
              </span>
            </div>

            <div className="text-end">
              <span className="text-lg font-bold text-primary-700">
                {formatPrice(property.price)}
              </span>
              <span className="text-sm text-gray-500">{t("perNight")}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
