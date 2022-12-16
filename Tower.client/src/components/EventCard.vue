<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="elevation-5 rounded shadow selectable">
            <img :src="event.coverImg" alt="" class="img-fluid rounded-top event-img">
            <div class="text-center fw-bold p-1">
                <p class="text-shadow">{{ event.name }}</p>
                <p v-if="event.isCanceled == true" class="text-danger fw-bold">EVENT CANCELED</p>
                <p v-if="event.capacity == 0">EVENT SOLD OUT</p>

            </div>

        </div>

    </router-link>
</template>


<script>
export default {
    props: {
        event: { type: Object, required: true }
    },
    setup() {
        return {

        };
    }
}
</script>

<style lang="scss" scoped>
.event-img {
    height: 30vh;
    width: 100%;
    object-fit: cover;
}

.shadow {
    box-shadow: 4pt 4pt hsl(56, 100%, 58%);
}

.text-shadow {
    color: aliceblue;
    text-shadow: 1px 1px rgb(248, 64, 217);
    font-size: 20px;
}
</style>