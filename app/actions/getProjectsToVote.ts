'use server'

import axios, { AxiosError, isAxiosError } from "axios"
import type { APIError, Project } from "../dataTypes";

type Response = {
	type: "error" | "success",
	payload: unknown
}

export const getProjectsToVote = async (): Promise<Response> => {
	try {
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000"}/vote`);

		return {
			type: "success",
			payload: res.data as Project[],
		};
	} catch (e) {
		if (isAxiosError(e)) {
			if (e.response) {
				return {
					type: "error",
					payload: ((e as AxiosError).response?.data as APIError).message
				}
			}
			
			return {
				type: "error",
				payload: (e as AxiosError).message
			}
		}
	}

	return {
		type: "success",
		payload: ""
	}
}