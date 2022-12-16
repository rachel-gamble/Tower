<template>
    <form class="rounded" @submit.prevent="submitComment()">
        <textarea v-model="editable.body" class="bg-comments form-control my-2" rows="6"></textarea>
        <div class="d-flex justify-content-end p-2">
            <button class="btn btn-info" type="submit" title="Submit Comment">Post Comment</button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    setup() {
        const editable = ref({});
        const route = useRoute()
        return {
            editable,
            async submitComment() {
                try {
                    editable.value.eventId = route.params.eventId
                    await commentsService.createComment(editable.value)
                    // await eventsService.getActiveEvent(route.params.eventId)
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };

    }
}
</script>

<style>

</style>