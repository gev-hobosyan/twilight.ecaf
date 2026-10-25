'use server'

import axios from "axios"
import type { Team } from "../dataTypes";

export const vote = async (votes: number[]) => {
	try {
		const res = await axios.post(`${process.env.BACKEND_BASE_URL || "http://localhost:3000"}/vote`, {
			votes: votes
		});

		if (res.status === 200) {
			return res.data as Team;
		}
	} catch (e) {
		console.log(e)
	}
}