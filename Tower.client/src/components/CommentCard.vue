<template>

    <div class="d-flex">
        <img :src="comment.creator.picture" alt="" class="profile-pic">
        <div class="d-flex justify-content-between">
            <p class="p-2">{{ comment.creator.name }}</p>
            <p class="p-2"></p>
            <i v-show="comment.creatorId == account.id" class="mdi mdi-delete fs-2 action" title="delete comment"
                @click="removeComment(comment.id, comment.creatorId)"></i>
        </div>
        <p>{{ comment.body }}</p>
    </div>

</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    props: {
        comment: {
            type: Object, required: true
        }
    },
    setup(props) {
        const route = useRoute()
        return {
            account: computed(() => AppState.account),
            activeEvent: computed(() => AppState.activeEvent),
            activeComments: computed(() => AppState.activeComments),
            async removeComment(commentId) {
                try {
                    if (await Pop.confirm()) {
                        await commentsService.removeComment(commentId);
                    }
                } catch (error) {
                    logger.error('[error deleting comment]', error);
                    console.log('error removing comment', error)
                }
            }
        };



    }
}
</script>

<style lang="scss" scoped>
.picture {
    height: 8em;
    width: 8em;
    border-radius: 50%;
}
</style>