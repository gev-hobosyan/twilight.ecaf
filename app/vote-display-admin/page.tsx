/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import logo from "@/public/logo.svg";
import Blur from "../components/decor/Blur";
import Sparkle from "../components/decor/Sparkle";
import { Project } from "../dataTypes";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { startVote } from "./startVote";
import { closeVote } from "./closeVote";
import Input from "../components/Input";
import { vote } from "../actions/vote";

type VoteEvent = {
	type: "empty" | "waiting" | "start" | "close" | "vote",
	payload: unknown
}

type ProjectVote = {
	id: number,
	name: string,
	techStack: string,
	votes: number
}

export default function VoteDisplay() {
	const [message, setMessage] = useState<VoteEvent>();
	const [ws, setWs] = useState<WebSocket | null>(null);
	const [projects, setProjects] = useState<ProjectVote[]>();
	const [voteCount, setVoteCount] = useState(0);
	const [winners, setWinners] = useState<ProjectVote[]>([])
	const [showWinners, setShowWinners] = useState<"ask" | "show">("ask");
	const [isVoting, setIsVoting] = useState(false);

	useEffect(() => {
		const websocket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/vote/display`);

		websocket.onopen = () => console.log("WS connected");
		websocket.onmessage = (event) => {
			const message = JSON.parse(event.data) as VoteEvent;

			if (message.type === "start") {
				const payload = message.payload as Project[];

				setProjects(payload.map(project => (
					{
						id: project.id,
						name: project.name,
						techStack: project.techStack,
						votes: 0
					}
				)));
			}

			if (message.type === "vote") {
				const payload = message.payload as number[];

				setProjects(prev => {
					for (let i = 0; i < payload.length; i++) {
						const find = prev?.findIndex(project => project.id === payload[i])

						if (find !== undefined) {
							prev![find].votes += 3 - i
						}
					}

					return prev
				})

				setVoteCount(prev => prev + 6)
			}

			if (message.type == "close" && projects) {
				const winners = [...projects]
					.sort((a, b) => b.votes - a.votes)
					.slice(0, 3);

				setWinners(winners)
			}

			setMessage(message)
		};
		websocket.onclose = () => console.log("WS closed");

		setWs(websocket);

		return () => websocket.close()
	}, [projects])

	return (
		<div className="w-screen h-screen relative">
			{
				isVoting && (
					<>
						<div className="bg-black/40 w-full h-full absolute center backdrop-blur-xs z-10" onClick={() => {
							setIsVoting(false)
						}}></div>
						<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit absolute z-20 left-1/2 top-1/2 -translate-1/2" action={
							async (formData: FormData) => {
								await vote([Number.parseInt(formData.get("1st") as string), Number.parseInt(formData.get("2nd") as string), Number.parseInt(formData.get("3rd") as string)])

								setIsVoting(false)
						}}>
							<p className="font-main text-2xl mb-1">Vote</p>

							<Input label={"1st place"} type="text" id="1st" required={true} placeholder="" />
							<Input label={"2nd place"} type="text" id="2nd" required={true} placeholder="" />
							<Input label={"3rd place"} type="text" id="3rd" required={true} placeholder="" />

							<button className="cursor-pointer mt-10" type="submit">
								<PrimaryButton>
									Vote
								</PrimaryButton>
							</button>
						</form>
					</>
				)
			}


			<Blur top="1%" left="2%" />
			<Blur bottom="3%" right="-10%" />

			<Sparkle variant="double" top="4%" left="3%"/>
			<Sparkle variant="single" bottom="5%" left="1%" rotate="-22deg"/>
			<Sparkle variant="single" top="7%" right="2%" rotate="30deg"/>
			<Sparkle variant="single" bottom="2%" right="2%" rotate="30deg" />

			<div className="flex absolute bottom-10 left-1/2 -translate-x-1/2 gap-7">
				<button onClick={startVote}>
					<PrimaryButton>Start Vote</PrimaryButton>
				</button>
				<button onClick={closeVote}>
					<PrimaryButton>Close Vote</PrimaryButton>
				</button>
				<button onClick={() => setIsVoting(true)}>
					<PrimaryButton>Add Vote</PrimaryButton>
				</button>
			</div>

			{
				message?.type === "waiting" ? (
					<div className="w-full h-full center flex-col">
						<Image src={logo} alt="" loading="eager" className="-translate-x-5 w-100"/>
						<p className="font-main text-2xl">Waiting for vote to start</p>
					</div>
				) : message?.type === "close" ? (
					showWinners === "show" ? <div className="w-full h-full center">
						<div className="flex gap-4 items-end text-center font-main h-80">
							<div>
								<p className="animate-fade [animation-delay:3.5s] opacity-0 max-w-35 text-wrap text-center">{winners![1].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-2_1.5s_ease-in-out_forwards] [animation-delay:3s]"></div>
							</div>
							<div>
								<p className="animate-fade [animation-delay:6.5s] opacity-0 max-w-35 text-wrap text-center">{winners![0].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-1_1.5s_ease-in-out_forwards] [animation-delay:6s]"></div>
							</div>
							<div>
								<p className="animate-fade [animation-delay:0.5] opacity-0 max-w-35 text-wrap text-center">{winners![2].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-3_1.5s_ease-in-out_forwards]"></div>
							</div>
						</div>
					</div> : <div className="w-full h-full center flex-col gap-5 text-3xl font-main">
						<p>The results are ready</p>
						<p className="text-2xl">{"So who's the winner"}</p>
						<button onClick={() => setShowWinners("show")}>
							<PrimaryButton>Reveal</PrimaryButton>
						</button>
					</div>
				) : projects && (
					<div className="w-full h-full center flex-col gap-3">
						{
							projects.map(project => (
								<div className="w-120 h-20 bg-light-dark rounded-2xl border border-purple flex flex-col justify-center" key={project.id}>
									<div className="flex justify-between px-4 py-1">
										<p className="font-main text-lg">{project.id} {project.name}</p>
										<p className="text-light-purple">{project.techStack}</p>
									</div>

									<div className="w-[95%] h-2 mx-auto rounded-2xl transition-colors mt-1 bg-midnight-purple">
										<div className="h-full rounded-2xl transition-all bg-light-purple" style={{
											width: `${(project.votes > 0 ? project.votes / voteCount : 0) * 100}%`
										}}></div>
									</div>
								</div>
							))
						}
					</div>
				)
			}
		</div>
	)
}
