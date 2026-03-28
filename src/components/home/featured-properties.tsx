import { useTranslations } from "next-intl";
import { getFeaturedProperties } from "@/data/properties";
import { PropertyCard } from "@/components/properties/property-card";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface FeaturedPropertiesProps {
  locale: string;
}

export function FeaturedProperties({ locale }: FeaturedPropertiesProps) {
  const t = useTranslations("featured");
  const featured = getFeaturedProperties();

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              locale={locale}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
