import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

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
        AppState.activeEvent = res.data
        logger.log('canceled event', res.data)
    }


    // async getEventsByUser(){
    //     const res = await api.get('api/accounts')
    // }
}

export const eventsService = new EventsService()