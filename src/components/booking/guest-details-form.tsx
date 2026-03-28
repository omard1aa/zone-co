"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface GuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idNumber: string;
  specialRequests: string;
}

interface GuestDetailsFormProps {
  initialData: GuestData;
  onSubmit: (data: GuestData) => void;
}

export function GuestDetailsForm({ initialData, onSubmit }: GuestDetailsFormProps) {
  const t = useTranslations("booking");
  const [data, setData] = useState<GuestData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof GuestData, boolean>>>({});

  const update = (field: keyof GuestData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = () => {
    const newErrors: Partial<Record<keyof GuestData, boolean>> = {};
    if (!data.firstName.trim()) newErrors.firstName = true;
    if (!data.lastName.trim()) newErrors.lastName = true;
    if (!data.email.trim() || !data.email.includes("@")) newErrors.email = true;
    if (!data.phone.trim()) newErrors.phone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(data);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">{t("step1")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{t("firstName")} *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
          />
        </div>
        <div>
          <Label htmlFor="lastName">{t("lastName")} *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">{t("email")} *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")} *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={errors.phone ? "border-red-500" : ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">{t("nationality")}</Label>
          <Input
            id="nationality"
            value={data.nationality}
            onChange={(e) => update("nationality", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="idNumber">{t("idNumber")}</Label>
          <Input
            id="idNumber"
            value={data.idNumber}
            onChange={(e) => update("idNumber", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequests">{t("specialRequests")}</Label>
        <textarea
          id="specialRequests"
          value={data.specialRequests}
          onChange={(e) => update("specialRequests", e.target.value)}
          placeholder={t("specialRequestsPlaceholder")}
          rows={3}
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        />
      </div>

      <Button onClick={handleSubmit} size="lg" className="w-full md:w-auto">
        {t("next")}
      </Button>
    </div>
  );
}
