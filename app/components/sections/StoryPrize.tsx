import certificates from "@/public/certificates.svg"
import Image from "next/image"
import Blur from "../decor/Blur"
import Sparkle from "../decor/Sparkle"
import { useTranslations } from "next-intl";

export default function StoryPrize() {
	const t = useTranslations("HomePage");
	
	return (
		<div className="w-screen min-h-screen relative md:grid grid-cols-2 grid-rows-2 overflow-hidden py-5">
			<Blur top="3%" />
			<Blur bottom="3%" right="-10%"/>
			<Blur bottom="35%" right="35%" />

			<Sparkle variant="single" top="50%" left="50%" className="-translate-1/2"/>
			<Sparkle variant="double" top="10%" left="3%" rotate="20deg"/>
			<Sparkle variant="double_2" bottom="1%" left="2%" className="scale-50"/>
			<Sparkle variant="single" top="2%" right="4%" rotate="-20deg"/>
			
			<div className="center flex-col gap-5 md:gap-10">
				<p className="text-2xl font-main">{t("storycardheading")}</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{t("storycardtext")}</p>
			</div>
			
			<div className="center flex-col gap-5 md:gap-10 max-md:mt-10 text-center">
				<p className="text-2xl font-main">{t("participateheading")}</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{t("participatetext")}</p>
			</div>

			<div className="center flex-col gap-5 md:gap-10 max-md:mt-10 text-center">
				<p className="text-2xl font-main">{t("winningheading")}</p>

				<p className="text-[18px] font-bold italic max-w-[90%] text-center">{t("winningtext")}</p>
			</div>
			
			<div className="center max-md:mt-10">
				<Image src={certificates} alt="certificates" className="w-70 md:w-150"/>
			</div>
		</div>
	)
}