'use server'

export default async function getAdminKey() {
	const apiKey = process.env.ADMIN_API_KEY;

	return apiKey
}