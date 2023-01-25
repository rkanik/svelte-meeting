import { createApi } from './api';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const todos = createApi(fetch);
	return {
		todos: await todos.get()
	};
};
