import { auth } from "@/lib/auth/server";
import PrimaryButton from "./PrimaryButton";
import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function SignOut() {
	const signOut = async () => {
		'use server';
		const { error } = await auth.signOut();

		revalidatePath("/")
		redirect("/", RedirectType.replace);
	}

	return (
		<form action={signOut}>
			<button type="submit">
				<PrimaryButton>
					Sign out
				</PrimaryButton>
			</button>
		</form>
	)
}
