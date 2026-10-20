/* eslint-disable @next/next/no-img-element */
"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Image from "next/image";
import uploadFile from "../utils/file";
import { AuthType } from "../dataTypes";

interface Props {
	session: AuthType,
	file: string | undefined,
	setFile: Dispatch<SetStateAction<string | undefined>>,
	error: boolean
}

export default function ImageUpload({ session, file, setFile, error }: Props) {
	const [fileEnter, setFileEnter] = useState(false);
	const date = new Date();

	return (
		<div>
			{
				file ?
					<div>
						<img src={file} alt="img" className={`w-full h-40 border-dashed rounded-2xl border-3 ${error ? "border-red-500 text-red-500" : "border-purple text-purple"} transition-all`} />
					</div>
				:	(
						<div className={`min-w-full h-32 border-dashed rounded-2xl border-3 center flex-col font-main text-xs ${fileEnter ? "border-purple-400 text-purple-400": error ? "border-red-500 text-red-500" : "border-purple text-purple"}`}
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
											if (file) {
												const key = `${session.userId}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.jpg`
	
												const url = await uploadFile(key, file);

												setFile(url)
											}
										}
									})
								}
							}}
						>
							<Image src={ error ? "/upload_error.svg" : "/upload.svg" } alt="upload" width={48} height={48}></Image>
							<label htmlFor="file">Click to upload</label>
							<label htmlFor="file">OR</label>
							<label htmlFor="file">Drop the image here</label>
							<input
								id="file"
								type="file"
								className="hidden"
								onChange={async (e) => {
									const files = e.target.files;
									if (files && files[0]) {
										const key = `${session.userId}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.jpg`

										const url = await uploadFile(key, files[0]);

										setFile(url)
									}
								}}
							/>
						</div>
					)
			}
		</div>
	)
}
