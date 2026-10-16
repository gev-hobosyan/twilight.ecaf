import type { Metadata } from "next";
import "./globals.css";
import { Audiowide, Ubuntu_Mono } from "next/font/google";
import { Locale, NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";
import LangSwitch from "./components/buttons/LangSwitch";
import { cookies } from "next/headers";

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

	async function changeLocaleAction(locale: Locale) {
		"use server";
		const store = await cookies();
		store.set("locale", locale)
	}
	
  return (
   <html
      lang={locale}
      className={`${locale == "en" ? ubuntMono.className : davel.className} h-full antialiased ${ubuntMono.variable} ${audiowide.variable} ${davel.variable}`}
   >
		  <body className="overflow-x-hidden max-w-screen">
			  <NextIntlClientProvider>
					<div className="fixed left-2 top-1 z-50">
						<LangSwitch changeLocaleAction={changeLocaleAction} />
					</div>
					{children}
			  </NextIntlClientProvider>
   	</body>
   </html>
  );
}
