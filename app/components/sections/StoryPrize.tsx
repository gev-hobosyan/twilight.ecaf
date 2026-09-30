import certificates from "@/public/certificates.svg"
import Image from "next/image"
import Blur from "../decor/Blur"
import Sparkle from "../decor/Sparkle"

export default function StoryPrize() {
	return (
		<div className="w-screen h-screen relative grid grid-cols-2 grid-rows-2">
			<Blur top="3%" />
			<Blur bottom="3%" right="-10%"/>
			<Blur bottom="35%" right="35%" />

			<Sparkle variant="single" top="50%" left="50%" className="-translate-1/2"/>
			<Sparkle variant="double" top="10%" left="3%" rotate="20deg"/>
			<Sparkle variant="double_2" bottom="1%" left="2%" className="scale-50"/>
			<Sparkle variant="single" top="2%" right="4%" rotate="-20deg"/>
			
			<div className="center flex-col gap-10">
				<p className="text-2xl font-main">What is a Story Card?</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{"A story card is just a form you'll fill out when submitting your project. It includes the name of your project, your names, a short description, and what you used to build it. And most importantly it includes the story of how you're project came to life, hence the name. Also you can pass some notes to us through it."}</p>
			</div>
			
			<div className="center flex-col gap-10">
				<p className="text-2xl font-main">What do we get for participating?</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{"Every participant will get a certificate signed by the head of department. But also you gain experience, get to show your skill, and maybe gain new connections. And most importantly you surely will have a lot of fun when it's time to submit the project but nothing is working. ◝(ᵔᗜᵔ)◜"}</p>
			</div>

			<div className="center flex-col gap-10">
				<p className="text-2xl font-main">What do we get if we win?</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{"You also get a certificate, but this time for wining. Recognition from fellow students and the jury. Also we have a special prize prepared for you by our beloved head of department. But that's a secret for now. (•ᴗ-)"}</p>
			</div>
			
			<div className="center">
				<Image src={certificates} alt="certificates" className="w-150"/>
			</div>
		</div>
	)
}