import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
    async getCommentById(id) {
        const comment = await dbContext.Comments.findById(id)
        await comment.populate('creator')
        if (!comment) {
            throw new BadRequest("cannot find comment by that id")
        }
        return comment
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }

    async removeComment(id, userId) {
        const removed = await dbContext.Comments.findById(id);
        if (!removed) {
            throw new BadRequest("No comment found with that id.");
        }
        if (removed.creatorId.toString() !== userId) {
            throw new BadRequest("You do not permission to delete this comment.")
        }
        removed.remove();
        return removed
    }
}

export const commentsService = new CommentsService()