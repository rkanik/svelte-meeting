import { z } from 'zod';
import { TimeUnit } from '$lib/types';
import { EventTypeStatus } from '$lib/types';
import { BaseAvailabilityObject } from '$lib/server/modules';
import { Schema, Types, model } from 'mongoose';

import type { HydratedDocument } from 'mongoose';

const REGEX_EVENT_TYPE_LINK = /^[a-z0-9_]+(?:-[a-z0-9_]+)*$/;
const ERROR_INVALID_LINK =
	"Invalid link. Please use lowercase only 'a-z', '0-9', '-', or '_' characters.";

const ZEventType = z
	.object({
		user: z.instanceof(Types.ObjectId),
		availability: z.instanceof(Types.ObjectId).nullable(),
		name: z.string().min(3, { message: 'Name should be at least 3 characters' }),
		link: z.custom((val) => {
			return REGEX_EVENT_TYPE_LINK.test(val as string) || ERROR_INVALID_LINK;
		}),
		color: z.string().default('#0792EF'),
		description: z.string().nullable(),
		duration: z
			.object({
				value: z.number().default(30),
				unit: z.nativeEnum(TimeUnit).default(TimeUnit.Minute)
			})
			.required(),
		customAvailability: z.any(),
		status: z.nativeEnum(EventTypeStatus).default(EventTypeStatus.Active),
		deletedAt: z.date().nullable().default(null)
	})
	.required();

type TEventType = Required<z.infer<typeof ZEventType>>;
type THEventType = HydratedDocument<TEventType>;

const DurationSchema = new Schema({
	value: {
		type: Number,
		default: 30
	},
	unit: {
		type: String,
		required: true,
		default: TimeUnit.Minute,
		enum: Object.values(TimeUnit)
	}
});

const CustomAvailabilitySchema = new Schema(BaseAvailabilityObject);

const EventTypeSchema = new Schema<TEventType>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		availability: {
			type: Schema.Types.ObjectId,
			ref: 'Availability',
			required: function () {
				return !this.customAvailability;
			}
		},
		name: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: true,
			validate: {
				message: ERROR_INVALID_LINK,
				validator: (value: string) => REGEX_EVENT_TYPE_LINK.test(value)
			}
		},
		color: {
			type: String,
			required: true,
			default: '#0792EF'
		},
		description: {
			type: String
		},
		duration: {
			type: DurationSchema,
			required: true,
			default: {
				value: 30,
				unit: TimeUnit.Minute
			}
		},
		customAvailability: {
			type: CustomAvailabilitySchema,
			required: function () {
				return !this.availability;
			}
		},
		status: {
			type: String,
			required: true,
			default: EventTypeStatus.Active,
			enum: Object.values(EventTypeStatus)
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

EventTypeSchema.methods.isUniqueLink = async function (newLink: string) {
	return !(await model('event-type')
		.findOne({
			link: { $eq: newLink, $ne: this.link }
		})
		.select('_id'));
};

export { EventTypeSchema };
export type { TEventType, THEventType };
