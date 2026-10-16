'use client'

import { useEffect, useMemo, useState } from "react";

interface Props {
	date?: string,
	text?: string
}

export default function TimeLeft({ date = "October 18, 2026 18:00:00", text = "Until theme reveal"  }: Props) {
	const [difference, setDifference] = useState(0);

	const theme_release = useMemo(() => new Date(date), [date]);

	const minutes = useMemo(() => Math.floor(difference / 60000), [difference]);
  	const hours = useMemo(() => Math.floor(minutes / 60), [minutes]);
	const days = useMemo(() => Math.floor(hours / 24), [hours]);

	useEffect(() => {
		const date = new Date();
		
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDifference(theme_release - date)
		
		const id = setInterval(() => {
			const date = new Date();
			
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			setDifference(theme_release - date)
		}, 5000)

		
		return () => clearInterval(id)
	}, [])


	return (
		<>
			<p className="font-main text-2xl mt mt-auto">{days < 10 ? `0${days}` : days}:{hours % 24 < 10 ? `0${hours % 24}`: hours % 24}:{minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}</p>
			<p className="mb-auto">{text}</p>
		</>
	)
}
