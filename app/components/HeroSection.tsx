import logo from "@/public/logo.svg";
import arrow from "@/public/arrow.svg";
import Image from "next/image";
import PrimaryButton from "@/app/components/PrimaryButton";
import Blur from "@/app/components/Blur";
import Sparkle from "@/app/components/Sparkle";
import LangSwitch from "./LangSwitch";
import { Locale, useTranslations } from "next-intl";
import { cookies } from "next/headers";

export default function HeroSection() {
	async function changeLocaleAction(locale: Locale) {
		"use server";
		const store = await cookies();
		store.set("locale", locale)
	}

	const t = useTranslations("HomePage");
	
	return (
		<div className="h-screen w-screen min-h-175 grid grid-cols-2 grid-rows-2 px-25 py-25 gap-5 relative">
			<div className="absolute">
				<LangSwitch changeLocaleAction={changeLocaleAction} />
			</div>
			<div className="center">
				<Image src={logo} alt="" />
			</div>

			<div className="text-center text-[20px] font-bold italic center">
				Twilight is a development competition where
				creativity, technology, and problem-solving come together as competitors receive a unique topic and transform it into their own digital creation using websites, Python scripts, games, and any other technologies they choose. Over two weeks, participants turn their concepts into functional projects and compete by showcasing what they can create from a single topic.
			</div>

			<div className="text-center text-[20px] font-bold italic center">
				Twilight is a development competition where
				creativity, technology, and problem-solving come together as competitors receive a unique topic and transform it into their own digital creation using websites, Python scripts, games, and any other technologies they choose. Over two weeks, participants turn their concepts into functional projects and compete by showcasing what they can create from a single topic.
			</div>

			<div className="center flex-row gap-12.5">
				<PrimaryButton>Sign up</PrimaryButton>
				<div className="center flex-col gap-1 translate-y-1/5">
					<p className="font-bold italic text-[20px]">Scroll down for more</p>
					<Image src={arrow} alt=""/>
				</div>
			</div>

			<Blur top={400} left={115} />
			<Blur top={60} right={100} />

			<Sparkle variant="double" top={20} left={100}/>
			<Sparkle variant="single" bottom={60} left={50} rotate="-22deg"/>
			<Sparkle variant="single" top={10} right={50} rotate="30deg"/>
			<Sparkle variant="single" bottom={50} right={150} rotate="30deg" />
			<p className="absolute left-[50%] top-2 text-[40px] font-main -translate-x-1/2 text-purple">{t("welcome")}</p>
		</div>
	);
}
