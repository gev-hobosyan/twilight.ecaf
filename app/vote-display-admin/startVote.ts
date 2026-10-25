'use server'

import axios from "axios"
import type { User } from "../dataTypes";

export const startVote = async () => {
	try {
		const apiKey = process.env.ADMIN_API_KEY;
		
		if (apiKey === undefined) {
			return {
				type: "error",
				data: "ACCESS DENIED"
			}
		}
		
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000"}/vote/start`, {
			headers: {
				"x-api-key": apiKey
			}
		});

		if (res.status === 200) {
			return {
				type: "success",
				data: res.data as User[]
			};
		}
	} catch (e) {
		console.log(e)
	}
}