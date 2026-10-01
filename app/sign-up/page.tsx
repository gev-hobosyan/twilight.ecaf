'use client';

import { useActionState } from "react";
import Blur from "../components/decor/Blur";
import Input from "../components/Input";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { signUpWithEmail } from "./action";
import Link from "next/link";
import Loader from "../components/decor/Loader";
import { useTranslations } from "next-intl";

export default function SignUp() {
	const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

	const t = useTranslations("Sign");
	
	return (
		<div className="h-screen w-screen center relative">
			<Blur top="4%" left="3%" />
			<Blur bottom="1%" right="3%" />


			<form action={formAction} className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit">
				<p className="font-main text-2xl mb-1">{t("join")}</p>
				<p className="mb-8 text-sm">{t("ideas")}</p>

				<div className="flex flex-col gap-3 mb-10">
					<Input label={t("full_name")} placeholder={"username"} id={"full_name"} />
					<Input label={t("email")} placeholder={"username@email.com"} type="email" id="email" />
					<Input label={t("password")} placeholder={""} type="password" id="password" />
				</div>

				{
					isPending ? <Loader></Loader> : <PrimaryButton>
						<button className="w-full h-full cursor-pointer" type="submit" disabled={isPending}>{t("sign up")}</button>
					</PrimaryButton>
				}
				<p className="mt-4 text-sm cursor-default text-center">{t("bycont")}<Link href="/privacy-policy" className="text-purple underline underline-offset-2">{t("privacypolicy")}</Link></p>
				<p className="mt-2 text-sm cursor-default text-center">{t("signinlink")}<Link href="/sign-in" className="text-purple underline underline-offset-2">{t("sign in")}</Link></p>
			</form>
		</div>
	)
}
