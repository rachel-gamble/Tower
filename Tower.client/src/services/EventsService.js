import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { ticketsService } from "../services/TicketsService"

class EventsService {

    async getAll() {
        const res = await api.get('api/events')
        logger.log('[get all events]', res.data)
        AppState.events = res.data
    }

    async getEventById(eventId) {
        const res = await api.get('api/events/' + eventId)
        logger.log('[get event by id]', res.data)
        AppState.activeEvent = res.data
    }

    async getProfiles(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('[get tickets by album id]', res.data)
        AppState.eventTickets = res.data
        console.log(res.data)
    }
    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log(res.data)
        AppState.events.unshift(res.data)
        return res.data
    }

    async getCommentsByEvent(eventId) {
        const res = await api.get('api/events/' + eventId + '/comments')
        console.log('[COMMENTS FOR EVENT]', res.data);
        AppState.activeComments = res.data
    }

    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        //TODO - 
        // AppState.activeEvent = res.data
        logger.log('canceled event', res.data)
    }

    async sellTicket(ticketId) {
        const res = await api.delete('api/tickets/' + ticketId)
        AppState.eventTickets = AppState.eventTickets.filter(t => t.id !== ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)

        AppState.activeEvent.capacity++
    }
    async getMyEvents() {
        const res = await api.get('account/tickets')
        console.log('get my event tickets', res.data)
        AppState.accountTickets = res.data
    }


    // async getEventsByUser(){
    //     const res = await api.get('api/accounts')
    // }
}

export const eventsService = new EventsService()