import { model, models } from 'mongoose';
import { AvailabilitySchema } from './AvailabilitySchema';

export const Availability = models.Availability || model('Availability', AvailabilitySchema);
