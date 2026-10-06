'use server'

import axios from "axios"
import { Team } from "../dataTypes";

export const getTeam = async (userID: string) => {
	try {
		const res = await axios.get(`${process.env.BACKEND_BASE_URL || "http://localhost:3000/"}team/user/${userID}`);

		if (res.status === 200) {
			return res.data as Team;
		} else {
			
		}
	} catch (e) {
		console.log(e)
	}
}