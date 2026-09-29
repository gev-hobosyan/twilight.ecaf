interface Props {
	left?: string,
	right?: string,
	top?: string,
	bottom?: string
}

export default function Blur(
	{
		top,
		bottom,
		left,
		right
	} : Props
) {
	return (
		<div className="bg-midnight-purple w-100 h-100 rounded-full blur-[160px] absolute -z-50"
			style={{
				top,
				bottom,
				left,
				right
			}}>

		</div>
	)
}
