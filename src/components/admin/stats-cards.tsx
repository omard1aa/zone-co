import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import { properties } from "@/data/properties";
import { getBookingStats } from "@/data/bookings";
import { formatPrice } from "@/lib/utils";

export function StatsCards() {
  const t = useTranslations("admin");
  const stats = getBookingStats();

  const cards = [
    {
      label: t("totalProperties"),
      value: properties.length.toString(),
      icon: Building2,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: t("totalBookings"),
      value: stats.total.toString(),
      icon: CalendarCheck,
      color: "text-green-600 bg-green-100",
    },
    {
      label: t("revenue"),
      value: formatPrice(stats.revenue),
      icon: DollarSign,
      color: "text-primary-600 bg-primary-100",
    },
    {
      label: t("occupancy"),
      value: "73%",
      icon: TrendingUp,
      color: "text-orange-600 bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
