import express from "express";

const eventRouter = express.Router();

import {
    addNewEvent,
    getEvents,
    getEventById,
    updateEventById,
    deleteEvent
} from  "../../controllers/eventControllers";


eventRouter.route("/")
    .get(getEvents)
    .post(addNewEvent);

eventRouter.route("/:eventID")
    .get(getEventById)
    .put(updateEventById)
    .delete(deleteEvent);


export default eventRouter;