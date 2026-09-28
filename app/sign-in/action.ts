'use server';

import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function signInWithEmail(
	_prevState: { error: string } | null,
	formData: FormData
) {
	const email = formData.get('email') as string;
	
	if (!email) {
		return { error: "Email address must be provided." };
	}

	const { error } = await auth.signIn.email({
		email,
		password: formData.get('password') as string
	});

	if (error) {
		return { error: error.message || 'Failed to create an account' }
	}

	redirect('/')
}
