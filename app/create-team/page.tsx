'use client';

import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton"
import Input from "../components/Input"
import type { StripEmptyObjects } from "@neondatabase/auth/types";
import { authClient } from "@/lib/auth/client";
import Loader from "../components/decor/Loader";
import axios from "axios";
import { FormState } from "../contact-us/action";
import { createTeam } from "./action";
import { redirect, RedirectType } from "next/navigation";
import { useTranslations } from "next-intl";

type AuthType = StripEmptyObjects<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
} & {} & {
    impersonatedBy?: string | null | undefined;
} & {} & {
    activeOrganizationId?: string | null | undefined;
}>

type Member = {
	id: string,
	name: string
}

export default function CreateTeam() {
	const [session, setSession] = useState<AuthType>();
	const [loading, setLoading] = useState(true);
	const [members, setMembers] = useState<Member[]>([]);
	const [addingMember, setAddingMember] = useState(false);
	const [pending, setPending] = useState(false);
	const [status, setStatus] = useState({
		status: "none",
		message: ""
	});
	const [memberStatus, setMemberStatus] = useState({
		status: "none",
		message: ""
	});

	const t = useTranslations("CreateTeam");

	const addMember = async (name: string) => {
		setPending(true)

		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL!}users/${name.replace(" ", "%20")}`);

			if (res.status == 200) {
				setMembers(prev => {

					if (prev.find(member => member.id == res.data.id) !== undefined) {
						setMemberStatus({
							status: "error",
							message: "User is already in your team"
						})
						return prev;
					}

					const member = {
						id: res.data.id,
						name: res.data.name
					}

					setAddingMember(false)

					return [...prev, member]
				})
			}
		} catch (e) {
			if (axios.isAxiosError(e)) {
				if (e.response) {

					if (e.response.status == 404) {
						setMemberStatus({
							status: "error",
							message: "User was not found"
						})
					} else {
						setMemberStatus({
							status: "error",
							message: "Please try again a little bit later"
						})
					}

				} else {
					setMemberStatus({
						status: "error",
						message: "Please try again a little bit later"
					})
				}
			} else {
				setMemberStatus({
					status: "error",
					message: "Please try again a little bit later"
				})
			}
		}
		finally {
			setPending(false)
		}
	}

	const removeMember = (id: string) => {
		setMembers(prev => (
			prev.filter(member => member.id != id)
		))
	};

	useEffect(() => {
		authClient.getSession().then(res => {
			if (res.data?.session) {
				setSession(res.data.session)
				setMembers(prev => {
					if (res.data?.user.id !== undefined && !prev.find(member => member.id === res.data?.user.id)) {
						const member = {
							id: res.data?.user.id,
							name: res.data?.user.name
						}

						return [...prev, member]
					}

					return prev
				})
			}

			setLoading(false)
		})
	}, [])

	return (
		<div className="w-screen h-screen center">
			{
				loading ?
					<Loader />
					: (
						<>
							{
								addingMember && (
									<>
										<div className="bg-black/40 w-full h-full absolute center backdrop-blur-xs z-10" onClick={() => {
											setAddingMember(false)
											setMemberStatus({
												status: "none",
												message: ""
											})
										}}></div>
										<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit absolute z-20" action={
											async (formData: FormData) => {
												await addMember(formData.get("username") as string)
										}}>
											<p className="font-main text-2xl mb-1">{t("add_teammate")}</p>
											<p className="text-sm">{t("funnier")}</p>
											<p className="mb-8 text-sm">{t("build")}</p>

											<Input label={t("full_name")} type="text" id="username" required={true} placeholder="" error={memberStatus.status == "error"} />
											{
												<label className="text-xs max-w-80 text-center mt-2 text-red-400" htmlFor="username">{memberStatus.message}</label>
											}

											<label className="text-xs max-w-80 text-center mt-2" htmlFor="username">{t("please_enter")}</label>

											{
												pending ? <Loader></Loader>
													: (
													<button className="cursor-pointer mt-10" type="submit">
														<PrimaryButton>
															{t("add")}
														</PrimaryButton>
													</button>
												)
											}
										</form>
									</>
								)
							}

							<form className="px-8 py-5 max-md:w-full max-md:h-full max-md:bg-black/40 max-md:shadow-inset md:bg-black/80 md:shadow-outside md:rounded-[20px] ring-offset-0 ring-0 center flex-col w-fit" action={
								async (formData) => {
									const res = await createTeam(formData.get("name") as string, members.map(member => member.id));

									if (res?.error) {
										setStatus({
											status: "error",
											message: res.error
										})
									} else if (res?.message) {
										setStatus({
											status: "success",
											message: res.message
										})

										redirect("/", RedirectType.replace)
									}
							}}>
								<p className="font-main text-2xl mb-1">{t("create_your_team")}</p>
								<p className="text-sm">{t("friends")}</p>
								<p className="mb-8 text-sm">{t("have_fun")}<span className="line-through">{t("suffer")}</span> {t("together")}</p>

								<div className="flex flex-col gap-3 mb-10">
									<Input label={t("team_name")} type="text" id="name" placeholder={""} required={true} error={status.status == "error"} />
									<div className="flex flex-col">
										<p className="ml-2">{t("team_members")}</p>
										<div className={`w-fit h-fit min-w-100 px-4 py-4 border-0 rounded-2xl text-base font-bold field-sizing-content resize-none flex gap-2 ${status.status == "error" ? "shadow-error" : "shadow-inset"}`}>
											{members.map((member) => (
												<div className={`min-w-20 min-h-20 w-fit border  rounded-2xl center relative ${status.status == "error" ? "shadow-[0_0_10px_#ff0000] border-red-700" : "shadow-[0_0_10px_#7B2CBF] border-purple"}`} key={member.id}>
													{member.name.split(" ")[0]}
													{
														member.id !== session?.userId && <p className="absolute top-px right-3 cursor-pointer hover:scale-120 transition-all duration-100" onClick={() => removeMember(member.id)}>-</p>
													}
												</div>
											)
											)}

											{
												members.length < 3 && <div className={`min-w-20 min-h-20 w-fit border rounded-2xl center text-2xl cursor-pointer group ${status.status === "error" ? "shadow-[0_0_10px_#ff0000] border-red-700" : "shadow-[0_0_10px_#7B2CBF] border-purple"}`} onClick={() => setAddingMember(true)}>
													<p className="group-hover:scale-120 transition-all duration-150">+</p>
												</div>
											}
										</div>
									</div>
									<p className="text-xs text-red-600 text-center">
										{status.message}
									</p>
								</div>

								
								
								{
									pending ? <Loader></Loader> :
									<PrimaryButton>
										<button className="w-full h-full cursor-pointer" type="submit">{t("create")}</button>
									</PrimaryButton>
								}
							</form>
						</>
					)
			}
		</div>
	)
}
