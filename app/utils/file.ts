'use server'
import { Files } from "files-sdk"
import { neon } from "files-sdk/neon"

const bucket = "progress"
const files = new Files({
	adapter: neon({
		bucket,
		endpoint: process.env.AWS_ENDPOINT_URL_S3!,
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		region: process.env.AWS_REGION!
	}),
})

export default async function uploadFile(key: string, file: File): Promise<string> {
	await files.upload(key, file, { contentType: "text/plain" })

	const url = await files.url(key)

	return url
}
