import { useTranslations } from "next-intl";
import { Star, Headphones, BadgeDollarSign, ShieldCheck } from "lucide-react";

export function WhyChooseUs() {
  const t = useTranslations("why");

  const features = [
    {
      icon: Star,
      title: t("luxury.title"),
      desc: t("luxury.desc"),
    },
    {
      icon: Headphones,
      title: t("support.title"),
      desc: t("support.desc"),
    },
    {
      icon: BadgeDollarSign,
      title: t("bestPrice.title"),
      desc: t("bestPrice.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("secure.title"),
      desc: t("secure.desc"),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-primary-50/50">
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 text-center card-shadow hover:card-shadow-hover transition-shadow"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary-100 text-primary-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
