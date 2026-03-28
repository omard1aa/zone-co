"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";

interface MockPaymentFormProps {
  onPay: () => void;
  onBack: () => void;
  total: string;
}

export function MockPaymentForm({ onPay, onBack, total }: MockPaymentFormProps) {
  const t = useTranslations("booking");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + "/" + digits.slice(2);
    }
    return digits;
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPay();
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">{t("paymentTitle")}</h2>

      <div>
        <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
        <div className="relative mt-1">
          <CreditCard className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            className="ps-10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="cardName">{t("cardName")}</Label>
        <Input
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry">{t("expiry")}</Label>
          <Input
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
          />
        </div>
        <div>
          <Label htmlFor="cvv">{t("cvv")}</Label>
          <Input
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
            placeholder="123"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <Lock className="h-4 w-4 text-green-600" />
        {t("securePayment")} Paymob
      </div>

      <p className="text-xs text-gray-500">
        {t("termsText")}{" "}
        <a href="#" className="text-primary-600 underline">
          {t("termsLink")}
        </a>{" "}
        &{" "}
        <a href="#" className="text-primary-600 underline">
          {t("privacyLink")}
        </a>
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          {t("back")}
        </Button>
        <Button onClick={handlePay} size="lg" className="flex-1" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin me-2" />
          ) : null}
          {loading ? `${t("payNow")}...` : `${t("payNow")} — ${total}`}
        </Button>
      </div>
    </div>
  );
}
