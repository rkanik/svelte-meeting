import moment from 'moment-timezone';
import { Schema, Types } from 'mongoose';

const ObjectId = Types.ObjectId;

const TimeSlotSchema = new Schema({
	from: {
		type: String,
		required: true,
		default: '09:00am'
	},
	to: {
		type: String,
		required: true,
		default: '05:00pm'
	}
});

const DateOverrideSchema = new Schema({
	date: {
		type: String,
		required: true,
		default: moment.utc().format('YYYY-MM-DD')
	},
	timeSlots: {
		type: [TimeSlotSchema],
		required: true,
		default: []
	}
});

const WeekdaySchema = new Schema({
	day: {
		type: String,
		required: true,
		default: 'monday',
		enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
	},
	isAvailable: {
		type: Boolean,
		required: true,
		default: function () {
			return (this.timeSlots || []).length > 0;
		}
	},
	timeSlots: {
		type: [TimeSlotSchema],
		required: true,
		default: []
	}
});

const BaseAvailabilityObject = {
	timezone: {
		type: String,
		required: true,
		default: 'Asia/Dhaka'
	},
	weekdays: {
		type: [WeekdaySchema],
		required: true,
		default: []
	},
	dateOverrides: {
		type: [DateOverrideSchema],
		required: true,
		default: []
	}
};

const AvailabilitySchema = new Schema(
	{
		...BaseAvailabilityObject,
		user: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String,
			unique: true,
			required: true
		},
		isDefault: {
			type: Boolean,
			required: true,
			default: false
		},
		isDeleted: {
			type: Boolean,
			default: false
		},
		deletedAt: {
			type: Date,
			default: null
		}
	},
	{ timestamps: true }
);

export { AvailabilitySchema, BaseAvailabilityObject };
