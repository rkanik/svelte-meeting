// import { z } from "zod";
// import { ZEvent } from "./EventSchema";
// import { isValidObjectId } from "mongoose";

// export type TPostEventBody = Required<z.infer<typeof postEventBody>>;
// export const postEventBody = ZEvent.pick({
//   guests: true,
//   invitee: true,
//   timezone: true,
// })
//   .extend({
//     datetime: z.string().datetime({ offset: true }),
//     eventTypeId: z.custom((val) => isValidObjectId(val)),
//   })
//   .required({ invitee: true, datetime: true, eventTypeId: true });
