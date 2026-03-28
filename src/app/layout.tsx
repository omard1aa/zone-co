import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zone Co - Premium Hotels & Chalets",
  description: "Discover exceptional hotels and chalets in Ain Sokhna, Red Sea coast, Egypt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
