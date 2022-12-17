<template>
  <div class="container-fluid">


    <!--SECTION Event Details-->

    <div class="row justify-content-center p-2">
      <div class="col-12 col-md-10 card bg-dark">
        <div class="text-center p-1">
          <div class="elevation-5 rounded">

            <!--SECTION Cover Img-->
            <img :src="activeEvent.coverImg" alt="" class="img-fluid card-img rounded-top cover">
            <!--SECTION Name-->
            <div class="fs-2 fw-bold">{{ activeEvent.name }}</div>
            <div class="row justify-content-center">
              <div class="col-12 col-md-6">
                <!--SECTION Description-->
                <div class="text-start">{{ activeEvent.description }} </div>
                <!--SECTION Location-->
                <p>Location: {{ activeEvent.location }}</p>
                <!--SECTION Start Date-->
                <!--TODO fix date string-->

                <p>Event Date: {{ new Date(activeEvent.startDate).toDateString() }}</p>

                <!--SECTION Capacity-->
                <p>Tickets Left: {{ activeEvent.capacity }}</p>
                <!--SECTION Cancel / Alive -->
                <!-- <p>Status: {{ activeEvent.isCanceled }}</p> -->
              </div>

              <!--SECTION Attendees-->
              <small>See who is attending</small>
              <Attendees v-for="t in eventTickets" :key="t.id" :attendee="t" />
            </div>

            <!--SECTION Button Buy Ticket-->
            <div class="d-flex justify-content-between my-4">
              <!--NOTE - create ticket | return/sell ticket | is canceled v-if + v-else-if v-else -->
              <!--SECTION If Canceled -->
              <div v-if="activeEvent?.isCanceled"
                class="rounded bg-danger text-dark w-100 text-center fw-bolder pb-1 mt-1 fs-4 not-allowed">Event
                Canceled<i class="mdi mdi-human-handsdown"></i></div>
              <div v-else class="d-flex justify-content-between mt-2">
                <!--SECTION if tickets left-->
                <div class="">
                  <span v-if="activeEvent?.capacity > 0"><b class="text-warning">{{ activeEvent?.capacity }}</b> spots
                    left
                  </span>
                  <span v-else><b class="text-danger">NO SPOTS LEFT</b></span>
                </div>

                <!--SECTION Buy -->
                <div>

                  <div v-if="attending">
                    <button @click="sellTicket(attending.id)">Sell Ticket</button>
                  </div>
                  <div v-else-if="!activeEvent?.isCanceled && account.id && activeEvent.capacity != 0">
                    <button @click="createTicket()" title="'attend ' + activeEvent?.name'"
                      class="text-dark bg-warning">Buy
                      Ticket</button>
                  </div>
                </div>


              </div>


              <!--SECTION Cancel/Sell -->
              <div v-if="account?.id == activeEvent?.creatorId && activeEvent.isCanceled == false">
                <button @click="cancelEvent()" type="button" title="Cancel This Event">Cancel Event
                </button>
              </div>


              <span class="fs-1" v-show="activeEvent?.capacity <= 0 || activeEvent?.isCanceled">EVENT NO LONGER
                AVAILABLE</span>
            </div>
            <!--SECTION END TICKETS-->
          </div>
        </div>
      </div>

      <!--TODO Event ticket holders, profile pictures, and names-->
      <div class="row justify-content-center">
        <!-- <div v-for="p in " class="col-12 col-md-6 p-2">
              <ProfileCard :profile="p" />            -->
      </div>

      <!--SECTION Comment FORM-->

      <div class="col-12 col-md-8">
        <div class="row d-flex">
          <small> What are people saying about {{ activeEvent.name }}</small>
          <CommentForm />
        </div>
        <!--SECTION Event Comments here-->

        <div class="row">
          <div v-for="c in activeComments" class="col-12 col-md-6 p-2">
            <CommentCard :comment="c" />
          </div>
        </div>
      </div>

    </div>
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
import { commentsService } from "../services/CommentsService.js"
import { ticketsService } from "../services/TicketsService.js"
import { router } from "../router";


export default {
  setup() {
    const route = useRoute();
    const comment = ref({ eventId: route.params.eventId })
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        logger.log('[GETTING EVENT BY ID]', error);
        Pop.error(error.message);
      }
    }


    async function getCommentsByEvent(eventId) {
      try {
        await eventsService.getCommentsByEvent(route.params.eventId);
      } catch (error) {
        logger.error('[ERROR GETTING COMMENTS]', error);
      }
    }

    async function getTicketsByEvent(eventId) {
      try {
        // let eventId = AppState.activeEvent.id
        await ticketsService.getTicketsByEvent(route.params.eventId)
      } catch (error) {
        logger.error('[ERROR GETTING tickets]', error);
        Pop.error('failed to get tickets for this event', error.message);
      }
    }

    async function getProfiles() {
      try {
        await eventsService.getProfiles(route.params.eventId)
      } catch (error) {
        logger.log('[getting profiles for this event]', error);
        Pop.error(error.message);
      }
    }

    onMounted(async () => {
      getEventById();
      getCommentsByEvent();
      getTicketsByEvent();
      getProfiles();


    })
    return {
      comment,
      activeEvent: computed(() => AppState.activeEvent),
      activeComments: computed(() => AppState.activeComments),
      eventTickets: computed(() => AppState.eventTickets),
      myTicketsForEvent: computed(() => AppState.eventTickets.find(t => t.eventId == AppState.activeEvent.id)),
      attending: computed(() => AppState.eventTickets.find(t => t.accountId == AppState.account.id)),
      account: computed(() => AppState.account),



      //  TODO try and grab a ticket from your Appstate using your account id. If that ticket exists, do not show the button on your page

      async createTicket() {
        try {
          await ticketsService.createTicket({
            eventId: route.params.eventId
          })
        } catch (error) {
          logger.error(error);
          Pop.error('failed to create ticket', error.message);
        }
      },

      async cancelEvent() {
        try {
          if (await Pop.confirm('Cancel this event?')) {
            await eventsService.cancelEvent(route.params.eventId)
            Pop.toast('Event Canceled')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }

      },

      async sellTicket(ticketId) {
        try {
          if (await Pop.confirm('Sell your ticket?')) {
            await eventsService.sellTicket(ticketId)
            Pop.toast('Ticket Sold')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>
.cover {
  width: 30em;
  height: 30em;
}

.card-img {
  height: 100%;
  object-fit: cover;
}

.bg-comments {
  background-color: rgb(154, 219, 254);
  color: rgb(1, 28, 17);
  text-shadow: 1px 1px rgba(54, 253, 247, 0.83);
}

.hot-pink {
  outline: fuchsia;
  color: fuchsia;
  text-shadow: 1px 1pc hsla(0, 0%, 50%, 0.676);
  background-color: slategray;
}

.not-allowed {
  cursor: not-allowed;
}

.event-edit {
  position: absolute;
  top: 8px;
  right: 16px;
}

.event-edit-button {
  background-color: hsla(0, 0%, 100%, 0.3);
  line-height: 1rem !important;
}

.dropdown-item {
  text-align: center;
}
</style>