'use server';

import axios from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export type Response =
  | { error: string; message?: never }
  | { message: string; error?: never }
  | null;

export async function createTeam(
	name: string,
	members: string[]
): Promise<Response> {
	if (members.length < 2 || members.length > 3) {
		return { error: "There must be 2 or 3 members, including you." };
	}

	try {
		const res = await axios.post(`${process.env.BACKEND_BASE_URL!}team`, {
			name,
			members
		});
		
		if (res.status == 500) {
			return { error: res.request["message"] }
		} else if (res.status == 201) {
			return { message: "Team created" }
		}

		redirect("/", "replace")
		
		return { message: "" }
	} catch (e) {
		if (isRedirectError(e)) throw e
		return { error: 'Failed to send the message' };
	}
}
