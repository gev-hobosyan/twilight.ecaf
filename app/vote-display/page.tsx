/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from "react"
import Image from "next/image";
import logo from "@/public/logo.svg";
import Blur from "../components/decor/Blur";
import Sparkle from "../components/decor/Sparkle";
import { Project } from "../dataTypes";
import Loader from "../components/decor/Loader";
import PrimaryButton from "../components/buttons/PrimaryButton";

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
	const [winners, setWinners] = useState<ProjectVote[]>([])
	const [showWinners, setShowWinners] = useState<"calculating" | "ask" | "show">("calculating");

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
			}

			if (message.type == "close" && projects) {
				const winners = [...projects]
					.sort((a, b) => b.votes - a.votes)
					.slice(0, 3);

				setWinners(winners)

				setTimeout(() => {
					setShowWinners("ask")
				}, 3000)
			}

			setMessage(message)
		};
		websocket.onclose = () => console.log("WS closed");

		setWs(websocket);

		return () => websocket.close()
	}, [projects])

	return (
		<div className="w-screen h-screen relative">
			<Blur top="1%" left="2%" />
			<Blur bottom="3%" right="-10%" />

			<Sparkle variant="double" top="4%" left="3%"/>
			<Sparkle variant="single" bottom="5%" left="1%" rotate="-22deg"/>
			<Sparkle variant="single" top="7%" right="2%" rotate="30deg"/>
			<Sparkle variant="single" bottom="2%" right="2%" rotate="30deg" />

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
								<p className="animate-fade [animation-delay:3.6s] opacity-0 max-w-35 text-wrap text-center mb-2 text-xl">2nd place</p>
								<p className="animate-fade [animation-delay:3.5s] opacity-0 max-w-35 text-wrap text-center mb-2">{winners![1].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-2_1.5s_ease-in-out_forwards] [animation-delay:3s]"></div>
							</div>
							<div>
								<p className="animate-fade [animation-delay:6.6s] opacity-0 max-w-35 text-wrap text-center mb-2 text-xl">1st place</p>
								<p className="animate-fade [animation-delay:6.5s] opacity-0 max-w-35 text-wrap text-center">{winners![0].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-1_1.5s_ease-in-out_forwards] [animation-delay:6s]"></div>
							</div>
							<div>
								<p className="animate-fade [animation-delay:0.6s] opacity-0 max-w-35 text-wrap text-center mb-2 text-xl">3rd place</p>
								<p className="animate-fade [animation-delay:0.5] opacity-0 max-w-35 text-wrap text-center">{winners![2].name}</p>
								<div className="bg-purple w-35 h-0 rounded-t-2xl animate-[win-3_1.5s_ease-in-out_forwards]"></div>	
							</div>
						</div>
					</div> : showWinners === "calculating" ? <div className="w-full h-full center flex-col gap-5 text-3xl font-main">
						<p>Calculating...</p>
						<Loader />
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
							<div className="w-120 h-20 bg-light-dark rounded-2xl border border-purple" key={project.id}>
								<div className="flex justify-between px-4 py-1 items-center h-full">
									<p className="font-main text-lg">{project.name}</p>
									<p className="text-light-purple">{project.techStack}</p>
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
