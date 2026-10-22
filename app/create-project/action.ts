'use server';

import axios, { AxiosError, isAxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { APIError } from "../dataTypes";

export type Response =
  | { error: string; message?: never }
  | { message: string; error?: never }
  | null;

export async function createProject(
	name: string,
	owner: string | undefined
): Promise<Response> {
	try {
		const res = await axios.post(`${process.env.BACKEND_BASE_URL!}project`, {
			name,
			description: "",
			story: "",
			useAI: false,
			techStack: "",
			owner
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
