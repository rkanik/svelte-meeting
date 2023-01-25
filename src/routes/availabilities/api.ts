import { createFetch } from '$lib/$fetch';

import type { Pagination, Availability } from '$lib/types';

const createApi = (v: typeof fetch) => {
	const $fetch = createFetch(v);
	return {
		get() {
			return $fetch<{
				availabilities: Pagination<Availability>;
			}>('/api/availabilities');
		}
	};
};

export { createApi };
