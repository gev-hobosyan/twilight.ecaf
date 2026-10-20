'use server';

import axios from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export type Response =
  | { error: string; message?: never }
  | { message: string; error?: never }
  | null;

export async function registerProgress(
	description: string,
	image: string,
	projectId: string,
	date: string
): Promise<Response> {
	try {
		const res = await axios.post(`${process.env.BACKEND_BASE_URL!}progress`, {
			description,
			image,
			projectId,
			date
		});

		if (res.status == 500) {
			return { error: res.request["message"] }
		} else if (res.status == 201) {
			return { message: "Progress saved" }
		}

		redirect("/", "replace")
		
		return { message: "" }
	} catch (e) {
		if (isRedirectError(e)) throw e
		console.log(e)
		return { error: 'Failed to send the message' };
	}
}
