import { ReactNode } from "react"

interface Props {
	children: ReactNode
}

export default function Rule({ children }: Props) {
	return (
		<>
			<div className="bg-light-dark w-[90%] rounded-2xl shadow-inset center px-4 py-3 text-center min-w-12">
				{children}
			</div>
		</>
	)
}