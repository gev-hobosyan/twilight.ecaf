import { ReactNode } from "react";

interface Props {
	children: ReactNode,
	className?: string,
}

export default function SecondaryButton({ children, className }: Props) {
	return (
		<div className={`center h-12 px-8 bg-light-dark/20 text-center rounded-[20px] border-light-purple border text-2xl font-bold transition-all cursor-pointer ${className}`}>{children}</div>
	);
}