interface Props {
	children: string,
	className?: string
}

export default function PrimaryButton({ children, className }: Props) {
	return (
		<div className={`center h-12 px-8 bg-black/80 text-center rounded-[20px] shadow-inset max-md:text-[18px] md:text-2xl font-bold transition-all hover:-translate-y-2 cursor-pointer ${className}`}>{children}</div>
	);
}
