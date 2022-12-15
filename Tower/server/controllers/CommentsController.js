import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";
import { BadRequest } from "../utils/Errors";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('/:commentId', this.getCommentById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:commentId', this.getCommentById)
            .post('', this.create)
            .delete('/:commentId', this.removeComment)
    }
    async getCommentById(req, res, next) {
        try {
            const comment = await commentsService.getCommentById(req.params.id)
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

    async removeComment(commentId, userId) {
        const comment = await this.getCommentById(commentId);
        if (comment.creatorId.toString() !== userId) {
            throw new BadRequest("You do not have permission to delete this.")
        }
        const removed = await dbContext.Comments.findByIdAndDelete(commentId)
        return removed
    }

}
