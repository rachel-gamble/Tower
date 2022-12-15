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

    async removeComment(req, res, next) {
        try {
            const comment = await this.getCommentById(commentId);
            if (comment.creatorId.toString() !== userId) {
                throw new Forbidden("You do not have permission to delete this.")
            }
        }
}

    export const commentsService = new CommentsService()