export type Team = {
	id: number,
	name: string,
	members?: User[]
}

export type User = {
	id: string,
	name: string,
	email: string,
	role?: string,
	project?: number,
	team?: number
}

export type Project = {
	id: string, 
	name: string,
	description: string
	story: string,
	useAI: boolean,
	techStack: string,
	notes?: string,
	owner?: string
}