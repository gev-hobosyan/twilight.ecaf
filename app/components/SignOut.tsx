import { auth } from "@/lib/auth/server";
import PrimaryButton from "./PrimaryButton";
import { redirect } from "next/navigation";

export default function SignOut() {
	const signOut = async () => {
		'use server';
		const { error } = await auth.signOut();

		redirect("/");
	}

	return (
		<form action={signOut}>
			<PrimaryButton>
				<button type="submit">
					Sign out
				</button>
			</PrimaryButton>
		</form>
	)
}
