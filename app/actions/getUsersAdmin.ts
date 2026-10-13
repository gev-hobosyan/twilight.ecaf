'use server'

import axios from "axios"
import { Team, User } from "../dataTypes";

export const getUsersAdmin = async (role: string | null | undefined) => {
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
		
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000/"}admin/users`, {
			headers: {
				"x-api-key": apiKey
			}
		});

		if (res.status === 200) {
			return {
				type: "success",
				data: res.data as User[]
			};
		} else {
			
		}
	} catch (e) {
		console.log(e)
	}
}