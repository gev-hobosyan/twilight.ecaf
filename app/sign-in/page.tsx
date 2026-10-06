'use client';

import { useActionState } from "react";
import { signInWithEmail } from "./action";
import Blur from "../components/decor/Blur";
import Input from "../components/Input";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Link from "next/link";
import Loader from "../components/decor/Loader";
import { useTranslations } from "next-intl";

export default function SignIn() {
	const [state, formAction, isPending] = useActionState(signInWithEmail, null);

	const t = useTranslations("Sign");

	return (
		<div className="h-screen w-screen center relative">
			<Blur top="4%" left="3%" />
			<Blur bottom="1%" right="3%" />

			<form action={formAction} className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit">
				<p className="font-main text-2xl mb-1">{t("continue")}</p>
				<p className="mb-8 text-sm">{t("ideas")}</p>

				<div className="flex flex-col gap-3 mb-10">
					<Input label={t("email")} placeholder={"username@email.com"} type="email" id="email" error={state !== null} />
					<Input label={t("password")} placeholder={""} type="password" id="password" error={state !== null} />

					{
						state !== null && (
							<p className="text-sm text-mono italic text-red-700 text-center">{state.error}</p>
						)
					}
				</div>

				{
					isPending ? <Loader></Loader> : <PrimaryButton>
						<button className="w-full h-full cursor-pointer" type="submit" disabled={isPending}>{t("sign in")}</button>
					</PrimaryButton>
				}
				<p className="mt-4 text-sm cursor-default text-center">{t("bycont")}<Link href="/privacy-policy" className="text-purple underline underline-offset-2">{t("privacypolicy")}</Link></p>
				<p className="mt-2 text-sm cursor-default text-center">{t("signuplink")} <Link href="/sign-up" className="text-purple underline underline-offset-2">{t("sign up")}</Link></p>
			</form>
		</div>
	)
}
