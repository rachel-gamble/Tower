<template>
    <img :src="events.profile.picture" class="img-fluid rounded-circle img" title="{{account.picture}}">
</template>

<script>

export default {



    setup() {

        return {};

    }
}
</script>

<style lang="scss" scoped>
.img {
    height: 1vh;
    width: 1em;
    object-fit: cover;
}
</style>