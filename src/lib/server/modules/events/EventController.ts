// import { EventService } from "./EventService";
// import { postEventBody } from "./EventValidation";

// import type { User } from "../../types";
// import type { TPostEventBody } from "./EventValidation";
// import type { RouteHandler } from "../../routers/router";

// class EventController {
//   public getEvents: RouteHandler = async (req, res) => {
//     const user = (req as any).user as User;
//     const service = new EventService(req, res);

//     return await service.find({
//       user: user._id,
//       isDeleted: false,
//     });
//   };

//   public createEvent: RouteHandler = {
//     schema: { body: postEventBody },
//     handler: async (req, res) => {
//       try {
//         const service = new EventService(req, res);
//         return service.create(req.body as TPostEventBody);

//         //
//       } catch (error) {
//         return res.status(error.statusCode).send({ errors: error.errors });
//       }
//     },
//   };
// }

// export { EventController };
