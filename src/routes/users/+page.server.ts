import { router } from '$lib/trpc/router'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => ({
	users: router.createCaller({}).users.list()
})
