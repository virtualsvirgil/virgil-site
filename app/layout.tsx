import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRGIL — Every launch. Graded.",
  description:
    "VIRGIL measures the on-chain configuration of every launch on the Virtuals Unicorn launchpad against one calibrated, public, deterministic rubric. Opinions, not financial advice.",
  metadataBase: new URL("https://www.virgilwatch.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "VIRGIL — Every launch. Graded.",
    description:
      "A fixed instrument for an unfixed market. Every Virtuals launch, measured against one calibrated rubric.",
    type: "website",
    url: "https://www.virgilwatch.com",
    siteName: "VIRGIL",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIRGIL — Every launch. Graded.",
    description:
      "A fixed instrument for an unfixed market. Every Virtuals launch, measured against one calibrated rubric.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
