"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { bookings as initialBookings } from "@/data/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "confirmed" | "pending" | "cancelled";

export default function AdminBookingsPage() {
  const t = useTranslations("admin");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [bookingsList] = useState(initialBookings);

  const filtered =
    statusFilter === "all"
      ? bookingsList
      : bookingsList.filter((b) => b.status === statusFilter);

  const tabs: StatusFilter[] = ["all", "confirmed", "pending", "cancelled"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("bookings")}</h1>

      {/* Status Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={statusFilter === tab ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(tab)}
          >
            {t(tab as "all" | "confirmed" | "pending" | "cancelled")}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500">
                  <th className="text-start py-3 px-4 font-medium">{t("reference")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("guest")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("property")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("checkIn")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("checkOut")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("status")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("total")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs">{booking.reference}</td>
                    <td className="py-3 px-4">{booking.guestName}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-[200px] truncate">
                      {booking.propertyName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(new Date(booking.checkIn), "en")}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {formatDate(new Date(booking.checkOut), "en")}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4 font-medium">{formatPrice(booking.total)}</td>
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
