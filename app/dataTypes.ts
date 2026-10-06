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