import { t } from '$lib/trpc/server'
import { users } from '$lib/trpc/router/users'

export const router = t.router({
	users
})

export type Router = typeof router
