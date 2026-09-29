import Blur from "./Blur";
import Rule from "./Rule";

export default function Rules() {
	return (
		<div className="w-screen h-screen relative inline-block">
			<Blur top="2%"></Blur>
			<Blur top="-2%" right="1%"></Blur>
			<Blur bottom="-2%" left="30%"></Blur>

			<div className="w-full h-full grid grid-cols-2 grid-rows-1">
				<div className="flex flex-col items-center gap-10">
					<h1 className="text-3xl font-main text-center mt-10">How to participate</h1>

					<div className="bg-black/50 backdrop-blur-4xl rounded-[20px] border-purple border shadow-outside w-[80%] h-[80%] flex items-center justify-center flex-col gap-5">
						<Rule>
							1. Sign up for Twilight (obviously) before October 16th
						</Rule>

						<Rule>
							{"2. On October 18th the theme will be released"}
						</Rule>

						<Rule>
							{"3. You'll have 2 weeks to make something interesting. The only restriction is the theme and the only limit is your imagination"}
						</Rule>

						<Rule>
							{"4. Every day you have to upload a screenshot with the current progress of the project or check the box that no progress was made"}
						</Rule>

						<Rule>
							{"5. You submit your project as a zip file or a link to github along with the story card before November 1st 10pm"}
						</Rule>

						<Rule>
							{"6. On November 2nd you'll present your projects and we'll choose the winner"}
						</Rule>
					</div>
				</div>

				<div className="flex flex-col items-center mt-20 gap-10">
					<div className="bg-black/50 backdrop-blur-4xl rounded-[20px] border-purple border shadow-outside w-[80%] h-[80%] flex items-center justify-center flex-col gap-5">
						<div className="font-bold text-2xl">
							There are just a few rules
						</div>
						
						<Rule>
							{"1. Teams can't consist of more than 3 people"}
						</Rule>

						<Rule>
							{"2. Any use of AI must be stated"}
						</Rule>

						<Rule>
							{"3. Don't try to lie about anything"}
						</Rule>

						<p className="font-bold italic">The violation of any rule will lead to disqualification</p> 
					</div>

					<h1 className="text-3xl font-main text-center">Rules</h1>
				</div>

			</div>
		</div>
	)
}
