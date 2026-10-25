import { StripEmptyObjects } from "@neondatabase/auth/types"

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
	id: number, 
	name: string,
	description: string
	story: string,
	useAI: boolean,
	techStack: string,
	notes?: string,
	owner?: string
}

export type Progress = {
	id: number,
	project_id: number,
	date: string,
	description: string,
	image: string
}

export type AuthType = StripEmptyObjects<{
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

export type APIError = {
	message: string
}