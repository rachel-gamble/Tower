import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import BaseController from "../utils/BaseController";



export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .get('/:id/tickets', this.getTicketsByEvent)
            .get('/:id/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.update)
            .delete('/:id', this.archive)
    }
    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getOne(req, res, next) {
        try {
            const event = await eventsService.getOne(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByEvent(req, res, next) {
        try {
            const tickets = await ticketsService.getAll({ eventId: req.params.id })
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getEventComments(req, res, next) {
        try {
            const comments = await eventsService.getEventComments({ eventId: req.params.id })
            return res.send(comments)
        } catch (error) {
            next(error)
        }

    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const updated = await eventsService.update(req.params.id, req.body, req.userInfo.id)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }

    async archive(req, res, next) {
        try {
            const message = await eventsService.archive(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}
