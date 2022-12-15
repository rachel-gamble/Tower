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
                <p>Status: Canceled??</p>
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

      <!--TODO Event Comments here-->

      <div class="row">
        comment card here
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

export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.log('[GETTING EVENT BY ID]', error);
        Pop.error(error.message);
      }
    }
    onMounted(async () => {
      getEventById();
      // try {
      //   await eventsService.getEventsByUser(route.params.id);
      // }
      // catch (error) {
      //   logger.log(error);
      //   Pop.toast(error.message, "error")
      // }
    })
    return {
      activeEvent: computed(() => AppState.activeEvent)
    };

  }
}
</script>

<style>
.cover {
  width: 30em;
  height: 30em;
}
</style>