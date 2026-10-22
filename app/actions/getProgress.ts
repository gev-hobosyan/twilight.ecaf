'use server'

import axios from "axios"
import type { Progress } from "../dataTypes";

export const getProgress = async (projectId: number) => {
	try {
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000/"}progress/project/${projectId}`);

		if (res.status === 200) {
			return res.data as Progress[];
		}
	} catch (e) {
		console.log(e)
	}
}