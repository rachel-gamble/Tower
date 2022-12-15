<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">

    <div class="d-flex flex-column align-items-center">
      <!--TODO Logo Here-->
      <img @click="goHome()" src="../assets/img/Logo.svg" class="img-fluid logo p-2 mt-2 mx-4 selectable">
    </div>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!--SECTION - Create Event Button-->
    <ul class="navbar-nav me-auto">
      <button v-if="account.id" class="btn btn-warning mx-2 p-2" data-bs-toggle="modal" data-bs-target="#eventModal"><i
          class="mdi mdi-plus-outline"> new event</i></button>
    </ul>
    <!-- LOGIN COMPONENT HERE -->
    <Login />
    <div v-if="account.id">
      <img :src="account.id.picture">
    </div>

  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import Login from './Login.vue'
export default {
  setup() {
    const router = useRouter()
    // const query = ref('')
    //TODO - Add pages
    return {
      account: computed(() => AppState.account),
      async goHome() {
        try {
          router.push('/')
          await eventsService.getAll()
        } catch (error) {
          console.error(error)
          Pop.error((['Error going home']), error.message)
        }
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.logo {
  width: 10em;
  height: 10em;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 10em;
  }
}
</style>
