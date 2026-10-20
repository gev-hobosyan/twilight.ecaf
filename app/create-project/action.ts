'use server';

import axios from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

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

		console.log(res)

		if (res.status == 500) {
			return { error: res.request["message"] }
		} else if (res.status == 201) {
			return { message: "Project created" }
		}

		redirect("/", "replace")

		return { message: "" }
	} catch (e) {
		if (isRedirectError(e)) throw e
		return { error: 'Failed to send the message' };
	}
}
