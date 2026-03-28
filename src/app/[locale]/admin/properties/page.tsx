"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { properties as initialProperties } from "@/data/properties";
import { getLocalizedProperty } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Star, Plus } from "lucide-react";

export default function AdminPropertiesPage() {
  const t = useTranslations("admin");
  const locale = useLocale();
  const [propertyList] = useState(initialProperties);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("properties")}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addProperty")}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500">
                  <th className="text-start py-3 px-4 font-medium">{t("name")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("type")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("location")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("price")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("rating")}</th>
                  <th className="text-start py-3 px-4 font-medium">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {propertyList.map((property) => {
                  const localized = getLocalizedProperty(property, locale);
                  return (
                    <tr key={property.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{localized.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant={property.type === "hotel" ? "default" : "gold"}>
                          {property.type === "hotel"
                            ? locale === "ar" ? "فندق" : "Hotel"
                            : locale === "ar" ? "شاليه" : "Chalet"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{localized.city}</td>
                      <td className="py-3 px-4">{formatPrice(property.price)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                          {property.rating}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            {t("edit")}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            {t("delete")}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
