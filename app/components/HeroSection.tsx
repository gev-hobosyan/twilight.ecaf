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
	
// 	return (
// 		<div className="h-screen w-screen min-h-175 grid grid-cols-2 grid-rows-2 px-25 py-25 gap-5 relative">
// 			<div className="absolute">
// 				<LangSwitch changeLocaleAction={changeLocaleAction} />
// 			</div>
// 			<div className="center">
// 				<Image src={logo} alt="" />
// 			</div>

// 			<div className="text-center text-[20px] font-bold italic center">
// 				{t("hero text")}
// 			</div>

// 			<div className="text-center text-[20px] font-bold italic center">
// 				{t("hero text2")}
// 			</div>

// 			<div className="center flex-row gap-12.5">
// 				<PrimaryButton>{t("signup")}</PrimaryButton>
// 				<div className="center flex-col gap-1 translate-y-1/5">
// 					<p className="font-bold italic text-[20px]">{t("scroll down for more")}</p>
// 					<Image src={arrow} alt=""/>
// 				</div>
// 			</div>

// 			<Blur top={400} left={115} />
// 			<Blur top={60} right={100} />

// 			<Sparkle variant="double" top={20} left={100}/>
// 			<Sparkle variant="single" bottom={60} left={50} rotate="-22deg"/>
// 			<Sparkle variant="single" top={10} right={50} rotate="30deg"/>
// 			<Sparkle variant="single" bottom={50} right={150} rotate="30deg" />
// 			<p className="absolute left-[50%] top-2 text-[40px] font-main -translate-x-1/2 text-purple">{t("welcome")}</p>
// 		</div>
// 	);
// }

return (
	<div className="h-screen w-screen grid grid-cols-1 grid-rows-1 px-30 py-30 relative">
		<div className="absolute">
			<LangSwitch changeLocaleAction={changeLocaleAction} />
		</div>
		<div className="center px-30 py-0">
			<Image src={logo} alt="" />
		</div>

		<div className="text-center text-[18px] font-bold italic center flex flex-col gap-2">
 				{t("hero text2")}
		</div>

		<div className="center flex-row gap-11.5">
 				<PrimaryButton>{t("signup")}</PrimaryButton>
 				<div className="center flex-col gap-1 translate-y-1/5">
 					<p className="font-bold italic text-[14px] text-center">{t("scroll down for more")}</p>
 					<Image src={arrow} alt=""/>
 				</div>
 			</div>
			<Blur top={400} left={115} />
 			<Blur top={60} right={100} />

 			<Sparkle variant="double" top={40} left={20}/>
 			<Sparkle variant="single" bottom={10} left={30} rotate="-22deg"/>
 			<Sparkle variant="single" top={40} right={10} rotate="30deg"/>
 			<Sparkle variant="single" bottom={10} right={30} rotate="30deg" />
 			<p className="absolute left-[50%] top-10 text-[28px] font-main -translate-x-1/2 text-purple">{t("welcome")}</p>
	</div>
);
}