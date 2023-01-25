import { model, models } from 'mongoose';
import { EventTypeSchema } from './EventTypeSchema';
import type { TEventType } from './EventTypeSchema';

export const EventType =
	models.EventType || model<TEventType>('EventType', EventTypeSchema, 'event-types');
