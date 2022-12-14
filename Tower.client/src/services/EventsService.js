import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log(res.data)
        AppState.events.unshift(res.data)
    }

    // async getEvents(){
    //     const res = await api.get('api/events')
    //     AppState.events = res.data.events
    //     logger.log('get events', res.data)
    // }
}

export const eventsService = new EventsService()