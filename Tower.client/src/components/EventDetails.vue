<template>
    <div class="col-12 col-md-6">
        <div class="elevation-5 rounded">
            <img :src="event.coverImg" alt="" class="img-fluid card-img rounded-top">
            <div class="text-center fw-bold p-1">
                <div class="fs-2 fw-bold">{{ event.name }}</div>
                <div class="">{{ event.description }} </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {



    setup() {

        return {};

    }
}
</script>

<style>

</style>