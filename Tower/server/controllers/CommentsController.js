import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";
import { BadRequest } from "../utils/Errors";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:commentId', this.getCommentById)
            .post('', this.create)
            .delete('/:id', this.removeComment)
    }
    async getCommentById(req, res, next) {
        try {
            const comment = await comment.getCommentById(req.params.id)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.create(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(req, res, next) {
        try {
            return res.send(await commentsService.removeComment(req.params.id, req.userInfo.id));
        }
        catch (error) {
            next(error);
        }
    }


}
