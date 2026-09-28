import { auth } from "./lib/auth/server";

export default auth.middleware({
	loginUrl: '/sign-up'
})

export const config = {
	matcher: []
}
