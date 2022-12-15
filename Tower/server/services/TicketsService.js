import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { eventsService } from "./EventsService";


class TicketsService {
    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }

    async getAll(query) {
        const tickets = await dbContext.Tickets.find(query).populate('profile')
        return tickets
    }

    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
        if (!ticket) throw new BadRequest(`no ticket at id: ${ticketId}`)

        if (ticket.accountId != userId) throw new BadRequest('no ticket')

        const event = await eventsService.getOne(ticket.eventId)
        if (event.isCanceled) throw new BadRequest("Can't modify a canceled event")

        await ticket.remove()

        // @ts-ignore
        event.capacity += 1;
        await event.save()

        return `ticket for ${event.name} was removed`
    }

    async create(body) {
        const event = await eventsService.getOne(body.eventId)

        if (event.isCanceled == true) {
            throw new BadRequest("Can't buy a ticket to a canceled event");
        }
        if (event.capacity == 0) {
            throw new BadRequest("This event is sold out!");
        }
        // lower capacity when a ticket is created
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate('profile', 'event')

        // @ts-ignore
        event.capacity -= 1
        await event.save()
        return ticket
    }
}

export const ticketsService = new TicketsService()