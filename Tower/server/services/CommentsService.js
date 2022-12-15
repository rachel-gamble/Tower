import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { eventsService } from "./EventsService"

class CommentsService {
    async getCommentById(id) {
        const comment = await dbContext.Comments.findById(id)
        if (!comment) {
            throw new BadRequest("cannot find comment by that id")
        }
        await comment.populate('creator')
        return comment
    }
    async create(body) {
        const event = await eventsService.getOne(body.eventId)

        if (event.isCanceled == true) {
            throw new BadRequest("You can't comment on a canceled event.")
        }

        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }

    async removeComment(id, userId) {
        let removedComment = await this.getCommentById(id);
        // if (!removed) {
        //     throw new BadRequest("No comment found with that id.");
        // }
        if (removedComment.creatorId != userId) {
            throw new Forbidden("You do not permission to delete this comment.")
        }
        await removedComment.remove();
        return removedComment
    }
}

export const commentsService = new CommentsService()