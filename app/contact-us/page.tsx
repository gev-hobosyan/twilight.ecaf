'use client'

import { useActionState } from "react";
import Input from "../components/Input";
import Loader from "../components/decor/Loader";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { contactUs } from "./action";

export default function ContactUs() {
	const [state, formAction, isPending] = useActionState(contactUs, null);
	
	return (
		<div className="w-screen h-screen center">
			<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit" action={formAction}>
				<p className="font-main text-2xl mb-1">Contact us</p>
				<p className="text-sm">Have any questions or problems?</p>
				<p className="mb-8 text-sm">Feel free to ask</p>

				<div className="flex flex-col gap-3 mb-10">
					<Input label="Telegram" type="text" id="tg" placeholder={""} />
					<label htmlFor="tg" className="ml-2 text-xs">This will allow us to contact you more easily but is not required</label>
					<div className="flex flex-col">
						<label className="ml-2" htmlFor="message">Message</label>
						<textarea id="message" name="message" className={`w-fit h-fit min-w-full min-h-60 px-4 py-3 border-0 rounded-2xl text-base font-bold field-sizing-content shadow-inset resize-none`} required={true} />
					</div>
				</div>

				{
					isPending ? <Loader></Loader> : <PrimaryButton>
						<button className="w-full h-full cursor-pointer" type="submit" disabled={isPending}>Send</button>
					</PrimaryButton>
				}
			</form>
		</div>
	)
}
