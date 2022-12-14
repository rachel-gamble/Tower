<template>
  <div class="container-fluid bg-dark">
    <!--SECTION create event only shows if logged in-->
    <!-- <button v-if="account.id" class="btn btn-warning-outline" data-bs-toggle="modal" data-bs-target="$exampleModal">Create Event</button> -->
    <!-- <EventModal>
  <EventForm />
    </EventModal> -->
  </div>


</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
// import LoginVue from '../components/Login.vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
  setup() {
    const filterBy = ref("");
    async function getEvents() {
      try {
        await eventsService.getAll();
      } catch (error) {
        // Pop.toast('error getting events', error)
        logger.error(error);
      }
    }
    onMounted(() => {
      getEvents();
    })
    return {
      filterBy,
      account: computed(() => AppState),
      creator: computed(() => AppState),
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        } else {
          return AppState.account.events.filter(e => e.type == filterBy.value);
        }
      })
    }
  },
  // component: { login },
  // components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
