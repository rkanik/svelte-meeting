import { json } from '@sveltejs/kit';
import { Event } from '$lib/server/modules/events';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const events = await Event.find({ deletedAt: null }).populate({
		path: 'eventType',
		populate: { path: 'availability' }
	});

	return json({ events });
};
