import { auth } from "@/lib/auth/server"
import Blur from "../decor/Blur";
import Sparkle from "../decor/Sparkle";
import coming_soon from "@/public/coming_soon.svg"
import Image from "next/image";

export default async function Dashboard() {
	const { data: session } = await auth.getSession();

	if (session == null) {
		return <></>;
	}
	
	return (
		<div className="w-screen h-screen grid grid-cols-5 grid-rows-5 relative overflow-hidden">
			<Blur top="10%" left="2%"></Blur>
			<Blur bottom="-8%" right="-10%"></Blur>

			<Sparkle variant="double" top="5%" left="4%" className="scale-80" rotate="-15deg" />
			<Sparkle variant="single" top="5%" right="5%" className="scale-90" rotate="13deg" />
			
			<div className="row-span-1 col-span-5 center font-main text-4xl text-purple text-center flex-col">
				Welcome back<span className="text-light-purple">{session.user.name}</span>
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Team</p>
				<Image src={coming_soon} alt="coming_soon" className="scale-60" />
			</div>

			<div className="row-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">Useful information</p>
				<Image src={coming_soon} alt="coming_soon" className="scale-80 mt-10" />
			</div>
			
			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Project</p>
				<Image src={coming_soon} alt="coming_soon" className="scale-60" />
			</div>

			<div className="row-span-2 col-span-3 w-[96%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Your progress</p>
				<Image src={coming_soon} alt="coming_soon" className="scale-60" />
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Contact the devs</p>
				<Image src={coming_soon} alt="coming_soon" className="scale-60" />
			</div>
		</div>
	)
}
