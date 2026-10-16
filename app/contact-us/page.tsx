'use client'

import { useActionState, useEffect, useState } from "react";
import Input from "../components/Input";
import Loader from "../components/decor/Loader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { contactUs } from "./action";
import { authClient } from "@/lib/auth/client";
import { StripEmptyObjects } from "@neondatabase/auth/types";
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

export default function ContactUs() {
	const [state, formAction, isPending] = useActionState(contactUs, null);
	const [session, setSession] = useState<AuthType>();
	const [loading, setLoading] = useState(true);

	const t = useTranslations("ContactUs");

	useEffect(() => {
		authClient.getSession().then(res => {
			if (res.data?.session) {
				setSession(res.data.session)
			}

			setLoading(false)
		})
	}, [])

	return (
		<div className="w-screen h-screen center">
			{
				loading ?
					<Loader />
				: (
					<>
						<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit" action={formAction}>
							<p className="font-main text-2xl mb-1">{t("contact_us")}</p>
							<p className="text-sm">{t("have_questions")}</p>
							<p className="mb-8 text-sm">{t("feel_free")}</p>

							<div className="flex flex-col gap-3 mb-10">
								<Input label="Telegram" type="text" id="tg" placeholder={""} />
								{
									session !== undefined ? <label htmlFor="tg" className="ml-2 text-xs">{t("allow_us")}</label> : (
										<>
											<Input label={t("email")} type="text" id="email" placeholder=""/>
											<label htmlFor="tg" className="ml-2 text-xs">{t("email_or_tg")}</label>
										</>
									)
								}
								<div className="flex flex-col">
									<label className="ml-2" htmlFor="message">{t("message")}</label>
									<textarea id="message" name="message" className={`w-fit h-fit min-w-full min-h-60 px-4 py-3 border-0 rounded-2xl text-base font-bold field-sizing-content shadow-inset resize-none`} required={true} />
								</div>
							</div>

							{
								isPending ? <Loader></Loader> : <PrimaryButton>
									<button className="w-full h-full cursor-pointer" type="submit" disabled={isPending}>{t("send")}</button>
								</PrimaryButton>
							}
						</form>
					</>
				)
			}
		</div>
	)
}
