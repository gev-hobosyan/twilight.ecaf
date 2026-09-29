import nune from "@/public/nune.png"
import Image from "next/image"
import Blur from "../decor/Blur"
import blackhole from "@/public/blackhole.jpg"

export default function AboutUs() {
	return (
		<div className="w-screen h-screen grid grid-cols-2 grid-rows-8 sticky top-0">
			<Blur top="2%"></Blur>
			<Blur top="-2%" right="1%"></Blur>
			<Blur bottom="-2%" left="30%"></Blur>
			
			<div className="col-span-2 text-center">
				<p className="mt-6 text-2xl font-main">{"Let's get to know each other"}</p>
				<p className="mt-2 text-md font-bold italic">{"Twilight is organized by students just like you"}</p>
			</div>
			<div className="row-span-1 col-span-2"></div>
			
			<div className="row-span-6">
				<p className="font-main text-center text-xl mt">Gevorg</p>

				<p>Hi there!:)</p>
				<p>{"I'm a developer in"}</p>
				<Image className="w-100 rounded-full aspect-square object-cover object-center" src={blackhole} alt="black hole"/>
			</div>
			<div className="row-span-6">
				<p className="font-main text-center text-xl">Levon</p>
				
				{/*<Image src={nune} alt="nune" className="w-100"></Image>*/}
			</div>
		</div>
	)
}