import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		username: params.username,
		eventLink: params.eventLink
	};
};
