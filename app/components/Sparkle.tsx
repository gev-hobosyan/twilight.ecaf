import sparkle_single from "@/public/sparkle/sparke_single.svg"
import sparkle_double from "@/public/sparkle/sparkle_double.svg"
import sparkle_double_2 from "@/public/sparkle/sparkle_double_2.svg"
import Image from "next/image"

const variants = {
	double: sparkle_double,
	single: sparkle_single,
	double_2: sparkle_double_2
}

interface Props {
	variant: "double" | "single" | "double_2",
	top?: number,
	bottom?: number,
	left?: number,
	right?: number,
	rotate?: string
}

export default function Sparkle({
	variant,
	top,
	bottom,
	left,
	right,
	rotate
}: Props) {
	return (
		<Image src={variants[variant]} alt="sparkle"
			style={{
				position: "absolute",
				top: top,
				bottom: bottom,
				left: left,
				right: right,
				rotate: rotate
			}} />
	)
}