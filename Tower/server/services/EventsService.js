import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    async getAll() {
        const events = await dbContext.Events.find().populate('creator')
        return events
    }

    async create(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator')
        return event
    }
    async getOne(id) {
        const event = await dbContext.Events.findById(id).populate('creator')
        if (!event) throw new BadRequest(`no event by id: ${id}`)
        return event
    }

    async update(id, data) {
        const original = await dbContext.Events.findById(id)
        if (!original) throw new BadRequest('no event at id: ' + id)

        // const event = await eventsService.getOne(id)
        if (original.isCanceled) throw new BadRequest("Error: Can't edit a canceled event.")
        //Event Schema Model Here
        original.name = data.name ? data.name : original.name
        original.description = data.description ? data.description : original.description
        original.coverImg = data.coverImg ? data.coverImg : original.coverImg
        original.location = data.location ? data.location : original.location
        original.capacity = data.capacity ? data.capacity : original.capacity
        // original.isCanceled = data.isCanceled ? data.isCanceled : original.isCanceled
        original.startDate = data.startDate ? data.startDate : original.startDate
        original.type = data.type ? data.type : original.type
        await original.save()
        return original
    }
    async archive(eventId, userId) {
        const event = await this.getOne(eventId)
        if (event.creatorId != userId) throw new Forbidden('can only archive an event you created')
        event.isCanceled = !event.isCanceled
        await event.save()
        return `archived ${event.name}`
    }
}

export const eventsService = new EventsService()