import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPropertyById, getLocalizedProperty, properties } from "@/data/properties";
import { ImageGallery } from "@/components/properties/image-gallery";
import { PropertyTabs } from "@/components/properties/property-tabs";
import { BookingSidebar } from "@/components/properties/booking-sidebar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const property = getPropertyById(id);
  if (!property) notFound();

  const localized = getLocalizedProperty(property, locale);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={property.type === "hotel" ? "default" : "gold"}>
            {property.type === "hotel"
              ? locale === "ar"
                ? "فندق"
                : "Hotel"
              : locale === "ar"
                ? "شاليه"
                : "Chalet"}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-gray-400">
              ({property.reviewCount})
            </span>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          {localized.name}
        </h1>
        <div className="flex items-center gap-1 text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{localized.location}</span>
        </div>
      </div>

      {/* Gallery */}
      <ImageGallery images={property.images} alt={localized.name} />

      {/* Content + Sidebar */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <PropertyTabs property={property} />
        </div>
        <aside className="w-full lg:w-[380px] shrink-0">
          <BookingSidebar property={property} />
        </aside>
      </div>
    </div>
  );
}
