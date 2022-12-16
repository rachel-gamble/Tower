import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { accountService } from "./AccountService"
import { api } from "./AxiosService"

class TicketsService {

    async getTicketsByEvent(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        console.log('[getting tickets for this event]', res.data)
        AppState.eventTickets = res.data
        return res.data
    }

    // async getMyTickets() {
    //     try {
    //         const res = await api.get('account/tickets')
    //         logger.log('[get my tickets]', res.data)
    //         console.log('getting my ticket');

    //     } catch {
    //         console.log('problem getting tickets service');
    //     }
    // }

    // async getMyTickets(creatorId) {
    //     try {
    //         const res = await api.get('/account/tickets')
    //         logger.log('get my tickets', AppState.myTickets)
    //         AppState.myTickets = res.data
    //     } catch (error) {
    //         logger.error('Something went wrong while fetching your tickets')
    //         Pop.error('failed to get your tickets', error.message)
    //     }
    // }

    async createTicket(eventId) {
        const myTickets = AppState.myTickets
        if (myTickets.find(t => t.eventId == eventId)) {
            throw new Error('You already have a ticket for that event')
        }
        const res = await api.post('api/tickets', eventId)
        AppState.eventTickets.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.activeEvent.capacity--
        logger.log('[create ticket]', res.data)
        return res.data
    }
    // async sellTicket(ticketId) {
    //     const res = await api.delete('api/tickets/' + ticketId)
    //     const accountTickets = await ticketsService.getMyTickets()
    //     AppState.myTickets = [...AppState.myTickets]
    //     logger.log('destroyed ticket', res.data)
    // }


}

export const ticketsService = new TicketsService()