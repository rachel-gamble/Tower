import { dbContext } from "../db/DbContext.js"

class EventsService {

    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator')
        return event
    }

}

export const eventsService = new EventsService()