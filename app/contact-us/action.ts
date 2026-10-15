'use server';

import { auth } from "@/lib/auth/server";
import axios from "axios";
import { redirect, RedirectType } from "next/navigation";

export type FormState = 
  | { error: string; message?: never } 
  | { message: string; error?: never } 
  | null;

export async function contactUs(
	_prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const message = formData.get('message') as string;
	
	if (!message) {
		return { error: "Message must be provided." };
	}

	try {
		const { data: session } = await auth.getSession();
		if (session == null) {
			const tg = formData.get('tg') as string;
			const email = formData.get('email') as string;

			if (tg == null && email == null) {
				return { error: "Email or telegram are required" };	
			} 

			const res = await axios.post(`${process.env.BACKEND_BASE_URL!}support/anonymous`, {
				message: message,
				email: email,
				telegram: tg
			});

			if (res.status == 500) {
				return { error: res.request["message"] }
			}
	
			return { message: "Ticket created" }
		}
		
		const res = await axios.post(`${process.env.BACKEND_BASE_URL!}support`, {
			message: message,
			user: session.user.id,
			telegram: formData.get('tg') as string
		});


		if (res.status == 500) {
			return { error: res.request["message"] }
		}

		return { message: "Ticket created" }
	} catch (e) {
		return { error: 'Failed to send the message' };
	} finally {
		redirect('/', RedirectType.replace)
	}
}
