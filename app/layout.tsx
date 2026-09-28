import type { Metadata } from "next";
import "./globals.css";
import { Audiowide, Ubuntu_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";

const audiowide = Audiowide({
	subsets: ["latin"],
	weight: "400",
	style: "normal",
	variable: "--font-audiowide"
});

const ubuntMono = Ubuntu_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal", "italic"],
	variable: "--font-ubuntu-mono",
})

const davel = localFont({
	src: "./assets/fonts/davel-aghvor.otf",
	variable: "--font-davel",
})

export const metadata: Metadata = {
  	title: "Twilight",
	description: "Twilight by ECAF",
  	icons: "icon.svg"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const locale = await getLocale();
	
  return (
   <html
      lang={locale}
      className={`${locale == "en" ? ubuntMono.className : davel.className} h-full antialiased ${ubuntMono.variable} ${audiowide.variable} ${davel.variable}`}
   >
   	<body className="overflow-x-hidden">
    		<NextIntlClientProvider>{children}</NextIntlClientProvider>
   	</body>
   </html>
  );
}
