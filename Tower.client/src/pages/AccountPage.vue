<template>
  <div class="container-fluid">
    <!--SECTION Top Row-->
    <div class="row d-flex">
      <div class="col-12 d-flex">

        <div class="col-12 col-md-4 justify-content-start flex-column p-3">
          events go down this side
        </div>

        <div class="col-12 col-md-8 d-flex align-space-between">
          <img class="rounded-circle profile-pic mx-3" :src="account.picture" alt="" />
          <div class=" mx-4 p-2">
            <h1>Welcome {{ account.name }}</h1>
            <!-- <button class=""></button> -->
            <p>{{ account.email }}</p>
          </div>
        </div>

      </div>
    </div>
    <!--SECTION BOTTOM ROW - MY EVENTS -->
    <div class="fs-1 text-warning text-center mt-5">
      My Events
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    // onMounted(async (
    // try {
    //   await eventsService.getEventsByUser(route.params.id);
    // }
    // catch (error) {
    //   logger.log(error);
    //   Pop.toast(error.message, "error")
    // }
    // ))
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
