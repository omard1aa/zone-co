"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface BookingConfirmationProps {
  bookingRef: string;
}

export function BookingConfirmation({ bookingRef }: BookingConfirmationProps) {
  const t = useTranslations("booking");

  return (
    <div className="text-center py-10 max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center animate-fade-in">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t("confirmed")}
      </h2>
      <p className="text-gray-500 mb-6">{t("confirmedDesc")}</p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <p className="text-sm text-gray-500 mb-1">{t("bookingRef")}</p>
        <p className="text-2xl font-mono font-bold text-primary-700">
          {bookingRef}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="outline">{t("backHome")}</Button>
        </Link>
      </div>
    </div>
  );
}
