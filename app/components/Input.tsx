import { HTMLInputTypeAttribute } from "react"

interface Props {
	id: string,
	type?: HTMLInputTypeAttribute,
	label: string,
	placeholder: string,
	className?: string
}

export default function Input({ id, type = "text", label, placeholder, className }: Props) {
	return (
		<div className="flex flex-col">
			<label className="ml-2" htmlFor={id}>{label}</label>
			<input type={type} className={`h-12 px-4 border-0 rounded-full shadow-inset text-base font-bold ${className}`} size={32} id={id} name={id}>
				
			</input>
		</div>
	)
}