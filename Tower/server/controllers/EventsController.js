import { Auth0Provider } from '@bcwdev/auth0provider'
import { eventsService } from '../services/EventsService';
import BaseController from "../utils/BaseController";



export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getOne)
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
            const updated = await eventsService.update(req.params.id, req.body)
            return res.send(updated)
        } catch (error) {
            console.error(error)
            // @ts-ignore 
            Pop.error(('[error with update]'), error.message)
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