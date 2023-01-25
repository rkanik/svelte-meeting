import type { Types } from 'mongoose';

export type ApiResponse<R, E = Error> = [false, R] | [true, E];

export type User = {
	_id: Types.ObjectId;
	email: string;
};

export type Pagination<T> = {
	page: number;
	total: number;
	perPage: number;
	pages: number;
	isLoaded: boolean;
	isLoading: boolean;
	data: T[];
};

export type Action =
	| {
			icon: string;
			label: string;
			eventName: string;
	  }
	| { divider: boolean };

export type Id = string;
type DateTime = Date | string;

export enum TimeUnit {
	Hour = 'hour',
	Minute = 'minute'
}

export enum Weekdays {
	Monday = 'monday',
	Tuesday = 'tuesday',
	Wednesday = 'wednesday',
	Thursday = 'thursday',
	Friday = 'friday',
	Saturday = 'saturday',
	Sunday = 'sunday'
}

export type Duration = {
	value: number;
	unit: TimeUnit;
	label?: string;
};

type Document = {
	_id: Id;
	createdAt: DateTime;
	updatedAt: DateTime;
	deletedAt?: DateTime;
	isDeleted?: boolean;
};

export enum EventTypeStatus {
	Active = 'active',
	Deactive = 'deactive'
}

export type EventType = Document & {
	name: string;
	link: string;
	color: string;
	description: string;
	duration: Duration;
	status: EventTypeStatus;
	availability?: Availability;
	customAvailability?: CustomAvailability;
};

export type TimeSlot = {
	from: string;
	to: string;
	hasConflict?: boolean;
	isFromAfterTo?: boolean;
};

export type Weekday = {
	day: Weekdays;
	isAvailable: boolean;
	timeSlots: TimeSlot[];
};

export type DateOverride = {
	date: string;
	timeSlots: TimeSlot[];
};

type BaseAvailability = {
	timezone: string;
	weekdays: Weekday[];
	dateOverrides: DateOverride[];
};

export type CustomAvailability = BaseAvailability;

export type Availability = BaseAvailability & {
	_id: string;
	name: string;
	timezone: string;
	isDefault: boolean;
};

export type Invitee = {
	name: string;
	email: string;
	notes?: string;
};

export type Event = Document & {
	date: DateTime;
	startTime: string;
	endTime: string;
	timezone: string;
	eventType: EventType;
	guests: Invitee[];
	invitee: Invitee;
};
