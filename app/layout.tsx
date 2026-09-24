import type { Metadata } from "next";
import "./globals.css";
import { Audiowide, Ubuntu_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

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
      className={`${ubuntMono.className} h-full antialiased ${ubuntMono.variable} ${audiowide.variable}`}
   >
   	<body className="">
    		<NextIntlClientProvider>{children}</NextIntlClientProvider>
   	</body>
   </html>
  );
}
