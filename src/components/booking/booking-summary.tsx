"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/data/types";
import { formatPrice, formatDate } from "@/lib/utils";

interface BookingSummaryProps {
  property: Property;
  locale: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
}

export function BookingSummary({
  property,
  locale,
  checkIn,
  checkOut,
  guests,
  nights,
}: BookingSummaryProps) {
  const t = useTranslations("booking");
  const name = locale === "ar" ? property.nameAr : property.name;
  const subtotal = nights * property.price;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t("summary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Property */}
        <div className="flex gap-3">
          <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={property.images[0]}
              alt={name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm line-clamp-1">{name}</h4>
            <p className="text-xs text-gray-500">
              {locale === "ar" ? property.locationAr : property.location}
            </p>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("checkIn")}</span>
            <span className="font-medium">
              {checkIn ? formatDate(new Date(checkIn), locale) : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("checkOut")}</span>
            <span className="font-medium">
              {checkOut ? formatDate(new Date(checkOut), locale) : "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("guests")}</span>
            <span className="font-medium">{guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("nights")}</span>
            <span className="font-medium">{nights}</span>
          </div>
        </div>

        <Separator />

        {/* Pricing */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("pricePerNight")}</span>
            <span>{formatPrice(property.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("subtotal")}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("taxes")}</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>{t("total")}</span>
            <span className="text-primary-700">{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
