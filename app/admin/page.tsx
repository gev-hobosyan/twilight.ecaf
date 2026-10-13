import { auth } from "@/lib/auth/server";
import Sparkle from "../components/decor/Sparkle";
import Blur from "../components/decor/Blur";
import { getUsersAdmin } from "../actions/getUsersAdmin";
import { Team, User } from "../dataTypes";
import { getTeamsAdmin } from "../actions/getTeamsAdmin";
import { connection } from "next/server";
import { redirect, RedirectType } from "next/navigation";
import TimeLeft from "../components/decor/TimeLeft";

export const dynamic = 'force-dynamic';

export default async function Admin() {
	const { data: session } = await auth.getSession();

	if (session == null) {
		return <></>
	}

	if (session.user?.role !== "admin") {
		return redirect("/", RedirectType.replace)
	}

	const users = await getUsersAdmin(session.user?.role);
	const teams = await getTeamsAdmin(session.user?.role);

	await connection();
	const date = new Date();

	const theme_release = new Date("October 18, 2026 18:00:00");

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const difference = theme_release - date

	const minutes = Math.floor(difference / 60000);
  	const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);

	return (
		<div className="w-screen h-screen flex flex-col max-lg:gap-10 lg:grid lg:grid-cols-5 lg:grid-rows-7 lg:gap-2 relative overflow-x-hidden lg:overflow-hidden max-lg:py-15">
			<Blur top="10%" left="2%"></Blur>
			<Blur bottom="-8%" right="-10%"></Blur>

			<Sparkle variant="double" top="5%" left="4%" className="scale-80" rotate="-15deg" />
			<Sparkle variant="single" top="5%" right="5%" className="scale-90" rotate="13deg" />

			<div className="row-span-1 col-span-5 center font-main text-4xl text-purple text-center flex-col max-lg:bg-black/40 max-lg:backdrop-blur-md">
				Welcome back<span className="text-light-purple">{session.user.name.split(" ")[0]}</span>
			</div>

			<div className="row-span-6 col-span-2 w-[90%] h-[98%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">Participants</p>
				<div className="flex flex-col items-center w-[90%] h-full mt-5 gap-4 overflow-x-hidden overflow-y-scroll no-scrollbar">
					{
						users && users.type == "success" && (users.data as User[]).map(user => (
							<div key={user.id} className="w-full bg-black/40 rounded-4xl px-5 py-3 shadow-inset">
								<p>{user.name}</p>
							</div>
						))
					}
				</div>
			</div>

			<div className="row-span-1 col-span-1 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">Participants</p>
				<p className="font-main text-3xl my-auto">{ users && users.type == "success" && (users.data as User[]).length }</p>
			</div>

			<div className="col-span-2 row-span-3 col-start-4 row-start-2 bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4 w-[95%] h-[98%]">
				<p className="font-main text-xl text-purple">Projects</p>
				<p className="font-main text-3xl text-center text-violet-grad my-auto">{"Will be available once you release the theme"}</p>
			</div>

			<div className="row-span-1 col-span-1 col-start-3 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-4">
				<p className="font-main text-xl text-purple">Teams</p>
				<p className="font-main text-3xl my-auto">{ teams && teams.type == "success" && (teams.data as Team[]).length }</p>
			</div>

			<div className="row-span-1 col-span-1 col-start-3 w-[90%] h-[90%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-2">
				<p className="font-main text-xl text-purple">Time left</p>
				<TimeLeft />
			</div>

			<div className="row-span-3 col-start-3 col-span-3 w-[96.5%] h-[96%] bg-black/50 m-auto border border-purple rounded-2xl shadow-outside flex flex-col items-center py-2">
				<p className="font-main text-xl text-purple">Special Features</p>
			</div>

		</div>
	)
}
