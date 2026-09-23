import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twilight",
  description: "Twilight by ECAF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="">{children}</body>
    </html>
  );
}
