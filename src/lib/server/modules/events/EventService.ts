// import moment from 'moment-timezone';

// import { Event } from './Event';
// import { EventType } from '$lib/server/modules';
// import { BaseService } from '$lib/server/BaseService';
// import { HTTPError } from '$lib/server/HTTPError';

// import type { THEvent } from './EventSchema';
// import type { THEventType } from '$lib/server/modules/event-types';

// import { Mailer } from '$lib/server/emails/NodeMailer';

// class EventService extends BaseService {
// 	constructor(protected req: any, protected res: any) {
// 		super(req, res);
// 	}

// 	public async find(filter: any) {
// 		const total = await Event.countDocuments(filter);
// 		const data = await Event.find(filter)
// 			.skip(this.skip)
// 			.limit(this.limit)
// 			.sort({ startTime: 1 })
// 			.populate({
// 				path: 'eventType',
// 				populate: { path: 'availability' }
// 			});
// 		return this.paginate({ data, total });
// 	}

// 	public async create(body: any) {
// 		const eventType: THEventType = await EventType.findById(body.eventTypeId).select(
// 			'name duration'
// 		);

// 		if (!eventType) {
// 			throw new HTTPError({ code: 400, message: 'Event type not found' });
// 		}

// 		const { value: time, unit } = eventType.duration;

// 		const startTime = moment.utc(body.datetime);
// 		const endTime = startTime.clone().add(time, unit);

// 		const event: THEvent = new Event({
// 			user: this.user._id,
// 			eventType: eventType._id,

// 			startTime: new Date(startTime.format()),
// 			endTime: new Date(endTime.format()),

// 			guests: body.guests,
// 			timezone: body.timezone,

// 			invitee: {
// 				name: body.invitee.name,
// 				email: body.invitee.email,
// 				notes: body.invitee.notes
// 			}
// 		});

// 		const errors = event.validateSync();
// 		if (errors) return new HTTPError({ errors, code: 200 });

// 		await event.save();

// 		Mailer.sendMail(
// 			{
// 				from: 'sender@server.com',
// 				to: [body.invitee.email, ...body.guests.map((g) => g.email)].join(','),
// 				subject: `New Event: ${body.invitee.name} - ${startTime.format(
// 					'hh:mma'
// 				)} Wed, 28 Dec 2022 - ${eventType.name}`,
// 				html: `<div>Hi, RK Anik</div><br/>,

// A new event has been scheduled.<br/><br/>

// <b>Event Type:</b><br/>
// ${eventType.name}<br/><br/>

// <b>Invitee:</b><br/>
// ${body.invitee.name}<br/><br/>

// <b>Invitee Email:</b><br/>
// <a href="#">${body.invitee.email}</a><br/><br/>

// <b>Additional Guests::</b><br/>
// ${body.guests.map((guest) => `<a href="#">${guest.email}</a>`).join(', ')}<br/><br/>

// <b>Event Date/Time:</b><br/>
// ${startTime.format('hh:mma')} - ${startTime.format('dddd, DD, MMMM YYYY')} (${
// 					body.timezone
// 				})<br/><br/>

// <b>Description:</b><br/>
// Sunt eum id ut sapie.<br/><br/>

// <b>Invitee Time Zone:</b><br/>
// ${body.timezone}<br/><br/>

// <b>Questions:</b><br/><br/>

// Please share anything that will help prepare for our meeting.<br/>
// Et minus ad consectetur voluptatibus corporis sit aspernatur enim labore reprehenderit sunt irure quas ipsa id reprehenderit dolor
// `
// 			},
// 			(res: any) => {
// 				console.log('sendMail', res);
// 			}
// 		);

// 		return await event.populate({
// 			path: 'eventType',
// 			populate: { path: 'availability' }
// 		});
// 	}
// }

// export { EventService };
