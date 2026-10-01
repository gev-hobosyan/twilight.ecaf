"use client";

import { Locale, useLocale } from "next-intl";
import Image from "next/image";
import lang from "@/public/lang.svg";

interface Props {
	changeLocaleAction: (locale: Locale) => Promise<void>
}

export default function LangSwitch({ changeLocaleAction }: Props) {
	const locale = useLocale();
	
	return (
		<div className="flex gap-2 -z-20">
			<Image src={lang} alt="en" className="w-8 h-8" onClick={() => changeLocaleAction(locale == "am" ? "en" : "am")}></Image>
		</div>
	)
}
