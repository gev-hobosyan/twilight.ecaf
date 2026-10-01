import Blur from "../decor/Blur";
import Sparkle from "../decor/Sparkle";
import { useTranslations } from "next-intl";

export default function FAQSection() {
	const t = useTranslations("HomePage");
	return (
		<div className="w-screen min-h-screen relative overflow-hidden max-md:pb-10">
			<Blur top="2%"></Blur>
			<Blur top="-2%" right="1%"></Blur>
			<Blur bottom="-2%" left="30%"></Blur>

			<Sparkle variant="single" bottom="5%" right="-1%" rotate="-20deg" className="-translate-1/2"/>
			<Sparkle variant="double" top="10%" left="3%" rotate="20deg"/>
			<Sparkle variant="double_2" bottom="10%" left="2%" className="scale-50"/>
			<Sparkle variant="single" top="2%" right="4%" rotate="-20deg"/>

			<h1 className="text-3xl font-main md:hidden text-center mt-5 mb-5">FAQs</h1>

			<div className="min-h-screen max-md:bg-black/50 max-md:w-[90%] max-md:flex max-md:items-center max-md:justify-center max-md:flex-col max-md:m-auto max-md:border-purple max-md:border max-md:rounded-2xl max-md:shadow-outside max-md:py-6 max-md:gap-5 md:grid grid-rows-1 grid-cols-2">
				<div className="flex justify-center flex-col items-center">
					<div className="md:w-[80%] md:h-[80%] md:bg-black/50 md:border md:border-purple md:rounded-2xl md:shadow-outside flex items-center flex-col md:py-8 justify-around max-md:gap-5">
						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("isitfree")}</p>
							<p className="italic text-sm">{t("isitfreetext")}</p>
						</div>

						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading1")}</p>
							<p className="italic text-sm">{t("faqtext1")}</p>
						</div>

						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading2")}</p>
							<p className="italic text-sm">{t("faqtext2")}</p>
						</div>

						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading3")}</p>
							<p className="italic text-sm">{t("faqtext3")}</p>
						</div>

						<div className="w-[90%] min-h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading4")}</p>
							<p className="italic text-sm">{t("faqtext4")}</p>
						</div>


					</div>

					<h2 className="mt-10 italic max-md:hidden">
						{t("questionpart")} <span className="text-[18px] font-bold underline underline-offset-1">twilight.ecaf@gmail.com</span>
					</h2>

				</div>

				<div className="flex justify-center flex-col items-center">
					<h1 className="text-3xl font-main max-md:hidden">{t("faqs")}</h1>
					<div className="md:w-[80%] md:h-[80%] md:bg-black/50 md:border md:border-purple md:rounded-2xl md:shadow-outside flex items-center flex-col md:py-8 justify-around md:mt-10 max-md:gap-5">
						<div className="w-[90%] min-h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading5")}</p>
							<p className="italic text-sm">{t("faqtext5")}</p>
						</div>

						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading6")}</p>
							<p className="italic text-sm">{t("faqtext6")}</p>
						</div>

						<div className="w-[90%] min-h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading7")}</p>
							<p className="italic text-sm">{t("faqtext7")}</p>
						</div>

						<div className="w-[90%] min-h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading8")}</p>
							<p className="italic text-sm">{t("faqtext8")}</p>
						</div>

						<div className="w-[90%] min-h-20 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
							<p className="font-bold text-[18px]">{t("faqheading9")}</p>
							<p className="italic text-sm">{t("faqtext9")} <span className="underline underline-offset-3">very.honest.jury@gmail.com</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
