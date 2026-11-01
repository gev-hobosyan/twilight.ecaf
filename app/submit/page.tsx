'use client';

import { SetStateAction, useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton"
import Input from "../components/Input"
import type { StripEmptyObjects } from "@neondatabase/auth/types";
import { authClient } from "@/lib/auth/client";
import Loader from "../components/decor/Loader";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getProject } from "../actions/getProject";
import FileUpload from "../components/FileUpload";
import { submitProject } from "./action";

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

export default function CreateProject() {
	const [file, setFile] = useState<string[]>();

	const [projectId, setProjectId] = useState<number>();
	const [session, setSession] = useState<AuthType>();
	const [loading, setLoading] = useState(true);
	const [pending, setPending] = useState(false);
	const [status, setStatus] = useState({
		status: "none",
		message: ""
	});

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

	const t = useTranslations("Submit");

	if (!session || !projectId) {
		return <></>
	}

	const action = async (formData: FormData) => {
		setPending(true);

		if (!(formData.get("github") as string) && !file) {
			setPending(false);
			
			return setStatus({
				status: "error",
				message: "Github or file must be provided"
			})
		}

		const res = await submitProject(
			projectId,
			formData.get("description") as string,
			formData.get("story") as string,
			formData.get("useAI") as string == "on",
			formData.get("techStack") as string,
			formData.get("github") as string,
			formData.get("notes") as string);

		if (res?.error) {
			setStatus({
				status: "error",
				message: res.error
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
								<p className="font-main text-2xl mb-1">{t("submit_project")}</p>
								<p className="text-sm mb-6">{t("time")}</p>

								<div className="flex max-md:flex-col gap-3 mb-4 md:w-150 items-center overflow-y-scroll">
									<div className="flex flex-col gap-3 w-[50%]">
										<div className="flex flex-col">
											<label className="ml-2" htmlFor="description">{t("description")}</label>
											<label className="ml-2 text-sm" htmlFor="description">{t("tell_us")}</label>
											<textarea id="description" name="description" className={`w-fit h-fit min-w-full min-h-30 px-4 py-3 border-0 rounded-2xl text-base font-bold resize-none overflow-y-scroll ${status.status == "error" ? "shadow-error" : "shadow-inset"}`} required={true} />
										</div>
										<div className="flex flex-col">
											<label className="ml-2" htmlFor="story">{t("story")}</label>
											<label className="ml-2 text-sm" htmlFor="story">{t("story_more")}</label>
											<textarea id="story" name="story" className={`w-fit h-fit min-w-full min-h-30 px-4 py-3 border-0 rounded-2xl text-base font-bold resize-none overflow-y-scroll ${status.status == "error" ? "shadow-error" : "shadow-inset"}`} required={true} />
										</div>
									</div>
									<div className="flex flex-col gap-3 w-[50%]">
										<Input label={t("github")} type="text" id="github" placeholder={""} required={false} error={status.status == "error"} />
										<Input label={t("tech_stack")} type="text" id="techStack" placeholder={""} required={true} error={status.status == "error"} />
										<div className="flex flex-col">
											<label className="ml-2" htmlFor="notes">{t("notes")}</label>
											<label className="ml-2 text-sm" htmlFor="notes">{t("notes_more")}</label>
											<textarea id="notes" name="notes" className={`w-fit h-fit min-w-full min-h-30 px-4 py-3 border-0 rounded-2xl text-base font-bold resize-none overflow-y-scroll ${status.status == "error" ? "shadow-error" : "shadow-inset"}`} required={true} />
										</div>
										<div className="flex gap-2">
											<label className="ml-2 text-lg" htmlFor="useAI">{t("useAI")}</label>
											<input type="checkbox" id="useAI" name="useAI" className="border border-purple bg-black/30 rounded-xs focus:ring focus:ring-violet w-4 h-4 my-auto" />
										</div>
									</div>
								</div>

								<div className="w-full">
									<FileUpload session={session} file={file} setFile={setFile} error={status.status == "error"} projectId={projectId} />
								</div>

								<p className="text-xs text-center text-red-500 mt-2 mb-5">{status.message}</p>

								{
									pending ? <Loader></Loader> :
									<PrimaryButton>
											<button className="w-full h-full cursor-pointer" type="submit">{t("submit")}</button>
									</PrimaryButton>
								}
							</form>
						</>
					)
			}
		</div>
	)
}
