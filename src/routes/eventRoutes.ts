import { Router } from "express"
import { EventController } from "../controllers/eventController"

const eventRouter = Router()

eventRouter.get("/", EventController.getAllEvents)
eventRouter.get("/:id", EventController.getEventById)
eventRouter.post("/", EventController.createEvent)
eventRouter.put("/", EventController.updateEvent)
eventRouter.delete("/:id", EventController.deleteEvent)

export default eventRouter