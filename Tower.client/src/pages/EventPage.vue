<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-12 col-md-6">
        <div class="elevation-5 rounded">
          <img :src="activeEvent.coverImg" alt="" class="img-fluid card-img rounded-top">
          <div class="text-center p-1">
            <div class="fs-2 fw-bold">{{ activeEvent.name }}</div>
            <div class="">{{ activeEvent.description }} </div>
            <div class=""></div>
          </div>
        </div>
      </div>


      <!--SECTION Event Details-->
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

    <!--TODO Event ticket holders, profile pictures, and names-->

    <!--TODO Event Comments here-->

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

</style>