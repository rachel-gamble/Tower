import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import { eventsService } from "./EventsService";


class TicketsService {

    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('profile event')
        if (!ticket) throw new BadRequest(`no ticket at id: ${ticketId}`)

        if (ticket.accountId.toString() != userId) throw new BadRequest('no ticket')

        const event = await eventsService.getOne(ticket.eventId)
        if (event.isCanceled) throw new BadRequest("Can't modify a canceled event")

        await ticket.remove()

        event.capacity += 1;
        await event.save()

        return `ticket for ${ticket.eventId.name} was removed`
    }

    async create(body) {
        const event = await eventsService.getOne(body.eventId)
        if (event) {
            if (event.isCanceled) throw new BadRequest("Can't buy a ticket to a canceled event")

            const ticket = await dbContext.Tickets.create(body)
            event.capacity -= 1

            await event.save()
            await ticket.populate('profile')
            return ticket
        }
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }

    async getAll(query) {
        const tickets = await dbContext.Tickets.find(query).populate('profile')
        return tickets
    }
}


export const ticketsService = new TicketsService()