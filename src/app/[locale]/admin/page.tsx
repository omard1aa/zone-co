import { useTranslations } from "next-intl";
import { StatsCards } from "@/components/admin/stats-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings } from "@/data/bookings";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const t = useTranslations("admin");
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <StatsCards />

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentBookings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-start py-3 px-2 font-medium">{t("reference")}</th>
                  <th className="text-start py-3 px-2 font-medium">{t("guest")}</th>
                  <th className="text-start py-3 px-2 font-medium">{t("property")}</th>
                  <th className="text-start py-3 px-2 font-medium">{t("status")}</th>
                  <th className="text-start py-3 px-2 font-medium">{t("total")}</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{booking.reference}</td>
                    <td className="py-3 px-2">{booking.guestName}</td>
                    <td className="py-3 px-2 text-gray-600">{booking.propertyName}</td>
                    <td className="py-3 px-2">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "success"
                            : booking.status === "pending"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {t(booking.status as "confirmed" | "pending" | "cancelled")}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 font-medium">{formatPrice(booking.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
