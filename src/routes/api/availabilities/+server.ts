import db from '$lib/server/database';

import { json } from '@sveltejs/kit';
import { paginate } from '$lib/server/utils/paginate';
import { Availability } from '$lib/server/modules/availabilities';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	await db.connect();

	const filter = { deletedAt: null };
	const totalQuery = Availability.countDocuments(filter);

	const query = Availability.find(filter).sort({ createdAt: -1 });
	const pagination = paginate({ url, query });

	return json({
		availabilities: {
			page: pagination.page,
			perPage: pagination.perPage,
			total: await totalQuery,
			data: await query
		}
	});
};

export const POST: RequestHandler = async ({ request }) => {
	await db.connect();
	await Availability.init();

	const body = await request.json();

	if (body._id) delete body._id;
	const availability = new Availability({
		...body,
		user: '63a0b07f64ee83001dd0275e'
	});

	const error = availability.validateSync();
	if (error) return json({ error }, { status: 422 });

	try {
		await availability.save();

		// Set is default false to other
		if (availability.isDefault) {
			await Availability.updateMany(
				{
					_id: { $ne: availability._id }
				},
				{ isDefault: false }
			);
		}

		return json({ availability });
		//
	} catch (error) {
		return json(
			{
				message: error.message,
				error
			},
			{ status: 500 }
		);
	}
};
