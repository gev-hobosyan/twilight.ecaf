"use client";

import { Locale } from "next-intl";

interface Props {
	changeLocaleAction: (locale: Locale) => Promise<void>
}

export default function LangSwitch({ changeLocaleAction }: Props) {
	return (
		<div className="flex gap-2">
			{["en", "am"].map((current) => (
				<button key={current} onClick={() => changeLocaleAction(current as Locale)}>
					{current}
				</button>
			))}
		</div>
	)
}
