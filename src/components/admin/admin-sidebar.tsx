"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LayoutDashboard, Building2, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/admin/properties", label: t("properties"), icon: Building2 },
    { href: "/admin/bookings", label: t("bookings"), icon: CalendarCheck },
  ];

  return (
    <aside className="w-64 shrink-0 border-e border-gray-200 bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
          {t("title")}
        </h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
