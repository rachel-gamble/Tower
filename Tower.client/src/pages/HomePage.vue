<template>
  <div class="container-fluid bg-dark">
    <card>

      <!--SECTION create event only shows if logged in-->
      <button v-if="account.id" class="btn btn-warning-outline" data-bs-toggle="modal"
        data-bs-target="$exampleModal">Create Event</button>
      <EventModal>
        <EventForm />
      </EventModal>
      <!--SECTION home page links-->
      <div class="row">
        <card class="col-12 p-2 text-info d-flex justify-space-between">
          <!--TODO pass @click="filterBy = 'all'"-->
          <!--TODO pass @click="filterBy = ''"-->
          <button>All</button>
          <button>Raves</button>
          <button>Concerts</button>
          <button>Tech</button>
          <button>Yoga + Dance</button>
          <button>Misc</button>
        </card>
      </div>
      <!--SECTION event cards-->
      <div class="row">
        <div v-for="e in events" class="col-12 col-md-3 p-2">
          <EventCard :event="e" />
        </div>
      </div>
      <!--End Event Cards-->

    </card>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
// import LoginVue from '../components/Login.vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop.js';


export default {
  setup() {
    const filterBy = ref("");
    async function getEvents() {
      try {
        await eventsService.getAll();
      }
      catch (error) {
        // Pop.toast('error getting events', error)
        logger.error(error);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      filterBy,
      account: computed(() => AppState),
      creator: computed(() => AppState),
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        }
        else {
          return AppState.events.filter(e => e.type == filterBy.value);
        }
      })
    };
  },
  components: { EventCard }
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
