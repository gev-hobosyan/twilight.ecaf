import type { Metadata } from "next";
import "./globals.css";
import { Audiowide, Ubuntu_Mono } from "next/font/google";

const audiowide = Audiowide({
	weight: "400",
	style: "normal",
	variable: "--font-audiowide"
});

const ubuntMono = Ubuntu_Mono({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	variable: "--font-ubuntu-mono"
})

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
      className={`${ubuntMono.className} h-full antialiased ${ubuntMono.variable} ${audiowide.variable}`}
    >
      <body className="">{children}</body>
    </html>
  );
}
