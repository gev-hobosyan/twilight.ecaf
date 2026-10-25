/* eslint-disable @next/next/no-img-element */
import { auth } from "@/lib/auth/server"
import Blur from "../components/decor/Blur";
import Sparkle from "../components/decor/Sparkle";
import solo from "@/public/solo.svg"
import user_icon from "@/public/user_icon.svg"
import Image from "next/image";
import { connection } from "next/server";
import { getTeam } from "../actions/getTeam";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Link from "next/link";
import TimeLeft from "../components/decor/TimeLeft";
import { getProject } from "../actions/getProject";
import { getTranslations } from "next-intl/server";
import TheTheme from "../components/decor/TheTheme";
import { getProgress } from "../actions/getProgress";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
	const { data: session } = await auth.getSession();

	if (session == null) {
		return <></>;
	}

	const team = await getTeam(session.user.id);
	const project = await getProject(session.user.id);
	const progresses = await getProgress(project?.id || 0);

	const t = await getTranslations('Dashboard');
	
	await connection();
	const date = new Date();
	
	return (
		<div className="w-screen h-screen flex flex-col max-lg:gap-10 lg:grid lg:grid-cols-5 lg:grid-rows-5 relative overflow-x-hidden lg:overflow-hidden max-lg:py-15">
			<Blur top="10%" left="2%"></Blur>
			<Blur bottom="-8%" right="-10%"></Blur>

			<Sparkle variant="double" top="5%" left="4%" className="scale-80" rotate="-15deg" />
			<Sparkle variant="single" top="5%" right="5%" className="scale-90" rotate="13deg" />

			<div className="row-span-1 col-span-5 center font-main text-4xl text-purple text-center flex-col max-lg:bg-black/40 max-lg:backdrop-blur-md">
				{t("welcome")}<span className="text-light-purple">{session.user.name.split(" ")[0]}</span>
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-2xl text-purple">{t("team")}</p>
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
							<p className="font-mono font-bold text-[18px] mt-3">{t("solo")}</p>
							<div className="center flex-col gap-0.5">
								<p className="font-mono font-bold text-sm">
									{t("create")}
								</p>
								<Link href="/create-team">
									<p className="font-mono font-bold text-2xl cursor-pointer transition-all hover:scale-130 duration-200">+</p>
								</Link>
							</div>
						</div>
					)
				}
			</div>

			<div className="row-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">{t("theme")}</p>
				<TheTheme></TheTheme>
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-2xl text-purple">{t("project")}</p>
				<div className="m-auto text-center max-w-70">
					{
						project ? (
							<div className="h-full w-full">
								<p className="font-main">{project.name}</p>
								<div className="my-5">
									<TimeLeft date="November 1, 2026 20:00:00" text={t("ends")} />
								</div>
								<Link href="/">
									<PrimaryButton>{t("submit")}</PrimaryButton>
								</Link>
							</div>
						) : (
							<>
								<p>{t("time_has_come")}</p>
								<p>{t("start")}</p>
								<Link href={"/create-project"}>
									<PrimaryButton className="mt-4">
										{t("create_btn")}
									</PrimaryButton>
								</Link>
							</>
						)
					}
				</div>
			</div>

			<div className="row-span-2 col-span-3 w-[90%] lg:w-[96%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">{t("progress")}</p>
				{
					date.getDate() <= 17 ? (
						<div className="m-auto text-center max-w-70">
							<p className="font-main">{t("progress_available")}</p>
						</div>
					) : project ? (
						<div className="w-full h-full flex overflow-y-hidden overflow-x-scroll items-center justify-start px-10 gap-4">
							<Link href="/register-progress" className="w-40 border-dashed border border-purple h-[90%] rounded-2xl center group cursor-pointer flex-col text-center text-sm px-3">
									<p className="group-hover:scale-130 transition-all duration-200 text-4xl">+</p>
									<p>Tell as what you made today</p>
							</Link>

							{progresses?.map((progress) => (
								<div className="w-40 border-2 border-purple h-[90%] rounded-2xl group cursor-pointer text-center text-sm px-3" key={progress.id}>
									<p className="mt-2">{progress.date.split("-").join(".")}</p>
									<img src={progress.image} alt="image" className={`w-full rounded-2xl transition-all`} />
									<p className="progress-description w-full mt-4">{progress.description}</p>
								</div>
							))}
						</div>
					) : (
						<p className="font-main">Please create a project to track the progress</p>
					)
				}
			</div>

			<div className="row-span-2 col-span-2 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center justify-between py-4">
				<p className="font-main text-2xl text-purple">{t("contact_devs")}</p>
				<div className="m-auto">
					<p className="font-main mb-5">{t("ask")}</p>

					<Link href="/contact-us">
						<PrimaryButton>{t("contact")}</PrimaryButton>
					</Link>
				</div>
			</div>
		</div>
	)
}
