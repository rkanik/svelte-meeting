import type { Query } from 'mongoose';

type PaginateOptions<T> = {
	query: T;
	url: URL;
};

type PaginateReturn<T> = {
	query: T;
	page: number;
	perPage: number;
};

export const paginate = <T extends Query<any[], any>>(
	options: PaginateOptions<T>
): PaginateReturn<T> => {
	const { query, url } = options;

	const page = +(url.searchParams.get('page') || 1);
	const perPage = +(url.searchParams.get('per-page') || 10);

	query.limit(perPage);
	query.skip(perPage * (page - 1));

	return { query, page, perPage };
};
