import { z } from 'zod';
import { Schema, Types } from 'mongoose';

import type { HydratedDocument } from 'mongoose';

export enum EventStatus {
	Created = 'created'
}

const ZEvent = z
	.object({
		user: z.instanceof(Types.ObjectId),
		endTime: z.date(),
		startTime: z.date(),
		eventType: z.instanceof(Types.ObjectId),
		timezone: z.string().default('Asia/Dhaka'),
		status: z.nativeEnum(EventStatus).default(EventStatus.Created),
		invitee: z
			.object({
				name: z.string(),
				email: z.string().email(),
				notes: z.string().nullable().optional()
			})
			.required({ name: true, email: true }),
		guests: z
			.array(
				z
					.object({
						email: z.string().email(),
						name: z.string().nullable().optional()
					})
					.required({ email: true })
			)
			.default([]),
		deletedAt: z.date().nullable().default(null)
	})
	.required({
		user: true,
		endTime: true,
		startTime: true,
		eventType: true,
		invitee: true
	});

type TEvent = Required<z.infer<typeof ZEvent>>;
type THEvent = HydratedDocument<TEvent>;

const GuestSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	}
});

const InviteeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	notes: {
		type: String
	}
});

const EventSchema = new Schema<TEvent>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		},
		timezone: {
			type: String,
			required: true,
			default: 'Asia/Dhaka'
		},
		eventType: {
			type: Schema.Types.ObjectId,
			ref: 'event-type',
			required: true
		},
		invitee: {
			type: InviteeSchema,
			required: true
		},
		guests: {
			default: [],
			type: [GuestSchema]
		},
		status: {
			type: String,
			required: true,
			default: EventStatus.Created,
			enum: Object.values(EventStatus)
		},
		deletedAt: {
			type: Date,
			default: null
		}
	},
	{
		timestamps: true
	}
);

export { EventSchema, ZEvent };
export type { TEvent, THEvent };
