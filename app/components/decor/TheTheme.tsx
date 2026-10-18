"use client"

import { useTranslations } from "next-intl";
import TimeLeft from "./TimeLeft";

export default function TheTheme() {
	const date = new Date();
	const t = useTranslations("Theme");

	return (
		<div className="my-auto w-full center flex-col">
			{
				(date.getDate() >= 18 && date.getHours() >= 18) 
					? (<>
						<p>{t("theme")}</p>
						<p className="max-w-40 text-center text-xs">{t("start")}</p>
					</>)
					: (<>
						<TimeLeft />
					</>)
			}
		</div>
	)
}
