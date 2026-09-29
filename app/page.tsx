import { auth } from "@/lib/auth/server";
import HeroSection from "./components/HeroSection";
import coming_soon from "@/public/coming_soon.svg"
import SignOut from "./components/SignOut";
import Image from "next/image";
import { redirect } from "next/navigation";
import AboutUs from "./components/AboutUs";
import Rules from "./components/Rules";

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
				{/*<form action={signOut}>
					<button type="submit">
						<div className="center w-screen h-screen">
							<Image src={coming_soon} alt="coming soon" />
						</div>
					</button>
				</form>*/}
				<SignOut />
			</>
		)
	}

	return (
		<>
			<HeroSection />

			<Rules />
			{/*<AboutUs />*/}
		</>
	);
}
