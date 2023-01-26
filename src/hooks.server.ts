import { router } from '$lib/trpc/router'
import { createContext } from '$lib/trpc/context'
import { createTRPCHandle } from 'trpc-sveltekit'

import type { Handle } from '@sveltejs/kit'

export const handle: Handle = createTRPCHandle({
	router,
	createContext,
	onError: ({ type, path, error }) => {
		return console.error(`Encountered error while trying to process ${type} @ ${path}:`, error)
	}
})
