import { auth } from "@/lib/auth/server";
import HeroSection from "./components/HeroSection";
import SignOut from "./components/SignOut";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const { data: session } = await auth.getSession();

	if (session?.user) {
		return (
			<><SignOut /></>
		)
	}

	return (
	  <HeroSection />
	);
}
