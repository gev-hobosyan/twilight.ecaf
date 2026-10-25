/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from "react";
import { getProjectsToVote } from "../actions/getProjectsToVote";
import { Project } from "../dataTypes";
import Blur from "../components/decor/Blur";
import Sparkle from "../components/decor/Sparkle";
import { vote } from "../actions/vote";
import Cookies from "js-cookie";
import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Vote() {
	const [projects, setProjects] = useState<Project[]>();
	const [chosenProjects, setChosenProjects] = useState<number[]>([0, 0, 0]);
	const [hasVoted, setHasVoted] = useState(true);
	const [voteStarted, setVoteStarted] = useState(false);

	useEffect(() => {
		const hasVoted = Cookies.get("hasVoted") && Cookies.get("hasVoted") === "true" ? true : false;

		if (!hasVoted) {
			const fetchData = async () => {
				const res = await getProjectsToVote();
	
				if (res.type === "success") {
					setProjects(res.payload as Project[])
					setVoteStarted(true)
				} else {
					setVoteStarted(false)
				}
			}
	
			fetchData()
		}

		setHasVoted(hasVoted)
	}, [])
	
	const renderOptions = (currentIndex: number) => {
		if (!projects) return null

		return (
			<>
				<option value={0} disabled>Select a project</option>
				{
					projects.map(project => {
						const isChosen = chosenProjects.includes(project.id) && chosenProjects[currentIndex] !== project.id;

						if (isChosen) return null

						return (
							<option value={project.id} key={project.id}>
								{project.name}
							</option>
						)
					})
				}
			</>
		)
	}

	return (
		<div className="w-screen h-screen relative">
			<Blur top="1%" left="2%" />
			<Blur bottom="3%" right="-10%" />

			<Sparkle variant="double" top="4%" left="3%"/>
			<Sparkle variant="single" bottom="5%" left="1%" rotate="-22deg"/>
			<Sparkle variant="single" top="7%" right="2%" rotate="30deg"/>
			<Sparkle variant="single" bottom="2%" right="2%" rotate="30deg" />

			{
				hasVoted && <div className="center w-full h-full flex-col gap-5">
					<h1 className="text-3xl">You have already voted</h1>
					<p className="text-2xl">Thank you!</p>
				</div>
		 	}
			
			{
				voteStarted ? projects && <div className="center w-full h-full flex-col gap-10">
					<div className="font-main text-2xl text-center">
						<p>{"It's time to choose the winners"}</p>
						<p className="text-lg">{"Choose which projects deserve the places mentioned"}</p>
					</div>
	
					<div className="center gap-4 flex-col">
						<div className="bg-midnight-violet rounded-2xl border border-purple w-60 h-20 text-start px-5 flex flex-col justify-center gap-2">
							<p className="font-main text-[18px] ml-1 text-[#FFD700]">1st place</p>
							{
								<select name="vote-1"
									value={chosenProjects[0]}
									onChange={(e) => {
										const value = Number.parseInt(e.target.value)
										setChosenProjects(prev => {
											const next = [...prev]
											next[0] = value;
											return next
										})
									}}
								>
									{renderOptions(0)}
								</select>
							}
						</div>
						<div className="bg-midnight-violet rounded-2xl border border-purple w-60 h-20 text-start px-5 flex flex-col justify-center gap-2">
							<p className="font-main text-[18px] ml-1 text-[#C0C0C0]">2nd place</p>
							{
								<select name="vote-2"
									value={chosenProjects[1]}
									onChange={(e) => {
										const value = Number.parseInt(e.target.value)
										setChosenProjects(prev => {
											const next = [...prev]
											next[1] = value;
											return next
										})
									}}
								>
									{renderOptions(1)}
								</select>
							}
						</div>
						<div className="bg-midnight-violet rounded-2xl border border-purple w-60 h-20 text-start px-5 flex flex-col justify-center gap-2">
							<p className="font-main text-[18px] ml-1 text-[#B87333]">3rd place</p>
							{
								<select name="vote-3"
									value={chosenProjects[2]}
									onChange={(e) => {
										const value = Number.parseInt(e.target.value)
										setChosenProjects(prev => {
											const next = [...prev]
											next[2] = value;
											return next
										})
									}}
								>
									{renderOptions(2)}
								</select>
							}
						</div>
					</div>
					<button disabled={chosenProjects.includes(0)} className="center h-12 px-8 bg-black/80 text-center rounded-[20px] disabled:border border-midnight-purple not-disabled:shadow-inset max-md:text-[18px] md:text-2xl font-bold transition-all cursor-pointer disabled:text-midnight-purple disabled:cursor-default" onClick={async () => {
						await vote(chosenProjects)

						Cookies.set("hasVoted", "true")

						window.location.reload()
					}}>Vote</button>
				</div> : <div className="h-full w-full center text-2xl font-main flex-col">
					<p>{"The great vote hasn't started yet"}</p>
					<Image src={logo} alt="logo" className="-translate-x-5 w-80" />
				</div>
			}
		</div>
	)
}