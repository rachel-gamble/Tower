<template>
  <div class="container-fluid">
    <div class="row">

      <!--SECTION Event Details-->
      <div v-if="event" class="col-12 col-md-4 p-4">
        <div class=""></div>
      </div>

      <div v-for="e in events" class="col-12 col-md-3 p-2">
        <EventCard :event="e" />
      </div>

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
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {


  setup() {
    const useRoute = useRoute();
    onMounted(async () => {
      try {
        await eventsService.getEventsByUser(route.params.id);
      }
      catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error")
      }
    })
    return {
      route,
    };

  }
}
</script>

<style>

</style>