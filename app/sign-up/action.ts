'use server';

import { auth } from "@/lib/auth/server";
import { redirect, RedirectType } from "next/navigation";

export async function signUpWithEmail(
	_prevState: { error: string } | null,
	formData: FormData
) {
	const email = formData.get('email') as string;

	console.log(email)
	
	if (!email) {
		return { error: "Email address must be provided." };
	}

	const { error } = await auth.signUp.email({
		email,
		name: formData.get('full_name') as string,
		password: formData.get('password') as string
	});

	if (error) {
		return { error: error.message || 'Failed to create an account' }
	}

	console.log(error)

	redirect('/', RedirectType.replace)
}
