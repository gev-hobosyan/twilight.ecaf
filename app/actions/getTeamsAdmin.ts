'use server'

import axios from "axios"
import type { Team } from "../dataTypes";

export const getTeamsAdmin = async (role: string | null | undefined) => {
	try {
		if (role !== "admin") {
			return { 
				type: "error",
				data: "ACCESS DENIED"
			}
		}
		
		const apiKey = process.env.ADMIN_API_KEY;
		
		if (apiKey === undefined) {
			return {
				type: "error",
				data: "ACCESS DENIED"
			}
		}
		
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000"}/admin/teams`, {
			headers: {
				"x-api-key": apiKey
			}
		});

		if (res.status === 200) {
			return {
				type: "success",
				data: res.data as Team[]
			};
		} else {
			
		}
	} catch (e) {
		console.log(e)
	}
}