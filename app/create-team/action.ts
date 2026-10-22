'use server';

import axios, { AxiosError, isAxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { APIError } from "../dataTypes";

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

		redirect("/", "replace")
	} catch (e) {
		if (isRedirectError(e)) throw e

		if (isAxiosError(e)) {
			return { error: ((e as AxiosError).response?.data as APIError).message }
		}
		
		return { error: 'Failed to send the message' };
	}
}
