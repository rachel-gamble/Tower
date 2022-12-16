<template>
  <div class="container-fluid">


    <!--SECTION Event Details-->

    <div class="row justify-content-center p-2">
      <div class="col-12 col-md-10 card bg-dark">
        <div class="text-center p-1">
          <div class="elevation-5 rounded">
            <!--SECTION Cover Img-->
            <img :src="activeEvent.coverImg" alt="" class="img-fluid card-img rounded-top cover">
            <!--SECTION Name-->
            <div class="fs-2 fw-bold">{{ activeEvent.name }}</div>
            <div class="row justify-content-center">
              <div class="col-12 col-md-6">
                <!--SECTION Description-->
                <div class="text-start">{{ activeEvent.description }} </div>
                <!--SECTION Location-->
                <p>Location: {{ activeEvent.location }}</p>
                <!--SECTION Start Date-->
                <p>{{ activeEvent.startDate }}</p>
                <!--SECTION Capacity-->
                <p>Tickets Left: {{ activeEvent.capacity }}</p>
                <!--SECTION Cancel / Alive -->
                <!--TODO canceled event-->
                <p>Status: {{ activeEvent.isCanceled }}</p>
              </div>
              <!--SECTION Type-->
              <p class="fs-6">Category: {{ activeEvent.type }}</p>
              <div class=""></div>
            </div>
          </div>
        </div>
      </div>



      <!--TODO Event ticket holders, profile pictures, and names-->
      <div class="row">
        profile card here
      </div>

      <!--SECTION Comment FORM-->

      <div class="col-12 col-md-8">
        <div class="row d-flex">
          <small> What are people saying about {{ activeEvent.name }}</small>
          <CommentForm />
        </div>
        <!--SECTION Event Comments here-->

        <div class="row">
          <div v-for="c in activeComments" class="col-12 col-md-6 p-2">
            <CommentCard :comment="c" />
          </div>
        </div>


      </div>
      <!-- <div v-if="event" class="col-12 col-md-4 p-4">
        <div class=""></div>
      </div> -->
      <!-- 
      <div v-for="e in events" class="col-12 col-md-3 p-2">
        <EventCard :event="e" />
      </div> -->

    </div>
    <!-- NOTE Only shows this if logged in and have events-->
    <!-- <div v-if="account.id && myEvents.length > 0"> -->
    <!-- </div> -->



  </div>
</template>

<script>

import { onMounted } from "vue";
import { computed, ref } from '@vue/reactivity';
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService"


export default {
  setup() {
    const route = useRoute();
    const comment = ref({ eventId: route.params.eventId })
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.log('[GETTING EVENT BY ID]', error);
        Pop.error(error.message);
      }
    }
    async function getCommentsByEvent(eventId) {
      try {
        await eventsService.getCommentsByEvent(route.params.eventId);
      } catch (error) {
        logger.error('[GET COMMENTS]', error);
      }
    }
    onMounted(async () => {
      getEventById();
      getCommentsByEvent();

    })
    return {
      comment,
      activeEvent: computed(() => AppState.activeEvent),
      activeComments: computed(() => AppState.activeComments),
      // activeTickets: computed(() => AppState.activeTickets),
      //TODO - Add ticket computed
    }

  }
}
</script>

<style>
.cover {
  width: 30em;
  height: 30em;
}

.bg-comments {
  background-color: rgb(154, 219, 254);
  color: rgb(1, 28, 17);
  text-shadow: 1px 1px rgba(54, 253, 247, 0.83);
}
</style>