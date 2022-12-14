<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <!--TODO Logo Here-->
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

<!--SECTION - Create Event Button-->
    <ul class="navbar-nav me-auto">
      <button v-if="account.id" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#eventModal"><i
          class="mdi mdi-plus-outline"> new event</i></button>
    </ul>
    <!-- LOGIN COMPONENT HERE -->
    <Login />
    <div v-if="account.id">
      <!-- <img :src="account.id.picture"></img> -->
    </div>

  </nav>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Login from './Login.vue'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
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
    height: 64px;
  }
}
</style>
