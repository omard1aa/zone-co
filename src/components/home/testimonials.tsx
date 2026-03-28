import { useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

interface TestimonialsProps {
  locale: string;
}

export function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations("testimonials");

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
          {testimonials.map((item) => {
            const name = locale === "ar" ? item.nameAr : item.name;
            const location = locale === "ar" ? item.locationAr : item.location;
            const text = locale === "ar" ? item.textAr : item.text;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 card-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "fill-gold text-gold"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {name}
                    </div>
                    <div className="text-xs text-gray-500">{location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
