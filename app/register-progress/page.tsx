'use client';

import { StripEmptyObjects } from "@neondatabase/auth/types";
import ImageUpload from "../components/ImageUpload";
import { useEffect, useState } from "react";
import Loader from "../components/decor/Loader";
import { authClient } from "@/lib/auth/client";
import { useTranslations } from "next-intl";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { getProject } from "../actions/getProject";
import { registerProgress } from "./action";

type AuthType = StripEmptyObjects<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
} & {} & {
    impersonatedBy?: string | null | undefined;
} & {} & {
    activeOrganizationId?: string | null | undefined;
}>

export default function AddProgress() {
	const [file, setFile] = useState<string>();

	const [session, setSession] = useState<AuthType>();
	const [loading, setLoading] = useState(true);
	const [pending, setPending] = useState(false);
	const [projectId, setProjectId] = useState<string>()
	const [status, setStatus] = useState({
		status: "none",
		message: ""
	});

	const t = useTranslations("RegisterProgress");

	const date = new Date();

	useEffect(() => {
		authClient.getSession().then(async (res) => {
			if (res.data?.session) {
				setSession(res.data.session)
				const project = await getProject(res.data.session.userId);
				if (project) {
					setProjectId(project.id)
				}
			}

			setLoading(false)
		})
	}, [])

	if (!session || !projectId) {
		return <></>
	}

	const action = async (formData: FormData) => {
		setPending(true);
		const month = date.getMonth() + 1;
		const dateString = `${date.getDate()}-${month < 10 ? "0" + month : month}-${date.getFullYear()}`

		if (file) {
			const res = await registerProgress(
				formData.get("description") as string,
				file,
				projectId,
				`${dateString}`
			);

			console.log(res)

			if (res?.message) {
				setStatus({
					status: "success",
					message: res.message
				})
			} else if (res?.error) {
				setStatus({
					status: "error",
					message: res.error
				})
			}
		} else {
			setStatus({
				status: "error",
				message: "File must be chosen"
			})
		}

		setPending(false);
	};

	return (
		<div className="w-screen h-screen center">
			{
				loading ?
					<Loader />
					: (
						<>
							<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit" action={action}>
								<p className="font-main text-2xl mb-1">{t("track")}</p>
								<p className="text-sm mb-8">{t("value")}</p>

								<div className="flex flex-col gap-3 mb-5">
									<div className="flex flex-col mb-3">
										<label className={`ml-2 ${status.status == "error" && "text-red-500"}`} htmlFor="description">{t("few_words")}</label>
										<textarea id="description" name="description" className={`h-fit min-w-full min-h-40 px-4 py-3 border-0 rounded-2xl text-base font-bold overflow-y-scroll resize-none ${status.status == "error" ? "shadow-error" : "shadow-inset"}`} required={true} />
									</div>
									<p className={`text-center -mb-3 ${status.status == "error" && "text-red-500"}`}>{t("image")}</p>
									<ImageUpload session={session!} file={file} setFile={setFile} error={ status.status == "error"} />

									<p className="text-xs text-center text-red-500">{status.message}</p>
								</div>


								{
									pending ? <Loader></Loader> :
									<PrimaryButton>
											<button className="w-full h-full cursor-pointer" type="submit">{t("send")}</button>
									</PrimaryButton>
								}
							</form>
						</>
					)
			}
		</div>
	)
}
