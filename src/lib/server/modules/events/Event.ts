import { model, models } from 'mongoose';
import { EventSchema } from './EventSchema';
import type { TEvent } from './EventSchema';

export const Event = models.Event || model<TEvent>('Event', EventSchema);
