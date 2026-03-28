"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";

export function HeroSection() {
  const t = useTranslations("hero");
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative overflow-hidden gradient-hero text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/20">
            {t("badge")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          {t("title")}{" "}
          <span className="text-gold-light">{t("titleHighlight")}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <MapPin className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("searchLocationPlaceholder")}
                className="ps-9 border-gray-200 text-gray-900"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                placeholder={t("checkIn")}
                className="ps-9 border-gray-200 text-gray-900"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                placeholder={t("checkOut")}
                className="ps-9 border-gray-200 text-gray-900"
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              {t("searchButton")}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "150+", label: t("stats.properties") },
            { value: "12+", label: t("stats.cities") },
            { value: "10K+", label: t("stats.guests") },
            { value: "4.8", label: t("stats.rating") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold-light">
                {stat.value}
              </div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
