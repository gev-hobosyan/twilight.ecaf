import { auth } from "@/lib/auth/server";
import HeroSection from "./components/sections/HeroSection";
import coming_soon from "@/public/coming_soon.svg"
import SignOut from "./components/buttons/SignOut";
import Image from "next/image";
import { redirect } from "next/navigation";
import Rules from "./components/sections/Rules";
import StoryPrize from "./components/sections/StoryPrize";
import FAQSection from "./components/sections/FAQSection";
import Dashboard from "./dashboard/Dashboard";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const { data: session } = await auth.getSession();

	const signOut = async () => {
		'use server';
		const { error } = await auth.signOut();

		redirect("/");
	}

	if (session?.user) {
		return (
			<>
				<Dashboard />
				
				{/*<form action={signOut}>
					<button type="submit">
						<div className="center w-screen h-screen">
							<Image src={coming_soon} alt="coming soon" />
						</div>
					</button>
				</form>*/}
				{/*<SignOut />*/}
			</>
		)
	}

	return (
		<>
			<HeroSection />

			<Rules />

			<StoryPrize />

			<FAQSection />
			{/*<AboutUs />*/}
		</>
	);
}
