import type { ApiResponse } from './types';

const createFetch = ($fetch: typeof fetch) => {
	return function <T>(
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	): Promise<ApiResponse<T>> {
		return new Promise((resolve) => {
			return $fetch(input, init)
				.then((res) => res.json())
				.then((res: T) => resolve([false, res]))
				.catch((err: Error) => resolve([true, err]));
		});
	};
};

export { createFetch };
