<template>
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <form @submit.prevent="createEvent()">

    <div class="modal-body">
      <!-- SECTION Name -->
      <div class="form-floating mb-3">
        <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="Event Name">
        <label for="name">Event Name</label>
      </div>

      <!-- SECTION Cover Image -->
      <div class="form-floating mb-3 elevation-5">
        <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
          placeholder="Cover Image">
        <label for="coverImg">Cover Image</label>
        <img :src="editable.coverImg" class="img-fluid" alt="">
      </div>

      <!-- SECTION Location -->
      <div class="form-floating mb-3">
        <input v-model="editable.location" type="text" class="form-control" id="floatingInput" placeholder="location">
        <label for="floatingInput">Location</label>
      </div>

      <!-- SECTION Capacity -->
      <div class="form-floating mb-3">
        <input v-model="editable.capacity" type="number" class="form-control" id="floatingInput" placeholder="Capacity">
        <label for="floatingInput">Capacity</label>
      </div>

      <!-- SECTION Description -->
      <div class="form-floating mb-3">
        <label for="Description" class="form-label">Description</label>
        <textarea v-model="editable.description" class="form-control" id="Description" rows="6" col="6"></textarea>
      </div>


      <!-- SECTION Start Date -->
      <div class="form-group"> <!-- Date input -->
        <label class="control-label" for="date">Start Date</label>
        <input v-model="editable.startDate" class="form-control" id="date" name="date" placeholder="MM/DD/YYY"
          type="text" />
      </div>

      <!-- SECTION Category/Type dropdown -->
      <div class="form-floating mb-3">
        <select v-model="editable.type" class="form-select" aria-label="Default select example" id="type">
          <label for="floatingSelect">Type of Event</label>
          <option selected value ="concert">Rave</option>
          <option value="convention">Concert</option>
          <option value="sport">Yoga + Dance</option>
          <option value="digital">Tech</option>
        </select>
      </div>
    </div>

    <!-- SECTION BUTTON-->
    <div class="modal-footer">
      <!-- TODO add booleon on event card for is canceled or not; doesn't make sense in for-->
      <button type="submit" class="btn">Create Event</button>
      <button type="button" class="btn btn-info" data-bs-dismiss="modal">Close</button>
    </div>

  </form>
</template>

<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
// import Modal from './Modal.vue';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

export default {
  components: { Modal },

  setup() {
    const editable = ref({})
    const router = useRouter()
    // const newEvent = ref({})
    return {
      editable,
      async createEvent() {
        try {
          logger.log(editable.value)
          // NOTE create album returns the res.data with our ID on it
          await eventsService.createEvent(editable.value);
          // NOTE clear the form by sitting the value of editable to an empty object
          editable.value = {}
          // NOTE hide the modal after the form submits
          Modal.getOrCreateInstance('#eventModal').hide()
          // NOTE use the id from the returned album to automatically push the user to that album's page, using the name form our supplied to object to load a page from router.js
          // TODO BELOW: redirect to created event page once I make that
          // router.push({ name: 'Event', params: { eventId: event.id } })
          Pop.toast("Created a new event!", "success")
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>