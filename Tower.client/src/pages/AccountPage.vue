<template>
  <div class="container-fluid">
    <!--SECTION Top Row-->
    <div class="row d-flex">
      <div class="col-12 d-flex">

        <div class="col-12 col-md-4 justify-content-start flex-column p-3">
          <p class="fs-2 text-center">MY EVENTS</p>
        </div>

        <div class="col-12 col-md-8 d-flex align-space-between">
          <img class="rounded-circle profile-pic" :src="account.picture" alt="" />
          <div class="">
            <h1>Welcome {{ account.name }}</h1>
            <!-- <button class=""></button> -->
            <p>{{ account.email }}</p>
          </div>
        </div>

      </div>
    </div>
    <!--SECTION BOTTOM ROW - MY EVENTS -->
    <!-- <div class="fs-1 text-warning text-center mt-5"> -->
    <div class="row">
      <div class="col-12 col-md-10">
        <div v-for="a in accountTickets" class="col-12 col-md-2">
          <MyEvents :event="a" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
import { ticketsService } from '../services/TicketsService.js'
import { eventsService } from '../services/EventsService.js'
import { onMounted } from 'vue'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop';


export default {
  setup() {
    async function getMyEvents() {
      try {
        await eventsService.getMyEvents()
      } catch (error) {
        logger.log('[GETTING My tickets]', error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getMyEvents()
    })
    return {
      account: computed(() => AppState.account),
      accountTickets: computed(() => AppState.accountTickets)
    }
  },
}
</script>

<style scoped>
.img {
  max-width: 100px;
}
</style>
