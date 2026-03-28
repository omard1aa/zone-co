import { useTranslations } from "next-intl";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                <span className="text-sm font-bold text-white">Z</span>
              </div>
              <span className="text-xl font-bold text-white">
                Zone <span className="text-primary-400">Co</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {nav("home")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {nav("properties")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {nav("about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {nav("contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("support")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t("helpCenter")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t("cancellation")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t("privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  {t("terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-400 shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                {t("email")}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-400 shrink-0" />
                {t("phone")}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
