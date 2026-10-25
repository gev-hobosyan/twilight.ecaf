'use server'

import axios from "axios"
import type { Project } from "../dataTypes";

export const getProject = async (userID: string) => {
	try {
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000"}/project/user/${userID}`);

		if (res.status === 200) {
			return res.data as Project;
		}
	} catch (e) {
		console.log(e)
	}
}