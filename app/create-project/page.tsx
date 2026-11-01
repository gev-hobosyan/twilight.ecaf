'use client';

import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton"
import Input from "../components/Input"
import type { StripEmptyObjects } from "@neondatabase/auth/types";
import { authClient } from "@/lib/auth/client";
import Loader from "../components/decor/Loader";
import { useRouter } from "next/navigation";
import { createProject } from "./action";
import { useTranslations } from "next-intl";

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
	const [session, setSession] = useState<AuthType>();
	const [loading, setLoading] = useState(true);
	const [pending, setPending] = useState(false);
	const [status, setStatus] = useState({
		status: "none",
		message: ""
	});
	const router = useRouter();

	useEffect(() => {
		authClient.getSession().then(res => {
			if (res.data?.session) {
				setSession(res.data.session)
			}

			setLoading(false)
		})
	}, [])

	const t = useTranslations("CreateProject");

	return (
		<div className="w-screen h-screen center">
			{
				loading ?
					<Loader />
					: (
						<>
							<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit" action={
								async (formData) => {
									setPending(true);
									const res = await createProject(formData.get("name") as string, session?.userId);

									if (res?.error) {
										setStatus({
											status: "error",
											message: res.error
										})
									} else if (res?.message) {
										setStatus({
											status: "success",
											message: res.message
										})

										router.replace("/")
									}

									setPending(false);
							}}>
								<p className="font-main text-2xl mb-1">{t("create_project")}</p>
								<p className="text-sm">{t("create_your_project")}</p>
								<p className="mb-8 text-sm">{t("lock_in")}</p>

								<div className="flex flex-col gap-3 mb-10">
									<Input label={t("name")} type="text" id="name" placeholder={""} required={true} error={status.status == "error"} />
									<p className="text-xs text-red-600 text-center">
										{status.message}
									</p>
									<label className="text-xs text-center">{t("name_enough")}</label>
									<label className="text-xs text-center -mt-3">{t("rest")}</label>
								</div>

								{
									pending ? <Loader></Loader> :
									<PrimaryButton>
											<button className="w-full h-full cursor-pointer" type="submit">{t("create")}</button>
									</PrimaryButton>
								}
							</form>
						</>
					)
			}
		</div>
	)
}
