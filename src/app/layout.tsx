import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zone Co - Premium Hotels & Chalets",
  description: "Discover exceptional hotels and chalets across Saudi Arabia and the Gulf region.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
