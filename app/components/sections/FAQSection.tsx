import Blur from "../decor/Blur";
import Sparkle from "../decor/Sparkle";

export default function FAQSection() {
	return (
		<div className="w-screen h-screen grid grid-rows-1 grid-cols-2 relative">
			<Blur top="2%"></Blur>
			<Blur top="-2%" right="1%"></Blur>
			<Blur bottom="-2%" left="30%"></Blur>

			<Sparkle variant="single" bottom="5%" right="-1%" rotate="-20deg" className="-translate-1/2"/>
			<Sparkle variant="double" top="10%" left="3%" rotate="20deg"/>
			<Sparkle variant="double_2" bottom="10%" left="2%" className="scale-50"/>
			<Sparkle variant="single" top="2%" right="4%" rotate="-20deg"/>
			
			<div className="flex justify-center flex-col items-center">
				<div className="w-[80%] h-[80%] bg-black/50 border border-purple rounded-2xl shadow-outside flex items-center flex-col py-8 justify-around">
					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">Is it free?</p>
						<p className="italic text-sm">{"Yes, it's completely free. Our goal is to give you a chance to show off your incredible skills. And you'll get a prize if you win."}</p>
					</div>
					
					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">Do we make a website or a game?</p>
						<p className="italic text-sm">{"You can make anything as long as it involves writing code. You can make a website, a game, a console app. But it has to suit the theme."}</p>
					</div>

					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">How do we participate?</p>
						<p className="italic text-sm">{"Just sign up clicking the button on the top. Fill out your name and email. Please don't forget the password you'll need it later."}</p>
					</div>

					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">How can we participate as a team?</p>
						<p className="italic text-sm">All of you have to sign up. Then one of you will add the team members in the dashboard, when doing that fill out the exact full name your teammate has entered while signing up.</p>
					</div>
					
					<div className="w-[90%] h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">Who chooses the winner?</p>
						<p className="italic text-sm">A jury formed from the teachers of our department will listen to your presentations on Nov 1st and at the end of the event choose 3 winners. The jury also will take into account your Story Card and the source code of your project.</p>
					</div>

					
				</div>

				<h2 className="mt-10 italic">
					Be sure to ask any other question by this email <span className="text-[18px] font-bold underline underline-offset-1">twilight.ecaf@gmail.com</span>
				</h2>
				
			</div>

			<div className="flex justify-center flex-col items-center">
				<h1 className="text-3xl font-main">FAQs</h1>
				<div className="w-[80%] h-[80%] bg-black/50 border border-purple rounded-2xl shadow-outside flex items-center flex-col py-8 justify-around mt-10">
					<div className="w-[90%] h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">What is the theme?</p>
						<p className="italic text-sm">{"The theme will be released on Oct 18th. We'll choose a theme to give you as much freedom as possible, while also making it a bit challenging and fun. So don't expect it to be something like fantasy or landing."}</p>
					</div>
					
					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">Can we use AI?</p>
						<p className="italic text-sm">{"We don't restrict the use of AI. But, as stated in the rules, it mast be stated in your Story Card. If you try to hide it, you will be disqualified"}</p>
					</div>
					
					<div className="w-[90%] h-30 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">How do present our project?</p>
						<p className="italic text-sm">You submit the source code of your project on Nov 1st. The next day you will get about 5 minutes to tell us about your project and show how it works. It is highly encouraged to practice your presentation, because a bad presentation can ruin even the best project.</p>
					</div>
					
					<div className="w-[90%] h-24 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">How complex must our project be?</p>
						<p className="italic text-sm">{"Just don't make a single HTML file (╥ᴗ╥). Other than that any project you can make."}</p>
					</div>
					
					<div className="w-[90%] h-20 bg-light-dark rounded-2xl border border-purple shadow-inset px-4 flex justify-center flex-col">
						<p className="font-bold text-[18px]">Can we bribe the jury?</p>
						<p className="italic text-sm">Well you can try. Just send an email to <span className="underline underline-offset-3">very.honest.jury@gmail.com</span></p>
					</div>
				</div>
			</div>
		</div>
	)
}
