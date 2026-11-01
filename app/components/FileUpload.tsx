/* eslint-disable @next/next/no-img-element */
"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Image from "next/image";
import uploadFile from "../utils/file";
import { AuthType } from "../dataTypes";
import { useTranslations } from "next-intl";

interface Props {
	session: AuthType,
	file: string[] | undefined,
	setFile: Dispatch<SetStateAction<string[] | undefined>>,
	error: boolean,
	projectId: number
}

export default function FileUpload({ session, file, setFile, error, projectId }: Props) {
	const [fileEnter, setFileEnter] = useState(false);

	const t = useTranslations("FileUpload");

	return (
		<div>
			{
				file ?
					<div className={`relative w-full h-32 center mx-auto border-dashed rounded-2xl border-3 ${error ? "border-red-500 text-red-500" : "border-purple text-purple"} transition-all`}>
						<p>{file[0]}</p>
						<Image src={error ? "/trash_error.svg" : "/trash.svg"} alt="trash" width={24} height={24} className="absolute top-3 right-6 cursor-pointer hover:scale-105" onClick={() => setFile(undefined)}/>
					</div>
				:	(
						<div className={`min-w-full w-fit h-32 border-dashed rounded-2xl border-3 center flex-col font-main text-xs ${fileEnter ? "border-purple-400 text-purple-400": error ? "border-red-500 text-red-500" : "border-purple text-purple"}`}
							onDragOver={(e) => {
								e.preventDefault()
								setFileEnter(true)
							}}
							onDragEnd={(e) => {
								e.preventDefault()
								setFileEnter(false)
							}}
							onDragLeave={(e) => {
								e.preventDefault()
								setFileEnter(false)
							}}
							onDrop={(e) => {
								e.preventDefault()
								setFileEnter(false)
								if (e.dataTransfer.items) {
									[...e.dataTransfer.items].forEach(async (item, i) => {
										if (item.kind === "file") {
											const file = item.getAsFile();
											if (file && file.name.endsWith(".zip")) {
												const key = `${session.userId}/${projectId}-${file.name}`
	
												const url = await uploadFile(key, file);

												setFile([file.name, url])
											}
										}
									})
								}
							}}
						>
							<Image src={ error ? "/upload_error.svg" : "/upload.svg" } alt="upload" width={48} height={48}></Image>
							<label htmlFor="file">{t("click")}</label>
							<label htmlFor="file">{t("or")}</label>
							<label htmlFor="file">{t("drop")}</label>
							<input
								id="file"
								type="file"
								className="hidden"
								onChange={async (e) => {
									const files = e.target.files;
									if (files && files[0] && files[0].name.endsWith(".zip")) {
										const key = `${session.userId}/${projectId}-${files[0].name}`

										const url = await uploadFile(key, files[0]);

										setFile([files[0].name, url])
									}
								}}
							/>
						</div>
					)
			}
		</div>
	)
}
