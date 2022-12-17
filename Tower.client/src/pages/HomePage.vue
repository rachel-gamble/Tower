<template>
  <div class="container-fluid bg-dark">

    <!--SECTION create event only shows if logged in-->
    <button v-if="account.id" class="btn btn-warning-outline" data-bs-toggle="modal"
      data-bs-target="$exampleModal">Create Event</button>
    <EventModal>
      <EventForm />
    </EventModal>
    <!--SECTION home page links-->
    <div class="row">
      <div class="col-12 p-4 text-info d-flex justify-space-between hot-pink">
        <!--TODO pass @click="filterBy = 'all'"-->
        <button @click="filterBy = ''" class="warning p-2 mx-2 rounded">All Events</button>
        <button @click="filterBy = 'concert'" class="p-2 mx-2 rounded">Raves</button>
        <button @click="filterBy = 'convention'" class="p-2 mx-2 rounded">Convention</button>
        <button @click="filterBy = 'sport'" class="p-2 mx-2 rounded">Sport</button>
        <button @click="filterBy = 'digital'" class="p-2 mx-2 rounded">Tech</button>
      </div>
    </div>
    <!--SECTION event cards-->
    <div class="row">
      <div v-for="e in events" class="col-12 col-md-3 p-2">
        <EventCard :event="e" />
      </div>
    </div>
    <!--End Event Cards-->

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
        logger.error('[GET EVENTS]', error);
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
.hot-pink {
  outline: fuchsia;
  color: fuchsia;
  text-shadow: 1px 1pc hsla(0, 0%, 50%, 0.676);
  background-color: slategray;
}

.warning {
  color: black;
  font-weight: bold;
  text-shadow: 2px 2px rgb(233, 217, 70);
}

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
