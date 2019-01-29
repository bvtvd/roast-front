<template>
    <div id="cafes">
        <div class="grid-x">
            <div class="large-9 medium-9 small-9 cell">
                <cafe-map></cafe-map>
            </div>
            <div class="large-3 medium-3 small-3 cell">

            </div>
        </div>
    </div>
</template>

<script>
    import CafeMap from '../components/cafes/CafeMap';

    export default {
        name: "Cafes",
        components: {
            CafeMap
        }
    }
</script>

<style scoped>

</style>