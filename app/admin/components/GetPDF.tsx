'use client'

import getAdminKey from "@/app/actions/getAdminKey"
import PrimaryButton from "@/app/components/buttons/PrimaryButton"
import LoaderSmall from "@/app/components/decor/LoaderSmall"
import axios from "axios"
import { saveAs } from "file-saver"
import { useState } from "react"

export default function GetPDF() {
	const [isDownloading, setIsDownloading] = useState(false)

	const handler = async () => {
		setIsDownloading(true)

		try {
			const apiKey = await getAdminKey();

			console.log(apiKey)
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL!}/admin/pdf`, {
				responseType: "blob",
				headers: { "Accept": "application/pdf", "x-api-key": apiKey }
			})

			console.log(res)
			
			const blob = new Blob([res.data], { type: "application/pdf" })

			saveAs(blob, "admin.pdf")
		} catch (e) {
			console.log(e)
		} finally {
			setIsDownloading(false)
		}
	}
	
	return (
		<button onClick={handler}>
			<PrimaryButton>
				{ isDownloading ? <LoaderSmall /> : "PDF" }
			</PrimaryButton>
		</button>
	)
}