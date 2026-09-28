import logo from "@/public/logo.svg";
import arrow from "@/public/arrow.svg";
import Image from "next/image";
import PrimaryButton from "@/app/components/PrimaryButton";
import Blur from "@/app/components/Blur";
import Sparkle from "@/app/components/Sparkle";
import LangSwitch from "./LangSwitch";
import { Locale, useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Link from "next/link";


export default function HeroSection() {
	async function changeLocaleAction(locale: Locale) {
		"use server";
		const store = await cookies();
		store.set("locale", locale)
	}

	const t = useTranslations("HomePage");
	
	return (
		<div className="h-screen w-screen md:min-h-175 md:grid md:grid-cols-2 md:grid-rows-2 py-6 md:px-25 md:py-25 gap-5 max-md:flex max-md:items-center max-md:flex-col md:relative overflow-x-hidden relative">
			<div className="absolute">
				<LangSwitch changeLocaleAction={changeLocaleAction} />
			</div>
			<p className="md:absolute md:left-[50%] md:top-2 text-[28px] md:text-[40px] font-main md:-translate-x-1/2 text-purple">{t("welcome")}</p>
			
			<div className="center max-md:w-70 -translate-x-2">
				<Image src={logo} alt="" loading="eager"/>
			</div>

			<div className="text-center max-md:mt-15 text-[18px] max-md:px-4 md:text-[20px] font-bold italic center">
				{t("hero text")}
			</div>

			<div className="text-center text-[18px] max-md:mt-3 max-md:px-4 md:text-[20px] font-bold italic center">
				{t("hero text2")}
			</div>

			<div className="center flex-row gap-3 md:gap-12.5 max-md:mt-auto max-md:mb-10">
				<Link href="/sign-up">
					<PrimaryButton>{t("signup")}</PrimaryButton>
				</Link>
				<div className="center flex-col gap-1 translate-y-1/5">
					<p className="font-bold italic text-[18px] md:text-[20px]">{t("scroll down for more")}</p>
					<Image src={arrow} alt=""/>
				</div>
			</div>

			<Blur top="1%" left="2%" />
			<Blur bottom="3%" right="-10%" />

			<Sparkle variant="double" top="4%" left="3%"/>
			<Sparkle variant="single" bottom="5%" left="1%" rotate="-22deg"/>
			<Sparkle variant="single" top="7%" right="2%" rotate="30deg"/>
			<Sparkle variant="single" bottom="2%" right="2%" rotate="30deg" />
		</div>
	);
}

// return (
// 	<div className="h-screen w-screen grid grid-cols-1 grid-rows-1 px-30 py-30 relative">
// 		<div className="absolute">
// 			<LangSwitch changeLocaleAction={changeLocaleAction} />
// 		</div>
// 		<div className="center px-30 py-0">
// 			<Image src={logo} alt="" />
// 		</div>

// 		<div className="text-center text-[18px] font-bold italic center flex flex-col gap-2">
//  				{t("hero text2")}
// 		</div>

// 		<div className="center flex-row gap-11.5">
//  				<PrimaryButton>{t("signup")}</PrimaryButton>
//  				<div className="center flex-col gap-1 translate-y-1/5">
//  					<p className="font-bold italic text-[14px] text-center">{t("scroll down for more")}</p>
//  					<Image src={arrow} alt=""/>
//  				</div>
//  			</div>
// 			<Blur top={400} left={115} />
//  			<Blur top={60} right={100} />

//  			<Sparkle variant="double" top={40} left={20}/>
//  			<Sparkle variant="single" bottom={10} left={30} rotate="-22deg"/>
//  			<Sparkle variant="single" top={40} right={10} rotate="30deg"/>
//  			<Sparkle variant="single" bottom={10} right={30} rotate="30deg" />
//  			<p className="absolute left-[50%] top-10 text-[28px] font-main -translate-x-1/2 text-purple">{t("welcome")}</p>
// 	</div>
// );
// }