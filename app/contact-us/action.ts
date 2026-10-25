'use server';

import { auth } from "@/lib/auth/server";
import axios, { AxiosError, isAxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect, RedirectType } from "next/navigation";
import { APIError } from "../dataTypes";

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

			const res = await axios.post(`${process.env.BACKEND_BASE_URL!}/support/anonymous`, {
				message: message,
				email: email,
				telegram: tg
			});

			if (res.status == 500) {
				return { error: res.request["message"] }
			}
	
			return { message: "Ticket created" }
		}
		
		const res = await axios.post(`${process.env.BACKEND_BASE_URL!}/support`, {
			message: message,
			user: session.user.id,
			telegram: formData.get('tg') as string
		});

		redirect('/', RedirectType.replace)
	} catch (e) {
		if (isRedirectError(e)) throw e

		if (isAxiosError(e)) {
			return { error: ((e as AxiosError).response?.data as APIError).message }
		}
		
		return { error: 'Failed to send the message' };
	}
}
