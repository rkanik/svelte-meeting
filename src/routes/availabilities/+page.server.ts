import { createApi } from './api';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const api = createApi(fetch);
	return {
		response: await api.get()
	};
};
