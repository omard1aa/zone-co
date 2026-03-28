"use client";

import { useTranslations, useLocale } from "next-intl";
import { use, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getPropertyById } from "@/data/properties";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { GuestDetailsForm } from "@/components/booking/guest-details-form";
import { BookingSummary } from "@/components/booking/booking-summary";
import { MockPaymentForm } from "@/components/booking/mock-payment-form";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { calculateNights, formatPrice, generateBookingRef } from "@/lib/utils";

export default function BookingPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = use(params);
  const locale = useLocale();
  const t = useTranslations("booking");
  const searchParams = useSearchParams();

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests") || 2);

  const property = getPropertyById(propertyId);
  const [step, setStep] = useState(1);
  const [bookingRef] = useState(() => generateBookingRef());
  const [guestData, setGuestData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    idNumber: "",
    specialRequests: "",
  });

  const nights = useMemo(
    () =>
      checkIn && checkOut
        ? calculateNights(new Date(checkIn), new Date(checkOut))
        : 1,
    [checkIn, checkOut]
  );

  const total = useMemo(() => {
    if (!property) return 0;
    const subtotal = nights * property.price;
    return subtotal + subtotal * 0.15;
  }, [property, nights]);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        {t("title")}
      </h1>

      <BookingStepper currentStep={step} />

      {step === 3 ? (
        <BookingConfirmation bookingRef={bookingRef} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {step === 1 && (
              <GuestDetailsForm
                initialData={guestData}
                onSubmit={(data) => {
                  setGuestData(data);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <MockPaymentForm
                onPay={() => setStep(3)}
                onBack={() => setStep(1)}
                total={formatPrice(total)}
              />
            )}
          </div>
          <aside className="w-full lg:w-[340px] shrink-0">
            <BookingSummary
              property={property}
              locale={locale}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              nights={nights}
            />
          </aside>
        </div>
      )}
    </div>
  );
}
