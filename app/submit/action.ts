'use server';

import axios, { AxiosError, isAxiosError } from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { APIError } from "../dataTypes";

export type Response =
  | { error: string; message?: never }
  | { message: string; error?: never }
  | null;

export async function submitProject(
	projectId: number,
	description: string,
	story: string,
	useAI: boolean,
	techStack: string,
	github?: string,
	notes?: string,
): Promise<Response> {
	try {
		const res = await axios.patch(`${process.env.BACKEND_BASE_URL!}/project/${projectId}`, {
			description,
			story,
			useAI,
			techStack,
			notes,
			github,
			submitted: true
		}).then(() => redirect("/", "replace"));

		return { message: "Success" }
	} catch (e) {
		if (isRedirectError(e)) throw e

		if (isAxiosError(e)) {
			return { error: ((e as AxiosError).response?.data as APIError).message }
		}
		
		return { error: 'Failed to send the message' };
	}
}
