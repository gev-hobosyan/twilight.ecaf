import { auth } from "@/lib/auth/server"
import Blur from "../components/decor/Blur";
import Sparkle from "../components/decor/Sparkle";
import solo from "@/public/solo.svg"
import coming_soon from "@/public/coming_soon.svg"
import user_icon from "@/public/user_icon.svg"
import Image from "next/image";
import { connection } from "next/server";
import { getTeam } from "../actions/getTeam";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Link from "next/link";
import TimeLeft from "../components/decor/TimeLeft";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
	const { data: session } = await auth.getSession();

	if (session == null) {
		return <></>;
	}

	const team = await getTeam(session.user.id);

	await connection();
	const date = new Date();
	
	return (
		<div className="w-screen h-screen flex flex-col max-lg:gap-10 lg:grid lg:grid-cols-5 lg:grid-rows-5 relative overflow-x-hidden lg:overflow-hidden max-lg:py-15">
			<Blur top="10%" left="2%"></Blur>
			<Blur bottom="-8%" right="-10%"></Blur>

			<Sparkle variant="double" top="5%" left="4%" className="scale-80" rotate="-15deg" />
			<Sparkle variant="single" top="5%" right="5%" className="scale-90" rotate="13deg" />

			<div className="row-span-1 col-span-5 center font-main text-4xl text-purple text-center flex-col max-lg:bg-black/40 max-lg:backdrop-blur-md">
				Welcome back<span className="text-light-purple">{session.user.name.split(" ")[0]}</span>
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-2xl text-purple">Your Team</p>
				{
					team ? (
						<div className="text-center flex flex-col items-center h-full w-full mt-4">
							<p className="font-main text-xl text-light-purple">{team?.name}</p>

							<div className="m-auto flex items-center gap-5">
								{
									team?.members?.map((member) => (
										<div key={member.id} className="flex flex-col justify-center items-center">
											<Image src={user_icon} alt="user" className="w-18" />

											<p className="text-[1rem] font-mono font-bold max-w-18 text-center">{member.name.split(" ")[0]}</p>
										</div>
									))
								}
							</div>
						</div>
					)
					: (
						<div className="m-auto flex flex-col items-center justify-center">
							<Image src={solo} alt="solo" className="w-20 translate-x-1" />
							<p className="font-mono font-bold text-[18px]">{"Looks like you're a solo dev"}</p>

							{
								(date.getMonth() == 9 || date.getMonth() == 10) && date.getDate() < 18 &&
								<div className="center flex-col gap-0.5">
									<p className="font-mono font-bold text-sm">
										Or you can create a team
									</p>
									<Link href="/create-team">
										<p className="font-mono font-bold text-2xl cursor-pointer transition-all hover:scale-130 duration-200">+</p>
									</Link>
								</div>
							}
						</div>
					)
				}

				{/*<Image src={coming_soon} alt="coming_soon" className="scale-60" />*/}
			</div>

			<div className="row-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">The theme</p>
				<TimeLeft />
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-2xl text-purple">Project</p>
				<div className="m-auto text-center max-w-70">
					{
						date.getDate() > 17 ? (
							<p></p>
						): (
							<p className="font-main">Projects will be available after the theme is revealed</p>
						)
					}
				</div>
			</div>

			<div className="row-span-2 col-span-3 w-[90%] lg:w-[96%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Your progress</p>
				<div className="m-auto text-center max-w-70">
					{
						// date.getMonth() == 10 && date.getDate() > 17 ? (
						// 	<p></p>
						// ): (
						// 	<p className="font-main">Project progress will be available after the theme is revealed</p>
						// )
					}
				</div>
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">Contact the devs</p>
				<div className="m-auto">
					<p className="font-main mb-5">Ask us any questions here</p>

					<Link href="/contact-us">
						<PrimaryButton>Contact us</PrimaryButton>
					</Link>
				</div>
			</div>
		</div>
	)
}
