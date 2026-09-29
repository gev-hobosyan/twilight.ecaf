'use client';

import { useActionState } from "react";
import Blur from "../components/Blur";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { signUpWithEmail } from "./action";
import Link from "next/link";
import Loader from "../components/Loader";

export default function SignUp() {
	const [state, formAction, isPending] = useActionState(signUpWithEmail, null);
	
	return (
		<div className="h-screen w-screen center relative">
			<Blur top="4%" left="3%" />
			<Blur bottom="1%" right="3%" />


			<form action={formAction} className="px-8 py-5 bg-black/80 shadow-outside rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit">
				<p className="font-main text-2xl mb-1">Join us</p>
				<p className="mb-8 text-sm">Bring ideas to life</p>

				<div className="flex flex-col gap-3 mb-10">
					<Input label={"Full name"} placeholder={"username"} id={"full_name"} />
					<Input label={"Email"} placeholder={"username@email.com"} type="email" id="email" />
					<Input label={"Password"} placeholder={""} type="password" id="password" />
				</div>

				{
					isPending ? <Loader></Loader> : <PrimaryButton>
						<button className="w-full h-full cursor-pointer" type="submit" disabled={isPending}>Sign up</button>
					</PrimaryButton>
				}
				<p className="mt-4 text-sm cursor-default">By continuing you agree to our <Link href="/privacy-policy" className="text-purple underline underline-offset-2">Privacy Policy</Link></p>
				<p className="mt-2 text-sm cursor-default">Already have an account? <Link href="/sign-in" className="text-purple underline underline-offset-2">Sing in</Link></p>
			</form>
		</div>
	)
}
