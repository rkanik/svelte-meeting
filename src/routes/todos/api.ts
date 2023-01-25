import { createFetch } from '$lib/$fetch';

import type { Todo } from './types';

const createApi = (v: typeof fetch) => {
	const $fetch = createFetch(v);
	return {
		get() {
			return $fetch<Todo[]>('https://jsonplaceholder.typicode.com/todos');
		}
	};
};

export { createApi };
