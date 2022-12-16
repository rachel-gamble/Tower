import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
    async createComment(body) {
        const res = await api.post('api/comments', body)
        AppState.activeComments.unshift(res.data)
        logger.log('Comments Service | Creating Comment', AppState.activeComments)
    }

    async removeComment(commentId, creatorId) {
        const res = await api.delete('api/comments/' + commentId, { creatorId })
        const index = AppState.activeComments.findIndex(i => i.id === res.data.id)
        AppState.activeComments.splice(index, 1)
        logger.log('removed comment', res.data)
    }

}

export const commentsService = new CommentsService()