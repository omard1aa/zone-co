"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Check, Shield } from "lucide-react";
import { Property } from "@/data/types";
import { formatPrice, calculateNights } from "@/lib/utils";

interface BookingSidebarProps {
  property: Property;
}

export function BookingSidebar({ property }: BookingSidebarProps) {
  const t = useTranslations("property");
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? calculateNights(new Date(checkIn), new Date(checkOut))
      : 0;
  const subtotal = nights * property.price;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleBook = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
    });
    router.push(`/booking/${property.id}?${params.toString()}`);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary-700">
            {formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-500 font-normal">
            {t("perNight")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-gray-500">{t("checkIn")}</Label>
            <div className="relative mt-1">
              <Calendar className="absolute start-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="ps-8 text-sm"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">{t("checkOut")}</Label>
            <div className="relative mt-1">
              <Calendar className="absolute start-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="ps-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label className="text-xs text-gray-500">{t("guests")}</Label>
          <div className="relative mt-1">
            <Users className="absolute start-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              min={1}
              max={property.maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="ps-8 text-sm"
            />
          </div>
        </div>

        {/* Price Breakdown */}
        {nights > 0 && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  {formatPrice(property.price)} × {nights}{" "}
                  {nights === 1 ? t("night") : t("nights")}
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t("taxes")}</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>{t("totalPrice")}</span>
                <span className="text-primary-700">{formatPrice(total)}</span>
              </div>
            </div>
          </>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={handleBook}
          disabled={!checkIn || !checkOut}
        >
          {t("bookNow")}
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Shield className="h-3.5 w-3.5" />
          {t("freeCancellation")}
        </div>
      </CardContent>
    </Card>
  );
}
