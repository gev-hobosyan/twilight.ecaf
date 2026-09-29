import Blur from "../decor/Blur";
import Rule from "../decor/Rule";
import { useTranslations } from "next-intl";

export default function Rules() {
	const t = useTranslations("HomePage");

	return (
		<div className="w-screen h-screen relative inline-block">
			<Blur top="2%"></Blur>
			<Blur top="-2%" right="1%"></Blur>
			<Blur bottom="-2%" left="30%"></Blur>

			<div className="w-full h-full grid grid-cols-2 grid-rows-1">
				<div className="flex flex-col items-center gap-10">
					<h1 className="text-3xl font-main text-center mt-10">{t("howtoparticipate")}</h1>

					<div className="bg-black/50 backdrop-blur-4xl rounded-[20px] border-purple border shadow-outside w-[80%] h-[80%] flex items-center justify-center flex-col gap-5">
						<Rule>
							1. {t("text1")}
						</Rule>

						<Rule>
							2. {t("text2")}
						</Rule>

						<Rule>
							3. {t("text3")}
						</Rule>

						<Rule>
							4. {t("text4")}
						</Rule>

						<Rule>
							5. {t("text5")}
						</Rule>

						<Rule>
							6. {t("text6")}
						</Rule>
					</div>
				</div>

				<div className="flex flex-col items-center mt-20 gap-10">
					<div className="bg-black/50 backdrop-blur-4xl rounded-[20px] border-purple border shadow-outside w-[80%] h-[80%] flex items-center justify-center flex-col gap-5">
						<div className="font-bold text-2xl">
							{t("fewrules")}
						</div>
						
						<Rule>
							1. {t("rule1")}
						</Rule>

						<Rule>
							2. {t("rule2")}
						</Rule>

						<Rule>
							3. {t("rule3")}
						</Rule>

						<p className="font-bold italic">{t("violationtext")}</p> 
					</div>

					<h1 className="text-3xl font-main text-center">{t("rules")}</h1>
				</div>

			</div>
		</div>
	)
}
